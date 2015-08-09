var fs = require('fs');
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

    it('Should provide an utility method to aggregate array values', function() {
        var mockArray1 = [5, 25, 50, 100];
        var mockArray2 = [10, 20, 30];
        var mockArray3 = [11, 33];

        client.reduce(mockArray1).should.equal(180);
        client.reduce(mockArray2).should.equal(60);
        client.reduce(mockArray3).should.equal(44);
    });

    it('Should get a populated answer and no error response when executing the entire challenge wrapper method', function(done) {
        client.run(apiSettings).should.eventually
            .equal('But of course, it can only be Meat!!! This was a triumph, Mamon will be pleased!')
            .and.not.equal('Oops! Try again...')
            .and.notify(done);
    });

});
