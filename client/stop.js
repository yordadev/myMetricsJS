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


switch(config.services.enabled){
    case 'screen':
        async function stopScreen() {
            await exec(config.services.available.screen.stop);
            console.logBgBlue('  myMetricsJS < ');
            console.logFgYellow(' ⚠ ');
            console.log(' Process has been stopped.');
           
            console.logBgBlue('  myMetricsJS < ');
            console.logFgYellow(' ⚠ ');
            console.log(' This window is now closing.');
            
        }
        stopScreen();
        break;
    case 'pm2':
    async function stopPm2() {
        await exec(config.services.available.pm2.stop);
        console.logBgBlue('  myMetricsJS < ');
        console.logFgYellow(' ⚠ ');
        console.log(' Process has been stopped. ');

        console.logBgBlue('  myMetricsJS < ');
        console.logFgYellow(' ⚠ ');
        console.log(' This window is now closing.');
        
    }
    stopPm2();
    
    break;
    default:
        console.logBgBlue('  myMetricsJS < ');
        console.logFgYellow(' ⚠ ');
        console.log(' Fix your config.json');
        break;
}
       