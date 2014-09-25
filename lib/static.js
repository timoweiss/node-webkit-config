'use strict';
/**
 * For serving default data.
 */

var _configMock = {
    'profile': {
        'firstname': 'John',
        'surname': 'Doe',
        'email': 'john@doe.com',
        'timezone': '',
        'image': ''
    },
    'preferences': {
        'askBeforeDelete': true,
        'undoredo': true
    },
    'notifications': {
        'otherUserOnline': true,
        'otherUserOffline': true,
        'updateAvailable': true,
        'changes': true
    },
    'hiddenPreferences': {
        'windowWith': 1000,
        'windowHeight': 700,
        'windowPosition': {
            'top': 300,
            'left': 300
        }
    }
};
module.exports.configMock = _configMock;
