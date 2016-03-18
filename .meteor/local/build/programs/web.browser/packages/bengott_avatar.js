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
var Template = Package.templating.Template;
var ReactiveVar = Package['reactive-var'].ReactiveVar;
var _ = Package.underscore._;
var Gravatar = Package['jparker:gravatar'].Gravatar;
var Blaze = Package.blaze.Blaze;
var UI = Package.blaze.UI;
var Handlebars = Package.blaze.Handlebars;
var HTML = Package.htmljs.HTML;

/* Package-scope variables */
var Avatar, getService, getEmailOrHash;

(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                 //
// packages/bengott:avatar/template/template.avatar.js                                             //
//                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                   //
                                                                                                   // 1
Template.__checkName("avatar");                                                                    // 2
Template["avatar"] = new Template("Template.avatar", (function() {                                 // 3
  var view = this;                                                                                 // 4
  return HTML.DIV({                                                                                // 5
    "class": function() {                                                                          // 6
      return [ "avatar ", Spacebars.mustache(view.lookup("size")), " ", Spacebars.mustache(view.lookup("type")), " ", Spacebars.mustache(view.lookup("hideClass")), " ", Spacebars.mustache(view.lookup("class")) ];
    }                                                                                              // 8
  }, "\n    ", HTML.IMG(HTML.Attrs({                                                               // 9
    "class": "avatar-image",                                                                       // 10
    src: function() {                                                                              // 11
      return Spacebars.mustache(view.lookup("imageUrl"));                                          // 12
    }                                                                                              // 13
  }, function() {                                                                                  // 14
    return Spacebars.attrMustache(view.lookup("dimensions"));                                      // 15
  })), "\n    ", HTML.SPAN({                                                                       // 16
    "class": "avatar-initials",                                                                    // 17
    style: function() {                                                                            // 18
      return Spacebars.mustache(view.lookup("initialsCss"));                                       // 19
    }                                                                                              // 20
  }, Blaze.View(function() {                                                                       // 21
    return Spacebars.mustache(view.lookup("initialsText"));                                        // 22
  })), "\n  ");                                                                                    // 23
}));                                                                                               // 24
                                                                                                   // 25
/////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                 //
// packages/bengott:avatar/template/avatar.js                                                      //
//                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                   //
Template.avatar.helpers({                                                                          // 1
                                                                                                   // 2
  size: function () {                                                                              // 3
    var valid = ['large', 'small'];                                                                // 4
    return _.contains(valid, this.size) ? 'avatar-' + this.size : '';                              // 5
  },                                                                                               // 6
                                                                                                   // 7
  dimensions: function () {                                                                        // 8
    var value;                                                                                     // 9
    if      (this.size === 'small') value = 30;                                                    // 10
    else if (this.size === 'large') value = 80;                                                    // 11
    else                            value = 40;                                                    // 12
                                                                                                   // 13
    return { width: value, height: value };                                                        // 14
  },                                                                                               // 15
                                                                                                   // 16
  type: function () {                                                                              // 17
    var valid = ['rounded', 'circle'];                                                             // 18
    return _.contains(valid, this.type) ? 'avatar-' + this.type : '';                              // 19
  },                                                                                               // 20
                                                                                                   // 21
  hideClass: function () {                                                                         // 22
    // If image loaded successfully, hide initials. Else, hide image.                              // 23
    return Template.instance().hasImage.get() ? 'avatar-hide-initials' : 'avatar-hide-image';      // 24
  },                                                                                               // 25
                                                                                                   // 26
  class: function () { return this.class; },                                                       // 27
                                                                                                   // 28
  imageUrl: function () {                                                                          // 29
    var user = this.user ? this.user : Meteor.users.findOne(this.userId);                          // 30
    return Avatar.getUrl(user);                                                                    // 31
  },                                                                                               // 32
                                                                                                   // 33
  initialsCss: function () {                                                                       // 34
    var css = '';                                                                                  // 35
    if (this.bgColor)  style += 'background-color: ' + this.bgColor + ';';                         // 36
    if (this.txtColor) style += 'color: ' + this.txtColor + ';';                                   // 37
    return css;                                                                                    // 38
  },                                                                                               // 39
                                                                                                   // 40
  initialsText: function () {                                                                      // 41
    var user = this.user ? this.user : Meteor.users.findOne(this.userId);                          // 42
    return this.initials || Avatar.getInitials(user);                                              // 43
  }                                                                                                // 44
                                                                                                   // 45
});                                                                                                // 46
                                                                                                   // 47
// Use a reactive variable to store image load success/failure                                     // 48
Template.avatar.created = function () {                                                            // 49
  this.hasImage = new ReactiveVar(true);                                                           // 50
};                                                                                                 // 51
                                                                                                   // 52
// Determine if image loaded successfully and set hasImage variable                                // 53
Template.avatar.rendered = function () {                                                           // 54
  var self = this;                                                                                 // 55
  this.$('img').on('error', function () { self.hasImage.set(false); })                             // 56
               .on('load',  function () { self.hasImage.set(true); });                             // 57
};                                                                                                 // 58
                                                                                                   // 59
/////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                 //
// packages/bengott:avatar/export.js                                                               //
//                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                   //
// Avatar object to be exported                                                                    // 1
Avatar = {                                                                                         // 2
                                                                                                   // 3
  // If defined (e.g. from a startup config file in your app), these options                       // 4
  // override default functionality                                                                // 5
  options: {                                                                                       // 6
                                                                                                   // 7
    // This property on the user object will be used for retrieving gravatars                      // 8
    // (useful when user emails are not published).                                                // 9
    emailHashProperty: '',                                                                         // 10
                                                                                                   // 11
    // This will replace the standard default avatar URL. It can be a relative                     // 12
    // path (relative to website's base URL, e.g. 'images/defaultAvatar.png').                     // 13
    defaultAvatarUrl: '',                                                                          // 14
                                                                                                   // 15
    // Gravatar default option to use (overrides default avatar URL)                               // 16
    // Options are available at:                                                                   // 17
    // https://secure.gravatar.com/site/implement/images/#default-image                            // 18
    gravatarDefault: '',                                                                           // 19
                                                                                                   // 20
    // Server base URL. If calling Avatar.getUrl() from the server, this property                  // 21
    // is REQUIRED (because server can't call window.location to figure it out).                   // 22
    // Also, if this property is defined, it will effectively override the code that               // 23
    // tries to automatically determine your website's base URL.                                   // 24
    serverBaseUrl: ''                                                                              // 25
  },                                                                                               // 26
                                                                                                   // 27
  // Get the initials of the user                                                                  // 28
  getInitials: function (user) {                                                                   // 29
                                                                                                   // 30
    var initials = '';                                                                             // 31
                                                                                                   // 32
    if (user && user.profile && user.profile.firstName) {                                          // 33
      initials = user.profile.firstName.charAt(0).toUpperCase();                                   // 34
                                                                                                   // 35
      if (user.profile.lastName) {                                                                 // 36
        initials += user.profile.lastName.charAt(0).toUpperCase();                                 // 37
      }                                                                                            // 38
      else if (user.profile.familyName) {                                                          // 39
        initials += user.profile.familyName.charAt(0).toUpperCase();                               // 40
      }                                                                                            // 41
      else if (user.profile.secondName) {                                                          // 42
        initials += user.profile.secondName.charAt(0).toUpperCase();                               // 43
      }                                                                                            // 44
    }                                                                                              // 45
    else if (user && user.profile && user.profile.name) {                                          // 46
      user.profile.name.split(' ').forEach(function (part) {                                       // 47
        initials += part.charAt(0).toUpperCase();                                                  // 48
      });                                                                                          // 49
    }                                                                                              // 50
                                                                                                   // 51
    return initials;                                                                               // 52
  },                                                                                               // 53
                                                                                                   // 54
  // Get the url of the user's avatar                                                              // 55
  getUrl: function (user) {                                                                        // 56
                                                                                                   // 57
    var url, defaultUrl, baseUrl;                                                                  // 58
                                                                                                   // 59
    defaultUrl = Avatar.options.defaultAvatarUrl;                                                  // 60
                                                                                                   // 61
    // If it's a relative path (no '//' anywhere), complete the URL                                // 62
    if (defaultUrl.indexOf('//') === -1) {                                                         // 63
                                                                                                   // 64
      // Strip starting slash if it exists                                                         // 65
      if (defaultUrl.charAt(0) === '/') defaultUrl = defaultUrl.slice(1);                          // 66
                                                                                                   // 67
      // Get the base URL                                                                          // 68
      if (Avatar.options.serverBaseUrl) {                                                          // 69
        baseUrl = Avatar.options.serverBaseUrl;                                                    // 70
        // Strip ending slash if it exists                                                         // 71
        if (baseUrl.charAt(baseUrl.length - 1) === '/') baseUrl = baseUrl.slice(0, -1);            // 72
      } else {                                                                                     // 73
        // If on the client, figure out the base URL automatically                                 // 74
        if (Meteor.isClient) {                                                                     // 75
          baseUrl = window.location.origin;                                                        // 76
        }                                                                                          // 77
        // The server will not abide this, man. Warn via console.                                  // 78
        else if (Meteor.isServer) {                                                                // 79
          console.warn('[bengott:avatar] Cannot generate default avatar URL: ' +                   // 80
                       'serverBaseUrl option is not defined.');                                    // 81
        }                                                                                          // 82
      }                                                                                            // 83
      // Put it all together                                                                       // 84
      defaultUrl = baseUrl + '/' + defaultUrl;                                                     // 85
    }                                                                                              // 86
                                                                                                   // 87
    if (user) {                                                                                    // 88
      var svc = getService(user);                                                                  // 89
      if (svc === 'twitter') {                                                                     // 90
        // use larger image (200x200 is smallest custom option)                                    // 91
        url = user.services.twitter.profile_image_url.replace('_normal.', '_200x200.');            // 92
      }                                                                                            // 93
      else if (svc === 'facebook') {                                                               // 94
        // use larger image (~200x200)                                                             // 95
        url = 'http://graph.facebook.com/' + user.services.facebook.id + '/picture?type=large';    // 96
      }                                                                                            // 97
      else if (svc === 'google') {                                                                 // 98
        url = user.services.google.picture;                                                        // 99
      }                                                                                            // 100
      else if (svc === 'github') {                                                                 // 101
        url = 'http://avatars.githubusercontent.com/u/' + user.services.github.id + '?v=2';        // 102
      }                                                                                            // 103
      else if (svc === 'instagram') {                                                              // 104
        url = user.services.instagram.profile_picture;                                             // 105
      }                                                                                            // 106
      else if (svc === 'none') {                                                                   // 107
        var gravatarDefault;                                                                       // 108
        var validGravatars = ['404', 'mm', 'identicon', 'monsterid', 'wavatar', 'retro', 'blank']; // 109
        if (_.contains(validGravatars, Avatar.options.gravatarDefault)) {                          // 110
          gravatarDefault = Avatar.options.gravatarDefault;                                        // 111
        }                                                                                          // 112
        else {                                                                                     // 113
          gravatarDefault = '404';                                                                 // 114
        }                                                                                          // 115
                                                                                                   // 116
        var options = {                                                                            // 117
          // NOTE: Gravatar's default option requires a publicly accessible URL,                   // 118
          // so it won't work when your app is running on localhost and you're                     // 119
          // using either the standard default URL or a custom defaultAvatarUrl                    // 120
          // that is a relative path (e.g. 'images/defaultAvatar.png').                            // 121
          default: gravatarDefault || defaultUrl,                                                  // 122
          size: 200, // use 200x200 like twitter and facebook above (might be useful later)        // 123
          secure: Meteor.isClient && window.location.protocol === 'https:'                         // 124
        };                                                                                         // 125
                                                                                                   // 126
        var emailOrHash = getEmailOrHash(user);                                                    // 127
        url = emailOrHash && Gravatar.imageUrl(emailOrHash, options) || defaultUrl;                // 128
      }                                                                                            // 129
    }                                                                                              // 130
    else {                                                                                         // 131
      url = defaultUrl;                                                                            // 132
    }                                                                                              // 133
                                                                                                   // 134
    return url;                                                                                    // 135
  }                                                                                                // 136
};                                                                                                 // 137
                                                                                                   // 138
/////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                 //
// packages/bengott:avatar/helpers.js                                                              //
//                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                   //
// Get the account service to use for the user's avatar                                            // 1
// Priority: Twitter > Facebook > Google > GitHub > Instagram                                      // 2
getService = function (user) {                                                                     // 3
  if      (user.services && user.services.twitter)   { return 'twitter'; }                         // 4
  else if (user.services && user.services.facebook)  { return 'facebook'; }                        // 5
  else if (user.services && user.services.google)    { return 'google'; }                          // 6
  else if (user.services && user.services.github)    { return 'github'; }                          // 7
  else if (user.services && user.services.instagram) { return 'instagram'; }                       // 8
  else                                               { return 'none'; }                            // 9
};                                                                                                 // 10
                                                                                                   // 11
// Get the user's email address or (if the emailHashProperty is defined) hash                      // 12
getEmailOrHash = function (user) {                                                                 // 13
  var emailOrHash;                                                                                 // 14
  if (Avatar.options.emailHashProperty) {                                                          // 15
    emailOrHash = user[Avatar.options.emailHashProperty];                                          // 16
  }                                                                                                // 17
  else if (user.emails) {                                                                          // 18
    emailOrHash = user.emails[0].address; // TODO: try all emails                                  // 19
  }                                                                                                // 20
  return emailOrHash;                                                                              // 21
};                                                                                                 // 22
/////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['bengott:avatar'] = {
  Avatar: Avatar
};

})();
