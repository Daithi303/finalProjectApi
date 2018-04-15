import express from 'express';
import Model from './../model/model.js';
import _ from 'lodash';
import jwt from 'jsonwebtoken';
import json2xml from 'json2xml';
const router = express.Router(); 
var server = null;

function init(serverIn) {
  server = serverIn;
};

//this function converts the plain object to an xml object
function getDeviceInXml(deviceObj){
			 var objId = {value: deviceObj._id.toString()};
			deviceObj._id = objId;
			var response = json2xml({device: deviceObj});
			return response;
}

function convertAndFormatMongooseObjectToPlainObject(alert){
	var alertObj = alert.toObject();
	return alertObj;
}

//Authenticate with token
/*router.use(
function(req, res, next) {
  var token = req.headers['x-access-token'];
  if (token) {
    jwt.verify(token, server.get('superSecret'), function(err, decoded) {      
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });    
      } else {
        req.decoded = decoded;    
        next();
      }
    });
  } else {
    return res.status(403).send({ 
        success: false, 
        message: 'No token provided.' 
    });
  }
}
);
*/

//Get all alerts by deviceId (json and xml)
router.get('/:deviceId', (req, res) => {
	console.log("Got to here");
	Model.Alert.find({deviceId: req.params.deviceId},(err,alert)=>{
	 if (err) return handleError(res, err);	
		if (!alert) return res.status(404).json({AlertNotFound: "Alert Not found"});
		return res.status(200).send(alert);
	});

});



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