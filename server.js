const express = require('express');
const routes = require('./routes');
const bodyParser = require('body-parser');
const app = express();
app.use(express.static('public'));
app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true }))
new routes(app)

const { PORT } = require('./config');


// closeServer needs access to a server object, but that only
// gets created when `runServer` runs, so we declare `server` here
// and then assign a value to it in run
let server;

// this function connects to our database, then starts the server
function runServer(port = PORT) {
    return new Promise((resolve, reject) => {
        server = app.listen(port, () => {
            console.log(`Your app is listening on port ${port}`);
            resolve();
        })
        .on('error', err => {
            reject(err);
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

if (require.main === module) { runServer().catch(err => console.error(err)); }

module.exports = { runServer, app, closeServer };