# MyMetricsJS

Extremely light weight server monitoring system to monitor your servers or computers remotely through https request. <br>
myMetricsJS builds a payload every 30 seconds and sends it out to your API to be processed.
<br>
<br>
Completely free and <b>open source</b>.<br>


### Why use this monitor?
`Zero Dependency` light weight monitoring system that'll send your system information to any API you want, easy peasy with an extremely easy setup.


### Is this secure?
Yes, myMetricsJS has prebuilt in authentication ready to go for you.

<b>If you have JWT Authenication on your API already: </b>
- Set `security.type` to `jwt`
- Set `security.service.jwt.token` to a JWT token.

<b>If you do not have JWT Authenication on your API:</b>
- set `security.type` to `custom`
- set `security.service.custom.token` to `anything you want`
- on your API Endpoint, you will retrieve the token entered above to verify that this is coming from indeed your server.

### Screenshots
<p align="center"><img src='https://cdn.discordapp.com/attachments/425148050697093131/518523752833875968/mymetricsscreenshot1.png'/></p>

<p align="center"><img src='https://cdn.discordapp.com/attachments/425148050697093131/518191129972179020/mymetricsjs101.png'/></p>


### Requirements
- Latest Version of Node


### Configuration
- Rename `./lib/configexample.json` to `./lib/config.json`
- fill er out.
```json
{
    "setup": {
        "notifyAddress": "ip/subdomain.domain.com/domain.com",
        "notifyPort": "443 or 80",
        "notifyPath": "/api/monitor"
    },
    "security": {
        "type": "custom",
        "service": {
            "jwt": {
                "token": "enter your jwt token"
            },
            "custom": {
                "token": "mymetricsjs"
            }
        }
    },
    "services": {
        "enabled": "screen",
        "available": {
            "screen": {
                "run": "screen -S mymetricsjs -dm node ./mymetrics.js",
                "stop": "screen -S mymetricsjs -p 0 -X quit",
                "install": "sudo apt-get install screen"
            },
            "pm2": {
                "run": "pm2 start mymetrics.js",
                "stop": "pm2 stop mymetrics.js",
                "install": "npm install pm2@latest -g"
            }
        }
    },
    "debug": {
        "enabled": true
    }
}
```

### What are services in the config.json?
Services here are what keeps your monitor running deteached in the background. Plan on adding cronjobs to this but for now this will do.


### Debug notice
You cannot start the monitor in the background in debug mode.<br>
To use debug mode enabled type the following with debug enabled. This does not run the monitor in the backround.
```node mymetricsjs```


### Installing & Running on Ubuntu
```sh
git clone https://github.com/yordadev/myMetricsJS.git
cd client
node setup
```

### Usage 
Usage of this package lives in `./client/` and its easy peasy.
```node start && node stop```
### Expected Payload to Server
```
    "authorization": {
        'token': "" 
    },
    "id": "",
    "cpus": 0,
    "server_uptime": 0,
    "total_memory": 0,
    "free_memory": 0,
    "free_memory_round": 0,
    "load_avg": [],
    /* Comes in a List of 3 Elements, 1 Min, 15 Min, 30 Min */
    "interfaces": {
        "ipv4": [],
        "ipv6": []
    },
    "errorLog": []
}
```
### How to contribute
Contribute a PR/Issue or buy me a covfefe.
