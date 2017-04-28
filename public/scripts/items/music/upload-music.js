(() => {

    console.log('/////////vlizam///////////');

    const MAX_FILE_SIZE = 10 * 1024 * 1024,
        ALPHA_PATTERN = /^[A-Za-zА-Яа-я1-9]+$/,
        MIN_ALPHA_LENGTH = 2,
        MAX_ALPHA_LENGTH = 30;

    const $uploadMusicForm = $('#upload-music-form'),
        $errorUploadMusicContainer = $('#error-upload-music-container'),
        $uploadMusicButton = $('#upload-button'),
        $musicFile = $('#form-file'),
        itemContainer = document.getElementById('item-container'),
        itemListChildren = itemContainer.children,
        $newCategoryBtn = $('#new-category-button');


    console.log(categories);


    $("#form-file").unbind('change');
    $("#form-file").change(function(e) {
        console.log('changeeeeed ');
        $('#selectedImage').find('img').remove();

        for (var i = 0; i < e.originalEvent.srcElement.files.length; i++) {

            var file = e.originalEvent.srcElement.files[i];

            var img = document.createElement("img");
            // // if()
            // img.style.display = 'inline-block';
            // img.style.height = '100%';
            // vertical-align: middle;

            var reader = new FileReader();
            reader.onloadend = function() {
                img.src = reader.result;
            };
            reader.readAsDataURL(file);
            $('#selectedImage').append(img);
        }
    });

    $newCategoryBtn.unbind('click');
    $newCategoryBtn.on('click', function(){
        console.log('click new category');

        resetErrorContainer();

        var category = prompt("Enter new category");

        if (category != null) {
            if(categories.includes(category)){
                alert('This category already exists.');
            } else{
                //TODO: jquery or vanilla ?
                let categorySelect = document.getElementById('form-select-category');
                categorySelect.options[categorySelect.options.length] = new Option(category, category);
                $("#form-select-category").val(category);
            }
        }
    });

    $uploadMusicButton.unbind('click');
    $uploadMusicButton.on('click', function () {

        console.log('on click ');
        resetErrorContainer();

        let isFormValid = validateUploadForm();

        if (isFormValid) {
            return Promise.resolve()
                .then(() => {
                    let dataArray = $uploadMusicForm.serializeArray(),
                        musicInfo = {};

                    $(dataArray).each(function (i, field) {
                        musicInfo[field.name] = field.value;
                    });

                    console.log(musicInfo);

                    // var json = {
                    //     title: $uploadPhotoForm.find('input[name=\'upload-title\']'),
                    //     category: $uploadPhotoForm.find('input[name=\'upload-category\']'),
                    //     // tags: ["pdf", "non-fiction", "literature"],
                    //     // token: "ABCeasyAs123"
                    // };

                    let formData = new FormData();
                    //adding key value pairs
                    // formData.append('user', 'andi');
                    formData.append('file', $musicFile[0].files[0]);
                    // sending a field; blob make it as a 'file'; file is based blob
                    // formData.append('info', new Blob([JSON.stringify(photoInfo)], {type: "application/json"}));
                    formData.append('info', JSON.stringify(musicInfo));

                    // inspect the pairs
                    // for (var pair of formData.entries()) {
                    //     console.log(pair[0]+ ', ' + pair[1]);
                    // }

                    return formData;
                })
                .then((formData) => {

                    $.ajax({
                        url: '/items/music/create',
                        method: 'POST',
                        //TODO understand
                        contentType: false,  // The content type used when sending data to the server.
                        data: formData,
                        //TODO understand
                        processData: false   // To send DOMDocument or non processed data file it is set to false
                    })
                        .done((res) => {
                            console.log('done');
                            console.log(res.redirectRoute);
                            window.location = res.redirectRoute;
                        })
                        .fail((err) => {
                            console.log('fail');
                            let errorObj = JSON.parse(err.responseText);
                            displayValidationErrors(errorObj.message, $errorUploadMusicContainer);
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

        $uploadMusicForm.find('input').each(function () {
            let input = $(this),
                inputName = input.attr('name');

            if (inputName === 'file') {
                let file = input[0].files[0];

                if (!file) {
                    errMessage = 'Choose file to upload';
                    displayValidationErrors(errMessage, $errorUploadMusicContainer);
                } else {
                    if (file.name.match(/\.(mp3)$/i)) {
                        isFileExtensionValid = true;
                    } else {
                        errMessage = 'File types allowed: jpg, jpeg, png.';
                        displayValidationErrors(errMessage, $errorUploadMusicContainer);
                    }

                    if (file.size <= MAX_FILE_SIZE) {
                        isFileSizeValid = true;
                    } else {
                        errMessage = 'Maximum file size is 2MB!';
                        displayValidationErrors(errMessage, $errorUploadMusicContainer);
                    }
                }

                if (isFileExtensionValid && isFileSizeValid) {
                    isFormValid = true;
                }

            } else {
                //inputName === 'upload-title'
                if (!validator.validateInputString(input, MIN_ALPHA_LENGTH, MAX_ALPHA_LENGTH, ALPHA_PATTERN)) {
                    isFormValid = false;
                    errMessage = 'The length of the title must be between 2 and 30 symbols, and cannot contains special signs';
                    displayValidationErrors(errMessage, $errorUploadMusicContainer);
                }
            }


        });

        return isFormValid;
    }

    function resetErrorContainer() {
        $errorUploadMusicContainer.find('p').html('');
        $errorUploadMusicContainer.find('p').hide();
    }

    function displayValidationErrors(message, container) {
        container.show();
        console.log(container);
        container.append(
            $(document.createElement('p')).text(message)
        );
    }

})();