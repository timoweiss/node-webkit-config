'use strict';

var _nwGui = null;
var fs = require('fs');
var path = require('path');
var Q = require('q');
var mkdirp = require('mkdirp');

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
    if (!argLength) {
        return config.get();
    } else if (argLength === 1) {
        if (typeof arguments[0] === 'object') {
            // save object
            return config.set(arguments[0]);
        } else if (typeof arguments[0] === 'string') {
            // return
            return config.get(arguments[0]);
        }
    }
};

function _getDefaultFilePath() {
    return path.resolve(fullConfigPath, defaultConfigFile);
}

function _get(configPath) {
    var deferred = Q.defer();
    fs.readFile(configPath, function(err, data) {
        if (err) {
            deferred.reject(err);
        } else {
            var parsedData = null;
            try {
                parsedData = JSON.parse(data);
            } catch (e) {
                return deferred.reject(e);
            }
            deferred.resolve(parsedData);
        }
    });
    return deferred.promise;
}

function _set(filePath, content) {
    var deferred = Q.defer();

    function writeFile(filePath, content) {
        fs.writeFile(filePath, content, function(err) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve();
            }
        });
    }
    writeFile(filePath, content);
    return deferred.promise;
}

config.get = function(indiFileKey) {
    var _path = null;
    if (!indiFileKey) {
        _path = _getDefaultFilePath();
    } else {
        _path = path.resolve(indiConfigs[indiFileKey]);
    }
    return _get(_path);
};

config.set = function(content) {
    if (!content || typeof content !== 'object') {
        throw new Error('illegal params: set(config)');
    }
    var _content = null;
    try {
        _content = JSON.stringify(content);
    } catch (e) {
        throw new Error('illegal object: set(config)', e);
    }
    var _path = _getDefaultFilePath();
    return _set(_path, _content);
};

config.setPath = function(opt, data) {
    if (!opt || !data) {
        throw new Error('illegal params: setPath(opt, data)');
    }
};

config._getAppDataPath = function() {
    if (!_nwGui) {
        throw new Error('global app.gui is not set');
    }
    return _nwGui.App.dataPath;
};
