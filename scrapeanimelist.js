var fs = require('fs');
page=new WebPage();
page.open('http://www.gogoanime.com/watch-anime-list', function (status) {
    console.log('opened gogoanime? ', status);
    page.includeJs('http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js', function () {
        console.log('jq included');
        var data = page.evaluate(function (){
            var data = [];
            for (var i = 1; i <= $('#cat-col-1 .cat-item').length; i = i + 1) {
                var tempdata = {};
                tempdata.link = $('#cat-col-1 .cat-item:nth-child('+i+') a').attr('href');
                tempdata.name = $('#cat-col-1 .cat-item:nth-child('+i+') a').html();
                JSON.stringify(tempdata)
                data.push(tempdata);
            }
            return JSON.stringify(data);
        },'data');
        var path = 'animeList.json';
        fs.write(path, data, 'w');
        console.log(data);
        phantom.exit();
    });
});
