(() => {

    //TODO: I wish this could be visualised above

    const MAX_FILE_SIZE = 2 * 1024 * 1024,
        ALPHA_PATTERN = /^[A-Za-zА-Яа-я1-9]+$/,
        MIN_ALPHA_LENGTH = 2,
        MAX_ALPHA_LENGTH = 30;

    const $uploadPhotoForm = $('#upload-photo-form'),
        $errorUploadPhotoContainer = $('#error-upload-photo-container'),
        $uploadPhotoButton = $('#upload-button'),
        $photoFile = $('#form-file'),
        itemContainer = document.getElementById('item-container'),
        itemListChildren = itemContainer.children;

    listPhotos();
    // evalPhotoList();

    function listPhotos() {
        for (let i = 0; i < itemsListData.length; i++) {

            console.log(itemsListData[i]);
            console.log(itemsListData[i].body);

            let itemData, itemInfo;

            itemData = document.createElement('img');
            itemData.src = itemsListData[i].body;
            console.log(itemData);

            itemContainer.append(itemData);
        }
    }


    // //BIND CLICK EVENTS TO ELEMENTS
    // function evalPhotoList() {
    //     let removeBtn;
    //     for (let i = 0; i < itemListChildren.length; i++) {
    //         console.log('element ' + i);
    //         console.log(adminListData[i]);
    //         //ADD CLICK EVENT TO DELETE BUTTON
    //         removeBtn = itemListChildren[i].getElementsByTagName('button')[0];
    //         removeBtn.onclick = removeAdmin.bind(this, i);
    //     }
    // }


    $uploadPhotoButton.unbind('click');
    $uploadPhotoButton.on('click', function () {

        console.log('on click ');
        resetErrorContainer();

        let isFormValid = validateUploadForm();

        if (isFormValid) {
            return Promise.resolve()
                .then(() => {
                    let dataArray = $uploadPhotoForm.serializeArray(),
                        photoInfo = {};

                    $(dataArray).each(function (i, field) {
                        photoInfo[field.name] = field.value;
                    });

                    console.log(photoInfo);

                    // var json = {
                    //     title: $uploadPhotoForm.find('input[name=\'upload-title\']'),
                    //     category: $uploadPhotoForm.find('input[name=\'upload-category\']'),
                    //     // tags: ["pdf", "non-fiction", "literature"],
                    //     // token: "ABCeasyAs123"
                    // };

                    let formData = new FormData();
                    //adding key value pairs
                    // formData.append('user', 'andi');
                    formData.append('file', $photoFile[0].files[0]);
                    // sending a field; blob make it as a 'file'; file is based blob
                    // formData.append('info', new Blob([JSON.stringify(photoInfo)], {type: "application/json"}));
                    formData.append('info', JSON.stringify(photoInfo));

                    // inspect the pairs
                    // for (var pair of formData.entries()) {
                    //     console.log(pair[0]+ ', ' + pair[1]);
                    // }

                    return formData;
                })
                .then((formData) => {

                    $.ajax({
                        url: '/items/photos/create',
                        method: 'POST',
                        //TODO understand
                        contentType: false,  // The content type used when sending data to the server.
                        data: formData,
                        //TODO understand
                        processData: false   // To send DOMDocument or non processed data file it is set to false
                    })
                        .done((res) => {
                            console.log('done');
                            // window.location = res.redirectRoute;
                        })
                        .fail((err) => {
                            console.log('fail');
                            let errorObj = JSON.parse(err.responseText);
                            displayValidationErrors(errorObj.message, 'avatar not uploaded');
                        });
                    // })
                    // .catch((err) => {
                    //
                    // });

                })
        }
    });


    function validateUploadForm() {

        resetErrorContainer();

        let isFormValid = true,
            isFileExtensionValid = false,
            isFileSizeValid = false;

        let errMessage = '';

        $uploadPhotoForm.find('input').each(function () {
            let input = $(this),
                inputName = input.attr('name');

            if (inputName === 'file') {
                let file = input[0].files[0];

                if (!file) {
                    errMessage = 'Choose file to upload';
                    displayValidationErrors(errMessage, $errorUploadPhotoContainer);
                } else {
                    if (file.name.match(/\.(jpg|jpeg|png)$/i)) {
                        isFileExtensionValid = true;
                    } else {
                        errMessage = 'File types allowed: jpg, jpeg, png.';
                        displayValidationErrors(errMessage, $errorUploadPhotoContainer);
                    }

                    if (file.size <= MAX_FILE_SIZE) {
                        isFileSizeValid = true;
                    } else {
                        errMessage = 'Maximum file size is 2MB!';
                        displayValidationErrors(errMessage, $errorUploadPhotoContainer);
                    }
                }

                if (isFileExtensionValid && isFileSizeValid) {
                    isFormValid = true;
                }

            } else {
                //inputName === 'upload-title'
                //inputName === 'upload-category'
                if (!validator.validateInputString(input, MIN_ALPHA_LENGTH, MAX_ALPHA_LENGTH, ALPHA_PATTERN)) {
                    isFormValid = false;
                    let inputLabel = inputName === 'upload-title' ? 'title' : 'category';
                    errMessage = 'The length of the ' + inputLabel + ' must be between 2 and 30 symbols, and cannot contains special signs';
                    displayValidationErrors(errMessage, $errorUploadPhotoContainer);
                }
            }


        });

        return isFormValid;
    }

    function resetErrorContainer() {
        $errorUploadPhotoContainer.find('p').html('');
        $errorUploadPhotoContainer.find('p').hide();
    }

    function displayValidationErrors(message, container) {
        container.show();
        console.log(container);
        container.append(
            $(document.createElement('p')).text(message)
        );
    }

})();