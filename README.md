# MyMetricsJS

Extremely light weight server monitoring system to monitor your servers or computers remotely through https request. <br>
Completely free and <b>open source</b>.<br>


### Why use this monitor?
`Zero Dependency` light weight monitoring system that'll send your system information to any API you want, easy peasy.


### Authenication on server side?
If you have JWT Authenication on your API already: 
- Set `security.type` to `jwt`
- Set `security.service.jwt.token` to a JWT token.

If you do not have JWT Authenication on your API:
- set `security.type` to `custom`
- set `security.service.custom.token` to `anything you want`
- on your API Endpoint, you will retrieve the token entered above to verify authenication in payload request

### Screenshots
<p align="center"><img src='https://cdn.discordapp.com/attachments/425148050697093131/518191129972179020/mymetricsjs101.png'/></p>


### Requirements
- Latest Version of Node


### Configuration
- Rename `./lib/configexample.json` to `./lib/config.json`
- fill er out.
- save
```json
{
    "setup": {
        "notifyAddress": "ip/subdomain.domain.com/domain.com",
        "notifyPort": "443 or 80",
        "notifyPath": "/api/monitor"
    },
    "debug": {
        "enabled": true
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
    }
}
```

### Debug notice
Do not set `config.debug.enable` to `true`,<br>
if it is just running in the foreground. Wastes resources printing out console logs.


### Installing & Running on Ubuntu
```sh
git clone https://github.com/yordadev/myMetricsJS.git
chmod+x ./setup.sh
./setup
cd client
./start
```

### Basic Usage 
```node mymetrics.js```


### Fancy Useage 

Client side useage lives in `./client/` and you need to give `chmod+x` permissions to use.
```
start - "./start" to run -- puts monitor into foreground process forever.

stop - "./stop" to run -- Stops the monitor in the foreground process..

debug - "./debug" to run -- Start monitoring in current terminal..
```
### Contribute

