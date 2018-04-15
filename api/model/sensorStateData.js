import model from './model.js';

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