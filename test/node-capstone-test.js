'use strict';

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
        return runServer();
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

        it('should return dashboard html', function () {
            let res;
            return chai.request(app)
                .get('/dashboard.html')
                .then(function (_res) {
                    res = _res
                    expect(res).to.have.status(200);
                    expect(res).to.be.html;

                })
        });

        it('should return reserve html', function () {
            let res;
            return chai.request(app)
                .get('/reserve.html')
                .then(function (_res) {
                    res = _res
                    expect(res).to.have.status(200);
                    expect(res).to.be.html;

                })
        });

        it('should return edit html', function () {
            let res;
            return chai.request(app)
                .get('/edit.html')
                .then(function (_res) {
                    res = _res
                    expect(res).to.have.status(200);
                    expect(res).to.be.html;

                })
        });

    });


});

