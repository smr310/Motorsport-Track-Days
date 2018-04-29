
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

}

module.exports = routes;


//template
// app.get('/registered-events', (req, res) => {
//     res.send('Hello World!')
// })


