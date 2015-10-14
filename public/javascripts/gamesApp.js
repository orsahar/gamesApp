var gamesApp = angular.module('gamesApp', ['ngRoute', 'ngResource']);
//
//gamesApp.run(function($rootScope, $http) {
//    $rootScope.isAuthenticated = true;
//    //$rootScope.current_user = '';
//    //$rootScope.signout = function() {
//    //    $http.get('/auth/signout');
//    //    $rootScope.isAuthenticated = false;
//    //    $rootScope.current_user = '';
//    //};
//});


gamesApp.config(function($routeProvider) {
    $routeProvider

        //main page
        .when('/', {
            templateUrl: 'main.html',
            controller: 'mainController'
        })

        .when('/#', {
            templateUrl: 'main.html',
            controller: 'mainController'
        })

        //login page
        //.when('/login', {
        //    templateUrl: 'login.html',
        //    controller: 'authController'
        //})

        ////registration page
        //.when('/signup', {
        //    templateUrl: 'register.html',
        //    controller: 'authController'
        //})
});

gamesApp.factory('postService', function($resource) {
    return $resource('/api/posts/:id');
});



gamesApp.controller('mainController', function(postService, $scope,$http){
    $scope.posts = postService.query();
    //set default to 1
    $scope.counter = 1;
    $scope.images = [0];
    $scope.newPost = {created_by: '', name: '',description:'', created_at: '', images: []};
    $scope.addOption = function(){
         console.log($scope.images);
         $scope.images.push($scope.counter);
         $scope.counter ++;


    };
    $scope.removeOption = function(index){
        $scope.images.splice($scope.images.indexOf(index),1);
    };
    //console.dir($scope.posts);
    $scope.deletePost = function(index){
        var postToDelete = $scope.posts[$scope.posts.length - index-1];
        $http.delete('api/posts/'+postToDelete._id );
        $scope.posts = postService.query();

    };
    //$scope.updatePost = function(index){
    //    var postToUpdate = $scope.posts[$scope.posts.length - index-1];
    //    $http.put('api/posts/'+postToUpdate._id,$scope.current_post );
    //    $scope.posts = postService.query();
    //
    //};
    $scope.post = function(){

        postService.save($scope.newPost, function() {
            $scope.posts = postService.query();
            $scope.newPost = {created_by: '',name: '', description: '',created_at: '', images: []};
        });
    };
});

//gamesApp.controller('postsController',function($scope, $location, $http, $rootScope){
//    $scope.deletePost = function(){
//        $http.delete('api/posts/:id',$scope.current_post)
//    };
//    $scope.update = function(){
//        $http.put('api/posts/:id',$scope.current_post )
//    };
//});
