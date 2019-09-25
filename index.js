
module.exports = function (app) {
  var plugin = {};

  plugin.id = 'MAG3110';
  plugin.name = 'raspberry-pi-MAG3110-plugin';
  plugin.description = 'MAG3110 3 Axis Magnetrometer for the Raspberry Pi';

plugin.schema = {
    type: 'object',
    required: ['rate', 'key'],
    properties: {
      rate: {
        type: 'number',
        title: 'Sample rate in millaseconds',
	default: 2
      },
      key: {
        type: 'string',
        title: 'SignalK Path'
      }
    }
  };

  plugin.start = function (options, restartPlugin) {
    // Here we put our plugin logic
    app.debug('Plugin started');
  };

  plugin.stop = function () {
    // Here we put logic we need when the plugin stops
    app.debug('Plugin stopped');
  };

  plugin.schema = {
    // The plugin schema
  };

  return plugin;
};
