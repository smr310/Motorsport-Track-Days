function routes (app) {
    app.get('/upcomingEvents', (req, res) => {
        res.send('upComingEvents works ')
    })

    app.get('/registeredEvents', (req, res) => {
        res.send('hello world!')
    })

}

module.exports = routes;


//template
// app.get('/registered-events', (req, res) => {
//     res.send('Hello World!')
// })


