const config = require('../lib/config.json'),
      util   = require('util'),
      common = require('../lib/common.js'),
      exec   = util.promisify(require('child_process').exec);

const int = common.randomInt(2);
switch(int) {
    case 0: console.log(common.cowsayMessage); break;
    case 1: console.log(common.bunnyMessage); break;
    case 2: console.log(common.kekmessage); break;
}

console.logBgBlue('  myMetricsJS Setup < ');
console.logFgYellow(' ⚠ ');
console.log(" Checking your config.json.");

// install service
console.logBgBlue('  myMetricsJS Setup < ');
console.logFgYellow(' ⚠ ');
console.log(" Installing service " + config.services.enabled);

console.logBgBlue('  myMetricsJS Setup < ');
console.logFgYellow(' ⚠ ');

let d = null,
    f = null;
switch(config.services.enabled) {
    case 'screen': {
        async function setup() {
            const { stdout } = await exec(config.services.available.screen.install);
            d = stdout.toString().replace(/(\r\n\t|\n|\r\t)/gm, "");
        }

        setup();
    }; break;

    case 'pm2': {
        async function setup() {
            const { stdout } = await exec(config.services.available.pm2.install);
            d = stdout.toString().replace(/(\r\n\t|\n|\r\t)/gm, "");
        }

        setup();
    }; break;

    default: failed = console.log('myMetricsJS: Fix your config.json');
}

if(failed === null) {
    if (d.length > 64) {
        d = d.substring(0, 64);
        d += "...";
    }
    console.log('', d);

    console.logBgBlue('  myMetricsJS Setup < ');
    console.logFgYellow(' ⚠ ');
    console.log(" Installation Complete!");

    console.logBgBlue('  myMetricsJS Setup < ');
    console.logFgYellow(' ⚠ ');
    console.log(" Type > \"Node start\" to start monitoring. Closing this window now. Bye.");
}
