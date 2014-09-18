## EARLY STATE - GO AWAY :)

## Usage

```js
var nwc = require('node-webkit-config');
var nwGui = require('nw.gui');

var config = nwc(nwGui, 'myConfig.json', {name: 'timo'})
    .then(function() {
        console.log(arguments);
    });

nwc(nwGui, 'myConfig.json')
    .then(function(config) {
        console.log(config.name);
    });
```
