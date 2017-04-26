(() => {
    $('#editLink').unbind('click');
    $('#editLink').on('click', function() {
        console.log('cliiicckkckc');
        $('#adminUploadPhoto').show();
        $('.pop-up-mask').height(screen.height);
    });

    $('.pop-up-close').unbind('click');
    $('.pop-up-close').on('click', function(){
        $('.pop-up-mask').hide();
    });
})();