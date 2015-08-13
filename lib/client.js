'use strict';

var Q = require('q');
var http = require('http');

function Client() {

    var httpJSONClient = function httpJSONClient(apiSettings, serviceEndpoint) {
        var deferred = Q.defer();
        var options = {
            host: apiSettings.hostApi,
            path: (serviceEndpoint ? apiSettings.path + serviceEndpoint : apiSettings.path)
        };

        http.get(options, function(response) {
            var responseData = '';

            response.on('data', function (chunk) {
                responseData += chunk;
            });
            response.on('end', function () {
                deferred.resolve(JSON.parse(responseData));
            });
        }).on('error', function(error) {
            deferred.reject(new Error(error));
        });

        return deferred.promise;
    };

    var request = function request(apiSettings, next) {
        var deferred = Q.defer();

        httpJSONClient(apiSettings).then(deferred.resolve).fail(deferred.reject);

        deferred.promise.nodeify(next);
        return deferred.promise;
    };

    var run = function run(apiSettings, next) {
        var deferred = Q.defer();

        var sumReduce = function(a, b) {
            return a + b;
        };

        request(apiSettings)
            .then(function(challengeData) {
                var serviceEndpoint = '/' + challengeData.token + '/' + challengeData.values.reduce(sumReduce);
                return httpJSONClient(apiSettings, serviceEndpoint);
            })
            .then(function(response) {
                var answer = response.error || response.answer;
                deferred.resolve(answer);
            })
            .fail(deferred.reject);

        deferred.promise.nodeify(next);
        return deferred.promise;
    };

    return {
        request: request,
        run: run
    };
}

module.exports = Client();
