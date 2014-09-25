## EARLY STATE - GO AWAY :)

## Usage

```js
var nwc = require('node-webkit-config');
// provide the nw.gui globally
global.app = {
    gui: require('nw.gui')
};

// set individual path
nwc.setPath('myData/path', 'config.json', 'indiConf', {defaultVal: 'myVal'})
    .then(function() {
        console.log('success');
    });

// get object from individual path
nwc('indiConf')
    .then(function(config) {
        console.log(config);
    });

// set data
nwc({name: 'timo'})
    .then(function() {
        console.log('success');
    });
    
// get data
nwc()
    .then(function(config) {
        console.log(config.name);
    });
```
