'use strict'
require('dotenv').config();
const express = require('express');
const routes = require('./routes');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const passport = require('passport');


const { router: usersRouter } = require('./users');
const { router: authRouter, localStrategy, jwtStrategy } = require('./auth');



// Mongoose internally uses a promise-like object,
// but it's better to make Mongoose use built in es6 promises
mongoose.Promise = global.Promise;

// config.js is where we control constants for entire
// app like PORT and DATABASE_URL
const { PORT, DATABASE_URL } = require('./config');


app.use(express.static('public'));
app.use(bodyParser.json());

// Logging
app.use(morgan('common'));


// CORS
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
    if (req.method === 'OPTIONS') {
        return res.send(204);
    }
    next();
});

passport.use(localStrategy);
passport.use(jwtStrategy);

app.use('/api/users/', usersRouter);
app.use('/api/auth/', authRouter);

const jwtAuth = passport.authenticate('jwt', { session: false });

// A protected endpoint which needs a valid JWT to access it
app.get('/api/protected', jwtAuth, (req, res) => {
    return res.json({
        data: 'rosebud'
    });
});






new routes(app)


// closeServer needs access to a server object, but that only
// gets created when `runServer` runs, so we declare `server` here
// and then assign a value to it in run
let server;

function runServer(databaseUrl, port = PORT) {
    console.log('this is first dbURL', databaseUrl)
    return new Promise((resolve, reject) => {
        console.log('this is the db URL: ', databaseUrl);
        mongoose.connect(databaseUrl, err => {
            if (err) {
                return reject(err);
            }

            server = app.listen(port, () => {
                console.log(`Your app is listening on port ${port}`);
                resolve();
            })
                .on('error', err => {
                    mongoose.disconnect();
                    reject(err);
                });
        });
    });
}

// this function closes the server, and returns a promise. we'll
// use it in our integration tests later.
function closeServer() {
    return new Promise((resolve, reject) => {
        console.log('Closing server');
        server.close(err => {
            if (err) {
                return reject(err);
            }
            resolve();
        });
    });
}

if (require.main === module) { console.log('this is second dbURL', DATABASE_URL); runServer(DATABASE_URL).catch(err => console.error(err)); }

module.exports = { runServer, app, closeServer };