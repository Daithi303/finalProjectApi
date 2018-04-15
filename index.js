import express from 'express';
import sensorStateRouter from './api/route/sensorStateRouter.js';
import alertRouter from './api/route/alertRouter.js';
import authenticateRouter from './api/route/authenticateRouter.js';
import bodyParser from 'body-parser';
import Model from './api/model/model.js';
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import {loadSensorStates} from './api/model/sensorStateData';
import {loadAlerts} from './api/model/alertData';
import jwt from 'jsonwebtoken';
import _ from 'lodash';

dotenv.config();
mongoose.connect(process.env.mongoDB);

if (process.env.seedDb) {
  loadAlerts();
  loadSensorStates();
}

const port = process.env.PORT;
var server = express();
server.set('superSecret', process.env.jwtSecret);
alertRouter.init(server);
sensorStateRouter.init(server);
authenticateRouter.init(server);
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
//server.use('/api/authenticate', authenticateRouter.router);
server.use('/api/alert', alertRouter.router);
server.use('/api/sensorState', sensorStateRouter.router);

server.listen(port);

function checkConnectionState() {
  	Model.SensorState.find({ deviceId: '0001' },(err,sensorState)=>{
	 if (err) console.log(err);	
	 var firstSensorState = sensorState[0];
		if (!firstSensorState) console.log("checkConnectionState: Sensor State Not found");
	if (firstSensorState.connectionStateTimeStamp) {
        var connInt = parseInt(firstSensorState.connectionStateTimeStamp);
        var nowInt = parseInt(new Date().getTime());
        var differenceInSeconds = (nowInt-connInt)/1000;
        console.log("ConnectionStateTimeStamp: "+connInt)
        console.log("CurrentTimeStamp: "+nowInt)
        console.log("difference in seconds: "+differenceInSeconds);
        if(firstSensorState.connectionState=="Connected"&&differenceInSeconds>6){
          const updated = _.merge(firstSensorState,     {
        "connectionState": "Disconnected"
    });
              updated.save((err) => {
      if (err) console.log(err);
      console.log("Connection State is now set to Disconnected.");
    });
        }
      }
	});

}

function removeAlertsIfDisconnected(){
  Model.SensorState.find({ deviceId: '0001' },(err,sensorState)=>{
    	 if (err) console.log(err);	
	 var firstSensorState = sensorState[0];
		if (!firstSensorState) console.log("removeAlertsIfDisconnected: Sensor State Not found");
		if(firstSensorState.connectionState!="Connected"){
		  Model.Alert.find({}).remove((err) => {
  		 if (err) console.log("Remove Alerts: "+err);	
});
		}
  });
  
}

function perfromTasks(){
  checkConnectionState();
  removeAlertsIfDisconnected();
}

setInterval(perfromTasks, 3*1000);

console.log(`Server running at ${port}`);