import express from 'express';
import Model from './../model/model.js';
import _ from 'lodash';
import jwt from 'jsonwebtoken';
import json2xml from 'json2xml';
import moment from 'moment';
const router = express.Router(); 
var server = null;

/*
The code for this API was based on an assignment required for our Web Services Development module. The labs on which the assignment was based can be found here:
https://wit-computing.github.io/web-services-2018/

The Web Services Development module assignment itself was originally based on a portion of my 4th year project's ideal data model. 
However the data model needed to be re-designed HERE due to time restraints.The original Web Services Development module assignment can be found here:
https://github.com/Daithi303/WebServDev2018Assignment1
*/

function init(serverIn) {
  server = serverIn;
};


//this function converts the mongoose object to a plain object
function convertAndFormatMongooseObjectToPlainObject(sensorState){
	var sensorStateObj = sensorState.toObject();

	return sensorStateObj;
}


//Get all sensor states by deviceId (json and xml)
router.get('/:deviceId', (req, res) => {
	Model.SensorState.find({ deviceId: req.params.deviceId },(err,sensorState)=>{
	 if (err) return handleError(res, err);	
		if (!sensorState) return res.status(404).json({SensorStatetNotFound: "Sensor State Not found"});
		return res.status(201).send(sensorState);
	});
});


// Update a sensor state
router.put('/:deviceId', (req, res) => {
  if (req.body._id) delete req.body._id;
if (req.body.deviceId) delete req.body.deviceId;
  Model.SensorState.find({ deviceId: req.params.deviceId },(err,sensorState)=>{
    if (err) return handleError(res, err);
    if (!sensorState) return res.send(404);
    var firstSensorState = sensorState[0];
    const updated = _.merge(firstSensorState, req.body);
    updated.save((err) => {
      if (err) return handleError(res, err);


      console.log("Sensor state successful: "+ moment().format('D MMM, YYYY'));
      return res.status(200).send(convertAndFormatMongooseObjectToPlainObject(firstSensorState));
    });
  });
});

function handleError(res, err) {
  return res.send(500, err);
};

module.exports = {
	router: router,
	init: init	
};

