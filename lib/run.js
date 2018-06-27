// Required SDK's
var sphero = require('sphero')
var aws = require('aws-iot-device-sdk')
const username = 'TheGodOfAwesome' // TODO: replace this

const spheroId = 'FA:34:A8:E7:D4:A7'
var orb = sphero(spheroId)
const piAddress = '/home/pi/Desktop/iot_robots-activity-pubsub_with_javascript/lib/'

var device = aws.device({
	keyPath: 'certificates/private.pem.key',
	certPath: 'certificates/certificate.pem.crt',
    caPath: 'certificates/ca.pem',
    clientId: `${username}-subscribe`,
	host: 'a2yujzh40clf9c.iot.us-east-2.amazonaws.com'
})

device.on('connect', function() {
    console.log('connect')
    device.subscribe("makers/ourSecretTopic")
  })

  orb.connect(() => {
    orb.color('red').delay(1000).then(() => {
      return orb.color('green')
    })
  })

//
let command = {}
let color = ''

device.on('message', function(topic, payload) {
    console.log('message',payload.toString())
    const msg = JSON.parse(payload.toString())
    if (topic == "makers/ourSecretTopic") {
      // do somethig with payload
      command = msg.command
      console.log(command);
      color = msg.color
      console.log("Hello");
      console.log(color);
      orb.color(color);
    }
    
    if(command.type == 'roll'){
      orb.roll(command.speed, command.direction).delay(command.duration).then(() => {
        return orb.roll(0,0)
      })
    } else if (command.type == 'random'){
      const degrees = (Math.random()*360)
      orb.roll(command.speed, degrees).delay(command.duration).then(() => {
        return orb.roll(0,0)
      })
    } else if (command.type == 'home') {
      // go home
		orb.roll(command.speed, command.direction).delay(command.duration).then(() => {
        return orb.roll(0,0)
		})
    }
  })

// sphero execute
