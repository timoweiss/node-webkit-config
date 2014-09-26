'use strict';

var assert = require('assert');
var config = require('./index');

var app = {};
app.gui = {};
app.gui.App = {};
app.gui.App.dataPath = '/testTmp';

describe('my test', function() {
    describe('config definitions', function() {
        it('config should be an function', function() {
            assert.equal(typeof config, 'function');
        });
        it('config.get should be an function', function() {
            assert.equal(typeof config.get, 'function');
        });
        it('config.set should be an function', function() {
            assert.equal(typeof config.set, 'function');
        });
        it('config.setPath should be an function', function() {
            assert.equal(typeof config.setPath, 'function');
        });
    });
});
