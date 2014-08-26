/**
 * Created by raj on 21/8/14.
 */
$('.search-box input').width($('.top-bar div div div div').width()-($('#top-bar-logo').height()/2+13));
$('.search-box input').height($('#top-bar-logo').height()/2.5);
$('.search-box img').width($('#top-bar-logo').height()/2);
$('.search-box').css('margin-top',$('#top-bar-logo').height()/6 +'px');
$('.social').css('margin-top',$('#top-bar-logo').height()/6 +'px');
$('#anime-dir').css('margin-top',$('.top-bar').height()*1.4 +'px');
$('#sort-bar').sticky({topSpacing:$('.top-bar').height()})