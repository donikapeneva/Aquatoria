(() => {
    const  $itemsContainer = $('#item-container'),
        $adminLink = $('#adminLink');

    let $categorySelect;

    $adminLink.unbind('click');
    $adminLink.on('click', () => {
        $('#adminUploadPhoto').toggle();
    });

    //TODO if no category is chosen then load automatically the first one

    $('ul.categories').find('li').on('click', function () {
        $categorySelect = $(this).html();
        $('#coverText').text($categorySelect);
        listMusic($categorySelect);
    });

    function listMusic(selectedCategory) {
        resetItemsContainer();
        let musicToShow = itemsListData[selectedCategory].items;

        for (let i = 0; i < musicToShow.length; i++) {
            console.log('show ' + musicToShow.length + ' music');


            //set the first image to be the cover photo
            if(i === 0){
                // $('.header-image').css('background', '#525558 url(' + photosToShow[i].body + ')');
            }

            let itemData, itemInfo, itemContainer, itemEdit, itemRemove;

            itemContainer = document.createElement('div');
            let audioContainer = document.createElement('audio');
            audioContainer.setAttribute('controls', '');
            audioContainer.setAttribute('class', 'col');

            //source(src="/static/media/neshto.mp3" type="audio/mpeg")
            audioData = document.createElement('source');
            audioData.setAttribute('src', musicToShow[i].body);
            audioData.setAttribute('type', 'audio/mpeg');

            let audioCaption = document.createElement('div');
            audioCaption.innerHTML = musicToShow[i].title;

            //TODO: if user is admin and he is on edit mode << this may be in other template
            // itemRemove = document.createElement('button');
            // itemRemove.innerHTML = 'remove';
            // itemRemove.onclick = removeItem.bind(this, photosToShow[i]._id);

            // itemContainer.appendChild(itemRemove);
            audioContainer.appendChild(audioData);
            itemContainer.appendChild(audioContainer);
            itemContainer.appendChild(audioCaption);

            $itemsContainer.append(itemContainer);
        }
    }

    $('ul.categories li').click(function() {
        $('html, body').animate({
            scrollTop: $('#coverText').position().top + 50
        }, 500);
    });

    //TODO:
    //a problem may occurs if there's no item of some category
    //the category disappears form the select list
    function resetItemsContainer() {
        $itemsContainer.find('figure').remove();
    }

    function removeItem(id){
        //may more pictures be checked and then -> deletion
        $.ajax({
            url: '/items/photos/delete/' + id,
            method: 'POST',
            //TODO understand
            data: '',
            //TODO understand

        })
            .done((res) => {
                console.log('done');
                window.location = res.redirectRoute;
            })
            .fail((err) => {
                console.log('fail');
                console.log(err);
                let errorObj = JSON.parse(err.responseText);
                // displayValidationErrors(errorObj.message, $errorUploadPhotoContainer);
            });
        console.log('deleting the image');
    }

})();