
'use strict';

require('dotenv').config();

const { TEST_DATABASE_URL } = require('../config');

const chai = require('chai');
const chaiHttp = require('chai-http');

// this makes the expect syntax available throughout
// this module
const expect = chai.expect;

chai.use(chaiHttp);

const { app, runServer, closeServer } = require('../server');

describe('API resource', function () {

    // we need each of these hook functions to return a promise
    // otherwise we'd need to call a `done` callback. `runServer`,
    // `seedBlogPostData` and `tearDownDb` each return a promise,
    // so we return the value returned by these function calls.
    before(function () {
        return runServer(TEST_DATABASE_URL);
    });

    beforeEach(function () {
        //return seedBlogPostData();
    });

    afterEach(function () {
        //return tearDownDb();
    });

    after(function () {
        return closeServer();
    });

    // note the use of nested `describe` blocks.
    // this allows us to make clearer, more discrete tests that focus
    // on proving something small
    describe('GET endpoints', function () {

        it('should return index html', function () {
            let res;
            return chai.request(app)
                .get('/')
                .then(function (_res) {
                    res = _res
                    expect(res).to.have.status(200);
                    expect(res).to.be.html;

                })
        });
    
    })


});

