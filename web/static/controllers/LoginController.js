angular.module("BdayReminder").controller("LoginController", function($scope, BdayReminderService){
  $scope.loginWithDrchrono = function() {
    BdayReminderService.logIn();
  };
});
