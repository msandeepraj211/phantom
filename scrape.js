/* Created by raj on 12/8/14.*/
/*var phantom = require('phantom');*/
/*var scrapeList = require('./server/models/scrape');*/
var fs = require('fs');
    page=new WebPage();/*
var system =require('system');*/

/*if(system.args.length<1){
    console.log('you need more args');
    phantom.exit();
}else{
    console.log('i am runnnning...');
    page
    phantom.exit();
}*/




        page.open('http://www.gogoanime.com/watch-anime-list', function (status) {
            console.log('opened gogoanime? ', status);
            page.includeJs('http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js', function () {
                console.log('jq included');

                var data = page.evaluate(function (){/*
                    console.log(document.getElementByClassName('cat-item'));*//*
                    return document.getElementsByClassName('cat-item')[5].innerHTML;*/
                    /*console.log('evaluate entered');*/
                     /*return 'evaluate entered';*/

                    var data = [];
                    for (var i = 1; i <= $('#cat-col-1 .cat-item').length; i = i + 1) {
                        var tempdata = {};
                        /*var selector = '#cat-col-1 .cat-item:nth-child(' + i + ') a';
                        selector.toString('#cat-col-1 .cat-item:nth-child(' + i + ') a');*/
                        tempdata.link = $('#cat-col-1 .cat-item:nth-child('+i+') a').attr('href');
                        tempdata.name = $('#cat-col-1 .cat-item:nth-child('+i+') a').html();
                        JSON.stringify(tempdata)
                        data.push(tempdata);
                    }


                   /* scrapeList.create(data, function (err, data) {
                        if (err)
                            return ({status: false, message: err, data: {}});
                        else
                            return ({status: true, message: 'successfully scraped mangalist', data: {'id': data._id}});
                    });*/


/*                    var path = 'output.txt';
                    fs.write(path, data, 'w')*/

                   /* var fs = require('fs');

                    var path = 'output.txt';
                    fs.write(path, data, 'w');*/

                    return JSON.stringify(data);
                },'data'/*,function (result) {
                   *//* var path = 'output.txt';
                    fs.write(path, data, 'w');*//*
                    console.log('Page is ' + result);
                    phantom.exit();
                }*/);
                var path = 'animeList.txt';
                fs.write(path, data, 'w');
                console.log(data);
                phantom.exit();
            });
        });
