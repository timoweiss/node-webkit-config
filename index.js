'use strict';

var _nwGui = null;
var fs = require('fs');
var path = require('path');

var _configDirName = null;
var fullConfigPath = null;
var confFilePath = null;
var confString = null;

var _configMock = '{"profile":{"firstname":"Timo","surname":"Weiß","email":"info@timo-weiss.com","timezone":"","image":""},"preferences":{"askBeforeDelete":true,"undoredo":true},"notifications":{"otherUserOnline":true,"otherUserOffline":true,"updateAvailable":true,"changes":true},"hiddenPreferences":{"windowWith":1000,"windowHeight":700,"windowPosition":{"top":300,"left":300}}}';
_configMock = JSON.parse(_configMock);

var config = module.exports = function(nwGui) {
    if (!nwGui) {
        throw new Error('need nwGui instance');
    }
    _nwGui = nwGui;
    fullConfigPath = _getAppDataPath();
    return init;
};

config._getAppDataPath = function() {
    if (!_nwGui) {
        throw new Error('not inside a node-webkit env');
    }
    return _nwGui.App.dataPath;
};

config.createConfigDir = function(configDirName) {
    if (!_nwGui) {
        throw new Error('nw.gui not initialized');
    }
    confFilePath = _setConfigDirPath(configDirName);
    return confFilePath;
};

config._setConfigDirPath = function(configDirName) {
    _configDirName = configDirName || 'config';
    fullConfigPath = path.resolve(_getAppDataPath(), _configDirName);
    if (!fs.existsSync(fullConfigPath)) {
        fs.mkdirSync(fullConfigPath);
    }
    return fullConfigPath;
};

config.getConfig = function(configPath, callback) {
    if (!confFilePath) {
        createConfigDir();
    }
    // if (!configPath) {
    //     throw new TypeError('configPath not set');
    // }
    configPath = configPath || createConfigDir();
    if (configPath.indexOf('.json') === -1) {
        configPath = path.resolve(configPath, 'config.json');
    }

    if (!fs.existsSync(configPath)) {
        confString = JSON.stringify(_configMock);
        fs.writeFile(configPath, confString, function(err) {
            if (err) {
                console.log(err);
                callback(err);
            } else {
                console.log("The file was saved!");
                callback(null, confString);
            }
        });
    } else {
        fs.readFile(configPath, 'utf-8', callback);
    }
};


config.saveConfig = function(config, callback) {
    var _config = null;
    if (!config) {
        callback('illegal params - saveConfig()');
    }
    if (!fullConfigPath) {
        getConfig(_setConfigDirPath());
    }
    if (typeof config !== 'string') {
        try {
            _config = JSON.stringify(config);
        } catch (e) {
            callback(e);
            return;
        }
    } else {
        _config = config;
    }
    fs.writeFile(fullConfigPath + '/config.json', _config, function(err) {
        callback(err);
    });
};
