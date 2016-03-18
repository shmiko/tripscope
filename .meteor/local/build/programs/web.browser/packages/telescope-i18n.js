//////////////////////////////////////////////////////////////////////////
//                                                                      //
// This is a generated file. You can view the original                  //
// source in your browser if your browser supports source maps.         //
//                                                                      //
// If you are using Chrome, open the Developer Tools and click the gear //
// icon in its lower right corner. In the General Settings panel, turn  //
// on 'Enable source maps'.                                             //
//                                                                      //
// If you are using Firefox 23, go to `about:config` and set the        //
// `devtools.debugger.source-maps-enabled` preference to true.          //
// (The preference should be on by default in Firefox 24; versions      //
// older than 23 do not support source maps.)                           //
//                                                                      //
//////////////////////////////////////////////////////////////////////////


(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var Blaze = Package.blaze.Blaze;
var UI = Package.blaze.UI;
var Handlebars = Package.blaze.Handlebars;
var HTML = Package.htmljs.HTML;

/* Package-scope variables */
var i18n;

(function () {

///////////////////////////////////////////////////////////////////////
//                                                                   //
// packages/telescope-i18n/i18n.js                                   //
//                                                                   //
///////////////////////////////////////////////////////////////////////
                                                                     //
i18n = {                                                             // 1
                                                                     // 2
  translations: {},                                                  // 3
                                                                     // 4
  t: function (str) {                                                // 5
    var lang = getSetting('language', 'en');                         // 6
    if(i18n.translations[lang] && i18n.translations[lang][str]){     // 7
      return i18n.translations[lang][str];                           // 8
    }                                                                // 9
    return str;                                                      // 10
  }                                                                  // 11
                                                                     // 12
};                                                                   // 13
                                                                     // 14
if(Meteor.isClient){                                                 // 15
  UI.registerHelper('i18n', function(str){                           // 16
    return i18n.t(str);                                              // 17
  });                                                                // 18
}                                                                    // 19
                                                                     // 20
///////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['telescope-i18n'] = {
  i18n: i18n
};

})();
