
'use strict';

require('dotenv').config();

const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const mongoose = require('mongoose');

const expect = chai.expect;

const { UpcomingEvent } = require('../upcomingModel');
const { app, runServer, closeServer } = require('../server');
const { TEST_DATABASE_URL } = require('../config');

chai.use(chaiHttp);

function seedUpcomingEventData() {
    console.log('seeding UpcomingEventData')

    const seedData = [];

    for (let i = 1; i <= 10; i++) {
        seedData.push(generateUpcomingEventData());
    }
    // this will return a promise
    return UpcomingEvent.insertMany(seedData);
}

function generateUpcomingEventData() {
    return {
        trackName: faker.address.city() + ' Race Track',
        eventDate: faker.date.future()

    }
}


function tearDownDb() {
    console.log('Deleting database');
    return mongoose.connection.dropDatabase();
}



describe('API resource', function () {

    // we need each of these hook functions to return a promise
    // otherwise we'd need to call a `done` callback. `runServer`,
    // `seedBlogPostData` and `tearDownDb` each return a promise,
    // so we return the value returned by these function calls.
    before(function () {
        return runServer(TEST_DATABASE_URL);
    });

    beforeEach(function () {
        return seedUpcomingEventData();
    });

    afterEach(function () {
        return tearDownDb();
    });

    after(function () {
        return closeServer();
    });

    // note the use of nested `describe` blocks.
    // this allows us to make clearer, more discrete tests that focus
    // on proving something small
    describe('GET  / endpoint', function () {
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

    describe('GET  /upcomingEvents endpoint', function () {
        it('should return all upcoming events', function () {
         
            return chai.request(app)
               
        });
    })

    describe('GET  /registeredEvents endpoint', function () {
        it('should return all registered events', function () {

            return chai.request(app)

        });
    })

    describe('POST  /registeredEvents/:id', function () {
        it('should add a new registered event', function () {

            return chai.request(app)

        });
    })

    describe('PUT  /registeredEvents:id', function () {
        it('should update the fields you send over', function () {

            return chai.request(app)

        });
    })

    describe('DELETE  /registeredEvents:id endpoint', function () {
        it('should delete a registered event by id', function () {

            return chai.request(app)

        });
    })

});

