'use strict';

var settings = require('./settings.json');
var client = require('./lib/client');

var printResults = function(error, result) {
    if(!result && error) {
        result = error;
    }
    console.log('WHAT FOOD IS MAMON\'S FAVOURITE MEAL?\n', result);
};

if(process.argv[2] !== 'callback_ui') {
    client.run(settings).then(printResults).fail(printResults);     // Promise Interface
} else {
    client.run(settings, printResults);                             // Callback Interface
}
