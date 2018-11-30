const os     = require("os");
const common = require('./lib/common.js');
const https  = require('https');

var config = {};
var logBuffer = []; // The Log Buffer is what is stored to be sent in the Next Request.
const requestInterval = 30 * 1000; /* How often to send the Data to the Server */
const AgentVersion = "1.01";
var runningLoop; // Used to Store the Interval, Cleared Latter.


function initConfig(loadProcess = false) {
    var fs = require("fs");
    var content = fs.readFileSync("./lib/config.json");
    config = JSON.parse(content);

    if(!config.setup.notifyAddress || !config.setup.notifyPort || !config.setup.notifyPort){
        if (config.debug) {
            console.logBgBlue('  DEBUG ENABLED < ');
            console.logFgYellow(' ⚠ ');
            console.log(" Setup your config.json file.");
        }
        process.exit();
    }
    if (loadProcess === true) {
        if (config.debug) {
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
            
            console.logBgRed('  DEBUG ENABLED < ');
            console.log(" ")

            console.logBgBlue('  DEBUG ENABLED < ');
            console.logFgYellow(' ⚠ ');
            console.log(" Starting mymetrics.js");
        }
        initProcess();
    } else {
        if (config.debug) {
            console.logBgRed('  DEBUG ENABLED < ');
            console.log(" ")

            console.logBgBlue('  DEBUG ENABLED < ');
            console.logFgYellow(' ⚠ ');
            console.log(" Stopping myMonitor.js");
        }
        process.exit();
    }
}


/**
 * Starts up the Processing
 * This is called at the end of the file.
 */
function initProcess() {

    // Init the Rotine
    if (config.debug) {
        console.logBgBlue('  DEBUG ENABLED < ');
        console.logFgYellow(' ⚠ ');
        console.log(" Processing out a new request");
    }
    sendRequest();

    runningLoop = setInterval(function() {
        if (config.debug) {
            console.logBgRed('  DEBUG ENABLED < ');
            console.log(" ")
            
            console.logBgBlue('  DEBUG ENABLED < ');
            console.logFgYellow(' ⚠ ');
            console.log(" Processing out a new request");
        }
        sendRequest();

    }, requestInterval);

}

/**
 * Prepare the payload to Send to the server
 */
const basePayload = {
    "authorization": {
        'token': "" /* for custom authorization on server side */
    },
    "id": "",
    /* Hostname */
    "cpus": 0,
    /* Comes in a List of Each Core and the Data */
    "server_uptime": 0,
    "total_memory": 0,
    "free_memory": 0,
    "free_memory_round": 0,
    /* The Free_Memory rounded to the nearest Ten */
    "load_avg": [],
    /* Comes in a List of 3 Elements, 1 Min, 15 Min, 30 Min */
    "interfaces": {
        "ipv4": [],
        "ipv6": []
    },
    "errorLog": []
}

/**
 *  Build the payload to send to server.
 */
function buildPayload() {
    if (config.debug) {
        console.logBgBlue('  DEBUG ENABLED < ');
        console.logFgYellow(' ⚠ ');
        console.log(" Building Payload");
    }

    var output = basePayload;

    if (config.security.type === 'custom') {
        if (config.debug) {
            console.logBgBlue('  DEBUG ENABLED < ');
            console.logFgYellow(' ⚠ ');
            console.log(" Adding Authorization to request");
        }
        output.authorization.token = config.security.service.custom.token;
    }

    output.id = os.hostname();
    output.cpus = os.cpus();
    output.server_uptime = os.uptime();
    output.total_memory = os.totalmem();
    output.free_memory = os.freemem();
    output.load_avg = os.loadavg();
    output.free_memory_round = common.RoundWholeNumber(output.free_memory);

    output.errorLog = logBuffer;
    logBuffer = []; // Empty the Log Buffer

    var eth = os.networkInterfaces(); // Get the Network Interfaces

    eth.forEach(function(interface) {
        var group = eth[interface]; // Get the Specific Interface

        group.forEach(function(interface) {
            // Loop through the Interface Addresses
            if (interface.family === "IPv4") {
                if (interface.address === "127.0.0.1") {
                    return;
                } else if (output.interfaces.ipv4.includes(interface.address)) {
                    return;
                }
                output.interfaces.ipv4.push(interface.address)
            } else if (interface.family === "IPv6") {
                if (interface.address === "::1") {
                    return;
                } else if (output.interfaces.ipv6.includes(interface.address)) {
                    return;
                }
                output.interfaces.ipv6.push(interface.address);
            } else {
                console.log("Unknown IP Type: " + interface.family);
            }

        });
    });

    return output;
}


