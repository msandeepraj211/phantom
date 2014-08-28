/**
 * Created by raj on 27/8/14.
 */
function topbar() {
    $('.search-box input').width($('.top-bar div div div div').width() - ($('#top-bar-logo').height() / 2 + 13));
    $('.search-box input').height($('#top-bar-logo').height() / 2);
    $('.search-box img').width($('#top-bar-logo').height() / 2);
    $('.search-box').css('margin-top', $('#top-bar-logo').height() / 5.5 + 'px');
    $('.anime-dir').css('margin-top', $('#top-bar-logo').height() / 3.5 + 'px');
    $('#episoide-title').css('margin-top', $('.top-bar').height() * 1.2 + 'px');
}
/*
 function fos() {
 $('.search-box').width($('window').width() - ($('#top-bar-logo').height() / 2 + 13));
 $('#top-bar-logo').css("visibility","none");
 $('.search-box img').width($('#top-bar-logo').height() / 2);
 $('.search-box').css('left', 0);
 }

 $('.search-box input').focus(fos());*/

$('window').load(topbar());
$(window).resize(topbar);
