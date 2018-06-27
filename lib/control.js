const awsIot = require('aws-iot-device-sdk');
const username = 'mi3n' // TODO: replace this

var device = awsIot.device({
	keyPath: 'certificates/private.pem.key',
	certPath: 'certificates/certificate.pem.crt',
    caPath: 'certificates/ca.pem',
    clientId: `${username}-subscribe`,
	host: 'a2yujzh40clf9c.iot.us-east-2.amazonaws.com'
})

device.on('connect', function() {
  })

const topic = "makers/ourSecretTopic";

device.on('connect', () => {
  console.log('Publisher client connected to AWS IoT cloud.');
  device.subscribe(topic);

  device.publish(`${topic}`, JSON.stringify({
    "color": {"red": 255, "green": 20, "blue": 147},
	"command": {
		"type": "home",
		"speed": 100,
		"direction": 220,
		"duration": 1400
	}
  }));

  console.log(`Published to ${topic}.\n`)

  setTimeout(() => { process.exit(0) }, 3000);
});
