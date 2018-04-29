



// this function can stay the same even when we
// are connecting to real API
function getAndDisplayRegisteredEvents() {
    $('#dashboard-button').on('click', function (event) {
        $('.dashboard-div').html("");
        getRegisteredEvents(updateDOM);
    })
   
}

function getRegisteredEvents(callbackFn) {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/registeredEvents",
        data: {},
        dataType: 'json',
        success: function (data) {
            callbackFn(data) 
        },
        error: function (err) {
            console.log(err)
        },
        beforeSend: function (xhr) {

        }
    });
    
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
                <p> Will you be renting a motorcycle?: ${value.needToRentBike}</p>
                <p> Will you be renting a helmet: ${value.needToRentHelmet}</p>
                <p> Will you be renting a leather suit: ${value.needToRentSuit}</p>
                <p> Will you be renting gloves: ${value.needToRentGloves}</p>
                <p> Will you be renting boots: ${value.needToRentBoots}</p>
                <button class="edit-button" type="button">EDIT</button>
                <button class="delete-button" type="button">DELETE</button><br><br>
            </div>
            `
        );
    }
}

function getPositionByElement (data, element) {
    let _id = $(element).parent().attr("id")
    let eventArray = data.events;

    //returns array with only ids 
    let elementPos = eventArray.map(function (x) { return x.id; }).indexOf(_id);

    return elementPos;
}


//DELETE

//logic
//send server id to delete 
//server will delete from mock data 
//sends 200 response so client knows it was deleted successfully
//client has ability to remove it from the DOM

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
        
        //ask user for input
        $('.dashboard-div').html("");

        $('.dashboard-div').append(
            `
            <form id="update">
                Will you be renting a motorcycle with us: <br>
                <input type="radio" name="motorcycleRentalAnswer" value="Yes">Yes<br>
                <input type="radio" name="motorcycleRentalAnswer" value="No">No, I will be riding my own motorcylce<br>
                <br><br>
                If you need to rent safety gear, please select all items you will need to rent: <br>
                <div>
                    <input type="checkbox" name="gearRental" value="Helmet">
                    <label for="helmet">Helmet</label>
                </div>
                <div>
                    <input type="checkbox" name="gearRental" value="Leather-Racing-Suit">
                    <label for="Leather-Racing-Suit">Leather Racing Suit</label>
                </div>
                <div>
                <input type="checkbox" name="gearRental" value="Gloves">
                <label for="gloves">Gloves</label>
                </div>
                <div>
                <input type="checkbox" name="gearRental" value="Boots">
                <label for="Boots">Boots</label>
                <div>
                <input type="submit" value="Submit">
                </div>
            </form>
            `
        );


        let position = getPositionByElement(MOCK_REGISTERED_EVENTS, this)
        console.log(position);
    
        $("#update").submit(function (event) {
            event.preventDefault();
            console.log("update submit button clicked")

            let $inputs = $('#update :input');

            let values = {};

            values.motorcycleRentalAnswer = $('input[name=motorcycleRentalAnswer]:checked').val();
            values.gearRental = []

            let gearRentalDOMArray = $('input[name=gearRental]:checked');

            for (let i = 0; i < gearRentalDOMArray.length; i++) {
                values.gearRental.push(gearRentalDOMArray[i].value);
            }


            //Convert user input into customer-facing language and append to object 
            console.log(values);

            let helmetAnswer = false;
            let bootsAnswer = false;
            let suitAnswer = false;
            let glovesAnswer = false;

            values.gearRental.forEach(function (gearItem) {
                if (gearItem === "Helmet") {
                    helmetAnswer = true;
                }
            });

            values.gearRental.forEach(function (gearItem) {
                if (gearItem === "Boots") {
                    bootsAnswer = true;
                }
            });

            values.gearRental.forEach(function (gearItem) {
                if (gearItem === "Leather-Racing-Suit") {
                    suitAnswer = true;
                }
            });

            values.gearRental.forEach(function (gearItem) {
                if (gearItem === "Gloves") {
                    glovesAnswer = true;
                }
            });

            MOCK_REGISTERED_EVENTS.events[position]['needToRentBike'] = values.motorcycleRentalAnswer;
            MOCK_REGISTERED_EVENTS.events[position]['needToRentHelmet'] = helmetAnswer;
            MOCK_REGISTERED_EVENTS.events[position]['needToRentSuit'] = suitAnswer;
            MOCK_REGISTERED_EVENTS.events[position]['needToRentGloves'] = glovesAnswer;
            MOCK_REGISTERED_EVENTS.events[position]['needToRentBoots'] = bootsAnswer;

            console.log(MOCK_REGISTERED_EVENTS.events)

            //update DOM 
            updateDOM(MOCK_REGISTERED_EVENTS);
        });
    })
}


function displayUpcomingEvents() {
    
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/upcomingEvents",
        data: {},
        dataType: 'json',
        success: function (data) {
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
            registerButtonClickHandler();
        },
        error: function (err) {
            console.log(err)
        },
        beforeSend: function (xhr) {
           
        }
    });
    
   

          
    
}

function homePageButtonClickHandler() {
    $('body').on('click', '#homepage-button', function (event) {
        displayUpcomingEvents()
    });
}


//POST 

function registerButtonClickHandler() {
    $('body').on('click', '.register-button', function (event) {
        
        //update DOM to ask for user input 
        $('.dashboard-div').html("");

        $('.dashboard-div').append(
            `
            <form id="registration">
                First name:<br>
                <input type="text" name="firstName" value="">
                <br><br>
                Last name:<br>
                <input type="text" name="lastName" value="">
                <br><br>
                Will you be renting a motorcycle with us: <br>
                <input type="radio" name="motorcycleRentalAnswer" value="Yes">Yes<br>
                <input type="radio" name="motorcycleRentalAnswer" value="No">No, I will be riding my own motorcylce<br>
                <br><br>
                If you need to rent safety gear, please select all items you will need to rent: <br>
                <div>
                    <input type="checkbox" name="gearRental" value="Helmet">
                    <label for="helmet">Helmet</label>
                </div>
                <div>
                    <input type="checkbox" name="gearRental" value="Leather-Racing-Suit">
                    <label for="Leather-Racing-Suit">Leather Racing Suit</label>
                </div>
                <div>
                <input type="checkbox" name="gearRental" value="Gloves">
                <label for="gloves">Gloves</label>
                </div>
                <div>
                <input type="checkbox" name="gearRental" value="Boots">
                <label for="Boots">Boots</label>
                <div>
                <input type="submit" value="Submit">
                </div>
            </form>
            `
        );

        let position = getPositionByElement(MOCK_UPCOMING_EVENTS, this)
        MOCK_REGISTERED_EVENTS.events.push(MOCK_UPCOMING_EVENTS.events[position]);

        //on formsubmit:
        // store user input in array
        // append the user input to object in MOCK_UPCOMING)EVENTS.events[position]

        
        $("#registration").submit(function (event) {
            event.preventDefault();
            console.log("submit button clicked");
        
            let $inputs = $('#registration :input');
    
            let values = {};
          
            values.firstName = $('input[name=firstName]').val();
            values.lastName = $('input[name=lastName]').val();
            values.motorcycleRentalAnswer = $('input[name=motorcycleRentalAnswer]:checked').val();
            values.gearRental = []

            let gearRentalDOMArray = $('input[name=gearRental]:checked');

            for (let i = 0; i < gearRentalDOMArray.length; i++) {
                values.gearRental.push(gearRentalDOMArray[i].value);
            }
           

            //Convert user input into customer-facing language and append to object 
            mostRecentlyAddedEventPos = MOCK_REGISTERED_EVENTS.events.length - 1;
            
            console.log(values);

            //you can insert <p> You have selected to rent the following Items <p> 

            //Motorcycle: values.motorcycleRentalAnswer
            //Helmet: if "Helmet" is in the array, then Yes. Else "No"

            let helmetAnswer = false;
            let bootsAnswer = false;
            let suitAnswer = false;
            let glovesAnswer = false;

            values.gearRental.forEach(function(gearItem) {
                if (gearItem === "Helmet") {
                    helmetAnswer = true;
                } 
            });

            values.gearRental.forEach(function (gearItem) {
                if (gearItem === "Boots") {
                    bootsAnswer = true;
                } 
            });
             
            values.gearRental.forEach(function (gearItem) {
                if (gearItem === "Leather-Racing-Suit") {
                    suitAnswer = true;
                } 
            });

            values.gearRental.forEach(function (gearItem) {
                if (gearItem === "Gloves") {
                    glovesAnswer = true;
                }
            });


            MOCK_REGISTERED_EVENTS.events[mostRecentlyAddedEventPos]['needToRentBike'] = values.motorcycleRentalAnswer;
            MOCK_REGISTERED_EVENTS.events[mostRecentlyAddedEventPos]['needToRentHelmet'] = helmetAnswer; 
            MOCK_REGISTERED_EVENTS.events[mostRecentlyAddedEventPos]['needToRentSuit'] = suitAnswer;
            MOCK_REGISTERED_EVENTS.events[mostRecentlyAddedEventPos]['needToRentGloves'] = glovesAnswer;
            MOCK_REGISTERED_EVENTS.events[mostRecentlyAddedEventPos]['needToRentBoots'] = bootsAnswer;

            console.log(MOCK_REGISTERED_EVENTS.events)
        
            //update DOM 
            updateDOM(MOCK_REGISTERED_EVENTS);
        });
    });
}



//on page load do this
$(function () {
    homePageButtonClickHandler();  
    displayUpcomingEvents();
    getAndDisplayRegisteredEvents();
    deleteRegisteredEvent();
    editRegisteredEvent();
})


//home page should show UPCOMING events 

//click a DASHBOARD BUTTON / LINK -- That will generate REGISTERED EVENTS

