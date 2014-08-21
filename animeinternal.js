/**
 * Created by raj on 13/8/14.
 */
var fs = require('fs');
page=new WebPage();

var content = fs.read ('animeList.txt');/*
console.log('content: '+content);*/
var animeList = JSON.parse(content);
var animeEpisode=[];
/*for(var k=0;k<animeList.length;k=k+1) {*/
    var k=5;
    animeEpisode[k]=[];
    var nextPresent=false;
    /*for(var m=1;;m=m+1) {*/

        function pages(m){page.open(animeList[k].link + '/page/' + m, function (status) {
            nextPresent=false;
            console.log('opened animeList? ' + animeList[k].link+ '/page/' + m + " : ", status);
            page.includeJs('http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js', function () {
                console.log('jq included');

                var data = page.evaluate(function (data,m,nextPresent) {
                    if(m==1){
                        data.title=$('.pagetitle').html();
                        data.description=$('.catdescription').html();
                    }

                    for (var i = 0; i < $('#content .postlist').length; i = i + 1) {
                        var tempdata = {};
                        tempdata.link = $('#content .postlist:eq(' + i + ') table tbody tr td a').attr('href');
                        tempdata.name = $('#content .postlist:eq(' + i + ') table tbody tr td a').html();
                        /*JSON.stringify(tempdata);*/
                        data.push(tempdata);
                    }
                    for(var n=0;n<$('.wp-pagenavi a').length;n=n+1){
                        if($('.wp-pagenavi a:eq('+n+')').html() == 'Next'){nextPresent=true}
                    }
                    return JSON.stringify(data)+"|"+nextPresent;
                }, animeEpisode[k],m,nextPresent);
                /*var path = 'animeList.txt';
                fs.write(path, data, 'w');
                console.log(data);
                phantom.exit();*//*
                animeEpisode[k].push(data);*/
                var data1= data.split('|');
                nextPresent=data1[1];
                animeEpisode[k]= JSON.parse(data1[0]);


                console.log('hi:'+JSON.stringify(animeEpisode[k]));
                console.log(nextPresent);
                console.log(m+1);
                if(nextPresent=='true'){console.log('next called');pages(m+1)};



            });
            return JSON.stringify(animeEpisode[k])
        });}

        var data2=pages(1);



        /*
        if(nextPresent==false){break};*/
   /* }*/

    var path = 'animeEpisode'+k+'.txt';
    fs.write(path, data2, 'w');
    console.log(data2);
/*}*//*
phantom.exit();*/

