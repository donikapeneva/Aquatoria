// 'use strict'


(() => {
    const EMAIL_PATTERN = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        PASSWORD_PATTERN = /^(?=.*).{5,10}$/,
        //TODO: include the lenght in the pattern
    NAME_PATTERN = /^[A-Za-zА-Яа-я]+$/,
        MIN_NAME_LENGTH = 2,
        MAX_NAME_LENGTH = 30;

    const $registerForm = $('#user-registration-form'),
        $registerButton = $('#register-button'),
        //TODO: export the error container
        $registerFormError = $('#register-error-container');

    //TODO:
    $registerButton.unbind('click');

    $registerButton.on('click', (event) => {

        resetErrorContainer();

        let isFromValid = validateRegistrationForm();

        if (isFromValid) {

            return Promise.resolve()
                .then(() => {
                    let dataArray = $registerForm.serializeArray(),
                        dataObj = {};

                    $(dataArray).each(function (i, field) {
                        dataObj[field.name] = field.value;
                    });

                    return dataObj;
                })
                .then((user) => {
                    console.log('JSON.stringify(user) ' + JSON.stringify(user));
                    $.ajax({
                        url: '/register',
                        method: 'POST',
                        contentType: 'application/json',
                        data: JSON.stringify(user)
                    }).done((result) => {
                        console.log('done ');
                        window.location = result.redirectRoute;
                    }).fail((err) => {
                        console.log('failed ');
                        console.log(err);
                        console.log(err.responseText);
                        let errors = JSON.parse(err.responseText);
                        errors.forEach((errMsg) => {
                            displayValidationErrors(errMsg, $registerFormError);
                        });
                    });
                })
                .catch((err) => {
                    console.log('catched ');
                    let errMsg = JSON.parse(err.responseText);
                    displayValidationErrors(errMsg, $registerFormError);
                });
        }

        event.preventDefault();

    });

    function resetErrorContainer() {
        $registerFormError.find('p').html('');
        $registerFormError.find('p').hide();
    }

    function displayValidationErrors(message, container) {
        container.show();
        console.log(container);
        container.append(
            $(document.createElement('p')).text(message)
        );
    }

    function validateRegistrationForm() {

        resetErrorContainer();

        let areFieldsValid = true;
        let errMessage = '';

        $registerForm.find('input').each(function () {
            let input = $(this),
                inputName = input.attr('name');

            if (inputName === 'email') {
                if (!validator.validateInputByPattern(input, EMAIL_PATTERN)) {
                    areFieldsValid = false;
                    errMessage = 'Please, enter valid email';
                    displayValidationErrors(errMessage, $registerFormError);
                }
            }
            else if (inputName === 'password') {
                if (!validator.validateInputByPattern(input, PASSWORD_PATTERN)) {
                    areFieldsValid = false;
                    errMessage = 'The password must be between 6 and 10 symbols';
                    displayValidationErrors(errMessage, $registerFormError);
                }
            }
            else if (inputName === 'repeatPassword') {
                if ($registerForm.find("input[name='password']").val() !== input.val()) {
                    areFieldsValid = false;
                    errMessage = 'Passwords don\'t match';
                    displayValidationErrors(errMessage, $registerFormError);
                }
            }
            else {
                if (!validator.validateInputString(input, MIN_NAME_LENGTH, MAX_NAME_LENGTH, NAME_PATTERN)) {
                    areFieldsValid = false;
                    errMessage = 'The name must be more than 2 symbols';
                    displayValidationErrors(errMessage, $registerFormError);
                }
            }
        });

        if (!areFieldsValid) {
            // displayValidationErrors(errMessage, $registerFormError);
        }

        return areFieldsValid;
    }

})();