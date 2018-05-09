

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

function updateDOM(data) {
    $('.dashboard-div').html("");
    
    for (value of data.events) {
        $('.dashboard-div').append(
            `
            <div id=${value._id}>
                <p> ID: <span >${value._id}</span></p>
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


function deleteRegisteredEvent() {
    $('body').on('click', '.delete-button', function (event) {
        
        let id = $(this).parent().attr('id');

        $.ajax({
            type: "DELETE",
            url: "http://localhost:8080/registeredEvents" + id,
            data: {},
            dataType: 'json',
            success: function (data) {
                updateDOM(data);
            },
            error: function (err) {
                console.log(err)
            },
            beforeSend: function (xhr) {

            }
        });
    })
}


//////PUT

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

        let id = $(this).parent().attr('id');
        console.log('this is the id:', id);

        $("#update").submit(function (event) {
            event.preventDefault();

            let values = {
                motorcycleRentalAnswer: "",
                gearRental: ""
            };

            let $inputs = $('#update :input');

            values.motorcycleRentalAnswer = $('input[name=motorcycleRentalAnswer]:checked').val();
            values.gearRental = []

            let gearRentalDOMArray = $('input[name=gearRental]:checked');

            for (let i = 0; i < gearRentalDOMArray.length; i++) {
                values.gearRental.push(gearRentalDOMArray[i].value);
            }

            $.ajax({
                type: "PUT",
                url: "http://localhost:8080/registeredEvents" + id,
                data: JSON.stringify(values),
                //dataType: 'json',
                contentType: "application/json",
                success: function (data) {
                    getRegisteredEvents(updateDOM)
                    console.log("this is ajax success function line one");
                    console.log(data)
                    //above code does not do anything?

                },
                error: function (err) {
                    console.log(err)
                },
                beforeSend: function (xhr) {

                }
            });
        });
    })
}



//////POST 

function registerButtonClickHandler() {
    $('body').on('click', '.register-button', function (event) {

        //clearn & update DOM to ask for user input 
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

        let id = $(this).parent().attr('id');
       
        $("#registration").submit(function (event) {
            event.preventDefault();

            let values = {
                motorcycleRentalAnswer: "",
                gearRental: ""
            };

            let $inputs = $('#update :input');

            values.motorcycleRentalAnswer = $('input[name=motorcycleRentalAnswer]:checked').val();
            values.gearRental = []

            let gearRentalDOMArray = $('input[name=gearRental]:checked');

            for (let i = 0; i < gearRentalDOMArray.length; i++) {
                values.gearRental.push(gearRentalDOMArray[i].value);
            }


            $.ajax({
                type: "POST",
                url: "http://localhost:8080/registeredEvents" + id,
                data: JSON.stringify(values),
                //dataType: 'json',
                contentType: "application/json",
                success: function (data) {
                    getRegisteredEvents(updateDOM)
                    console.log("this is ajax success function line one");
                    //console.log(data)
                    //above code does not do anything?

                },
                error: function (err) {
                    console.log(err)
                },
                beforeSend: function (xhr) {

                }
            });
        });
    })
}


/////GET
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
            <div id=${value._id}>
                <p> ID: <span >${value._id}</span></p>
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



//on page load do this
$(function () {
    homePageButtonClickHandler();  
    displayUpcomingEvents();
    getAndDisplayRegisteredEvents();
    deleteRegisteredEvent();
    editRegisteredEvent();
})

