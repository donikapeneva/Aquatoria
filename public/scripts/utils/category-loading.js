(() => {
    'use strict'

    let $categoriesElements = $('.categories').find('span');
    let i = 0;

    $('.categories li').each(function () {
        console.log('please');
        let $categoryCurrent = $(this).find('span.category-name').html();

        let currentCategoryObject = categoriesWithPicture.find(categoryName);

        function categoryName (currentCategory) {
            return (currentCategory.category === $categoryCurrent);
        }
        $(this).css('background-image', 'url(' + currentCategoryObject.cover + ')');
        i++;
    });

})();