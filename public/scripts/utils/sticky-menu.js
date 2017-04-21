(() => {
    $(window).scroll(function() {
        let winTop = $(window).scrollTop();
        if (winTop >= $('header').height() - 5) {
            $('#stickyMenu').css('visibility', 'visible');
            $('#upButton').css('visibility', 'visible');
        } else {
            $('#stickyMenu').css('visibility', 'hidden');
            $('#upButton').css('visibility', 'hidden');
        }
    })

    $('#upButton').click(function() {
        console.log('clicckkckckc');
        $('html, body').animate({
            scrollTop: $('header').offset().top
        }, 500);
    });
})();