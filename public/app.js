
//Click on Tab Functionality in Login Form
$('.signup-tab').css('background', '#f9fbfd');
$('.login-form').hide();
$('.login-tab').css('background', '#A9A9A9');


$('.login-tab').click(event => {
    event.preventDefault();
    $('.register-form').hide();
    $('.login-form').show();
    $('.signup-tab').css('background', '#A9A9A9');
    $('.login-tab').css('background', '#f9fbfd');
});


$('.signup-tab').click(event => {
    event.preventDefault();
    $('.register-form').show();
    $('.login-form').hide();
    $('.login-tab').css('background', '#A9A9A9');
    $('.signup-tab').css('background', '#f9fbfd');
});



//REGISTER New User
//AJAX POST Request

$('.js-register-form').submit(function (event) {
    event.preventDefault();
    
    let userData = {}
    
    userData.firstName = $('.inputFirstName').val()
    userData.lastName = $('.inputLastName').val()
    userData.username = $('.inputUsername').val()
    userData.password = $('.inputPassword').val()
    
    $.ajax({
        type: "POST",
        contentType: 'application/json',
        url: '/api/users',
        data: JSON.stringify(userData)
    })
        .done(function (user) {
            $('.input').val("");
            ajaxAuthCall();
        })
        .fail(function (error) {
            $('.input').val("");
            console.log(error);
            $('.register-alert').html("");
            $('.register-alert').html(`
                    <p class="landing-alert">${error.responseJSON.message}</p>
                `);
        })

    function ajaxAuthCall() {
        $.ajax({
            type: "POST",
            headers: { 'Content-Type': 'application/json' },
            //contentType: 'application/json',
            url: '/api/auth/login',
            data: JSON.stringify(userData)
        })
            .done(function (user) {
                $('.input').val("");
                localStorage.setItem('token', user.authToken);
                localStorage.setItem('userID', user.userID);
                displayUpcomingEvents();
            })
            .fail(function (error) {
                
            })
    }
});

//login existing user
function logInExisting(ajaxAuthCall) {
    $('.js-login-form').submit(function (event) {
        event.preventDefault();

        let userData = {}
        userData.username = $('.js-login-form .inputUsername').val()
        userData.password = $('.js-login-form .inputPassword').val()

        $.ajax({
            type: "POST",
            headers: { 'Content-Type': 'application/json' },
            //contentType: 'application/json',
            url: '/api/auth/login',
            data: JSON.stringify(userData)
        })
            .done(function (user) {
                $('.input').val("");
                console.log('this is user for existing login', user)
                console.log('this is user.userID : ', user.userID)
                localStorage.setItem('token', user.authToken);
                localStorage.setItem('userID', user.userID);
                displayUpcomingEvents()
                $('.login-form-container').hide();
            })
            .fail(function (error) {
                $('.input').val("");
                $('.login-alert').html(`
                        <p class="landing-alert">This username & password combination is not valid</p>
                    `);
            })
    });
}
logInExisting();

$('#signout').on('click', event => {
    event.preventDefault();
    localStorage.clear();
    window.location.href = 'index.html';
});

/////GET
function displayUpcomingEvents() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/upcomingEvents",
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
        data: {},
        dataType: 'json',
        success: function (data) {
            console.log(data);
            $('.registered-text').hide();
            $('.upcoming-text').show();
            $('.login-form-container').hide()
            $('.div-c').hide();
            $('.main-div').show();
            $('.main-div').html("");

            for (value of data.events) {
                $('.main-div').append(
                    `
                        <div class="track-event-wrapper">
                            <div id=${value._id}>
                                <p class="track-event-id hidden"> ID: <span >${value._id}</span></p>
                                <p class="track-name">trackName: ${value.trackName}</p>
                                <p class="eventData"> eventDate: ${value.eventDate}</p>
                                <button class="register-button" type="button">REGISTER</button>
                            </div>
                        </div>
                     `
                );
            }
            registerButtonClickHandler();
        },
        fail: function() {
            console.log('fail')
        },
        error: function (err) {
            console.log('error')
            $('.main-div').hide();
            $('.div-c').show();
            $('.login-form-container').show();
        },
        beforeSend: function (xhr) {

        }
    });
}

