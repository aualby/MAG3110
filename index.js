const i2c = require('i2c-bus');


module.exports = function (app) {
  let plugin = {};
  let timer = null;
  const MAG3110 = 0x0E;
  const DR_STATUS = 0x00;
  const WHO_AM_I = 0x07;
  const SYSMOD = 0x08;
  const DIE_TEMP = 0x0F;

  plugin.id = 'MAG3110';
  plugin.name = 'Raspberry-Pi-MAG3110';
  plugin.description = 'MAG3110 3 Axis Magnetrometer for the Raspberry Pi';

  plugin.schema = {
    type: 'object',
    required: ['rate', 'key'],
    properties: {
      rate: {
        type: 'number',
        title: 'Sample rate in millaseconds',
	default: 2000
      },
      key: {
        type: 'string',
        title: 'SignalK Path',
        default: "navigation.headingMagnetic"
      }
    }
  };

  plugin.start = function (options, restartPlugin) {
    // Here we put our plugin logic

    /*  findHeadingMag()
       timer = setInterval(setHeading(), options.rate)
    */
    var x = 5;
    var y = 10;
    var z = 15;

  };

  plugin.stop = function () {
    // Here we put logic we need when the plugin stops
    if (timer) {
      clearInterval(timer);
      timer = null;
    }

    app.debug('Plugin stopped');
  };

  function setHeading() {
        // create message
        var delta = newDeltaMessage(x,y,z);
        // send temperature
        app.handleMessage(plugin.id, delta);
  }

  function newDeltaMessage (x, y, z) {
    return {
      'context': 'vessels.' + app.selfId,
      'updates': [
        {
          'source': {
            'label': plugin.id
          },
          'timestamp': (new Date()).toISOString(),
          'values': [
            {
              'path': device.key,
              'value': {
		'roll': x,
		'pitch': y,
		'yaw': z
		}
            }
          ]
        }
      ]
    }
  }




  return plugin;
};
