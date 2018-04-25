
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
    $('#dashboard-button').on('click', function (event) {
        $('.dashboard-div').html("");
        getRegisteredEvents(updateDOM);
    })
   
}


function getRegisteredEvents(callbackFn) {
    setTimeout(function () { callbackFn(MOCK_REGISTERED_EVENTS) }, 100);
}

// this function stays the same when we connect
// to real API later
function updateDOM(data) {
    $('.dashboard-div').html("");
    
    for (value of data.events) {
        $('.dashboard-div').append(
            `
            <div id=${value.id}>
                <p> ID: <span >${value.id}</span></p>
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




function getPositionByElement (data, element) {
    let _id = $(element).parent().attr("id")
    console.log("this is the id:", _id);

    let eventArray = data.events;

    //returns array with only ids 
    let elementPos = eventArray.map(function (x) { return x.id; }).indexOf(_id);
    console.log("this is elementPos", elementPos)

    return elementPos;
}



//DELETE

function deleteRegisteredEvent() {
    $('body').on('click', '.delete-button', function (event) {
       
        let eventArray = MOCK_REGISTERED_EVENTS.events;

        let elementPos = getPositionByElement(MOCK_REGISTERED_EVENTS, this);

        let removedEvent = eventArray.splice(elementPos, 1);
        console.log("removedEvent is:", removedEvent);

        var objectFound = eventArray[elementPos];
        console.log("this is the remaining event Array:", eventArray);

        MOCK_REGISTERED_EVENTS.registeredEvents = eventArray; 
        console.log("this is updated Mock Data Array:", MOCK_REGISTERED_EVENTS.registeredEvents)


        updateDOM(MOCK_REGISTERED_EVENTS);
    })
}



//PUT
function editRegisteredEvent() {
    $('body').on('click', '.edit-button', function (event) {
        
        let eventArray = MOCK_REGISTERED_EVENTS.events;

        let elementPos = getPositionByElement(this);
        
        eventArray[elementPos].needToRentBike = true;
        console.log(eventArray[elementPos])

        updateDOM(MOCK_REGISTERED_EVENTS);
    })

   
}





function displayUpcomingEvents(data) {
    $('.dashboard-div').html("");

    for (value of data.events) {
        $('.dashboard-div').append(
            `
            <div id=${value.id}>
                <p> ID: <span >${value.id}</span></p>
                <p> trackName: ${value.trackName}</p>
                <p> eventDate: ${value.eventDate}</p>
                <button class="register-button" type="button">REGISTER</button>
            </div>
            `
        );
    }

    homePageButtonClickHandler();        
    registerButtonClickHandler();
}

function homePageButtonClickHandler() {
    $('body').on('click', '#homepage-button', function (event) {
        displayUpcomingEvents(MOCK_UPCOMING_EVENTS)
    });
}



//POST 


function registerButtonClickHandler() {
    $('body').on('click', '.register-button', function (event) {
        
        //ask user for input
        //update DOM to ask for user input 
        $('.dashboard-div').html("");

        $('.dashboard-div').append(
            `
            <form id="registration">
                First name:<br>
                <input type="text" name="firstname" value="">
                <br><br>
                Last name:<br>
                <input type="text" name="lastname" value="">
                <br><br>
                Will you be renting a motorcycle with us: <br>
                <input type="radio" name="rental-answer" value="Yes">Yes<br>
                <input type="radio" name="rental-answer" value="No">No, I will be riding my own motorcylce<br>
                <br><br>
                If you need to rent safety gear, please select all items you will need to rent: <br>
                <input type="checkbox" name="Helmet" value="Helmet">Helmet<br>
                <input type="checkbox" name="Leather-suit" value="Leather Racing Suit">Leather Racing Suit<br>
                <input type="checkbox" name="Gloves" value="Gloves">Gloves<br>
                <input type="checkbox" name="Boots" value="Boots">Boots<br>

                <input type="submit" value="Submit">
            </form>
            `
        );


        
        let position = getPositionByElement(MOCK_UPCOMING_EVENTS, this)
        MOCK_REGISTERED_EVENTS.events.push(MOCK_UPCOMING_EVENTS.events[position]);
        

        

        //on formsubmit:
        // store user input in object 
        // append the user input to object in MOCK_UPCOMING)EVENTS.events[position]

        
        $("#registration").submit(function (event) {
            event.preventDefault();
            console.log("submit button clicked");

            let userInput = {

            }

        });

        
       


    });
}




//on page load do this
$(function () {
    displayUpcomingEvents(MOCK_UPCOMING_EVENTS);
    getAndDisplayRegisteredEvents();
    deleteRegisteredEvent();
    editRegisteredEvent();
})


//home page should show UPCOMING events 

//click a DASHBOARD BUTTON / LINK -- That will generate REGISTERED EVENTS

