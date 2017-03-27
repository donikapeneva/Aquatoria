(() => {
    'use strict';

    const fadeInTime = 300,
        fadeOutTime = 100,
        onHoverOpacity = '1',
        fadeOpacity = '0.5';

    let topTriangleBtn = $('.wrapper.triangle.top'),
        rightTriangleBtn = $('.wrapper.triangle.right'),
        bottomTriangleBtn = $('.wrapper.triangle.bottom'),
        leftTriangleBtn = $('.wrapper.triangle.left'),
        topContainer = $('.container.top'),
        rightContainer = $('.container.right'),
        bottomContainer = $('.container.bottom'),
        leftContainer = $('.container.left');

    topTriangleBtn
        .on('click', function () {
            location.href = '/home';
        })
        .hover(
            function () {
                topContainer.css('visibility', 'visible').fadeIn(fadeInTime);
                topTriangleBtn.css('opacity', onHoverOpacity);
            },
            function () {
                setTimeout(() => {
                    if ($('.container.top:hover').length == 0) {
                        topContainer.css('visibility', 'hidden').fadeOut(fadeOutTime);
                        topTriangleBtn.css('opacity', fadeOpacity);
                    }
                }, 200);
            });

    topContainer
        .hover(
            function () {
                topContainer.css('visibility', 'visible');
            },
            function () {
                topContainer.css('visibility', 'hidden').fadeOut(fadeOutTime);
                topTriangleBtn.css('opacity', fadeOpacity);
            });

    rightTriangleBtn
        .on('click', function () {
            location.href = '/home';
        })
        .hover(
            function () {
                rightContainer.css('visibility', 'visible').fadeIn(fadeInTime);
                rightTriangleBtn.css('opacity', onHoverOpacity);
                // console.log($('#rightContainer > .img-box').css('opacity', onHoverOpacity));
            },
            function () {
                setTimeout(() => {
                    if ($('.container.right:hover').length == 0) {
                        rightContainer.css('visibility', 'hidden').fadeOut(fadeOutTime);
                        rightTriangleBtn.css('opacity', fadeOpacity);
                    }
                }, 200);
            });

    rightContainer
        .hover(
            function () {
                rightContainer.css('visibility', 'visible');
            },
            function () {
                rightContainer.css('visibility', 'hidden').fadeOut(fadeOutTime);
                rightTriangleBtn.css('opacity', fadeOpacity);
            });

    bottomTriangleBtn
        .on('click', function () {
            location.href = '/home';
        })
        .hover(
            function () {
                bottomContainer.css('visibility', 'visible').fadeIn(fadeInTime);
                bottomTriangleBtn.css('opacity', onHoverOpacity);
            },
            function () {
                setTimeout(() => {
                    if ($('.container.bottom:hover').length == 0) {
                        bottomContainer.css('visibility', 'hidden').fadeOut(fadeOutTime);
                        bottomTriangleBtn.css('opacity', fadeOpacity);
                    }
                }, 200);
            });

    bottomContainer
        .hover(
            function () {
                bottomContainer.css('visibility', 'visible');
            },
            function () {
                bottomContainer.css('visibility', 'hidden').fadeOut(fadeOutTime);
                bottomTriangleBtn.css('opacity', fadeOpacity);
            });

    leftTriangleBtn
        .on('click', function () {
            location.href = '/home';
        })
        .hover(
            function () {
                leftContainer.css('visibility', 'visible').fadeIn(fadeInTime);
                leftTriangleBtn.css('opacity', onHoverOpacity);
            },
            function () {
                setTimeout(() => {
                    if ($('.container.left:hover').length == 0) {
                        leftContainer.css('visibility', 'hidden').fadeOut(fadeOutTime);
                        leftTriangleBtn.css('opacity', fadeOpacity);
                    }
                }, 200);
            });

    leftContainer
        .hover(
            function () {
                leftContainer.css('visibility', 'visible');
            },
            function () {
                leftContainer.css('visibility', 'hidden').fadeOut(fadeOutTime);
                leftTriangleBtn.css('opacity', fadeOpacity);
            });

})();