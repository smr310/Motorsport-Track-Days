
let MOCK_UPCOMING_EVENTS = {
    "events": [
        {
            "id": "aaaaaa",
            "trackName": "New Hampshire Motor Speedway",
            "eventDate": "June 1, 2018",
        },
        {
            "id": "bbbbbb",
            "trackName": "Palmer Motorsports Park",
            "eventDate": "August 5, 2018",
        },
        {
            "id": "cccccc",
            "trackName": "Thompson Speedway Motorsports Park",
            "eventDate": "September 10, 2018",
        }

    ]
}


let MOCK_REGISTERED_EVENTS = {
    "events": [
        {
            "id": "111111",
            "trackName": "New Hampshire Motor Speedway",
            "eventDate": "June 1, 2018",
            "needToRentBike": true,
            "needToRentHelmet": false,
            "needToRentSuit": false,
            "needToRentGloves": false,
            "needToRentBoots": false
        },
        {
            "id": "222222",
            "trackName": "Palmer Motorsports Park",
            "eventDate": "August 5, 2018",
            "needToRentBike": false,
            "needToRentHelmet": false,
            "needToRentSuit": false,
            "needToRentGloves": false,
            "needToRentBoots": false
        }

    ]

}

function routes (app) {
    app.get('/upcomingEvents', (req, res) => {
        res.send(MOCK_UPCOMING_EVENTS)
    })

    app.get('/registeredEvents', (req, res) => {
        res.send(MOCK_REGISTERED_EVENTS)
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

        if (values.motorcycleRentalAnswer === 'Yes') {
            MOCK_REGISTERED_EVENTS.events[changedEventIndex].needToRentBike = true;
        } else {
            MOCK_REGISTERED_EVENTS.events[changedEventIndex].needToRentBike = false;
        }

        res.end();
    })


    app.post('/registeredEvents:id', (req, res) => {
        let id = req.params.id
        console.log('this is the server side id: ', id);

        let values = req.body
        let registeredEventIndex = findById(id, MOCK_UPCOMING_EVENTS.events)

        console.log('this is the registeredEventIndex: ', registeredEventIndex);
        console.log('this is the registered event: ', MOCK_UPCOMING_EVENTS.events[registeredEventIndex]);

        //for whichever Event Register is clicked, I need to COPY or append that EVENT from MOCK_UPCOMING_EVENTS.events to MOCK_REGISTERED_EVENTS.events

        MOCK_REGISTERED_EVENTS.events.push(MOCK_UPCOMING_EVENTS.events[registeredEventIndex])

        console.log('this is the length: ', MOCK_REGISTERED_EVENTS.events.length)

        let _index = MOCK_REGISTERED_EVENTS.events.length - 1
        
        console.log("this is the most recently add event to Registered Events: ", MOCK_REGISTERED_EVENTS.events[_index])

        MOCK_REGISTERED_EVENTS.events[_index]

        MOCK_REGISTERED_EVENTS.events[_index].needToRentHelmet = false;
        MOCK_REGISTERED_EVENTS.events[_index].needToRentBoots = false;
        MOCK_REGISTERED_EVENTS.events[_index].needToRentGloves = false;
        MOCK_REGISTERED_EVENTS.events[_index].needToRentSuit = false;


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

        if (values.motorcycleRentalAnswer === 'Yes') {
            MOCK_REGISTERED_EVENTS.events[_index].needToRentBike = true;
        } else {
            MOCK_REGISTERED_EVENTS.events[_index].needToRentBike = false;
        }

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


