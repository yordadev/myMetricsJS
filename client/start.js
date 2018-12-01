const config = require('../lib/config.json');
const common = require('../lib/common.js');
const util   = require('util');
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

switch(config.debug.enabled){
    case true:
        console.logBgBlue('  myMetricsJS < ');
        console.logFgYellow(' ⚠ ');
        console.log(' Debug mode is currently ON. To start a process you need to turn off debug mode..');
        console.logBgBlue('  myMetricsJS < ');
        console.logFgYellow(' ⚠ ');
        console.log(' Close window and try again.');
        break;
    case false:
        switch(config.services.enabled){
            case 'screen':
                async function runScreen() {
                    await exec(config.services.available.screen.run);
                    console.logBgBlue('  myMetricsJS < ');
                    console.logFgYellow(' ⚠ ');
                    console.log(' Process has been started. Confirmation following:');
                }
                async function verifyRunning() {
                    const { stdout } = await exec('screen -ls');
                    console.logBgBlue('  myMetricsJS < ');
                    console.logFgYellow(' ⚠ ');
                    d = stdout.toString().replace(/(\r\n\t|\n|\r\t)/gm, "");
                    if (d.length > 64) {
                        d = d.substring(0, 64);
                        d += "...";
                    }
                    console.log('', d);

                    console.logBgBlue('  myMetricsJS < ');
                    console.logFgYellow(' ⚠ ');
                    console.log(' Your monitor is running in background and this window is now closing.');
                    
                }
                runScreen();
                verifyRunning();
                break;
            case 'pm2':
            async function runPm2() {
                await exec(config.services.available.pm2.run);
                console.logBgBlue('  myMetricsJS < ');
                console.logFgYellow(' ⚠ ');
                console.log(' Process has been started. Confirmation following:');

                verifyPm2Running();
            }
            async function verifyPm2Running() {
                const { stdout } = await exec('pm2 show mymetricsjs');
                console.logBgBlue('  myMetricsJS < ');
                console.logFgYellow(' ⚠ ');
                d = stdout.toString().replace(/(\r\n\t|\n|\r\t)/gm, "");
                if (d.length > 64) {
                    d = d.substring(0, 64);
                    d += "...";
                }
                console.log('', d);

                console.logBgBlue('  myMetricsJS < ');
                console.logFgYellow(' ⚠ ');
                console.log(' Your monitor is running in background and this window is now closing.');
                
            }
            runPm2();
            
            break;
            default:
                console.log('myMetricsJS: Fix your config.json');
                break;
        }
        break;

    default:
    
        break;
}