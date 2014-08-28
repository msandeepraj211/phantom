var myApp = angular.module('myApp',[]);
myApp.directive('topBarDirect', function(){
   return{
       restrict:'EA',
       templateUrl:'top-bar-direct.html'
   }
});
myApp.controller('episoide',('scope','topBarDirect',function($scope){
    window.scope=$scope;
    $scope.init= function(){
    $('#anime-dir').css('margin-top', $('.top-bar').height() * 1.4 + 'px');
        console.log('init called',new Date().getTime());
    }
}));