(() => {
    'use strict';

    // const $toVideo = $('#user-login-form'),
    //     $loginButton = $('#login-button'),
    //     $loginFormErrorContainer = $('#error-container');

    $('.wrapper.triangle.top').on('click', function () {
        location.href = '/home';
    });

    $('.wrapper.triangle.right').on('click', function () {
        location.href = '/items/photos';
    });

    $('.wrapper.triangle.bottom').on('click', function () {
        location.href = '/home';
    });

    $('.wrapper.triangle.left').on('click', function () {
        location.href = '/home';
    });

    $('.wrapper.triangle.top').hover(
        function () {
            $('div.container.top').css('visibility', 'visible').fadeIn( 500 );
            console.log('i dsjikfdif');
        },
        function () {
            $('.container.top').css('visibility', 'hidden').fadeOut(100);
        });

    $('.wrapper.triangle.right').hover(
        function () {
            $('div.container.right').css('visibility', 'visible').fadeIn( 500 );
            console.log('i dsjikfdif');
        },
        function () {
            $('.container.right').css('visibility', 'hidden').fadeOut(100);
        });

    $('.wrapper.triangle.bottom').hover(
        function () {
            $('div.container.bottom').css('visibility', 'visible').fadeIn( 500 );
            console.log('i dsjikfdif');
        },
        function () {
            $('.container.bottom').css('visibility', 'hidden').fadeOut(100);
        });

    $('.wrapper.triangle.left').hover(
        function () {
            $('div.container.left').css('visibility', 'visible').fadeIn( 500 );
            console.log('i dsjikfdif');
        },
        function () {
            $('.container.left').css('visibility', 'hidden').fadeOut(100);
        });

})();