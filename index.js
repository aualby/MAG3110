/*
 * Copyright Mark B <mark.w.ballard@gmail.com>
 *
 *
*/

const i2c = require('i2c-bus');
 
const MAG3110 = 0x0E;
const DR_STATUS = 0x00;
const WHO_AM_I = 0x07;
const SYSMOD = 0x08;
const DIE_TEMP = 0x0F;

module.exports = function (app) {
  let timer = null;
  let plugin = {}

  plugin.id = ´raspberry-pi-i2c-MAG3110´
  plugin.name = ´Raspberry-Pi-I2C-MAG3110´
  plugin.description = ´MAG3110 3 Axis Magnetrometer I2C plugin´

  plugin.schema = {
    type: ´object´,
    properties: {
      rate: {
        title: ´Sample rate in ms.´
        type: ´number´,
	default: 2
      },
      key: {
	type: ´string´,
	title: ´SignalK Reference Key´,
	description: ´SignalK Path eg. navigation.headingMagnetic´,
	default: ´navigation.headingMagnetic´	
      }
    }
  }
}

const i2c1 = i2c.openSync(1);
const dr_status = i2c1.readWordSync(MAG3110, DR_STATUS);
const who_am_i = i2c1.readWordSync(MAG3110, WHO_AM_I);
const sysmod = i2c1.readWordSync(MAG3110, SYSMOD);
const die_temp = i2c1.readWordSync(MAG3110, DIE_TEMP);
console.log(dr_status);
i2c1.closeSync();

