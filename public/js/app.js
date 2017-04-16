var app = angular.module('rereddit', ['ui.router']);

app.config(['$stateProvider','$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider,  $locationProvider) {
   $locationProvider.html5Mode(true);

    $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: '/templates/home.html',
      controller: 'PostController',
      resolve: {
        myData: function($http) {
          return $http.get('/reddit');
        }
      }
    })

   .state('comment', {
            url: '/posts/:id',
            templateUrl: '/templates/comments.html',
            controller: 'CommentController',
            resolve: {
                relevantPost: ["postFactory", "$stateParams", "$http", function (postFactory, $stateParams, $http) {
                    var postId = $stateParams.id;
                    return $http.get("/reddit/" + postId).then(function (theWholePost) {
                     return theWholePost.data;
                    })

                }]
            }
        })

    .state('register', {
    url: '/register',
    templateUrl: '/templates/register.html',
    controller: 'AuthController'
  })

    .state('login', {
      url: '/login',
      templateUrl: '/templates/login.html',
      controller: 'AuthController'
    });

  $urlRouterProvider.otherwise('home');

}]);
