$(function () {
    $('.nav-responsive').click(function () {
        $('nav').fadeIn(100);
        $('.nav-responsive').hide();
        $('.nav-close').fadeIn(100);
    });
    
    $('.nav-close').click(function () {
        $('nav').hide();
        $('.nav-responsive').fadeIn(100);
        $('.nav-close').hide();
    });
});