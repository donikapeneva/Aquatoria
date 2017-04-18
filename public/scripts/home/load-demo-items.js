(() => {
    'use strict';

    let $rightContainer = $('#rightContainer'),
        $leftContainer = $('#leftContainer'),
        $topContainer = $('#topContainer'),
        $bottomContainer = $('#bottomContainer');

    let demoPictures = [{url: '/static/media/cover1.jpg'},
        {url: '/static/media/cover2.jpg'},
        {url: '/static/media/cover3.jpg'},
        {url: '/static/media/cover4.jpg'}];

    let i = 0;


    // $('')

    // console.log($('#rightContainer > .item-box').attr('src', demoPictures[i].url));

    // $('#rightContainer > .item-box').css('background-image', 'url(\'' + demoPictures[i].url + '\')');

    $rightContainer.find('img').each(function (index, element) {

        $(element).attr('src', demoPictures[i].url)
            .css('opacity', '1');
        i++;
    });
})();