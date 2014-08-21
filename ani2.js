/**
 * Created by raj on 13/8/14.
 */
var fs = require('fs');


var content = fs.read ('animeList.json');/*
 console.log('content: '+content);*/
var animeList = JSON.parse(content);
console.log(animeList);
var animeEpisode=[];
/*for(var k=0;k<animeList.length;k=k+1) {*/
var k=5;
animeEpisode[k]=[];
var nextPresent=false;
/*for(var m=1;;m=m+1) {*/
function listcall(k){

}

function pages(m,k){
    var page=new WebPage();
    nextPresent=false;
    animeEpisode[k]=[];
    page.open(animeList[k].link + '/page/' + m, function (status) {

    console.log('opened animeList? ' + animeList[k].link+ '/page/' + m + " : ", status);
    page.includeJs('http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js', function () {
        console.log('jq included');

        console.log(m);
        var m1=m;

        var data = page.evaluate(function (data,m,nextPresent) {

            if(m==1){
                var tempdata = {};
                tempdata.title=$('.pagetitle').html();
                tempdata.description=$('.catdescription').html();
                data.push(tempdata);
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
        }, animeEpisode[k],m1,nextPresent);
        /*var path = 'animeList.txt';
         fs.write(path, data, 'w');
         console.log(data);
         phantom.exit();*//*
         animeEpisode[k].push(data);*/
//        console.log(data)
        var data1= data.split('|');
        nextPresent=data1[1];
        animeEpisode[k]=JSON.parse(data1[0]);
//        console.log(data1[1])

//
//        console.log('hi:'+JSON.stringify(animeEpisode[k]));
//        console.log(m,nextPresent,nextPresent=='true');
//        console.log(m+1);
        if(nextPresent=='true'){console.log('next called');pages(m+1,k)};
/*
        var path = 'animeEpisode'+k+'.json';
        fs.write(path, JSON.stringify(animeEpisode[k]), 'w');*/
        if(nextPresent=='false'&& k<8-1){console.log('next episoide called');pages(1,k+1)}
        if(k==8-1){
            var path = 'animeEpisode.json';
            fs.write(path, JSON.stringify(animeEpisode), 'w');
        }



    });/*
    return JSON.stringify(animeEpisode[k])*/
});
}

pages(1,1);



/*
 if(nextPresent==false){break};*/
/* }*/

/*var path = 'animeEpisode'+k+'.txt';
fs.write(path, data2, 'w');
console.log(data2);*/
/*}*//*
 phantom.exit();*/