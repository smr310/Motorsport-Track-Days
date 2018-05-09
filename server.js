const express = require('express');
const routes = require('./routes');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');


// Mongoose internally uses a promise-like object,
// but it's better to make Mongoose use built in es6 promises
mongoose.Promise = global.Promise;

// config.js is where we control constants for entire
// app like PORT and DATABASE_URL
const { PORT, DATABASE_URL } = require('./config');



app.use(express.static('public'));
app.use(bodyParser.json());

new routes(app)


// closeServer needs access to a server object, but that only
// gets created when `runServer` runs, so we declare `server` here
// and then assign a value to it in run
let server;

function runServer(databaseUrl, port = PORT) {
    return new Promise((resolve, reject) => {
        console.log('this is the db URL: ', databaseUrl);
        mongoose.connect(databaseUrl, err => {
            if (err) {
                return reject(err);
            }

            server = app.listen(port, () => {
                // let doc = new UpcomingEvent({
                //     trackName: "test track",
                //     eventDate: Date.now()
                // })
                // doc.save(function (err, docs) {
                //     if (!err) {
                //         console.log("abc");
                //         console.log(docs);
                //     } else { throw err; }
                // });
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

if (require.main === module) { runServer(DATABASE_URL).catch(err => console.error(err)); }

module.exports = { runServer, app, closeServer };