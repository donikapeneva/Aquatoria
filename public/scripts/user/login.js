'use strict'

const ALPHA_PATTERN = /^[A-Za-zА-Яа-я1-9]+$/;
const EMAIL_PATTERN = /^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$/,
    MIN_NAME_LENGTH = 2,
    MAX_NAME_LENGTH = 30;

(() => {
    const $loginForm = $('#user-login-form'),
        $loginButton = $('#login-button'),
        $loginFormErrorContainer = $('#error-container');

    $loginButton.on('click', () => {
        // resetErrorContainer();

        let isFormValid = validateRegistrationForm();

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
                    let errorObj = JSON.parse(err.responseText);
                    displayValidationErrors(errorObj.message, $loginFormErrorContainer);
                });
        }

    });

    function resetErrorContainer() {
        $loginFormErrorContainer.find('ul').html('');
        $loginFormErrorContainer.hide();
    }

    function displayValidationErrors(message, container) {
        // container.show();

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
                isEmailValid = validator.validateInputString(input, true, true, MIN_NAME_LENGTH, MAX_NAME_LENGTH, EMAIL_PATTERN);
            }

            if (inputName === 'password') {
                isPasswordValid = validator.validateInputString(input, true, true, MIN_NAME_LENGTH, MAX_NAME_LENGTH, ALPHA_PATTERN);
            }
        });

        if (isEmailValid && isPasswordValid) {
            isFormValid = true;
        }

        return isFormValid;
    }

})();