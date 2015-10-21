var app = angular.module('BdayReminder', ['ngRoute', 'ngCookies', 'ui.bootstrap']).config(function($routeProvider, $httpProvider) {

  $httpProvider.defaults.xsrfCookieName = 'csrftoken';
  $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
  $httpProvider.defaults.useXDomain = true;
  $httpProvider.defaults.withCredentials = true;

  $routeProvider.
  when('/', {
    templateUrl: '/static/partials/home.html',
    controller: 'HomeController'
  }).
  when('/patients', {
    templateUrl: '/static/partials/patients.html',
    controller: 'PatientsController'
  }).
  when('/statistics', {
    templateUrl: '/static/partials/statistics.html',
    controller: 'StatisticsController'
  }).
  when('/login', {
    templateUrl: '/static/partials/login.html',
    controller: 'LoginController'
  }).
  when('/logout', {
    templateUrl: '/static/partials/logout.html',
    controller: 'LogoutController'
  }).
  otherwise({
    redirectTo: '/'
  });
});
