import mongoose from 'mongoose';
import randToken from 'rand-token';
import crypto from 'crypto';
const Schema = mongoose.Schema;
import moment from 'moment';
import arrayUniquePlugin from 'mongoose-unique-array';

/*
The code for this API was based on an assignment required for our Web Services Development module. The labs on which the assignment was based can be found here:
https://wit-computing.github.io/web-services-2018/

The Web Services Development module assignment itself was originally based on a portion of my 4th year project's ideal data model. 
However the data model needed to be re-designed HERE due to time restraints.The original Web Services Development module assignment can be found here:
https://github.com/Daithi303/WebServDev2018Assignment1
*/

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