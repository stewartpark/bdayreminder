angular.module("BdayReminder").service("URLBuilderService", function() {
  this.build = function(url, params, cb) {
    var query_string = "";
    for(var k in params) {
      query_string += k + "=" + escape(params[k]) + "&";
    }
    query_string = query_string.substring(0, query_string.length-1);

    cb(url + "?" + query_string);
  };
});
