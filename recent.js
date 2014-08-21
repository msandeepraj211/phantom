/**
 * Created by raj on 19/8/14.
 */

var fs = require('fs');
var content = fs.read ('animeEpisode.json');
console.log(JSON.stringify(JSON.parse(content)[1][0].title));
videolinks=JSON.parse(content);
links=[];

function pages(k) {
        var page = new WebPage();
        page.open('http://www.gogoanime.com/', function (status) {
            console.log('opened gogoanime :++++ ', status);
            if (status==fail){
                page.close();
                pages(k);
            }
            if (status == success) {

                page.includeJs('http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js', function () {
                    console.log('jq included')
                    var data = page.evaluate(function (data) {
                        var tempdata=[];
                        for (var i = 0; i <$('.post div:eq(1) table tbody tr td:eq(0) ul').length; i = i + 1) {
                            data.links.push($('.post div:eq(1) table tbody tr td:eq(0) ul li a').attr('href'));
                        }
                        return JSON.stringify(data);
                    });
                    links[k][m] = JSON.parse(data);
                    console.log(data);
                    if (m < links[k].length - 1) {
                        page.close();
                        console.log('next episoide called');
                        pages(k, m + 1);
                    }
                    ;
                    if (m == links[k].length - 1) {
                        page.close();
                        console.log('next anime called');
                        var path = 'links.json';
                        fs.write(path, links[k], 'w');
                        pages(k + 1, 1);
                    }
                    if (k == links.length - 1) {
                        var path = 'links.json';
                        fs.write(path, links, 'w');
                    }
                });
            }
        });
}
pages(1,1);