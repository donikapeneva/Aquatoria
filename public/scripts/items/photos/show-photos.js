(() => {

    const $categorySelect = $('#select-category'),
        $itemsContainer = $('#item-container');

    listPhotos($categorySelect.val());

    console.log($categorySelect.val());
    console.log(itemsListData);

    $categorySelect.unbind('change');
    $categorySelect.on('change', function(){
        listPhotos($categorySelect.val());
    });


    // evalPhotoList();

    function listPhotos(selectedCategory) {
        resetItemsContainer();
        console.log('listing photos');
        let photosToShow = itemsListData[selectedCategory].items;
        console.log(photosToShow.items);

        for (let i = 0; i < photosToShow.length; i++) {

            // $itemsContainer.find('img').attr('src', photosToShow[i].body);
            let itemData, itemInfo, itemContainer, itemEdit, itemRemove;

            itemContainer = document.createElement('span');

            itemData = document.createElement('img');
            itemData.src = photosToShow[i].body;
            itemData.style.height = '200px';
            itemData.style.width = '250px';
            // console.log(itemData);

            //TODO: if user is authenticated
            itemRemove = document.createElement('button');
            itemRemove.innerHTML = 'remove';
            itemRemove.onclick = removeItem.bind(this, photosToShow[i]._id);

            console.log(photosToShow[i]);

            itemContainer.appendChild(itemRemove);
            itemContainer.appendChild(itemData);

            $itemsContainer.append(itemContainer);
        }
    }

    //TODO:
    //a problem may occurs if there's no item of some category
    //the category disappears form selection list
    function resetItemsContainer() {
        $itemsContainer.find('span').remove();
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