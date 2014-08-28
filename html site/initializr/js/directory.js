/**
 * Created by raj on 21/8/14.
 */
function topbar() {
    $('.search-box input').width($('.top-bar div div div div').width() - ($('#top-bar-logo').height() / 2 + 13));
    $('.search-box input').height($('#top-bar-logo').height() / 2);
    $('.search-box img').width($('#top-bar-logo').height() / 2);
    $('.search-box').css('margin-top', $('#top-bar-logo').height() / 5.5 + 'px');
    $('.social').css('margin-top', $('#top-bar-logo').height() / 6 + 'px');
    $('#anime-dir').css('margin-top', $('.top-bar').height() * 1.4 + 'px');
    $('#sort-bar').sticky({topSpacing: $('.top-bar').height()})
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