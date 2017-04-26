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
        listPhotos($categorySelect);
    });

    function listPhotos(selectedCategory) {
        resetItemsContainer();
        let photosToShow = itemsListData[selectedCategory].items;

        for (let i = 0; i < photosToShow.length; i++) {

            //set the first image to be the cover photo
            if(i === 0){
                // $('.header-image').css('background', '#525558 url(' + photosToShow[i].body + ')');
            }

            let itemData, itemInfo, itemContainer, itemEdit, itemRemove;

            itemContainer = document.createElement('figure');

            itemData = document.createElement('img');
            itemData.src = photosToShow[i].body;

            let figCaption = document.createElement('figcaption');
            figCaption.innerHTML = photosToShow[i].description;

            //TODO: if user is admin and he is on edit mode << this may be in other template
            // itemRemove = document.createElement('button');
            // itemRemove.innerHTML = 'remove';
            // itemRemove.onclick = removeItem.bind(this, photosToShow[i]._id);

            // itemContainer.appendChild(itemRemove);
            itemContainer.appendChild(itemData);
            itemContainer.appendChild(figCaption);

            $itemsContainer.append(itemContainer);
        }
    }

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