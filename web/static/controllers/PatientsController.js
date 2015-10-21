angular.module("BdayReminder").controller("PatientsController", function($scope, BdayReminderService){

  BdayReminderService.getPatients(function(data){
    $scope.patients = data;
  });

  $scope.calculateDday = function(dob) {
    function getOffsetWithoutYear(date) {
      return [date.getMonth(), date.getDate()];
    }

    function compareDatesWithoutYear(date1, date2) {
      if(date1[0] > date2[0]) {
        return 1;
      } else if(date1[0] < date2[0]) {
        return -1;
      } else {
        if(date1[1] > date2[1]) {
          return 1;
        } else if(date1[1] < date2[1]) {
          return -1;
        } else {
          return 0;
        }
      }
    }

    var today = getOffsetWithoutYear(new Date());
    var date = getOffsetWithoutYear(new Date(dob));

    var days = 0;
    var cmp = compareDatesWithoutYear(today, date);

    // The birthday is already passed in this year.
    if(cmp == 1) {
      days += 365;
    }

    offsetInS = (+new Date(1970, date[0], date[1])) - (+new Date(1970, today[0], today[1]));
    days += offsetInS / 1000 / 60 / 60 / 24;

    return parseInt(days);
  };

});
