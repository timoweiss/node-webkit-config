'use strict';

var _nwGui = null;
var fs = require('fs');
var path = require('path');
var Q = require('q');

var staticData = require('./lib/static.js');

var fullConfigPath = null;
var indiConfigs = {};

var defaultConfigFile = 'config.json';

var _configMock = staticData.configMock;

var config = module.exports = function() {
    if (!app || !app.gui) {
        throw new Error('global app.gui is not set');
    }
    _nwGui = app.gui;
    fullConfigPath = config._getAppDataPath();
    var argLength = arguments.length;

    // get config from default path
    if(!argLength) {
        return config.get();
    } else if(argLength === 1 && typeof arguments[0] === 'object') {
        // save object
        return config.set(arguments[0]);
    } else if(argLength === 1 && typeof arguments[0] === 'string') {
        // return
        return config.get(arguments[0]);
    }
};

function _getDefaultFilePath() {
    return path.resolve(fullConfigPath, defaultConfigFile);
}

function _get(configPath) {
    var deferred = Q.defer();
    fs.readFile(configPath, function(err, data){
        if(err) {
            deferred.reject(err);
        } else {
            deferred.resolve(data);
        }
    });
    return deferred.promise;
}

config.get = function(indiFileKey) {
    var _path = null;
    if(!indiFileKey) {
        _path = _getDefaultFilePath();
    } else {
        _path = path.resolve(indiConfigs[indiFileKey]);
    }
    return _get(_path);
};

config.set = function(content) {
    var _path = path.resolve(fullConfigPath, file);

};
config._getAppDataPath = function() {
    if (!_nwGui) {
        throw new Error('global app.gui is not set');
    }
    return _nwGui.App.dataPath;
};

