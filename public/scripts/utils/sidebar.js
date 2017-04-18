(() => {
    'use strict';

    $('#backArrow').unbind('click');
    $('#forwardArrow').unbind('click');


    $('#backArrow').on('click', function () {
        $(".sidebar-wrapper").animate({width: 'toggle'}, 350);
        // $(".sidebar-wrapper").unbind('mouseleave');
    });

    $('#forwardArrow').on('click', function () {
        $(".sidebar-wrapper").animate({width: 'toggle'}, 350);
        // $(".sidebar-wrapper").bind('mouseenter').bind('mouseleave')
    });


    $(".sidebar-wrapper").unbind('mouseenter').unbind('mouseleave');
    $(".sidebar-wrapper").hover(
        function () {},
        function () {
            setTimeout(function () {
                console.log($(".sidebar-wrapper").mouseover());
                if($(".sidebar-wrapper").css('display') !== 'none'){
                    $(".sidebar-wrapper").animate({width: 'toggle'}, 350);

                }
            }, 300);
        }
    )
})();