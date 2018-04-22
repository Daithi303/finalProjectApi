import express from 'express';
import sensorStateRouter from './api/route/sensorStateRouter.js';
import alertRouter from './api/route/alertRouter.js';
import bodyParser from 'body-parser';
import Model from './api/model/model.js';
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import {loadSensorStates} from './api/model/sensorStateData';
import {loadAlerts} from './api/model/alertData';
import jwt from 'jsonwebtoken';
import _ from 'lodash';
/*
The code for this API was based on an assignment required for our Web Services Development module. The labs on which the assignment was based can be found here:
https://wit-computing.github.io/web-services-2018/

The Web Services Development module assignment itself was originally based on a portion of my 4th year project's ideal data model. 
However the data model needed to be re-designed HERE due to time restraints.The original Web Services Development module assignment can be found here:
https://github.com/Daithi303/WebServDev2018Assignment1
*/
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
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
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
        "connectionState": "Disconnected",
        "vehicleSpeedValue":"0"
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