import model from './model.js';

const alerts = [
    {
	"deviceId": "0001",
	"alertType": "Child Out Of Seat (In Transit) Alert",
	"contactType": "Primary",
	"timeOfAlert": "1523717721931"
},
    {
	"deviceId": "0001",
	"alertType": "Child Out Of Seat (In Transit) Alert",
	"contactType": "Secondary",
	"timeOfAlert": "1523717751960",
	"secondaryContact": "John Smith",
	"secondaryNumber": "086 1234567"
},
    {
	"deviceId": "0001",
	"alertType": "Child Still In Seat Alert",
	"contactType": "Primary",
	"timeOfAlert": "1523717754925"
},
    {
	"deviceId": "0001",
	"alertType": "Child Still In Seat Alert",
	"contactType": "Secondary",
	"timeOfAlert": "1523717826926",
	"secondaryContact": "John Smith",
	"secondaryNumber": "086 1234567"
}

];

export const loadAlerts = () => {
  model.Alert.find({}).remove(() => {
  	/*
    model.Alert.collection.insert(alerts, (err, docs)=>{
    if (err) {
      console.log(`failed to load alert data: ${err}`);
    } else {
      console.info(`${alerts.length} alerts were successfully stored.`);
    }
     
  }
 
  );
   */
});
};