'use strict';

var _nwGui = null;
var fs = require('fs');
var path = require('path');
var q = require('q');

var staticData = require('./lib/static.js');

var _configDirName = null;
var fullConfigPath = null;
var confFilePath = null;
var confString = null;

var defaultConfigPath = '/config.json';

var _configMock = staticData.configMock;

var config = module.exports = function(file, content) {
    if (!app || !app.gui) {
        throw new Error('need nwGui instance');
    }
    _nwGui = app.gui;
    fullConfigPath = config._getAppDataPath();

    if (arguments.length === 2) {
        if (arguments[1] === typeof 'string') {
            console.log('arg 1 is', file)
            return config.get(file);
        } else if (arguments[1] === typeof 'object') {
            return config.set(defaultConfigPath, arguments[1]);
        }
    } else if (arguments.length >= 3) {
        return config.set(file, content);
    }
};

config.get = function(file) {
    return {
        then: function(fn) {
            fn(arguments);
        }
    };
};

config.set = function(file, content) {
    var _path = path.resolve(fullConfigPath, file);

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
