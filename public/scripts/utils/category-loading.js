(() => {
    'use strict'

    let $categoriesElements = $('.categories').find('span');
    let i = 0;

    $('.categories.full li').each(function () {
        console.log('please');
        let $categoryCurrent = $(this).find('span.category-name').html();

        let currentCategoryObject = categoriesWithPicture.find(categoryName);

        function categoryName(currentCategory) {
            return (currentCategory.category === $categoryCurrent);
        }

        $(this).find('span.category-cover').css('background-image', 'url(' + currentCategoryObject.cover + ')');
        i++;

        // $(this).on('click')
    });

    $('.categories li').each(function () {
        let $this = $(this);
        // $this.mouseenter( handlerIn($this) ).mouseleave( handlerOut($this) );
        $this.mouseenter( function (){
            console.log('yup, thats me');
            //TODO: .addClass('visible')
            $this.find('.category-name').addClass('visible');
        } ).mouseleave( function (){
            $this.find('.category-name').removeClass('visible');
        }  );
    })
    //
    // function handlerIn(element){
    //     element.find('.category-name').show();
    // }
    //
    // function handlerOut(element){
    //     element.find('.category-name').hide();
    // }

})();