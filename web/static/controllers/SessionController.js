angular.module("BdayReminder").controller("SessionController", function($scope, $location, BdayReminderService, SweetAlert){
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
    SweetAlert.swal({
      title: "Are you sure?",
      text: "You are about to sign off",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel",
    }, function(isConfirm){
       if (isConfirm) {
         BdayReminderService.logOut();
       }
    });
  };
});
