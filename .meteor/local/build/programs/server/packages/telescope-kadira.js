(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var deepExtend = Package['telescope-lib'].deepExtend;
var camelToDash = Package['telescope-lib'].camelToDash;
var dashToCamel = Package['telescope-lib'].dashToCamel;
var camelCaseify = Package['telescope-lib'].camelCaseify;
var getSetting = Package['telescope-lib'].getSetting;
var getThemeSetting = Package['telescope-lib'].getThemeSetting;
var getSiteUrl = Package['telescope-lib'].getSiteUrl;
var trimWords = Package['telescope-lib'].trimWords;
var can = Package['telescope-lib'].can;
var _ = Package['telescope-lib']._;
var capitalise = Package['telescope-lib'].capitalise;
var adminNav = Package['telescope-base'].adminNav;
var viewNav = Package['telescope-base'].viewNav;
var addToPostSchema = Package['telescope-base'].addToPostSchema;
var addToCommentsSchema = Package['telescope-base'].addToCommentsSchema;
var addToSettingsSchema = Package['telescope-base'].addToSettingsSchema;
var preloadSubscriptions = Package['telescope-base'].preloadSubscriptions;
var primaryNav = Package['telescope-base'].primaryNav;
var secondaryNav = Package['telescope-base'].secondaryNav;
var viewParameters = Package['telescope-base'].viewParameters;
var footerModules = Package['telescope-base'].footerModules;
var heroModules = Package['telescope-base'].heroModules;
var postModules = Package['telescope-base'].postModules;
var postHeading = Package['telescope-base'].postHeading;
var postMeta = Package['telescope-base'].postMeta;
var modulePositions = Package['telescope-base'].modulePositions;
var postSubmitRenderedCallbacks = Package['telescope-base'].postSubmitRenderedCallbacks;
var postSubmitClientCallbacks = Package['telescope-base'].postSubmitClientCallbacks;
var postSubmitMethodCallbacks = Package['telescope-base'].postSubmitMethodCallbacks;
var postAfterSubmitMethodCallbacks = Package['telescope-base'].postAfterSubmitMethodCallbacks;
var postEditRenderedCallbacks = Package['telescope-base'].postEditRenderedCallbacks;
var postEditClientCallbacks = Package['telescope-base'].postEditClientCallbacks;
var postEditMethodCallbacks = Package['telescope-base'].postEditMethodCallbacks;
var postAfterEditMethodCallbacks = Package['telescope-base'].postAfterEditMethodCallbacks;
var commentSubmitRenderedCallbacks = Package['telescope-base'].commentSubmitRenderedCallbacks;
var commentSubmitClientCallbacks = Package['telescope-base'].commentSubmitClientCallbacks;
var commentSubmitMethodCallbacks = Package['telescope-base'].commentSubmitMethodCallbacks;
var commentAfterSubmitMethodCallbacks = Package['telescope-base'].commentAfterSubmitMethodCallbacks;
var commentEditRenderedCallbacks = Package['telescope-base'].commentEditRenderedCallbacks;
var commentEditClientCallbacks = Package['telescope-base'].commentEditClientCallbacks;
var commentEditMethodCallbacks = Package['telescope-base'].commentEditMethodCallbacks;
var commentAfterEditMethodCallbacks = Package['telescope-base'].commentAfterEditMethodCallbacks;
var getTemplate = Package['telescope-base'].getTemplate;
var templates = Package['telescope-base'].templates;
var themeSettings = Package['telescope-base'].themeSettings;
var Kadira = Package['meteorhacks:kadira'].Kadira;

(function () {

////////////////////////////////////////////////////////////////////////////////
//                                                                            //
// packages/telescope-kadira/lib/kadira-settings.js                           //
//                                                                            //
////////////////////////////////////////////////////////////////////////////////
                                                                              //
var kadiraAppIdProperty = {                                                   // 1
  propertyName: 'kadiraAppId',                                                // 2
  propertyGroup: 'kadira',                                                    // 3
  propertySchema: {                                                           // 4
    type: String,                                                             // 5
    optional: true,                                                           // 6
    autoform: {                                                               // 7
      group: 'kadira'                                                         // 8
    }                                                                         // 9
  }                                                                           // 10
}                                                                             // 11
addToSettingsSchema.push(kadiraAppIdProperty);                                // 12
                                                                              // 13
var kadiraAppSecretProperty = {                                               // 14
  propertyName: 'kadiraAppSecret',                                            // 15
  propertyGroup: 'kadira',                                                    // 16
  propertySchema: {                                                           // 17
    type: String,                                                             // 18
    optional: true,                                                           // 19
    autoform: {                                                               // 20
      group: 'kadira'                                                         // 21
    }                                                                         // 22
  }                                                                           // 23
}                                                                             // 24
addToSettingsSchema.push(kadiraAppSecretProperty);                            // 25
////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////
//                                                                            //
// packages/telescope-kadira/lib/server/kadira.js                             //
//                                                                            //
////////////////////////////////////////////////////////////////////////////////
                                                                              //
Meteor.startup(function() {                                                   // 1
  if(!!getSetting('kadiraAppId') && !!getSetting('kadiraAppSecret')){         // 2
    Kadira.connect(getSetting('kadiraAppId'), getSetting('kadiraAppSecret')); // 3
  }                                                                           // 4
});                                                                           // 5
////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['telescope-kadira'] = {};

})();

//# sourceMappingURL=telescope-kadira.js.map
