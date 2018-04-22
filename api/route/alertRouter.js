import express from 'express';
import Model from './../model/model.js';
import _ from 'lodash';
import jwt from 'jsonwebtoken';
import json2xml from 'json2xml';
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
function convertAndFormatMongooseObjectToPlainObject(alert){
	var alertObj = alert.toObject();
	return alertObj;
}

//Get all alerts by deviceId
router.get('/:deviceId', (req, res) => {
	console.log("Got to here");
	Model.Alert.find({deviceId: req.params.deviceId},(err,alert)=>{
	 if (err) return handleError(res, err);	
		if (!alert) return res.status(404).json({AlertNotFound: "Alert Not found"});
		return res.status(200).send(alert);
	});

});


//Get all alerts by deviceId past a certain timestamp value
router.get('/:deviceId/:latestConnectionTimeStamp', (req, res) => {
	Model.Alert.find({ deviceId: req.params.deviceId },(err,alert)=>{
	 if (err) return handleError(res, err);	
		if (!alert) return res.status(404).json({AlertNotFound: "Alert Not found"});
		var array = [];
		for (var i = 0; i < alert.length; i++) {
    	var currentAlert = alert[i];
    	var timeOfAlertInt = parseInt(currentAlert.timeOfAlert);
        var latestConnectionTimeStampInt = parseInt(req.params.latestConnectionTimeStamp);
        if(timeOfAlertInt>=latestConnectionTimeStampInt){
        	array.push(currentAlert);
        }
		}
		
		return res.status(201).send(array);
	});

});



//Add an alert
router.post('/', (req, res) => {
  Model.Alert.create(req.body, function(err, alert) {
    if (err) return handleError(res, err);
    return res.status(201).send(convertAndFormatMongooseObjectToPlainObject(alert));
  });
});


function handleError(res, err) {
  return res.send(500, err);
};


module.exports = {
	router: router,
	init: init	
};