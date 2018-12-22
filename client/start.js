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

let failed = null;
switch(config.debug.enabled) {
    case true:
        console.logBgBlue('  myMetricsJS < ');
        console.logFgYellow(' ⚠ ');
        console.log(' Debug mode is currently ON. To start a process you need to turn off debug mode..');

        console.logBgBlue('  myMetricsJS < ');
        console.logFgYellow(' ⚠ ');
        console.log(' Close window and try again.');

        break;

    case false: {
        console.logBgBlue('  myMetricsJS < ');
        console.logFgYellow(' ⚠ ');
        console.log(' Process has been started. Confirmation following:');

        console.logBgBlue('  myMetricsJS < ');
        console.logFgYellow(' ⚠ ');

        let d = null
        switch(config.services.enabled) {
            case 'screen': {
                async function runScreen() {
                    await exec(config.services.available.screen.run);
                }

                async function verifyRunning() {
                    const { stdout } = await exec('screen -ls');
                    d = stdout.toString().replace(/(\r\n\t|\n|\r\t)/gm, "");
                }

                runScreen(); verifyRunning();
            }; break;

            case 'pm2': {
                async function runPm2() {
                    await exec(config.services.available.pm2.run);
                }

                async function verifyRunning() {
                    const { stdout } = await exec('pm2 show mymetricsjs');
                    d = stdout.toString().replace(/(\r\n\t|\n|\r\t)/gm, "");
                }

                runPm2(); verifyRunning();
            }; break;

            default: failed = console.log('myMetricsJS: Fix your config.json');
        }

        if(failed === null) {
            if (d.length > 64) {
                d = d.substring(0, 64);
                d += "...";
            }
            console.log('', d);

            console.logBgBlue('  myMetricsJS < ');
            console.logFgYellow(' ⚠ ');
            console.log(' Your monitor is running in background and this window is now closing.');
        }
    }; break;

    default: break;
}
