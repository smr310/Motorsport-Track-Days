
//try delete first and then post 
//delete from registeredEvents array by ID 
//delete from page 

//delete and edit button 
//delete should call delete function and pass id 
//edit button shoud put function 



//PUT Request
//Get what db sees (by using id) --> this will be one of the events (or several)
//Lets say it gets first event 
//If you want to upgrade trackName --> 
//You update new trackName 
//Send back to db so it knows about it 
//db will send back if your update was successful
//if it is successful, display that to the user 



// getRegisteredEvents function name and argument can stay the
// same after we have a live API, but its internal
// implementation will change. Instead of using a
// timeout function that returns mock data, it will
// use jQuery's AJAX functionality to make a call
// to the server and then run the callbackFn





let MOCK_REGISTERED_EVENTS = {

    "registeredEvents": [
        {
            "id": "111111",
            "trackName": "New Hampshire Motor Speedway",
            "eventDate": "June 1, 2018",
            "needToRentBike": true
        },
        {
            "id": "222222",
            "trackName": "Palmer Motorsports Park",
            "eventDate": "August 5, 2018",
            "needToRentBike": false
        }

    ]

}


// this function can stay the same even when we
// are connecting to real API
function getAndDisplayRegisteredEvents() {
    getRegisteredEvents(displayRegisteredEvents);
}


function getRegisteredEvents(callbackFn) {
    setTimeout(function () { callbackFn(MOCK_REGISTERED_EVENTS) }, 100);
}

// this function stays the same when we connect
// to real API later
function displayRegisteredEvents(data) {
    for (value of data.registeredEvents) {
        $('body').append(
            `
            <div>
                <p> ID: <span id="id">${value.id}</span></p>
                <p> trackName: ${value.trackName}</p>
                <p> eventDate: ${value.eventDate}</p>
                <p> needToRentBike: ${value.needToRentBike}</p>
                <button class="edit-button" type="button">EDIT</button>
                <button class="delete-button" type="button">DELETE</button><br><br>
            </div>
            `
        );
    }
}




//Delete

function deleteRegisteredEvent() {
    $('body').on('click', '.delete-button', function (event) {
        $(this).parent().remove();
    })
}



//Put 
function editRegisteredEvent() {
    $('body').on('click', '.edit-button', function (event) {

        // let _id = $(this).parent().find('#id').text();
        // console.log("this is the id:", _id);

        // let eventArray = MOCK_REGISTERED_EVENTS.registeredEvents;

        // let elementPos = eventArray.map(function (x) { return x.id; }).indexOf(_id);
        // console.log("this is elementPos", elementPos)

        // let removedEvent = eventArray.splice(elementPos, 1);
        // console.log("removedEvent is:", removedEvent);

        // // var objectFound = array[elementPos];
        // console.log("this is the remaining event Array:", eventArray);

        // MOCK_REGISTERED_EVENTS.registeredEvents = eventArray; 
        // console.log("this is updated Mock Data Array:", MOCK_REGISTERED_EVENTS.registeredEvents)



    })
}



//on page load do this
$(function () {
    getAndDisplayRegisteredEvents();
    deleteRegisteredEvent();
    editRegisteredEvent();
})