/**
 * Send request to the server listed in the Config File.
 */
function sendRequest() {

    var postData = buildPayload();

    if(config.debug){
        common.displayDebug(postData);
    }

    switch (config.security.type) {
        case 'jwt':
            if (config.debug) {
                console.logBgBlue('  DEBUG ENABLED < ');
                console.logFgYellow(' ⚠ ');
                console.log(" JWT Server side Authorization Enabled");
                console.logBgBlue('  DEBUG ENABLED < ');
                console.logFgYellow(' ⚠ ');
                console.log(" Adding Authorization to header");
            }

            var options = {
                hostname: config.setup.notifyAddress,
                port: config.setup.notifyPort,
                path: config.setup.notifyPath,
                method: 'POST',
                headers: {
                    'Connection': 'close',
                    'Content-Type': 'application/json',
                    'Accept': "application/json",
                    'Authorization': 'Bearer ' + config.security.service.jwt.token,
                    'User-Agent': `MetricsAgent/${AgentVersion} (${common.getPlatform()})`
                }
            };
            break;

        case 'custom':
            if (config.debug) {
                console.logBgBlue('  DEBUG ENABLED < ');
                console.logFgYellow(' ⚠ ');
                console.log(" Custom Server side Authorization Enabled");
            }
            var options = {
                hostname: config.setup.notifyAddress,
                port: config.setup.notifyPort,
                path: config.setup.notifyPath,
                method: 'POST',
                headers: {
                    'Connection': 'close',
                    'Content-Type': 'application/json',
                    'Accept': "application/json",
                    'User-Agent': `MetricsAgent/${AgentVersion} (${common.getPlatform()})`
                }
            };
            break;
    }


    var req = https.request(options, (res) => {
        console.logBgMagenta('  STATUS CODE   < ');
        if (res.statusCode == 200) {
            console.logFgGreen(' ✔');
        } else if (res.statusCode == 403) {
            console.logFgRed(' ✖');
        } else {
            console.logFgYellow(' ⚠');
        }
        console.log(" " + res.statusCode);

        // Log the Headers from the request but hide the useless headers
        console.logBgGreen('      HEADERS   < ');
        console.log(" " + JSON.stringify(res.headers.removeSelected("server").removeSelected("cache-control").removeSelected("content-type").removeSelected("connection").removeSelected("transfer-encoding").removeSelected("date").removeSelected("vary")));

        res.on('data', (d) => {
            console.logBgGreen('         DATA   < ');
            // Remove Newlines, Tabs and Returns + Trim to a Specific Length of 32 len long
            d = d.toString().replace(/(\r\n\t|\n|\r\t)/gm, "");
            if (d.length > 64) {
                d = d.substring(0, 64);
                d += "...";
            }
            console.log(" " + d);
        });
    });

    req.on('error', (e) => {
        console.error(e);
    });

    console.logBgMagenta('  PAYLOAD       < ');
    console.logFgGreen(' ✔ ');
    console.log(" Payload Posted to " + config.setup.notifyAddress  + config.setup.notifyPath);

    req.write(JSON.stringify(postData));
    req.end();
}


initConfig(true); // Start Loading Process