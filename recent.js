/**
 * Created by raj on 19/8/14.
 */

var fs = require('fs');
var recent = fs.read('recent.json')

function pages() {
        var page = new WebPage();
        page.open('http://www.gogoanime.com', function (status) {
            console.log('opened gogoanime :++++ ', status);
            if (status=="fail"){
                page.close();
                pages();
            }
            if (status == "success") {

                page.includeJs('http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js', function () {
                    console.log('jq included');

                    var data = page.evaluate(function () {
                        var tempdata={};
                        tempdata.links=[];
                        for (var i = 0; i <$('.post div:eq(1) table tbody tr td:eq(0) ul').length; i = i + 1) {
                            if( $('.post div:eq(1) table tbody tr td:eq(0) ul:eq('+i+') li font').html()=="(Sub)"){
                                tempdata.links.push($('.post div:eq(1) table tbody tr td:eq(0) ul:eq('+i+') li a').attr('href'));
                        }
                        }
                        return JSON.stringify(tempdata);
                    });
                    console.log(data);
                    data = JSON.parse(data);

                    var path = 'recent.json';
                    fs.write(path, data, 'w');

                });
            }
        });
}
pages(1,1);