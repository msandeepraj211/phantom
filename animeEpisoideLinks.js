/**
 * Created by raj on 15/8/14.
 */
var fs = require('fs');
var content = fs.read ('animeList.txt');
var animeList = JSON.parse(content);
var animeEpisode=[];
var k=5;
animeEpisode[k]=[];
var nextPresent=false;
function pages(m,k){
    var page=new WebPage();
    nextPresent=false;
    animeEpisode[k]=[];
    page.open(animeList[k].link + '/page/' + m, function (status) {
        console.log('opened animeList? ' + animeList[k].link + '/page/' + m + " : ", status);
        if (status == fail) {
            pages(m, k);
        }
        if (status == success) {

        page.includeJs('http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js', function () {
            console.log('jq included');
            console.log(m);
            var m1 = m;
            var data = page.evaluate(function (data, m, nextPresent) {
                if (m == 1) {
                    var tempdata = {};
                    tempdata.title = $('.pagetitle').html();
                    tempdata.description = $('.catdescription').html();
                    data.push(tempdata);
                }
                for (var i = 0; i < $('#content .postlist').length; i = i + 1) {
                    var tempdata = {};
                    tempdata.link = $('#content .postlist:eq(' + i + ') table tbody tr td a').attr('href');
                    tempdata.name = $('#content .postlist:eq(' + i + ') table tbody tr td a').html();
                    /*JSON.stringify(tempdata);*/
                    data.push(tempdata);
                }
                for (var n = 0; n < $('.wp-pagenavi a').length; n = n + 1) {
                    if ($('.wp-pagenavi a:eq(' + n + ')').html() == 'Next') {
                        nextPresent = true
                    }
                }
                return JSON.stringify(data) + "|" + nextPresent;
            }, animeEpisode[k], m1, nextPresent);
            var data1 = data.split('|');
            nextPresent = data1[1];
            animeEpisode[k] = JSON.parse(data1[0]);
            if (nextPresent == 'true') {
                console.log('next called');
                page.close();
                pages(m + 1, k)
            }
            ;
            if (nextPresent == 'false' && k < animeList.length - 1) {
                console.log('next episoide called');
                page.close();
                pages(1, k + 1)
            }
            if (k == animeList.length - 1) {
                var path = 'animeEpisode.json';
                fs.write(path, JSON.stringify(animeEpisode), 'w');
            }
        });
    }
    });
}
pages(1,1);


