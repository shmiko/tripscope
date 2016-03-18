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
var deepExtend = Package['telescope-lib'].deepExtend;
var camelToDash = Package['telescope-lib'].camelToDash;
var dashToCamel = Package['telescope-lib'].dashToCamel;
var camelCaseify = Package['telescope-lib'].camelCaseify;
var getSetting = Package['telescope-lib'].getSetting;
var getThemeSetting = Package['telescope-lib'].getThemeSetting;
var getSiteUrl = Package['telescope-lib'].getSiteUrl;
var trimWords = Package['telescope-lib'].trimWords;
var can = Package['telescope-lib'].can;
var _ = Package.underscore._;
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
var $ = Package.jquery.$;
var jQuery = Package.jquery.jQuery;
var Template = Package.templating.Template;
var Blaze = Package.blaze.Blaze;
var UI = Package.blaze.UI;
var Handlebars = Package.blaze.Handlebars;
var HTML = Package.htmljs.HTML;

(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                               //
// packages/telescope-module-share/lib/share.js                                                                  //
//                                                                                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                 //
postModules.push({                                                                                               // 1
  template: 'postShare',                                                                                         // 2
  position: 'right-center'                                                                                       // 3
});                                                                                                              // 4
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                               //
// packages/telescope-module-share/lib/client/template.post_share.js                                             //
//                                                                                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                 //
                                                                                                                 // 1
Template.__checkName("postShare");                                                                               // 2
Template["postShare"] = new Template("Template.postShare", (function() {                                         // 3
  var view = this;                                                                                               // 4
  return [ HTML.A({                                                                                              // 5
    href: "#",                                                                                                   // 6
    "class": "share-link"                                                                                        // 7
  }, HTML.Raw('<i class="icon-share"></i>'), HTML.SPAN({                                                         // 8
    "class": "action"                                                                                            // 9
  }, Blaze.View(function() {                                                                                     // 10
    return Spacebars.mustache(view.lookup("i18n"), "Share");                                                     // 11
  }))), "\n  ", HTML.DIV({                                                                                       // 12
    "class": "share-options hidden"                                                                              // 13
  }, "\n    ", HTML.A({                                                                                          // 14
    "class": "mt-facebook mt-share-inline-square-sm",                                                            // 15
    href: function() {                                                                                           // 16
      return [ "https://www.facebook.com/sharer/sharer.php?u=", Spacebars.mustache(view.lookup("sourceLink")) ]; // 17
    },                                                                                                           // 18
    target: "_blank"                                                                                             // 19
  }, HTML.Raw('<img src="//mojotech-static.s3.amazonaws.com/facebook@2x.png">')), "\n    ", HTML.A({             // 20
    "class": "mt-twitter mt-share-inline-square-sm",                                                             // 21
    href: function() {                                                                                           // 22
      return [ "//twitter.com/intent/tweet?text=", Spacebars.mustache(view.lookup("title")), "&url=", Spacebars.mustache(view.lookup("sourceLink")), "&", Spacebars.mustache(view.lookup("viaTwitter")) ];
    },                                                                                                           // 24
    target: "_blank"                                                                                             // 25
  }, HTML.Raw('<img src="//mojotech-static.s3.amazonaws.com/twitter@2x.png">')), "\n    ", HTML.A({              // 26
    "class": "mt-linkedin mt-share-inline-square-sm",                                                            // 27
    href: function() {                                                                                           // 28
      return [ "//www.linkedin.com/shareArticle?mini=true&url=", Spacebars.mustache(view.lookup("sourceLink")), HTML.CharRef({
        html: "&amp;",                                                                                           // 30
        str: "&"                                                                                                 // 31
      }), "summary=", Spacebars.mustache(view.lookup("title")) ];                                                // 32
    },                                                                                                           // 33
    target: "_blank"                                                                                             // 34
  }, HTML.Raw('<img src="//mojotech-static.s3.amazonaws.com/linkedin@2x.png">')), "\n    ", HTML.A({             // 35
    "class": "mt-google mt-share-inline-square-sm",                                                              // 36
    href: function() {                                                                                           // 37
      return [ "https://plus.google.com/share?url=", Spacebars.mustache(view.lookup("sourceLink")) ];            // 38
    },                                                                                                           // 39
    target: "_blank"                                                                                             // 40
  }, HTML.Raw('<img src="//mojotech-static.s3.amazonaws.com/google@2x.png">')), "\n  ") ];                       // 41
}));                                                                                                             // 42
                                                                                                                 // 43
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                               //
// packages/telescope-module-share/lib/client/post_share.js                                                      //
//                                                                                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                 //
Meteor.startup(function () {                                                                                     // 1
  Template[getTemplate('postShare')].helpers({                                                                   // 2
    sourceLink: function(){                                                                                      // 3
      return !!this.url ? this.url : getSiteUrl() + "posts/"+this._id;                                           // 4
    },                                                                                                           // 5
    viaTwitter: function () {                                                                                    // 6
      return !!getSetting('twitterAccount') ? 'via='+getSetting('twitterAccount') : '';                          // 7
    }                                                                                                            // 8
  });                                                                                                            // 9
                                                                                                                 // 10
  Template[getTemplate('postShare')].events({                                                                    // 11
    'click .share-link': function(e){                                                                            // 12
      var $this = $(e.target).parents('.post-share').find('.share-link');                                        // 13
      var $share = $this.parents('.post-share').find('.share-options');                                          // 14
      e.preventDefault();                                                                                        // 15
      $('.share-link').not($this).removeClass("active");                                                         // 16
      $(".share-options").not($share).addClass("hidden");                                                        // 17
      $this.toggleClass("active");                                                                               // 18
      $share.toggleClass("hidden");                                                                              // 19
    }                                                                                                            // 20
  });                                                                                                            // 21
});                                                                                                              // 22
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['telescope-module-share'] = {};

})();
