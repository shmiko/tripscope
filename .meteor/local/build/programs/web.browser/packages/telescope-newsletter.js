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
var SimpleSchema = Package['aldeed:simple-schema'].SimpleSchema;
var MongoObject = Package['aldeed:simple-schema'].MongoObject;
var Router = Package['iron:router'].Router;
var RouteController = Package['iron:router'].RouteController;
var MailChimp = Package['mrt:mailchimp'].MailChimp;
var $ = Package.jquery.$;
var jQuery = Package.jquery.jQuery;
var Template = Package.templating.Template;
var Cookie = Package['mrt:cookies'].Cookie;
var Iron = Package['iron:core'].Iron;
var Blaze = Package.blaze.Blaze;
var UI = Package.blaze.UI;
var Handlebars = Package.blaze.Handlebars;
var HTML = Package.htmljs.HTML;

/* Package-scope variables */
var campaignSchema, Campaigns;

(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                          //
// packages/telescope-newsletter/lib/newsletter.js                                                          //
//                                                                                                          //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                            //
campaignSchema = new SimpleSchema({                                                                         // 1
 _id: {                                                                                                     // 2
    type: String,                                                                                           // 3
    optional: true                                                                                          // 4
  },                                                                                                        // 5
  createdAt: {                                                                                              // 6
    type: Date,                                                                                             // 7
    optional: true                                                                                          // 8
  },                                                                                                        // 9
  sentAt: {                                                                                                 // 10
    type: String,                                                                                           // 11
    optional: true                                                                                          // 12
  },                                                                                                        // 13
  status: {                                                                                                 // 14
    type: String,                                                                                           // 15
    optional: true                                                                                          // 16
  },                                                                                                        // 17
  posts: {                                                                                                  // 18
    type: [String],                                                                                         // 19
    optional: true                                                                                          // 20
  },                                                                                                        // 21
  webHits: {                                                                                                // 22
    type: Number,                                                                                           // 23
    optional: true                                                                                          // 24
  },                                                                                                        // 25
});                                                                                                         // 26
                                                                                                            // 27
Campaigns = new Meteor.Collection("campaigns", {                                                            // 28
  schema: campaignSchema                                                                                    // 29
});                                                                                                         // 30
                                                                                                            // 31
addToPostSchema.push(                                                                                       // 32
  {                                                                                                         // 33
    propertyName: 'scheduledAt',                                                                            // 34
    propertySchema: {                                                                                       // 35
      type: Date,                                                                                           // 36
      optional: true                                                                                        // 37
    }                                                                                                       // 38
  }                                                                                                         // 39
);                                                                                                          // 40
                                                                                                            // 41
// Settings                                                                                                 // 42
                                                                                                            // 43
// note for next two fields: need to add a way to tell app not to publish field to client except for admins // 44
                                                                                                            // 45
var showBanner = {                                                                                          // 46
  propertyName: 'showBanner',                                                                               // 47
  propertySchema: {                                                                                         // 48
    type: Boolean,                                                                                          // 49
    optional: true,                                                                                         // 50
    label: 'Newsletter banner',                                                                             // 51
    autoform: {                                                                                             // 52
      group: 'newsletter',                                                                                  // 53
      instructions: 'Show newsletter sign-up form on the front page.'                                       // 54
    }                                                                                                       // 55
  }                                                                                                         // 56
}                                                                                                           // 57
addToSettingsSchema.push(showBanner);                                                                       // 58
                                                                                                            // 59
var mailChimpAPIKey = {                                                                                     // 60
  propertyName: 'mailChimpAPIKey',                                                                          // 61
  propertySchema: {                                                                                         // 62
    type: String,                                                                                           // 63
    optional: true,                                                                                         // 64
    autoform: {                                                                                             // 65
      group: 'newsletter'                                                                                   // 66
    }                                                                                                       // 67
  }                                                                                                         // 68
}                                                                                                           // 69
addToSettingsSchema.push(mailChimpAPIKey);                                                                  // 70
                                                                                                            // 71
var mailChimpListId = {                                                                                     // 72
  propertyName: 'mailChimpListId',                                                                          // 73
  propertySchema: {                                                                                         // 74
    type: String,                                                                                           // 75
    optional: true,                                                                                         // 76
    autoform: {                                                                                             // 77
      group: 'newsletter',                                                                                  // 78
      instructions: 'The ID of the list you want to send to.'                                               // 79
    }                                                                                                       // 80
  }                                                                                                         // 81
}                                                                                                           // 82
addToSettingsSchema.push(mailChimpListId);                                                                  // 83
                                                                                                            // 84
var postsPerNewsletter = {                                                                                  // 85
  propertyName: 'postsPerNewsletter',                                                                       // 86
  propertySchema: {                                                                                         // 87
    type: Number,                                                                                           // 88
    optional: true,                                                                                         // 89
    autoform: {                                                                                             // 90
      group: 'newsletter'                                                                                   // 91
    }                                                                                                       // 92
  }                                                                                                         // 93
}                                                                                                           // 94
addToSettingsSchema.push(postsPerNewsletter);                                                               // 95
                                                                                                            // 96
var newsletterFrequency = {                                                                                 // 97
  propertyName: 'newsletterFrequency',                                                                      // 98
  propertySchema: {                                                                                         // 99
    type: Number,                                                                                           // 100
    optional: true,                                                                                         // 101
    autoform: {                                                                                             // 102
      group: 'newsletter',                                                                                  // 103
      instructions: 'Changes require restarting your app to take effect.',                                  // 104
      options: [                                                                                            // 105
        {                                                                                                   // 106
          value: 1,                                                                                         // 107
          label: 'Every Day'                                                                                // 108
        },                                                                                                  // 109
        {                                                                                                   // 110
          value: 2,                                                                                         // 111
          label: 'Mondays, Wednesdays, Fridays'                                                             // 112
        },                                                                                                  // 113
        {                                                                                                   // 114
          value: 3,                                                                                         // 115
          label: 'Mondays & Thursdays'                                                                      // 116
        },                                                                                                  // 117
        {                                                                                                   // 118
          value: 7,                                                                                         // 119
          label: 'Once a week (Mondays)'                                                                    // 120
        },                                                                                                  // 121
        {                                                                                                   // 122
          value: 0,                                                                                         // 123
          label: "Don't send newsletter"                                                                    // 124
        }                                                                                                   // 125
      ]                                                                                                     // 126
    }                                                                                                       // 127
  }                                                                                                         // 128
}                                                                                                           // 129
addToSettingsSchema.push(newsletterFrequency);                                                              // 130
                                                                                                            // 131
// create new "campaign" lens for all posts from the past X days that haven't been scheduled yet            // 132
viewParameters.campaign = function (terms) {                                                                // 133
  return {                                                                                                  // 134
    find: {                                                                                                 // 135
      scheduledAt: {$exists: false},                                                                        // 136
      postedAt: {                                                                                           // 137
        $gte: terms.after                                                                                   // 138
      }                                                                                                     // 139
    },                                                                                                      // 140
    options: {sort: {sticky: -1, score: -1}}                                                                // 141
  };                                                                                                        // 142
}                                                                                                           // 143
                                                                                                            // 144
heroModules.push({                                                                                          // 145
  template: 'newsletterBanner'                                                                              // 146
});                                                                                                         // 147
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                          //
// packages/telescope-newsletter/lib/client/templates/template.newsletter_banner.js                         //
//                                                                                                          //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                            //
                                                                                                            // 1
Template.__checkName("newsletterBanner");                                                                   // 2
Template["newsletterBanner"] = new Template("Template.newsletterBanner", (function() {                      // 3
  var view = this;                                                                                          // 4
  return Blaze.If(function() {                                                                              // 5
    return Spacebars.call(view.lookup("showBanner"));                                                       // 6
  }, function() {                                                                                           // 7
    return [ "\n    ", HTML.DIV({                                                                           // 8
      "class": "newsletter-banner grid-module grid"                                                         // 9
    }, "\n      ", HTML.FORM("\n        ", HTML.H4({                                                        // 10
      "class": "newsletter-tagline"                                                                         // 11
    }, "Receive the best of ", Blaze.View(function() {                                                      // 12
      return Spacebars.mustache(view.lookup("siteName"));                                                   // 13
    }), " right in your inbox"), "\n        ", Blaze.If(function() {                                        // 14
      return Spacebars.call(view.lookup("isNotConnected"));                                                 // 15
    }, function() {                                                                                         // 16
      return [ "\n          ", HTML.INPUT({                                                                 // 17
        "class": "newsletter-email",                                                                        // 18
        type: "email",                                                                                      // 19
        placeholder: "Your Email"                                                                           // 20
      }), "\n        " ];                                                                                   // 21
    }), "\n        ", HTML.BUTTON({                                                                         // 22
      "class": "button newsletter-button"                                                                   // 23
    }, "Get Newsletter", HTML.SPAN({                                                                        // 24
      "class": "button-loader"                                                                              // 25
    }, HTML.IMG({                                                                                           // 26
      src: "/img/loading-balls.svg"                                                                         // 27
    }))), "\n      "), "\n      ", HTML.H4({                                                                // 28
      "class": "newsletter-subscribed"                                                                      // 29
    }, "Thanks for subscribing!"), "\n      ", HTML.A({                                                     // 30
      href: "#",                                                                                            // 31
      "class": "newsletter-dismiss"                                                                         // 32
    }, "×"), "\n    "), "\n  " ];                                                                           // 33
  });                                                                                                       // 34
}));                                                                                                        // 35
                                                                                                            // 36
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                          //
// packages/telescope-newsletter/lib/client/templates/newsletter_banner.js                                  //
//                                                                                                          //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                            //
var confirmSubscription = function () {                                                                     // 1
  $('.newsletter-banner form').css('opacity', 0);                                                           // 2
  $('.newsletter-banner .newsletter-subscribed').css('display', 'block').css('opacity', 1);                 // 3
  Meteor.setInterval(function () {                                                                          // 4
    // required because otherwise banner disappears immediately after confirmation                          // 5
    dismissBanner();                                                                                        // 6
  }, 2000)                                                                                                  // 7
}                                                                                                           // 8
                                                                                                            // 9
var dismissBanner = function () {                                                                           // 10
  $('.newsletter-banner').fadeOut('fast', function () {                                                     // 11
    if(Meteor.user()){                                                                                      // 12
      // if user is connected, change setting in their account                                              // 13
      setUserSetting('showBanner', false);                                                                  // 14
    }else{                                                                                                  // 15
      // set cookie                                                                                         // 16
      Cookie.set('showBanner', "no");                                                                       // 17
    }                                                                                                       // 18
  });                                                                                                       // 19
}                                                                                                           // 20
                                                                                                            // 21
Meteor.startup(function () {                                                                                // 22
  Template[getTemplate('newsletterBanner')].helpers({                                                       // 23
    siteName: function () {                                                                                 // 24
      return getSetting('title');                                                                           // 25
    },                                                                                                      // 26
    isNotConnected: function () {                                                                           // 27
      return !Meteor.user()                                                                                 // 28
    },                                                                                                      // 29
    showBanner: function () {                                                                               // 30
      // note: should not be reactive                                                                       // 31
      if(                                                                                                   // 32
            getSetting('showBanner', false) == false                                                        // 33
        ||  !canView(Meteor.user())                                                                         // 34
        ||  Router.current().location.get().path != '/'                                                     // 35
        ||  Cookie.get('showBanner') == "no"                                                                // 36
        ||  (Meteor.user() && getUserSetting('showBanner', true) == false)                                  // 37
        ||  (Meteor.user() && getUserSetting('subscribedToNewsletter', false) == true)                      // 38
      ){                                                                                                    // 39
        return false;                                                                                       // 40
      }else{                                                                                                // 41
        return true;                                                                                        // 42
      }                                                                                                     // 43
    }                                                                                                       // 44
  });                                                                                                       // 45
                                                                                                            // 46
  Template[getTemplate('newsletterBanner')].events({                                                        // 47
    'click .newsletter-button': function (e) {                                                              // 48
      e.preventDefault();                                                                                   // 49
      var $banner = $('.newsletter-banner');                                                                // 50
      if(Meteor.user()){                                                                                    // 51
        $banner.addClass('show-loader');                                                                    // 52
        Meteor.call('addCurrentUserToMailChimpList', function (error, result) {                             // 53
          $banner.removeClass('show-loader');                                                               // 54
          if(error){                                                                                        // 55
            console.log(error);                                                                             // 56
            throwError(error.message);                                                                      // 57
          }else{                                                                                            // 58
            console.log(result);                                                                            // 59
            confirmSubscription();                                                                          // 60
          }                                                                                                 // 61
        });                                                                                                 // 62
      }else{                                                                                                // 63
        var email = $('.newsletter-email').val();                                                           // 64
        if(!email){                                                                                         // 65
          alert('Please fill in your email.');                                                              // 66
          return                                                                                            // 67
        }                                                                                                   // 68
        $banner.addClass('show-loader');                                                                    // 69
        Meteor.call('addEmailToMailChimpList', email, function (error, result) {                            // 70
          $banner.removeClass('show-loader');                                                               // 71
          if(error){                                                                                        // 72
            console.log(error);                                                                             // 73
            throwError(error.message);                                                                      // 74
          }else{                                                                                            // 75
            console.log(result);                                                                            // 76
            confirmSubscription();                                                                          // 77
          }                                                                                                 // 78
        });                                                                                                 // 79
      }                                                                                                     // 80
      // $('body').addClass('showing-lightbox');                                                            // 81
      // $(e.target).parents('.post').find('.post-video-lightbox').fadeIn('fast');                          // 82
    },                                                                                                      // 83
    'click .newsletter-dismiss': function (e) {                                                             // 84
      $('.newsletter-banner').fadeOut('fast');                                                              // 85
      dismissBanner();                                                                                      // 86
      e.preventDefault();                                                                                   // 87
    }                                                                                                       // 88
  });                                                                                                       // 89
});                                                                                                         // 90
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['telescope-newsletter'] = {};

})();
