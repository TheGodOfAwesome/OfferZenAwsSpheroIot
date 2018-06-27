const awsIot = require('aws-iot-device-sdk');
const moment = require('moment'); // for DateTime formatting
const username = 'TheGodOfAwesome' // TODO: replace this

const device = awsIot.device({
	keyPath: 'certificates/private.pem.key',
	certPath: 'certificates/certificate.pem.crt',
    caPath: 'certificates/ca.pem',
    clientId: `${username}-subscribe`,
      host: 'a2yujzh40clf9c.iot.us-east-2.amazonaws.com'
});

device.on('connect', () => {
  console.log('Subscriber client connected to AWS IoT cloud.\n');

	device.subscribe('makers/ourSecretTopic');

  console.log();
});



device.on('message', (topic, payload) => {
	let message = JSON.parse(payload.toString());
	console.log(message);
});

