
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
const { User } = require('../users/models');

chai.use(chaiHttp);

let token;
//will eventually need to NOT hardcode the token value
//let token2 = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoic21yMzEwODgiLCJmaXJzdE5hbWUiOiJzdGV2ZSIsImxhc3ROYW1lIjoicm9tbSIsImlkIjoiNWIwNWVhNmY3MmI3NTkzNTJmZTNhZDU1In0sImlhdCI6MTUyNzExNDM2OCwiZXhwIjoxNTI3NzE5MTY4LCJzdWIiOiJzbXIzMTA4OCJ9.-Eph16lmxDYwPtm0IJ77QtHoo-bC5Y8hCfRCSMg7Bl8';

let testUserObject;
//let testEventId;

function createUser() {
    console.log("Creating user.");
    let testUser = {
        firstName: "steve",
        lastName: "tester",
        username: "testuser",
        password: "testpassword"
    }
    return new Promise((resolve, reject) => {
        chai.request(app)
            .post('/api/users')
            .send(testUser)
            .then((res) => {
                console.log('Registered user.');
                loginUser().then(() => {
                    console.log('this is the user object after new user is created and logged in:', res.body)
                    testUserObject = res.body;
                    resolve()
                });
            })
            .catch((error) => {
                console.log(error)
                reject(error)
            });
    });
}


function loginUser(pw) {
    console.log('logging in user')
    let loginUser = {
        username: "testuser",
        password: "testpassword"
    }
    return new Promise((resolve, reject) => {
        chai.request(app)
            .post('/api/auth/login')
            .send(loginUser)
            .then((res) => {
                console.log('this is res.body', res.body);
                token = res.body.authToken;
                console.log('this is the token: ', token);
                //console.log('this it token2: ', token2)
                //userId = res.body.data.userID;
                
                resolve();
            })
            .catch((error) => {
                console.log('this is the !! error', error)
                reject(error)
            });
    });
}




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
        return runServer(TEST_DATABASE_URL)
            .then(function () {
                console.log("Server is running");
                return createUser();
            })
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
                    //console.log('this is _res', _res)
                    res = _res
                    expect(res).to.have.status(200);
                    expect(res).to.be.html;
                })
        });
    })



    describe('GET  /upcomingEvents endpoint', function () {
        it('should return all upcoming events', function () {
            return chai.request(app)
                .get('/upcomingEvents')
                .set('Authorization', "Bearer " + token)
                .then(function (res) {
                    console.log('this is res.body for GET /upcomingEvents', res.body);
                    //testEventId = res.body.events[1]._id;
                    //console.log('this is testEventId', testEventId)
                    expect(res).to.have.status(200);
                })
        });
    })


    describe('POST  /registeredEvents/:id', function () {
        it('should add a new registered event', function () {

            console.log('this should be testUserObject:', testUserObject)
            console.log('testUserObject.id:', testUserObject.id)
            return chai.request(app)
                .post(`/registeredEvents/${testUserObject.id}`)
                .set('Authorization', "Bearer " + token)
                //.send(SOME OBJECT -- like data in ajax request);
                .then(function (res) {
                   console.log('this is res.body for POST registeredEvents/:id', res.body)
                //    console.log('thiiis is req.user.id: ', req.user.id)
                })

        });
    })
    
    describe('GET  /registeredEvents endpoint', function () {
        it('should return all registered events', function () {

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

