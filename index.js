'use strict';

var _nwGui = null;
var fs = require('fs');
var path = require('path');
var Q = require('q');

var staticData = require('./lib/static.js');

var _configDirName = null;
var fullConfigPath = null;
var confFilePath = null;
var confString = null;

var defaultConfigFile = 'config.json';

var _configMock = staticData.configMock;

var config = module.exports = function(file, content) {
    if (!app || !app.gui) {
        throw new Error('global app.gui is not set');
    }
    _nwGui = app.gui;
    fullConfigPath = config._getAppDataPath();
    var argLength = arguments.length;

    // get config from default path
    if(!argLength) {
        return config.get();
    }
};

config.get = function(file) {
    var _path = null;
    if(!file) {
        _path = path.resolve(fullConfigPath, defaultConfigFile);
    } else {
        _path = path.resolve(fullConfigPath, file);
    }
    return _get(_path);
};

config.set = function(file, content) {
    var _path = path.resolve(fullConfigPath, file);

};
config._getAppDataPath = function() {
    if (!_nwGui) {
        throw new Error('global app.gui is not set');
    }
    return _nwGui.App.dataPath;
};

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

