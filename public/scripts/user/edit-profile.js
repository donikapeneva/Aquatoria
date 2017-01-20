(() => {
    const NAME_PATTERN = /^[A-Za-zА-Яа-я]+$/,
        PASSWORD_PATTERN = /^(?=.*).{5,10}$/,
        EMAIL_PATTERN = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        MIN_NAME_LENGTH = 2,
        MAX_NAME_LENGTH = 30;

    //TODO: option to change password

    var $changePassForm = $('#change-password-form'),
        $changePassButton = $('#save-password-button'),
        $passError = $('#password-error-container'),
        $logoutButton = $('#logout-button');

    $logoutButton.unbind('click');
    $logoutButton.on('click', (event) => {
        console.log('I want to log out');
        //TODO: not need to be ajax

        $.ajax({
            url: '/logout',
            method: 'GET',
            contentType: 'application/json'
        })
            .done((res) => {
                window.location = res.redirectRoute;
            })
            .fail((err) => {
                let errorObj = JSON.parse(err.responseText);
                displayValidationErrors(errorObj.message, $passError);
            });

    });

    $changePassButton.unbind('click');
    $changePassButton.on('click', (event) => {

        console.log('cliiiiick to save');

        resetErrorContainer();

        let isFormValid = validatePassForm();

        if(isFormValid){
            console.log('is form valid');
            return Promise.resolve()
                .then(() => {

                    console.log('first then');

                    let dataArray = $changePassForm.serializeArray(),
                        dataObj = {};

                    $(dataArray).each(function (i, field) {
                        dataObj[field.name] = field.value;
                    });
                    console.log(dataObj);
                    return dataObj;
                })
                .then((password) => {

                    console.log('sendidng: ' + password);

                    $.ajax({
                        url: '/changePassword',
                        method: 'POST',
                        contentType: 'application/json',
                        data: JSON.stringify(password)
                    })
                        .done((res) => {
                            window.location = res.redirectRoute;
                        })
                        .fail((err) => {
                            let errorObj = JSON.parse(err.responseText);
                            displayValidationErrors(errorObj.message, $passError);
                        });
                })
                .catch((err) => {
                    let errorObj = JSON.parse(err.responseText);
                    displayValidationErrors(errorObj.message, $passError);
                });
        }
    });

    function validatePassForm(){

        resetErrorContainer();

        let areFieldsValid = true,
            hasNewPass = false,
            errMessage = '';

        if($changePassForm.find("input[name='newPassword']").val().length !== 0 ){
            hasNewPass = true;
        }

        $changePassForm.find('input').each(function () {
            let input = $(this),
                inputName = input.attr('name'),
                isFieldEmpty = input.val().length === 0;

            if(inputName === 'oldPassword'){

                if(hasNewPass && isFieldEmpty && !validator.validateInputByPattern(input, PASSWORD_PATTERN)){
                    areFieldsValid = false;
                    errMessage = 'You must enter your old password';
                    displayValidationErrors(errMessage, $passError);
                    return;
                }
            }

            if(inputName === 'newPassword'){
                if (hasNewPass && !validator.validateInputByPattern(input, PASSWORD_PATTERN)) {
                    areFieldsValid = false;
                    errMessage = 'The password must be between 6 and 10 symbols';
                    displayValidationErrors(errMessage, $passError);
                    return;
                }
            } else if (inputName === 'repeatNewPassword'){
                if(hasNewPass && isFieldEmpty){
                    areFieldsValid = false;
                    errMessage = 'You have to repeat your password';
                    displayValidationErrors(errMessage, $passError);
                    return;
                }
                if ($changePassForm.find("input[name='newPassword']").val() !== input.val()) {
                    areFieldsValid = false;
                    errMessage = 'Passwords don\'t match';
                    displayValidationErrors(errMessage, $passError);
                    return;
                }
            }

        });
        console.log(areFieldsValid);
        return areFieldsValid;
    }

    function displayValidationErrors(message, container) {
        container.show();
        console.log(container);
        container.append(
            $(document.createElement('p')).text(message)
        );
    }

    function resetErrorContainer() {
        $passError.find('p').html('');
        $passError.find('p').remove();
    }




})();