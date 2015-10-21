angular.module('BdayReminder').controller("LogoutController", function($scope, BdayReminderService) {
  $scope.clickLogOut = function(){
    BdayReminderService.logOut(); 
  };
});
