## EARLY STATE - GO AWAY :)

This module is a thin wrapper around node's filesystem. You can persist data in the users dataPath.
You need to make the nw.gui globally accessable via:

```js
global.app = {
    gui: require(nw.gui)
};
```

Make sure that this is set before you make your first call!

#### dataPath

See [node-webkit-wiki](https://github.com/rogerwang/node-webkit/wiki/App#datapath) for further information

## Usage

```js
var nwc = require('node-webkit-config');
// provide the nw.gui globally
global.app = {
    gui: require('nw.gui')
};

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

#### not done yet

```js
// set individual path
var indiConf = {
        path: 'myData/path',
        file: 'config.json',
        name: 'indiConf'
    };
nwc.setPath(indiConf, {defaultVal: 'myVal'})
    .then(function() {
        console.log('success');
    });

// get object from individual path
nwc('indiConf')
    .then(function(config) {
        console.log(config);
    });
```
