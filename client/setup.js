const config = require('../lib/config.json');
const util   = require('util');
const common = require('../lib/common.js');
const exec   = util.promisify(require('child_process').exec);

var int = common.randomInt(2);
switch(int){
    case 0:
    console.log(common.cowsayMessage)
        break;

    case 1:
    console.log(common.bunnyMessage)
        break;

    case 2:
    console.log(common.kekmessage)
        break;
}


console.logBgBlue('  myMetricsJS Setup < ');
console.logFgYellow(' ⚠ ');
console.log(" Checking your config.json.");


// install service
console.logBgBlue('  myMetricsJS Setup < ');
console.logFgYellow(' ⚠ ');
console.log(" Installing service " + config.services.enabled);
switch(config.services.enabled){
    case 'screen':
        async function setupScreen() {
            const { stdout } = await exec(config.services.available.screen.install);
            console.logBgBlue('  myMetricsJS Setup < ');
            console.logFgYellow(' ⚠ ');
            d = stdout.toString().replace(/(\r\n\t|\n|\r\t)/gm, "");
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
        setupScreen();
        break;
    case 'pm2':
        async function setupPm2() {
            const { stdout } = await exec(config.services.available.pm2.install);
            console.logBgBlue('  myMetricsJS Setup < ');
            console.logFgYellow(' ⚠ ');
            d = stdout.toString().replace(/(\r\n\t|\n|\r\t)/gm, "");
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
        setupPm2();
        break;
    default:
        console.log('myMetricsJS: Fix your config.json');
        break;
}

