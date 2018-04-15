import mongoose from 'mongoose';
import randToken from 'rand-token';
import crypto from 'crypto';
const Schema = mongoose.Schema;
import moment from 'moment';
import arrayUniquePlugin from 'mongoose-unique-array';


const AlertSchema = new Schema({
	deviceId: {
		type: String,
		default: ""
	},
	alertType: {
		type: String,
		defaurslt: ""
	},
	contactType: {
		type: String,
		default: ""
	},
	secondaryContactName: {
		type: String,
		default: ""
	},
	secondaryContactNumber: {
		type: String,
		default:""
	},
  timeOfAlert: { 
  type: String,
  default: ""
  }
});

var Alert =  mongoose.model('Alert', AlertSchema);
/*
var deviceExists = function(value,respond) {
	//console.log("Current value in deviceExists: "+ value);
Device.findOne({_id: value}, function(err, device) {
    if(err) throw err;
    if(device) {
		console.log("Device Found");
		return respond(true);}
	else{
    console.log("Device NOT Found");
    return respond(false);
	}
  });
};

  var deviceIsNotYetRegistered = function(value, respond) {
 User.find({registeredDevices: {_id: value} } , function(err, registeredDevice) {	
    if(err) {console.log("Error was thrown");throw err;};
    if(registeredDevice != null) {
		console.log("Device already registered: " + registeredDevice);
		return respond(false);
    }
	else{
	console.log("Device NOT registered: "+ registeredDevice);
    return respond(true);}
	
  }

);
};



//{ validator: deviceIsNotYetRegistered, msg: 'Device is already registered' }
//{ validator: deviceExists, msg: 'Device does not exist.' }
var manyValidators = [
    {
  isAsync: true,
  validator: deviceIsNotYetRegistered, msg: 'Device is already registered' }
];
*/

const SensorStateSchema = new Schema({
  deviceId: {
        type: String,
        default: ""
      },
  carSeatStatusValue: {
        type: String,
        default: ""
      },
  vehicleSpeedValue: {
        type: String,
        default: ""
      },
  rssiStatusValue: {
        type: String,
        default: ""
      },
  geoLat:{
        type: String,
        default: ""
      },
  geoLong: {
        type: String,
        default: ""
      },
      connectionState: {
        type: String,
        default: ""
      },
      connectionStateTimeStamp: {
        type: String,
        default: ""
      }
});

var SensorState = mongoose.model('SensorState', SensorStateSchema);

module.exports = {
	Alert: Alert,
	SensorState: SensorState
};