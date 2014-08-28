/**
 * Created by raj on 15/8/14.
 */
var fs = require('fs');
/*var content = fs.read ('animeEpisode.json');
console.log(JSON.stringify(JSON.parse(content)[1][0].title));
videolinks=JSON.parse(content);*/
links=[];

function pages(k) {
    var content = fs.read ('animeEpisoide/animeEpisode'+k+'.json');
    console.log(JSON.stringify(JSON.parse(content)[0].title));
    var videolinks=JSON.parse(content);
    links[k] = [];
    function pageq(m) {
        links[k][m] = {};
        /*    if (m == 0) {
         links[k][m].title = videolinks[k][m].title;
         }*/
            console.log(videolinks[m].link);
            var page = new WebPage();
            page.open(videolinks[m].link, function (status) {
                console.log('opened animeList? ' + videolinks[m].link + " : ", status);
                if (status == 'fail') {
                    page.close();
                    pageq(m);
                }
                if (status == 'success') {

                    page.includeJs('http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js', function () {
                        console.log('jq included')
                        var data = page.evaluate(function (data) {
                            data.pageTitle = $('.post .postdesc h1').html();
                            data.pageCatogory = $('.post .postdesc:eq(0) p a').html();
                            data.pageCatogoryLink = $('.post .postdesc:eq(0) p a').attr('href');
                            data.links = [];
                            for (var i = 0; i < $('.postcontent p').length; i = i + 1) {
                                data.links.push($('.postcontent p:eq(' + i + ') iframe').attr('src'));
                            }
                            return JSON.stringify(data);
                        }, links[k][m]);
                        links[k][m] = JSON.parse(data);
                        /*
                         console.log(data);*/
                        if (m < videolinks.length - 1) {
                            page.close();
                            console.log('next episoide called');
                            pageq(m + 1);
                        };
                        if (m == videolinks.length - 1) {
                            page.close();
                            console.log('next anime called');
                            var path = 'links/links' + k + '.json';
                            fs.write(path, JSON.stringify(links[k]), 'w');
                            pages(k + 1, 1);
                        }
                        if (k == 1966) {
                            var path = 'links.json';
                            fs.write(path, links, 'w');
                        }

                        /*if(nextPresent=='true'){console.log('next called');pages(m+1,k)};
                         if(nextPresent=='false'&& k<animeList.length-1){console.log('next episoide called');pages(1,k+1)}
                         if(k==animeList.length-1){
                         var path = 'animeEpisode.json';
                         fs.write(path, JSON.stringify(animeEpisode), 'w');
                         }*/
                    });
                }
            });
    }

    pageq(1);
}
pages(182);