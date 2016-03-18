(function () {

/////////////////////////////////////////////////////////////////////////////////////////
//                                                                                     //
// packages/telescope-update-prompt/lib/client/update.js                               //
//                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////
                                                                                       //
compareVersions = function (v1, v2) { // return true if v2 is newer than v1            // 1
  var v1Array = v1.split('.');                                                         // 2
  var v2Array = v2.split('.');                                                         // 3
  // go through each segment of v2 and stop if we find one that's higher               // 4
  // than the equivalent segment of v1; else return false                              // 5
  return v2Array.some( function (value, index) {                                       // 6
    return value > v1Array[index];                                                     // 7
  });                                                                                  // 8
  return false;                                                                        // 9
}                                                                                      // 10
                                                                                       // 11
Meteor.startup(function () {                                                           // 12
  Session.set('updateVersion', null);                                                  // 13
                                                                                       // 14
  Meteor.call('phoneHome', function (error, result) {                                  // 15
    // console.log(error)                                                              // 16
    // console.log(result)                                                             // 17
    if(result){                                                                        // 18
      var currentVersion = telescopeVersion;                                           // 19
      var newVersion = result.content;                                                 // 20
      var message = "";                                                                // 21
      if (compareVersions(currentVersion, newVersion)){                                // 22
        Session.set('updateVersion', newVersion);                                      // 23
      }                                                                                // 24
    }                                                                                  // 25
  });                                                                                  // 26
});                                                                                    // 27
                                                                                       // 28
heroModules.push({                                                                     // 29
  template: 'updateBanner'                                                             // 30
});                                                                                    // 31
/////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////
//                                                                                     //
// packages/telescope-update-prompt/lib/client/templates/template.update_banner.js     //
//                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////
                                                                                       //
                                                                                       // 1
Template.__checkName("updateBanner");                                                  // 2
Template["updateBanner"] = new Template("Template.updateBanner", (function() {         // 3
  var view = this;                                                                     // 4
  return Blaze.If(function() {                                                         // 5
    return Spacebars.call(view.lookup("showBanner"));                                  // 6
  }, function() {                                                                      // 7
    return [ "\n    ", HTML.DIV({                                                      // 8
      "class": "update-banner grid-module grid"                                        // 9
    }, "\n      ", HTML.H3({                                                           // 10
      "class": "update-version"                                                        // 11
    }, Blaze.View(function() {                                                         // 12
      return Spacebars.mustache(view.lookup("version"));                               // 13
    })), "\n      ", HTML.DIV({                                                        // 14
      "class": "update-content"                                                        // 15
    }, "\n        ", HTML.H4({                                                         // 16
      "class": "update-prompt"                                                         // 17
    }, "A new version of Telescope is available."), "\n        ", HTML.P({             // 18
      "class": "update-message"                                                        // 19
    }, "\n          You have: ", Blaze.View(function() {                               // 20
      return Spacebars.mustache(view.lookup("currentVersion"));                        // 21
    }), ". Note: this message is only displayed to admins. \n          ", HTML.A({     // 22
      href: "https://github.com/TelescopeJS/Telescope/blob/master/History.md",         // 23
      target: "_blank"                                                                 // 24
    }, "View changelog"), " | \n          ", HTML.A({                                  // 25
      href: "http://telesc.pe/docs/updating",                                          // 26
      target: "_blank"                                                                 // 27
    }, "View update instructions"), "\n          "), "\n      "), "\n    "), "\n  " ]; // 28
  });                                                                                  // 29
}));                                                                                   // 30
                                                                                       // 31
/////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////
//                                                                                     //
// packages/telescope-update-prompt/lib/client/templates/update_banner.js              //
//                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////
                                                                                       //
Template[getTemplate('updateBanner')].helpers({                                        // 1
  showBanner: function () {                                                            // 2
    return Session.get('updateVersion');                                               // 3
  },                                                                                   // 4
  version: function () {                                                               // 5
    return Session.get('updateVersion');                                               // 6
  },                                                                                   // 7
  currentVersion: function () {                                                        // 8
    return telescopeVersion;                                                           // 9
  },                                                                                   // 10
  message: function () {                                                               // 11
    return Session.get('updateMessage');                                               // 12
  }                                                                                    // 13
});                                                                                    // 14
/////////////////////////////////////////////////////////////////////////////////////////

}).call(this);
