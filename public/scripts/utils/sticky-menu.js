(() => {

    $('#stickyMenu').hide();
    $('#upButton').hide();

    $(window).scroll(function() {
        let winTop = $(window).scrollTop();
        if (winTop >= $('header').height() - 5) {
            $('#stickyMenu').show();
            //it has delay, so if user scrolls fast down and up, it appears where it doesn't have to be
            $('#upButton').fadeIn();
        } else {
            $('#stickyMenu').hide();
            $('#upButton').hide();
        }
    });

    $('#upButton').click(function() {
        console.log('clicckkckckc');
        $('html, body').animate({
            scrollTop: $('header').offset().top
        }, 500);
    });
})();