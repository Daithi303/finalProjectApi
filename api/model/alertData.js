import model from './model.js';

/*
The code for this API was based on an assignment required for our Web Services Development module. The labs on which the assignment was based can be found here:
https://wit-computing.github.io/web-services-2018/

The Web Services Development module assignment itself was originally based on a portion of my 4th year project's ideal data model. 
However the data model needed to be re-designed HERE due to time restraints.The original Web Services Development module assignment can be found here:
https://github.com/Daithi303/WebServDev2018Assignment1
*/

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