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
                //console.log(docs);

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
                //console.log(docs);

                let myObj = {
                    events: docs
                }
                res.send(myObj)
            } else { throw err; }
        });
    })

 
    //find the UpcomingEvent by id 
    //need this to execute on the register click

    app.get('/upcomingEvents/:id', (req, res) => {
        UpcomingEvent.findyById('5aea086e734d1d06be086b45').then(function (err, docs) {
            if (!err) {
                console.log("***", docs);

                // let myObj = {
                //     events: docs
                // }
                // res.send(myObj)
            } else { throw err; }
        })


    })

    
    app.post('/registeredEvents/:id', (req, res) => {
        
        
        //store the necessary info into newly declared variables
        //declare/define all other variables 
        //RegisteredEvent.create() as is 
        
        console.log(req.body)

        console.log('here is the track name: ', req.body.trackName)


        let needToRentBike = false;
        let needToRentHelmet = false;
        let needToRentBoots = false;
        let needToRentGloves = false;
        let needToRentSuit = false;

        if (req.body.motorcycleRentalAnswer === 'Yes') {
            needToRentBike = true;
        } else {
            needToRentBike = false;
        }

        req.body.gearRental.forEach((item) => {
            if (item === 'Helmet') {
                needToRentHelmet = true
            } else if (item === 'Boots') {
                needToRentBoots = true
            } else if (item === 'Gloves') {
                needToRentGloves = true
            } else if (item === 'Leather-Racing-Suit') {
               needToRentSuit = true
            }
        });


            




        RegisteredEvent.create({
            trackName: req.body.trackName,
            eventDate: req.body.eventDate,
            needToRentBike: needToRentBike,
            needToRentHelmet: needToRentHelmet,
            needToRentSuit: needToRentSuit,
            needToRentGloves: needToRentGloves,
            needToRentBoots: needToRentBoots
        }).then(function(docs) {
            
                console.log(docs);

                let myObj = {
                    events: docs
                }
                res.send(myObj)
        })
    })


    app.put('/registeredEvents:id', (req, res) => {

        let id = req.params.id

        let needToRentBike = false;
        let needToRentHelmet = false;
        let needToRentBoots = false;
        let needToRentGloves = false;
        let needToRentSuit = false;

        if (req.body.motorcycleRentalAnswer === 'Yes') {
            needToRentBike = true;
        } else {
            needToRentBike = false;
        }

        req.body.gearRental.forEach((item) => {
            if (item === 'Helmet') {
                needToRentHelmet = true
            } else if (item === 'Boots') {
                needToRentBoots = true
            } else if (item === 'Gloves') {
                needToRentGloves = true
            } else if (item === 'Leather-Racing-Suit') {
                needToRentSuit = true
            }
        });

        RegisteredEvent.findByIdAndUpdate(id, {
            needToRentBike: needToRentBike,
            needToRentHelmet: needToRentHelmet,
            needToRentBoots: needToRentBoots,
            needToRentGloves: needToRentGloves,
            needToRentSuit: needToRentSuit
        }).then(function(doc) {
            
        });

        res.end();
    })


    app.delete('/registeredEvents:id', (req, res) => {
        let id = req.params.id;
        console.log('this is the id', id)
        
        RegisteredEvent.findByIdAndRemove(id)
            .then(function(doc, docs) {
                doc.remove
                
                let myObj = {
                    events: docs
                }
                res.send(myObj)
            });



        //below worked
        //RegisteredEvent.findOne({ trackName: 'New Hampshire Motor Speedway'}).then(doc => doc.remove())



        // let found = false;

        // MOCK_REGISTERED_EVENTS.events.forEach(function (event, index) {
        //     if (!found && event.id === id) {
        //         MOCK_REGISTERED_EVENTS.events.splice(index, 1);
        //     }
        // })

        // res.send(MOCK_REGISTERED_EVENTS);
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


