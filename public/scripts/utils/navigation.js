(() => {
    'use strict';

    $('ul.menu-items').unbind('click');
    $('ul.menu-items').on('click', 'li', function(){
        var $selected = $(this).html();
        loadSelected($selected);
    });

    // TODO:
    //Todo: selected changes the color
    function loadSelected (selected) {

    }
})();