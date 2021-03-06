//Responsive Navbar 
$('.hamburger').click(event => {
    $('.mobile-nav-item').toggle();
})

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
            $('.register-alert').html("");
            $('.register-alert').html(`
                    <p class="landing-alert">${error.responseJSON.message}</p>
                `);
        })

    function ajaxAuthCall() {
        $.ajax({
            type: "POST",
            headers: { 'Content-Type': 'application/json' },
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
            url: '/api/auth/login',
            data: JSON.stringify(userData)
        })
            .done(function (user) {
                $('.input').val("");
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

$('.signout').on('click', event => {
    event.preventDefault();
    localStorage.clear();
    window.location.href = 'index.html';
});

/////GET
function displayUpcomingEvents() {
    $.ajax({
        type: "GET",
        url: "/upcomingEvents",
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
        data: {},
        dataType: 'json',
        success: function (data) {
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
                                <p class="track-name">${value.trackName}</p>
                                <p class="event-date"> ${moment(value.eventDate).format("MMM Do, YYYY")}</p>
                                <button class="register-button" type="button">REGISTER</button>
                            </div>
                        </div>
                     `
                );
            }
            registerButtonClickHandler();
        },
        error: function (err) {
            $('.main-div').hide();
            $('.div-c').show();
            $('.login-form-container').show();
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
        url: "/registeredEvents",
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
        data: {},
        dataType: 'json',
        success: function (data) {
            $('.upcoming-text').hide();
            $('.registered-text').show();
            callbackFn(data) 
        },
        error: function (err) {
            $('.div-c').show();
            $('.main-div').hide();
            $('.login-form-container').show();
        }
    });
}

function updateDOM(data) {
    $('.main-div').html("");

    for (value of data.events) {
        if (value.needToRentBike === true) {
            value.needToRentBike = "Yes";
        } else {
            value.needToRentBike = "No";
        }

        if (value.needToRentHelmet === true) {
            value.needToRentHelmet = "Yes";
        } else {
            value.needToRentHelmet = "No";
        }

        if (value.needToRentSuit === true) {
            value.needToRentSuit = "Yes";
        } else {
            value.needToRentSuit = "No";
        }        

        if (value.needToRentGloves === true) {
            value.needToRentGloves = "Yes";
        } else {
            value.needToRentGloves = "No";
        }

        if (value.needToRentBoots === true) {
            value.needToRentBoots = "Yes";
        } else {
            value.needToRentBoots = "No";
        }

        $('.main-div').append(
            `
            <div class="track-event-wrapper">    
                <div id=${value._id}>
                    <p class="track-name"> ${value.trackName}</p>
                    <p> ${value.eventDate}</p>
                    <br>
                    <p> First Name: ${value.firstName} <p>
                    <p> Last Name: ${value.lastName} <p>
                    <br>
                    <p> Will you be renting a motorcycle?: ${value.needToRentBike}</p>
                    <p> Will you be renting a helmet: ${value.needToRentHelmet}</p>
                    <p> Will you be renting a leather suit: ${value.needToRentSuit}</p>
                    <p> Will you be renting gloves: ${value.needToRentGloves}</p>
                    <p> Will you be renting boots: ${value.needToRentBoots}</p>
                    <button class="edit-button" type="button">EDIT DETAILS</button>
                    <button class="delete-button" type="button">CANCEL YOUR RESERVATION</button><br><br>
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
                    <p class="event-form-title">Registration Details</p>
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
                        <label class="rental-label" for="helmet">Helmet</label>
                    </div>
                    <div>
                        <input type="checkbox" name="gearRental" value="Leather-Racing-Suit">
                        <label class="rental-label" for="Leather-Racing-Suit">Leather Racing Suit</label>
                    </div>
                    <div>
                    <input type="checkbox" name="gearRental" value="Gloves">
                    <label class="rental-label" for="gloves">Gloves</label>
                    </div>
                    <div>
                    <input type="checkbox" name="gearRental" value="Boots">
                    <label class="rental-label" for="Boots">Boots</label>
                    <div>
                    <input class="submit-button" type="submit" value="Submit">
                    </div>
                </fieldset>
            </form>
            `
        );

        let id = $(this).parent().attr('id');
        let trackName = $($(this).parent().find('p')[1]).html();
        
        let eventDate = $($(this).parent().find('p')[2]).html();
        
        $("#registration").submit(function (event) {
            event.preventDefault();

            let values = {
                trackName: trackName,
                eventDate: eventDate,
                motorcycleRentalAnswer: "",
                gearRental: ""
            };

            let $inputs = $('#update :input');

            values.motorcycleRentalAnswer = $('input[name=motorcycleRentalAnswer]:checked').val();
            values.firstName = $('input[name=firstName]').val();
            values.lastName = $('input[name=lastName]').val();
            values.gearRental = []

            let gearRentalDOMArray = $('input[name=gearRental]:checked');

            for (let i = 0; i < gearRentalDOMArray.length; i++) {
                values.gearRental.push(gearRentalDOMArray[i].value);
            }

            $.ajax({
                type: "POST",
                url: "registeredEvents/" + id,
                data: JSON.stringify(values),
                contentType: "application/json",
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
                success: function (data) {
                    getRegisteredEvents(updateDOM)
                },
                error: function (err) {
                    alert('an error occured, please try again');
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
                <fieldset class="event-update-form">
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
                        <label class="rental-label" for="helmet">Helmet</label>
                    </div>
                    <div>
                        <input type="checkbox" name="gearRental" value="Leather-Racing-Suit">
                        <label class="rental-label" for="Leather-Racing-Suit">Leather Racing Suit</label>
                    </div>
                    <div>
                    <input type="checkbox" name="gearRental" value="Gloves">
                    <label class="rental-label" for="gloves">Gloves</label>
                    </div>
                    <div>
                    <input type="checkbox" name="gearRental" value="Boots">
                    <label class="rental-label" for="Boots">Boots</label>
                    <div>
                    <input class="submit-button" type="submit" value="Submit">
                    </div>
                </fieldset>
            </form>
            `
        );

        let id = $(this).parent().attr('id');

        $("#update").submit(function (event) {
            event.preventDefault();

            let values = {
                motorcycleRentalAnswer: "",
                gearRental: ""
            };

            let $inputs = $('#update :input');

            values.motorcycleRentalAnswer = $('input[name=motorcycleRentalAnswer]:checked').val();
            values.firstName = $('input[name=firstName]').val();
            values.lastName = $('input[name=lastName]').val();
            values.gearRental = []

            let gearRentalDOMArray = $('input[name=gearRental]:checked');

            for (let i = 0; i < gearRentalDOMArray.length; i++) {
                values.gearRental.push(gearRentalDOMArray[i].value);
            }

            $.ajax({
                type: "PUT",
                url: "/registeredEvents" + id,
                data: JSON.stringify(values),
                contentType: "application/json",
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
                success: function (data) {
                    getRegisteredEvents(updateDOM);
                },
                error: function (err) {
                    alert('an error occured, please try again');
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
            url: "/registeredEvents" + id,
            data: {},
            dataType: 'json',
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
            success: function (data) {
                getRegisteredEvents(updateDOM)
            },
            error: function (err) {
                alert('an error occured, please try again');
            }
        });
    })
}


function homePageButtonClickHandler() {
    $('body').on('click', '.homepage-button', function (event) {
        $('.v-header').show();
        $('.nav-bar').addClass('.hidden')
        $('.upcoming-text').hide();
        $('.registered-text').hide();
        $('.login-form-container').hide();
        $('.div-c').hide();
        $('.div-b').show();
        $('.main-div').html("");
    });
}

function upcomingEventsHandler() {
    $('body').on('click', '.upcoming-events-button', function (event) {
        $('.v-header').hide();
        $('.div-video').hide();
        $('.login-form-container').hide();
        $('.div-b').hide();
        $('.div-c').hide();
        displayUpcomingEvents();
    });
}

function registeredEventsHandler() {
    $('.registered-events-button').on('click', function (event) {
        $('.v-header').hide();
        $('.main-div').html("");
        $('.upcoming-text').hide();
        $('.login-form-container').hide()
        $('.div-b').hide();
        $('.div-c').hide();
        getRegisteredEvents(updateDOM);
    })
}

function eventScheduleHandler() {
    $('body').on('click', '.event-schedule-btn', function (event) {
        $('.v-header').hide();
        $('.div-b').hide();
        displayUpcomingEvents();
    });
}

function loginHandler() {
    $('body').on('click', '.login-button', function (event) {
        $('.main-div').html("");
        $('.registered-text').hide();
        $('.div-c').show();
        $('.v-header').hide();
        $('.div-b').hide();
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


