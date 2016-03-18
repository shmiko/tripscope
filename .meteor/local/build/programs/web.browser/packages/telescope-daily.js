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
var FastRender = Package['meteorhacks:fast-render'].FastRender;
var __init_fast_render = Package['meteorhacks:fast-render'].__init_fast_render;
var SubsManager = Package['meteorhacks:subs-manager'].SubsManager;
var $ = Package.jquery.$;
var jQuery = Package.jquery.jQuery;
var Router = Package['iron:router'].Router;
var RouteController = Package['iron:router'].RouteController;
var Template = Package.templating.Template;
var Iron = Package['iron:core'].Iron;
var Blaze = Package.blaze.Blaze;
var UI = Package.blaze.UI;
var Handlebars = Package.blaze.Handlebars;
var HTML = Package.htmljs.HTML;

/* Package-scope variables */
var PostsDailyController, i;

(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                       //
// packages/telescope-daily/lib/daily.js                                                                 //
//                                                                                                       //
///////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                         //
viewNav.push({                                                                                           // 1
  route: 'postsDaily',                                                                                   // 2
  label: 'Daily'                                                                                         // 3
});                                                                                                      // 4
                                                                                                         // 5
viewParameters.daily = function (terms) {                                                                // 6
  return {                                                                                               // 7
    find: {                                                                                              // 8
      postedAt: {                                                                                        // 9
        $gte: terms.after                                                                                // 10
      }                                                                                                  // 11
    },                                                                                                   // 12
    options: {                                                                                           // 13
      sort: {createdAt: -1, sticky: -1, baseScore: -1},                                                  // 14
      limit: 0                                                                                           // 15
    }                                                                                                    // 16
  };                                                                                                     // 17
}                                                                                                        // 18
///////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                       //
// packages/telescope-daily/lib/client/routes.js                                                         //
//                                                                                                       //
///////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                         //
var daysPerPage = 5;                                                                                     // 1
                                                                                                         // 2
var coreSubscriptions = new SubsManager({                                                                // 3
  // cache recent 50 subscriptions                                                                       // 4
  cacheLimit: 50,                                                                                        // 5
  // expire any subscription after 30 minutes                                                            // 6
  expireIn: 30                                                                                           // 7
});                                                                                                      // 8
                                                                                                         // 9
// note: FastRender not defined here?                                                                    // 10
                                                                                                         // 11
PostsDailyController = RouteController.extend({                                                          // 12
  template: function() {                                                                                 // 13
    return getTemplate('postsDaily');                                                                    // 14
  },                                                                                                     // 15
  subscriptions: function() {                                                                            // 16
    this.days = this.params.days ? this.params.days : daysPerPage;                                       // 17
    // this.days = Session.get('postsDays') ? Session.get('postsDays') : 3;                              // 18
                                                                                                         // 19
    var terms = {                                                                                        // 20
      view: 'daily',                                                                                     // 21
      days: this.days,                                                                                   // 22
      after: moment().subtract(this.days, 'days').startOf('day').toDate()                                // 23
    };                                                                                                   // 24
                                                                                                         // 25
    this.postsSubscription = coreSubscriptions.subscribe('postsList', terms, function() {                // 26
      Session.set('postsLoaded', true);                                                                  // 27
    });                                                                                                  // 28
                                                                                                         // 29
    this.postsUsersSubscription = coreSubscriptions.subscribe('postsListUsers', terms);                  // 30
                                                                                                         // 31
  },                                                                                                     // 32
  data: function() {                                                                                     // 33
    Session.set('postsDays', this.days);                                                                 // 34
    return {                                                                                             // 35
      days: this.days                                                                                    // 36
    };                                                                                                   // 37
  }                                                                                                      // 38
});                                                                                                      // 39
                                                                                                         // 40
Meteor.startup(function () {                                                                             // 41
                                                                                                         // 42
  Router.route('/daily/:days?', {                                                                        // 43
    name: 'postsDaily',                                                                                  // 44
    controller: PostsDailyController                                                                     // 45
  });                                                                                                    // 46
                                                                                                         // 47
});                                                                                                      // 48
///////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                       //
// packages/telescope-daily/lib/client/templates/template.posts_daily.js                                 //
//                                                                                                       //
///////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                         //
                                                                                                         // 1
Template.__checkName("postsDaily");                                                                      // 2
Template["postsDaily"] = new Template("Template.postsDaily", (function() {                               // 3
  var view = this;                                                                                       // 4
  return Blaze.If(function() {                                                                           // 5
    return Spacebars.call(view.lookup("postsLoaded"));                                                   // 6
  }, function() {                                                                                        // 7
    return [ "\n    ", HTML.DIV({                                                                        // 8
      "class": "grid"                                                                                    // 9
    }, "\n      ", Blaze.Each(function() {                                                               // 10
      return Spacebars.call(view.lookup("days"));                                                        // 11
    }, function() {                                                                                      // 12
      return [ "\n        ", HTML.H2({                                                                   // 13
        "class": "posts-day-heading"                                                                     // 14
      }, Blaze.View(function() {                                                                         // 15
        return Spacebars.mustache(view.lookup("formatDate"), view.lookup("date"), "dddd, MMMM Do YYYY"); // 16
      })), "\n        ", HTML.DIV({                                                                      // 17
        "class": "posts-wrapper posts-day posts list grid-module"                                        // 18
      }, "\n          ", Blaze.If(function() {                                                           // 19
        return Spacebars.call(view.lookup("posts"));                                                     // 20
      }, function() {                                                                                    // 21
        return [ "\n            ", Blaze.Each(function() {                                               // 22
          return Spacebars.call(view.lookup("posts"));                                                   // 23
        }, function() {                                                                                  // 24
          return [ "\n              ", Blaze._TemplateWith(function() {                                  // 25
            return {                                                                                     // 26
              template: Spacebars.call(view.lookup("post_item"))                                         // 27
            };                                                                                           // 28
          }, function() {                                                                                // 29
            return Spacebars.include(function() {                                                        // 30
              return Spacebars.call(Template.__dynamic);                                                 // 31
            });                                                                                          // 32
          }), "\n            " ];                                                                        // 33
        }), "\n          " ];                                                                            // 34
      }, function() {                                                                                    // 35
        return [ "\n            ", HTML.P({                                                              // 36
          "class": "empty-day-notice"                                                                    // 37
        }, "Sorry, no posts for that day."), "\n          " ];                                           // 38
      }), "\n        "), "\n      " ];                                                                   // 39
    }), "\n      ", HTML.A({                                                                             // 40
      "class": "more-button grid-module",                                                                // 41
      href: function() {                                                                                 // 42
        return Spacebars.mustache(view.lookup("loadMoreUrl"));                                           // 43
      }                                                                                                  // 44
    }, HTML.SPAN(Blaze.View(function() {                                                                 // 45
      return Spacebars.mustache(view.lookup("i18n"), "Load more");                                       // 46
    }))), "\n    "), "\n  " ];                                                                           // 47
  }, function() {                                                                                        // 48
    return [ "\n    ", HTML.DIV({                                                                        // 49
      "class": "grid loading-module"                                                                     // 50
    }, "\n      ", Spacebars.include(view.lookupTemplate("spinner")), "\n    "), "\n  " ];               // 51
  });                                                                                                    // 52
}));                                                                                                     // 53
                                                                                                         // 54
///////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                       //
// packages/telescope-daily/lib/client/templates/posts_daily.js                                          //
//                                                                                                       //
///////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                         //
var daysPerPage = 5;                                                                                     // 1
                                                                                                         // 2
var getPosts = function (date) {                                                                         // 3
  var terms = {                                                                                          // 4
    view: 'digest',                                                                                      // 5
    after: moment(date).startOf('day').toDate(),                                                         // 6
    before: moment(date).endOf('day').toDate()                                                           // 7
  };                                                                                                     // 8
  var parameters = getPostsParameters(terms);                                                            // 9
  var posts = Posts.find(parameters.find, parameters.options).map(function (post, index, cursor) {       // 10
    post.rank = index;                                                                                   // 11
    return post;                                                                                         // 12
  });                                                                                                    // 13
  return posts;                                                                                          // 14
}                                                                                                        // 15
                                                                                                         // 16
Meteor.startup(function () {                                                                             // 17
                                                                                                         // 18
  Template[getTemplate('postsDaily')].helpers({                                                          // 19
    postsLoaded: function () {                                                                           // 20
      return !!Session.get('postsLoaded');                                                               // 21
    },                                                                                                   // 22
    post_item: function () {                                                                             // 23
      return getTemplate('post_item');                                                                   // 24
    },                                                                                                   // 25
    days: function () {                                                                                  // 26
      var daysArray = [];                                                                                // 27
      // var days = this.days;                                                                           // 28
      var days = Session.get('postsDays');                                                               // 29
      for (i = 0; i < days; i++) {                                                                       // 30
        daysArray.push({                                                                                 // 31
          date: moment().subtract(i, 'days').startOf('day').toDate()                                     // 32
        });                                                                                              // 33
      }                                                                                                  // 34
      return daysArray;                                                                                  // 35
    },                                                                                                   // 36
    posts: function () {                                                                                 // 37
      return getPosts(this.date);                                                                        // 38
    },                                                                                                   // 39
    loadMoreUrl: function () {                                                                           // 40
      var count = parseInt(Session.get('postsDays')) + daysPerPage;                                      // 41
      return '/daily/' + count;                                                                          // 42
    }                                                                                                    // 43
  });                                                                                                    // 44
                                                                                                         // 45
});                                                                                                      // 46
                                                                                                         // 47
///////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['telescope-daily'] = {
  PostsDailyController: PostsDailyController
};

})();
