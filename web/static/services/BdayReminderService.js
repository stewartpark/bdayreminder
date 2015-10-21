angular.module('BdayReminder').service('BdayReminderService', function($filter, $cookies, $http, URLBuilderService){
  var username = null;

  this.getUsername = function() {
    return username;
  };

  this.checkIfLoggedIn = function(cb) {
    $http.get("/api/v1/actions/login").
    success(function(data) {
      // So that the values can be accessible globally.
      //TODO Have a proper model that holds these values.
      username = data.username;
      cb(true);
    }).
    error(function(err) {
      username = null;
      cb(false);
    });
  };

  this.logIn = function() {
    URLBuilderService.build("https://drchrono.com/o/authorize/", {
      redirect_uri: DRCHRONO_REDIRECT_BASE_URL + "/api/v1/actions/redirect",
      response_type: "code",
      client_id: DRCHRONO_CLIENT_ID // It's in the global scope. see index.html
    }, function(url) {
      location.href = url;
    });
  };

  this.logOut = function(cb) {
    $http.delete("/api/v1/actions/login").
    success(function(data) {
      username = null;
      location.href = "/";
    }).
    error(function(err) {
      console.log("Failed to log out.");
    });
  };

  this.getPatients = function(cb) {
    $http.get("/api/v1/patients?bday=" + $filter('date')(new Date(), 'MM-dd')).
    success(function(data) {
      cb(data.results);
    }).
    error(function(err) {
      console.error('Error while fetching a list of patients.');
      cb(null);
    });
  };

  this.sendEmails = function(list, cb) {
    console.log(list);
    $http.post("/api/v1/patients", {list: list}).
    success(function(data) {
      console.log(data);
      cb();
    }).
    error(function(err) {
      console.error('Error while fetching a list of patients.');
      cb();
    });
  };
});
