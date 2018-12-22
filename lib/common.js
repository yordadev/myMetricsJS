/**
 * This is the exports File for the Metrics System.
 * This will contain all of the exports Setting and Methods in the ENV for both of the Lib and the Metrics.
 */
const os = require('os');

/**
 * TODO: Load the Config and Store in an Export.
 * TODO: Reload the Config Every X Seconds.
 */

// This is the basic Layout for the Log Format, It is a standard for the Logs.
exports.errorLog = {
    pid:          0,

    service_name: "",
    hostname:     null,

    time:         0,
    file:         "",
    message:      "",

    other:        null
};

// Returns the OS Name, This takes the Platforms
//  and Makes a Plain Text Selection.
// This is mainly used for making the RFC Format of the UA.
exports.getPlatform = () => {
    switch (os.platform().toLowerCase()) {
        case 'darwin':
            return "Macintosh";
        case 'freebsd':
        case 'linux':
        case 'sunos':
            return "Linux";
        case 'win32':
            return "Windows NT";
        default:
            return "Unknown";
    }
}

exports.randomInt = max => Math.floor(Math.random() * Math.floor(max));

/**********************************************************
 * ****************  Inline Dependencies **************** *
 *   - RoundWholeNumber                                   *
 **********************************************************/

/**
 * Auto Rounds the Number by the Whole Number by the Ten Position
 */
exports.RoundWholeNumber = num => {
    num = num / 100;
    num = Math.round(num);
    num = num * 100;
    return num;
}


exports.bunnyMessage = "\n\n\
(\\___/) \n\
(='.'=)    Monitor your own systems with ease.\n\
(\")_(\")   \ @mymetricsjs \n\
----------------------------------\n\
        Package Contributors \n\
              @yordadev     \n\
    ";
exports.cowsayMessage = "\n\n\
  __________________________________\n\
  Monitor your own systems with ease. \n\
             @mymetricsjs          \n\
  ----------------------------------\n\
         \\   ^__^ \n\
          \\  (oo)\\_______\n\
             (__)\\       )\\/\\ \n\
                 ||----w | \n\
                 ||     || \n\
  ----------------------------------\n\
        Package Contributors \n\
              @yordadev     \n\
    ";

exports.kekMessage = "\n\n\
(\\___/) \n\
(='.'=)    Monitor your own systems with ease.\n\
(\")_(\")   \ @mymetricsjs \n\
----------------------------------\n\
        Package Contributors \n\
              @yordadev     \n\
    ";


/**********************************************************
 * *****************  System Additions  ***************** *
 *  Adds                                                  *
 *   - Object.prototype.forEach                           *
 *   - Object.prototype.merge                             *
 *   - Object.prototype.removeSelected                    *
 *   - console.log{COLOR FORMAT}                          *
 **********************************************************/

/**
 * Added to allow for Colored Console Text.
 * @method console.log[Color Scheme Below]
 */
const colors = {
    Reset: "\x1b[0m",
    Bright: "\x1b[1m",
    Dim: "\x1b[2m",
    Underscore: "\x1b[4m",
    Blink: "\x1b[5m",
    Reverse: "\x1b[7m",
    Hidden: "\x1b[8m",

    FgBlack: "\x1b[30m",
    FgRed: "\x1b[31m",
    FgGreen: "\x1b[32m",
    FgYellow: "\x1b[33m",
    FgBlue: "\x1b[34m",
    FgMagenta: "\x1b[35m",
    FgCyan: "\x1b[36m",
    FgWhite: "\x1b[37m",

    BgBlack: "\x1b[40m",
    BgRed: "\x1b[41m",
    BgGreen: "\x1b[42m",
    BgYellow: "\x1b[43m",
    BgBlue: "\x1b[44m",
    BgMagenta: "\x1b[45m",
    BgCyan: "\x1b[46m",
    BgWhite: "\x1b[47m",
};

for(const [colorKey, color] in Object.entries(colors)) {
    console['log' + colorKey] = (strg) => {
        if (typeof strg === 'object') strg = JSON.stringify(strg, null, 4);
        return process.stdout.write(color + strg + '\x1b[0m');
    }
}

/**
 * Adds some Capacity to run a foreach on an object
 * @param Callable Callback that will execute on every element
 * @param Mixded   Data to send to Every Call of the data
 */
Object.prototype.forEach = function(callback, extraData) {
    for(const [key, value] in Object.entries(this)) {
        callback(key, value, extraData);
    };
}

/**
 * Adds some merge Capibility to objects like arrayMerge in php but for Objects
 * This is the Same thing as Object.assign BUT it does not overrite the
 *  object you are calling it on
 *
 * @param Object Another Object to Add to the Current Object
 */
Object.prototype.merge = function(objectToMerge) {
    return Object.assign({}, this, objectToMerge);
}

/**
 * Adds some Capacity to run a foreach on an object
 * @param String Data to send to Every Call of the data
 */
Object.prototype.removeSelected = function(ObjectName) {
    delete this[ObjectName];
    return this;
}

exports.displayDebug = postData => {
    // display out the payload
    console.logBgBlue('  DEBUG ENABLED < ');
    console.log(' === Payload Information === ');

    // hostname
    console.logBgBlue('  DEBUG ENABLED < ');
    console.logFgGreen(' ✔');
    console.log(' Hostname: ' + postData.id);

    // CPU Count
    console.logBgBlue('  DEBUG ENABLED < ');
    console.logFgGreen(' ✔');
    console.log(' CPU Count: ' + postData.cpus.length);

    // Uptime
    console.logBgBlue('  DEBUG ENABLED < ');
    console.logFgGreen(' ✔');
    console.log(' Uptime: ' +  postData.server_uptime + ' seconds');

    // Uptime
    console.logBgBlue('  DEBUG ENABLED < ');
    console.logFgGreen(' ✔');
    console.log(' Memory: ' + ((postData.total_memory / 1073741824).toFixed(2) - (postData.free_memory / 1073741824).toFixed(2)).toFixed(2)  + ' GB used of ' + (postData.total_memory / 1073741824).toFixed(2) + ' GB');

    // Load Averages
    console.logBgBlue('  DEBUG ENABLED < ');
    console.logFgGreen(' ✔');
    console.log(' Load Averages( 1, 15, 60 Minutes ): ' +  postData.load_avg[0].toFixed(2) + ' ' + postData.load_avg[1].toFixed(2) + ' ' +postData.load_avg[2].toFixed(2));

    // Eth ipv4
    console.logBgBlue('  DEBUG ENABLED < ');
    console.logFgGreen(' ✔');
    console.log(' IPv4: ' +  postData.interfaces.ipv4);

    // Eth ipv6
    console.logBgBlue('  DEBUG ENABLED < ');
    console.logFgGreen(' ✔');
    console.log(' IPv6: ' +  postData.interfaces.ipv6);

    // display out the payload
    console.logBgBlue('  DEBUG ENABLED < ');
    console.log(' === Payload Information === ');
}