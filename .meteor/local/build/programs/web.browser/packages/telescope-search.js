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
var adminNav, viewParameters, Searches, PostsSearchController, currentDate;

(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/telescope-search/lib/search.js                                                                             //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
// push "search" template to primaryNav                                                                                // 1
primaryNav.push('search');                                                                                             // 2
                                                                                                                       // 3
Searches = new Meteor.Collection("searches", {                                                                         // 4
  schema: new SimpleSchema({                                                                                           // 5
    _id: {                                                                                                             // 6
      type: String,                                                                                                    // 7
      optional: true                                                                                                   // 8
    },                                                                                                                 // 9
    timestamp: {                                                                                                       // 10
      type: Date                                                                                                       // 11
    },                                                                                                                 // 12
    keyword: {                                                                                                         // 13
      type: String                                                                                                     // 14
    }                                                                                                                  // 15
  })                                                                                                                   // 16
});                                                                                                                    // 17
                                                                                                                       // 18
Meteor.startup(function() {                                                                                            // 19
  Searches.allow({                                                                                                     // 20
    update: isAdminById                                                                                                // 21
  , remove: isAdminById                                                                                                // 22
  });                                                                                                                  // 23
});                                                                                                                    // 24
                                                                                                                       // 25
// search post list parameters                                                                                         // 26
viewParameters.search = function (terms, baseParameters) {                                                             // 27
  // if query is empty, just return parameters that will result in an empty collection                                 // 28
  if(typeof terms.query == 'undefined' || !terms.query)                                                                // 29
    return {find:{_id: 0}}                                                                                             // 30
                                                                                                                       // 31
  // log current search in the db                                                                                      // 32
  if(Meteor.isServer)                                                                                                  // 33
    logSearch(terms.query);                                                                                            // 34
                                                                                                                       // 35
  var parameters = deepExtend(true, baseParameters, {                                                                  // 36
    find: {                                                                                                            // 37
      $or: [                                                                                                           // 38
        {title: {$regex: terms.query, $options: 'i'}},                                                                 // 39
        {url: {$regex: terms.query, $options: 'i'}},                                                                   // 40
        {body: {$regex: terms.query, $options: 'i'}}                                                                   // 41
      ]                                                                                                                // 42
    }                                                                                                                  // 43
  });                                                                                                                  // 44
  return parameters;                                                                                                   // 45
}                                                                                                                      // 46
                                                                                                                       // 47
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/telescope-search/lib/client/routes.js                                                                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
adminNav.push({                                                                                                        // 1
  route: 'searchLogs',                                                                                                 // 2
  label: 'Search Logs'                                                                                                 // 3
});                                                                                                                    // 4
                                                                                                                       // 5
                                                                                                                       // 6
Meteor.startup(function () {                                                                                           // 7
                                                                                                                       // 8
  PostsSearchController = PostsListController.extend({                                                                 // 9
    view: 'search',                                                                                                    // 10
    onBeforeAction: function() {                                                                                       // 11
      if ("q" in this.params) {                                                                                        // 12
        Session.set("searchQuery", this.params.q);                                                                     // 13
      }                                                                                                                // 14
    }                                                                                                                  // 15
  });                                                                                                                  // 16
                                                                                                                       // 17
  Router.onBeforeAction(Router._filters.isAdmin, {only: ['logs']});                                                    // 18
                                                                                                                       // 19
  // Search                                                                                                            // 20
                                                                                                                       // 21
  Router.route('/search/:limit?', {                                                                                    // 22
    name: 'search',                                                                                                    // 23
    controller: PostsSearchController                                                                                  // 24
  });                                                                                                                  // 25
                                                                                                                       // 26
  // Search Logs                                                                                                       // 27
                                                                                                                       // 28
  Router.route('/logs/:limit?', {                                                                                      // 29
    name: 'searchLogs',                                                                                                // 30
    waitOn: function () {                                                                                              // 31
      var limit = this.params.limit || 100;                                                                            // 32
      if(Meteor.isClient) {                                                                                            // 33
        Session.set('logsLimit', limit);                                                                               // 34
      }                                                                                                                // 35
      return Meteor.subscribe('searches', limit);                                                                      // 36
    },                                                                                                                 // 37
    data: function () {                                                                                                // 38
      return Searches.find({}, {sort: {timestamp: -1}});                                                               // 39
    },                                                                                                                 // 40
    fastRender: true                                                                                                   // 41
  });                                                                                                                  // 42
                                                                                                                       // 43
});                                                                                                                    // 44
                                                                                                                       // 45
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/telescope-search/lib/client/views/template.search.js                                                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("search");                                                                                        // 2
Template["search"] = new Template("Template.search", (function() {                                                     // 3
  var view = this;                                                                                                     // 4
  return Blaze.If(function() {                                                                                         // 5
    return Spacebars.call(view.lookup("canSearch"));                                                                   // 6
  }, function() {                                                                                                      // 7
    return [ "\n    ", HTML.DIV({                                                                                      // 8
      "class": function() {                                                                                            // 9
        return [ "search ", Spacebars.mustache(view.lookup("searchQueryEmpty")), " header-submodule" ];                // 10
      }                                                                                                                // 11
    }, "\n      ", HTML.INPUT({                                                                                        // 12
      id: "search",                                                                                                    // 13
      type: "search",                                                                                                  // 14
      "class": "search-field",                                                                                         // 15
      placeholder: "search",                                                                                           // 16
      value: function() {                                                                                              // 17
        return Spacebars.mustache(view.lookup("searchQuery"));                                                         // 18
      }                                                                                                                // 19
    }), "\n    "), "\n  " ];                                                                                           // 20
  });                                                                                                                  // 21
}));                                                                                                                   // 22
                                                                                                                       // 23
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/telescope-search/lib/client/views/search.js                                                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
// see: http://stackoverflow.com/questions/1909441/jquery-keyup-delay                                                  // 1
var delay = (function(){                                                                                               // 2
  var timer = 0;                                                                                                       // 3
  return function(callback, ms){                                                                                       // 4
    clearTimeout (timer);                                                                                              // 5
    timer = setTimeout(callback, ms);                                                                                  // 6
  };                                                                                                                   // 7
})();                                                                                                                  // 8
                                                                                                                       // 9
Meteor.startup(function () {                                                                                           // 10
  Template[getTemplate('search')].helpers({                                                                            // 11
    canSearch: function () {                                                                                           // 12
      return canView(Meteor.user());                                                                                   // 13
    },                                                                                                                 // 14
    searchQuery: function () {                                                                                         // 15
      return Session.get("searchQuery");                                                                               // 16
    },                                                                                                                 // 17
    searchQueryEmpty: function () {                                                                                    // 18
      return !!Session.get("searchQuery") ? '' : 'empty';                                                              // 19
    }                                                                                                                  // 20
  });                                                                                                                  // 21
                                                                                                                       // 22
  Template[getTemplate('search')].events({                                                                             // 23
    'keyup, search .search-field': function(e){                                                                        // 24
      e.preventDefault();                                                                                              // 25
      var val = $(e.target).val(),                                                                                     // 26
          $search = $('.search');                                                                                      // 27
      if(val==''){                                                                                                     // 28
        // if search field is empty, just do nothing and show an empty template                                        // 29
        $search.addClass('empty');                                                                                     // 30
        Session.set('searchQuery', '');                                                                                // 31
        Router.go('/search', null, {replaceState: true});                                                              // 32
      }else{                                                                                                           // 33
        // if search field is not empty, add a delay to avoid firing new searches for every keystroke                  // 34
        delay(function(){                                                                                              // 35
          Session.set('searchQuery', val);                                                                             // 36
          $search.removeClass('empty');                                                                                // 37
                                                                                                                       // 38
          // Update the querystring.                                                                                   // 39
          var opts = {query: 'q=' + encodeURIComponent(val)};                                                          // 40
          // if we're already on the search page, do a replaceState. Otherwise,                                        // 41
          // just use the pushState default.                                                                           // 42
          if(getCurrentRoute().indexOf('/search') === 0) {                                                             // 43
            opts.replaceState = true;                                                                                  // 44
          }                                                                                                            // 45
          Router.go('search', null, opts);                                                                             // 46
                                                                                                                       // 47
        }, 700 );                                                                                                      // 48
      }                                                                                                                // 49
    }                                                                                                                  // 50
  });                                                                                                                  // 51
});                                                                                                                    // 52
                                                                                                                       // 53
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/telescope-search/lib/client/views/template.search_logs.js                                                  //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("searchLogs");                                                                                    // 2
Template["searchLogs"] = new Template("Template.searchLogs", (function() {                                             // 3
  var view = this;                                                                                                     // 4
  return HTML.DIV({                                                                                                    // 5
    "class": "grid-small grid-module dialog admin"                                                                     // 6
  }, HTML.Raw("\n    <h2>Search Logs</h2>\n      "), HTML.TABLE("\n        ", HTML.THEAD("\n          ", HTML.TR("\n            ", HTML.TH("Keyword"), "\n            ", HTML.TH("Timestamp"), "\n          "), "\n        "), "\n        ", HTML.TBODY("\n        ", Blaze.Each(function() {
    return Spacebars.call(view.lookup("."));                                                                           // 8
  }, function() {                                                                                                      // 9
    return [ "\n          ", Blaze.If(function() {                                                                     // 10
      return Spacebars.call(view.lookup("isNewDate"));                                                                 // 11
    }, function() {                                                                                                    // 12
      return [ "\n            ", HTML.TR({                                                                             // 13
        "class": "search-date-header"                                                                                  // 14
      }, "\n              ", HTML.TH({                                                                                 // 15
        colspan: "2"                                                                                                   // 16
      }, "\n                ", HTML.SPAN({                                                                             // 17
        "class": "search-date"                                                                                         // 18
      }, Blaze.View(function() {                                                                                       // 19
        return Spacebars.mustache(view.lookup("getDate"));                                                             // 20
      })), "\n                ", HTML.SPAN({                                                                           // 21
        "class": "search-count"                                                                                        // 22
      }, Blaze.View(function() {                                                                                       // 23
        return Spacebars.mustache(view.lookup("searchCount"));                                                         // 24
      })), "\n              "), "\n            "), "\n          " ];                                                   // 25
    }), "\n          ", HTML.TR("\n            ", HTML.TD(Blaze.View(function() {                                      // 26
      return Spacebars.mustache(view.lookup("keyword"));                                                               // 27
    })), "\n            ", HTML.TD(Blaze.View(function() {                                                             // 28
      return Spacebars.mustache(view.lookup("getTime"));                                                               // 29
    })), "\n          "), "\n        " ];                                                                              // 30
  }), "\n      "), "\n    "), "\n    ", HTML.DIV({                                                                     // 31
    "class": "grid more-button"                                                                                        // 32
  }, "\n      ", HTML.A({                                                                                              // 33
    "class": "more-link",                                                                                              // 34
    href: function() {                                                                                                 // 35
      return Spacebars.mustache(view.lookup("loadMoreUrl"));                                                           // 36
    }                                                                                                                  // 37
  }, Blaze.View(function() {                                                                                           // 38
    return Spacebars.mustache(view.lookup("i18n"), "Load more");                                                       // 39
  })), "\n    "), "\n  ");                                                                                             // 40
}));                                                                                                                   // 41
                                                                                                                       // 42
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/telescope-search/lib/client/views/search_logs.js                                                           //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Meteor.startup(function () {                                                                                           // 1
  Template[getTemplate('searchLogs')].helpers({                                                                        // 2
    getTime: function () {                                                                                             // 3
      return moment(this.timestamp).format("HH:mm:ss");                                                                // 4
    },                                                                                                                 // 5
    getDate: function () {                                                                                             // 6
      currentDate = moment(this.timestamp).format("MMMM DD");                                                          // 7
      return currentDate;                                                                                              // 8
    },                                                                                                                 // 9
    searchCount: function () {                                                                                         // 10
      // TODO: doesn't work properly with "load more"                                                                  // 11
      var after = moment(this.timestamp).startOf('day').valueOf(),                                                     // 12
          before = moment(this.timestamp).endOf('day').valueOf();                                                      // 13
                                                                                                                       // 14
      return Searches.find({                                                                                           // 15
        timestamp: {                                                                                                   // 16
          $gte: after,                                                                                                 // 17
          $lt: before                                                                                                  // 18
        }                                                                                                              // 19
      }).count();                                                                                                      // 20
    },                                                                                                                 // 21
    isNewDate: function () {                                                                                           // 22
      return (typeof currentDate === 'undefined') ? true : (currentDate !== moment(this.timestamp).format("MMMM DD")); // 23
    },                                                                                                                 // 24
    loadMoreUrl: function(){                                                                                           // 25
      var count = parseInt(Session.get('logsLimit')) + 100;                                                            // 26
      return '/logs/' + count;                                                                                         // 27
    },                                                                                                                 // 28
  });                                                                                                                  // 29
});                                                                                                                    // 30
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['telescope-search'] = {
  adminNav: adminNav,
  viewParameters: viewParameters
};

})();
