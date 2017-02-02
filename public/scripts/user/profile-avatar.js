(() => {

    //TODO: deal with back button
    // after uploading image -> redirecting route to profile
    // -> back button on browser -> profile avatar -> back -> profile

    //TODO: make this one a fragment

    const MAX_FILE_SIZE = 2 * 1024 * 1024;

    const $avatarForm = $('#user-profile-form'),
        $inputFile = $('#form-file'),
        $uploadButton = $('#upload-button'),
        $avatarFormErrorContainer = $('#error-container');

    //TODO : here is one time !?
    $uploadButton.on('click', () => {

        resetErrorContainer();

        let isFormValid = validateProfileForm();

        if (isFormValid) {
            return Promise.resolve()
                .then(() => {

                    //TODO: new FormData() vs .serializeArray()
                    let formData = new FormData();
                    formData.append('file', $inputFile[0].files[0]);
                    return formData;
                })
                .then((formData) => {
                    $.ajax({
                        url: '/profile/avatar',
                        method: 'POST',
                        //TODO understand
                        contentType: false,
                        data: formData,
                        //TODO understand
                        processData: false
                    })
                        .done((res) => {
                            console.log('done');
                            window.location = res.redirectRoute;
                        })
                        .fail((err) => {
                            console.log('fail');
                            let errorObj = JSON.parse(err.responseText);
                            displayValidationErrors(errorObj.message, 'avatar not uploaded');
                        });
                })
                .catch((err) => {
                    console.log('catch');
                    console.log(err);
                    let errorObj = JSON.parse(err.responseText);
                    displayValidationErrors(errorObj.message, 'avatar not uploaded');
                });
        }
    });

    //TODO:: if style
    function validateProfileForm() {

        resetErrorContainer();

        let isFormValid = true,
            isFileExtensionValid = false,
            isFileSizeValid = false;

        let errMessage = '';

        $avatarForm.find('input').each(function () {
            let input = $(this),
                inputName = input.attr('name');

            if (inputName === 'file') {
                let file = input[0].files[0];

                if (!file) {
                    errMessage = 'Choose file to upload';
                    displayValidationErrors(errMessage, $avatarFormErrorContainer);
                } else {
                    if (file.name.match(/\.(jpg|jpeg|png)$/i)) {
                        isFileExtensionValid = true;
                    } else {
                        errMessage = 'File types allowed: jpg, jpeg, png.';
                        displayValidationErrors(errMessage, $avatarFormErrorContainer);
                    }

                    if (file.size <= MAX_FILE_SIZE) {
                        isFileSizeValid = true;
                    } else {
                        errMessage = 'Maximum file size is 2MB!';
                        displayValidationErrors(errMessage, $avatarFormErrorContainer);
                    }
                }
            }
        });

        if (isFileExtensionValid && isFileSizeValid) {
            isFormValid = true;
        }

        return isFormValid;
    }

    //TODO: ValidationErrors script
    function resetErrorContainer() {
        $avatarFormErrorContainer.find('p').html('');
        $avatarFormErrorContainer.find('p').hide();
    }

    function displayValidationErrors(message, container) {
        container.show();
        console.log(container);
        container.append(
            $(document.createElement('p')).text(message)
        );
    }

})();