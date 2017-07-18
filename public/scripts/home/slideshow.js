(() => {
    var pictures = [{url: '/static/media/cover1.jpg'},
        {url: '/static/media/cover2.jpg'},
        {url: '/static/media/cover3.jpg'},
        {url: '/static/media/cover4.jpg'}];
    let mainCoverUrl = '/static/media/cover.jpg';

    console.log('slideshow');

    // $('.carousel').carousel({
    //     interval: 2000
    // })


    // $('homepage-cover blured').css('background-image', 'url(' + pictures[0].url + ')');


    $('.first').css('background-image', 'url(' + pictures[0].url + ')');
    $('.second').css({
        'background-image': 'url(' + pictures[1].url + ')'
    });

    /*

    $('#slider').each(function () {
        setTimeout(() => {


        }, 1000);
    });

    // let images = $('#slider').children().length;
    let images = pictures.length,
        i = 0;


    // while(true){

        slideshow(0);
        // slideshow(1);
        // slideshow(2);

        if(i < images){
            // continue;
        }
        i++;
    // }

    function slideshow(currentChild) {
        setTimeout(() => {
            // console.log($('#slider:nth-child(' + i + ')'));
            // console.log($('#slider:nth-child(' + i + ')').next());

            console.log('the next one');

            let children = Array.from($('#slider').children());
            console.log(children);

            if(currentChild === images - 1){
                currentChild = 0;
            }



            //     console.log($(children[currentChild]).next());
            // if(!$(children[currentChild]).next()){
            //     currentChild = 0;
            // }

            $(children[currentChild]).css('opacity', 0);
            $(children[currentChild]).next().css('opacity', 1);

            // slideshow(1);

            // $(children[currentChild + 1]).css('opacity', 1);
        }, 1000);
    }
*/

})();