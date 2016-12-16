(() => {
    const ALPHA_PATTERN = /^[A-Za-zА-Яа-я1-9]+$/,
        EMAIL_PATTERN = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        // EMAIL_PATTERN = /^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$/,
        MIN_NAME_LENGTH = 2,
        MAX_NAME_LENGTH = 30;

    const $loginForm = $('#user-login-form'),
        $loginButton = $('#login-button'),
        $loginFormErrorContainer = $('#error-container');
    console.log('in function ' + this.caller);

    $.ajax();

    $loginButton.on('click', () => {
        resetErrorContainer();

        let isFormValid = validateRegistrationForm();

        console.log('isFormValid ' + isFormValid);
        if(isFormValid) {

            return Promise.resolve()
                .then(() => {
                    let dataArray = $loginForm.serializeArray(),
                        dataObj = {};

                    $(dataArray).each(function (i, field) {
                        dataObj[field.name] = field.value;
                    });
                    return dataObj;
                })
                .then((user) => {
                    $.ajax({
                        url: '/login',
                        method: 'POST',
                        contentType: 'application/json',
                        data: JSON.stringify(user)
                    })
                        .done((res) => {
                            window.location = res.redirectRoute;
                        })
                        .fail((err) => {
                            let errorObj = JSON.parse(err.responseText);
                            displayValidationErrors(errorObj.message, $loginFormErrorContainer);
                        });
                })
                .catch((err) => {
                    console.log('v catch');
                    let errorObj = JSON.parse(err.responseText);
                    displayValidationErrors(errorObj.message, $loginFormErrorContainer);
                });
        } else {
            //TODO
            displayValidationErrors('Please, enter a valid values', $loginFormErrorContainer);
        }
    });

    function resetErrorContainer() {
        $loginFormErrorContainer.find('p').html('');
        $loginFormErrorContainer.find('p').hide();
    }

    function displayValidationErrors(message, container) {
        container.show();
        console.log(container);
        container.append(
            $(document.createElement('p')).text(message)
        );
    }

    function validateRegistrationForm() {

        console.log("Validtion function");

        let isFormValid = false,
            isEmailValid = false,
            isPasswordValid = false;

        $loginForm.find('input').each(function() {
            let input = $(this),
                inputName = input.attr('name');

            if (inputName === 'email') {
                isEmailValid = validator.validateInputString(input, MIN_NAME_LENGTH, MAX_NAME_LENGTH, EMAIL_PATTERN);

                console.log('email ' + isEmailValid);
            }

            if (inputName === 'password') {
                isPasswordValid = validator.validateInputString(input, MIN_NAME_LENGTH, MAX_NAME_LENGTH, ALPHA_PATTERN);

                console.log('password ' + isPasswordValid);
            }
        });

        if (isEmailValid && isPasswordValid) {
            isFormValid = true;
        }
        return isFormValid;
    }
})();