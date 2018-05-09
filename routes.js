let UpcomingEvent = require('./upcomingModel').UpcomingEvent;

let RegisteredEvent = require('./registeredModel').RegisteredEvent;

// let MOCK_UPCOMING_EVENTS = {
//     "events": [
//         {
//             "id": "aaaaaa",
//             "trackName": "New Hampshire Motor Speedway",
//             "eventDate": "June 1, 2018"
//         },
//         {
//             "id": "bbbbbb",
//             "trackName": "Palmer Motorsports Park",
//             "eventDate": "August 5, 2018"
//         },
//         {
//             "id": "cccccc",
//             "trackName": "Thompson Speedway Motorsports Park",
//             "eventDate": "September 10, 2018"
//         }
//     ]
// }

// let MOCK_REGISTERED_EVENTS = {
//     "events": [
//         {
//             "id": "111111",
//             "trackName": "New Hampshire Motor Speedway",
//             "eventDate": "June 1, 2018",
//             "needToRentBike": true,
//             "needToRentHelmet": false,
//             "needToRentSuit": false,
//             "needToRentGloves": false,
//             "needToRentBoots": false
//         },
//         {
//             "id": "222222",
//             "trackName": "Palmer Motorsports Park",
//             "eventDate": "August 5, 2018",
//             "needToRentBike": false,
//             "needToRentHelmet": false,
//             "needToRentSuit": false,
//             "needToRentGloves": false,
//             "needToRentBoots": false
//         }
//     ]
// }

function routes (app) {
    app.get('/upcomingEvents', (req, res) => {
        UpcomingEvent.find(function (err, docs) {
            if (!err) {
                console.log(docs);

                let myObj = {
                    events: docs
                }
                res.send(myObj)
            } else { throw err; }
        });
        
        
    })

    app.get('/registeredEvents', (req, res) => {
        RegisteredEvent.find(function (err, docs) {
            if (!err) {
                console.log(docs);

                let myObj = {
                    events: docs
                }
                res.send(myObj)
            } else { throw err; }
        });
    })

    app.delete('/registeredEvents:id', (req, res) => {
        let id = req.params.id;
        let found = false; 

        MOCK_REGISTERED_EVENTS.events.forEach(function(event, index) {
            if (!found && event.id === id) {
                MOCK_REGISTERED_EVENTS.events.splice(index, 1);
            }
        })
        
        res.send(MOCK_REGISTERED_EVENTS);
    })

    app.put('/registeredEvents:id', (req, res) => {
        let id = req.params.id
        let values = req.body
        let changedEventIndex = findById(id, MOCK_REGISTERED_EVENTS.events)

        if (values.motorcycleRentalAnswer === 'Yes') {
            MOCK_REGISTERED_EVENTS.events[changedEventIndex].needToRentBike = true;
        } else {
            MOCK_REGISTERED_EVENTS.events[changedEventIndex].needToRentBike = false;
        }
        
        values.gearRental.forEach((item) => {
            if (item === 'Helmet') {
                MOCK_REGISTERED_EVENTS.events[changedEventIndex].needToRentHelmet = true
            } else if (item === 'Boots') {
                MOCK_REGISTERED_EVENTS.events[changedEventIndex].needToRentBoots = true
            } else if (item === 'Gloves') {
                MOCK_REGISTERED_EVENTS.events[changedEventIndex].needToRentGloves = true
            } else if (item === 'Leather-Racing-Suit') {
                MOCK_REGISTERED_EVENTS.events[changedEventIndex].needToRentSuit = true
            }
        });

        res.end();
    })

    app.post('/registeredEvents:id', (req, res) => {
        let id = req.params.id
        let values = req.body
        let registeredEventIndex = findById(id, MOCK_UPCOMING_EVENTS.events)

        let upcomingObject = Object.assign({}, MOCK_UPCOMING_EVENTS.events[registeredEventIndex])

        MOCK_REGISTERED_EVENTS.events.push(upcomingObject)

        

        //this is the index of the registered event within the MOCK_REGISTERED_EVENTS.events array
        let _index = MOCK_REGISTERED_EVENTS.events.length - 1
        
        MOCK_REGISTERED_EVENTS.events[_index].needToRentHelmet = false;
        MOCK_REGISTERED_EVENTS.events[_index].needToRentBoots = false;
        MOCK_REGISTERED_EVENTS.events[_index].needToRentGloves = false;
        MOCK_REGISTERED_EVENTS.events[_index].needToRentSuit = false;

        if (values.motorcycleRentalAnswer === 'Yes') {
            MOCK_REGISTERED_EVENTS.events[_index].needToRentBike = true;
        } else {
            MOCK_REGISTERED_EVENTS.events[_index].needToRentBike = false;
        }

        values.gearRental.forEach((item) => {
            if (item === 'Helmet') {
                MOCK_REGISTERED_EVENTS.events[_index].needToRentHelmet = true
            } else if (item === 'Boots') {
                MOCK_REGISTERED_EVENTS.events[_index].needToRentBoots = true
            } else if (item === 'Gloves') {
                MOCK_REGISTERED_EVENTS.events[_index].needToRentGloves = true
            } else if (item === 'Leather-Racing-Suit') {
                MOCK_REGISTERED_EVENTS.events[_index].needToRentSuit = true
            }
        });

        res.end();
    })
}


function findById(id, arr) {
    let _index;
    arr.some((registeredEvent, index) => {
        if (registeredEvent.id === id) {
            _index = index
            return true;
        }
    })
    return _index
}

module.exports = routes;


