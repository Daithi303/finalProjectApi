import model from './model.js';

/*
The code for this API was based on an assignment required for our Web Services Development module. The labs on which the assignment was based can be found here:
https://wit-computing.github.io/web-services-2018/

The Web Services Development module assignment itself was originally based on a portion of my 4th year project's ideal data model. 
However the data model needed to be re-designed HERE due to time restraints.The original Web Services Development module assignment can be found here:
https://github.com/Daithi303/WebServDev2018Assignment1
*/

const sensorStates = [
    {
  "deviceId": "0001",
  "carSeatStatusValue": "Unoccupied",
  "vehicleSpeedValue": "0",
  "rssiStatusValue": "In Proximity",
  "geoLat": "0.0000000",
  "geoLong": "0.0000000",
  "connectionState": "Disconnected",
  "connectionStateTimeStamp": ""
}
];

export const loadSensorStates = () => {
  model.SensorState.find({}).remove(() => {
    model.SensorState.collection.insert(sensorStates, (err, docs)=>{
    if (err) {
      console.log(`failed to Load sensor state data: ${err}`);
    } else {
      console.info(`${sensorStates.length} sensor states were successfully stored.`);
    }
  });
});
};