(() => {
    'use strict';

    $('ul.menu-items').unbind('click');
    $('ul.menu-items').on('click', 'li', function(){
        var $selected = $(this).html();
        loadSelected($selected);
    });

    // TODO:
    function loadSelected (selected) {

    }
})();