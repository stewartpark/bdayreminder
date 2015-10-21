angular.module("BdayReminder").controller("StatisticsController", function($scope, BdayReminderService){
  $scope.labels = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  $scope.series = ['Number of Patients'];
  $scope.data = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ];

  BdayReminderService.getPatients(function(data) {
    var count = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    for(var i in data) {
      var patient = data[i];
      if(patient.date_of_birth) {
        count[new Date(patient.date_of_birth).getMonth()]++;
      }
    }

    $scope.data = [
      count
    ];
  });


  $scope.onClick = function (points, evt) {
    console.log(points, evt);
  };
});
