'use strict';

require('source-map-support').install();
const Promise = require('bluebird');
const migrate = require('./database/migrate');
Promise.longStackTraces();

describe('Unit Tests', function() {
    require('./unit/model')();
});

describe('Integration Tests', function() {

    before(function(done) {
        migrate.runAndSeed(done);
    });

    after(function(done) {
        migrate.rollback(done);
    });

    require('./integration/query')();
});
