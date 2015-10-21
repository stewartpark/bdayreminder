angular.module("BdayReminder").controller("HomeController", function($scope, $timeout, BdayReminderService, SweetAlert){
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

    var list_patients = "";
    for(var i in patients) {
      list_patients += patients[i].email + "\n";
    }

    SweetAlert.swal({
      title: "Are you sure?",
      text: "You are about to send emails to the below patients:\n\n" + list_patients,
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel",
      closeOnConfirm: false
    }, function(isConfirm){
       if (isConfirm) {
         BdayReminderService.sendEmails(patients, function(){
           SweetAlert.swal("Done!", "Emails are sent to the patients!", "success");
         });
       }
    });
  };

  $scope.getValues();
});
