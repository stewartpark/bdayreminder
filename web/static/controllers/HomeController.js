angular.module("BdayReminder").controller("HomeController", function($scope, $timeout, BdayReminderService){
  $scope.getValues = function() {
    $scope.username = BdayReminderService.getUsername();
    $scope.date = new Date();
    BdayReminderService.getPatients(function(data) {
      $scope.patients = data;
    });

    if($scope.username === null) {
      $timeout($scope.getValues, 100);
    }
  };

  $scope.birthdayFilter = function(data) {
    var date = new Date(data.date_of_birth);

    // Adjust the time based on the timezone
    date.setTime(date.getTime() + date.getTimezoneOffset() * 60 * 1000);

    if($scope.date.getMonth() === date.getMonth() &&
       $scope.date.getDate() === date.getDate()) {
      return true;
    } else {
      return false;
    }
  };

  $scope.sendEmails = function() {
    var patients = $scope.patients.filter(function(o){
      return $scope.birthdayFilter(o);
    });

    BdayReminderService.sendEmails(patients, function(){
      alert('Done');
    });
  };

  $scope.getValues();
});
