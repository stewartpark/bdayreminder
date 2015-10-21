angular.module("BdayReminder").controller("SessionController", function($scope, $location, BdayReminderService){
  $scope.loggedIn = false;

  BdayReminderService.checkIfLoggedIn(function(cond) {
    $scope.loggedIn = cond;

    if(!cond) {
      location.href = "#/login";
    }

    $scope.$on('$routeChangeStart', function(e){
      if(!$scope.loggedIn){
        if($location.path() != '/login') {
          location.href = "#/login";
          e.preventDefault();
        }
      }
    });
  });

  $scope.clickLogOut = function() {

  };
});
