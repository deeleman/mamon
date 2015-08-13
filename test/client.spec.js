'use strict';

var client = require('../lib/client');
var chai = require('chai');
var should = chai.should();

chai.use(require('chai-as-promised'));

describe('Our Module', function() {

    var apiSettings;

    before(function() {
        apiSettings = require('./../settings.json');
    });

    it('Should provide a data pointer method to fetch the challenge data', function(done) {
        client.request(apiSettings).should.eventually
            .have.all.keys(['token', 'values'])
            .and.have.property('values').to.be.an.instanceof(Array)
            .and.notify(done);
    });

    it('Should degrade gracefully when instanced with malformed host settings', function(done) {
        var wrongApiSettings = {
            hostApi: 'aerial-valor-93012.appspot.co.uk',
            path: '/foo'
        };
        client.request(wrongApiSettings).should.eventually
            .be.rejectedWith(Error)
            .and.notify(done);
    });

    it('Should get a populated answer and no error response when executing the entire challenge wrapper method', function(done) {
        client.run(apiSettings).should.eventually
            .equal('But of course, it can only be Meat!!! This was a triumph, Mamon will be pleased!')
            .and.not.equal('Oops! Try again...')
            .and.notify(done);
    });

});