function getAndDisplayRegisteredEvents() {
    $('.registered-events-button').on('click', function (event) {
        
        $('.login-form-container').hide()
        $('.main-div').html("");
        getRegisteredEvents(updateDOM);
    })
}

function getRegisteredEvents(callbackFn) {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/registeredEvents",
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
        data: {},
        dataType: 'json',
        success: function (data) {
            $('.registered-text').show();
            callbackFn(data) 
            
        },
        error: function (err) {
            console.log(err);
            console.log('error');
            // $('.div-c').hide();
            $('.div-c').show();
            $('.main-div').hide();
            $('.login-form-container').show();
        },
        beforeSend: function (xhr) {
        
        }
    });
}

function updateDOM(data) {
    $('.main-div').html("");
    
    for (value of data.events) {
        $('.main-div').append(
            `
            <div class="track-event-wrapper">    
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

//////POST 
function registerButtonClickHandler() {
    $('body').on('click', '.register-button', function (event) {

        //clearn & update DOM to ask for user input 
        $('.main-div').html("");
        $('.main-div').append(
            `
            <form id="registration">
                <fieldset class="event-register-form">
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
                </fieldset>
            </form>
            `
        );

        let id = $(this).parent().attr('id');
        let trackName = $($(this).parent().find('p')[1]).html();
        let trackNameString = trackName.split("trackName: ")[1]
        let eventDate = $($(this).parent().find('p')[2]).html();
        let eventDateString = eventDate.split("eventDate: ")[1];
        
        $("#registration").submit(function (event) {
            event.preventDefault();

            let values = {
                trackName: trackNameString,
                eventDate: eventDateString,
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
                url: "http://localhost:8080/registeredEvents/" + id,
                data: JSON.stringify(values),
                //dataType: 'json',
                contentType: "application/json",
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
                success: function (data) {
                    getRegisteredEvents(updateDOM)
                    console.log("this is ajax success function line one");
                    console.log('this is data from AJAX POST request', data)
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



//////PUT
function editRegisteredEvent() {
    $('body').on('click', '.edit-button', function (event) {
        //ask user for input
        $('.main-div').html("");
        $('.main-div').append(
            `
            <form id="update">
                <fieldset>
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
                </fieldset>
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
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
                success: function (data) {
                    getRegisteredEvents(updateDOM);
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



//DELETE
function deleteRegisteredEvent() {
    $('body').on('click', '.delete-button', function (event) {

        let id = $(this).parent().attr('id');

        $.ajax({
            type: "DELETE",
            url: "http://localhost:8080/registeredEvents" + id,
            data: {},
            dataType: 'json',
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
            success: function (data) {
                //updateDOM(data);
                getRegisteredEvents(updateDOM)
            },
            error: function (err) {
                console.log(err)
            },
            beforeSend: function (xhr) {

            }
        });
    })
}


function homePageButtonClickHandler() {
    $('body').on('click', '.homepage-button', function (event) {
        $('.upcoming-text').hide();
        $('.registered-text').hide();
        $('.login-form-container').hide();
        $('.div-c').hide();
        $('.div-a').show();
        $('.div-b').show();
        $('.main-div').html("");
    });
}

function upcomingEventsHandler() {
    $('body').on('click', '.upcoming-events-button', function (event) {
        $('.login-form-container').hide();
        $('.div-a').hide();
        $('.div-b').hide();
        displayUpcomingEvents();
    });
}

function registeredEventsHandler() {
    $('.registered-events-button').on('click', function (event) {
        $('.upcoming-text').hide();
        $('.login-form-container').hide()
        $('.div-a').hide();
        $('.div-b').hide();
        // $('.main-div').html("");
        getRegisteredEvents(updateDOM);
    })
}

function eventScheduleHandler() {
    $('body').on('click', '.event-schedule-btn', function (event) {
        $('.div-a').hide();
        $('.div-b').hide();
        displayUpcomingEvents();
    });
}

function loginHandler() {
    $('body').on('click', '.login-button', function (event) {
        $('.div-a').hide();
        $('.div-b').hide();
        $('.div-c').hide();
        $('.login-form-container').show();
    });
}



//on page load do this
$(function () {
    homePageButtonClickHandler();  
    upcomingEventsHandler();
    loginHandler();
    eventScheduleHandler();
    registeredEventsHandler();
    deleteRegisteredEvent();
    editRegisteredEvent();
})

