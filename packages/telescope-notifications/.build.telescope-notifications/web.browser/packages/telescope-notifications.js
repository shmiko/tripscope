(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                //
// packages/telescope-notifications/lib/notifications.js                                                          //
//                                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                  //
// add new post notification callback on post submit                                                              // 1
postAfterSubmitMethodCallbacks.push(function (post) {                                                             // 2
  if(Meteor.isServer){                                                                                            // 3
    var userIds = Meteor.users.find({'profile.notifications.posts': 1}, {fields: {}}).map(function (user) {       // 4
      return user._id                                                                                             // 5
    });                                                                                                           // 6
    Herald.createNotification(userIds, {courier: 'newPost', data: post})                                          // 7
  }                                                                                                               // 8
  return post;                                                                                                    // 9
});                                                                                                               // 10
                                                                                                                  // 11
// add new comment notification callback on comment submit                                                        // 12
commentAfterSubmitMethodCallbacks.push(function (comment) {                                                       // 13
  if(Meteor.isServer){                                                                                            // 14
                                                                                                                  // 15
    var parentCommentId = comment.parentCommentId;                                                                // 16
    var user = Meteor.user();                                                                                     // 17
    var post = Posts.findOne(comment.postId);                                                                     // 18
    var postUser = Meteor.users.findOne(post.userId);                                                             // 19
                                                                                                                  // 20
    var notificationData = {                                                                                      // 21
      comment: _.pick(comment, '_id', 'userId', 'author', 'body'),                                                // 22
      post: _.pick(post, '_id', 'title', 'url')                                                                   // 23
    };                                                                                                            // 24
                                                                                                                  // 25
    if(parentCommentId){                                                                                          // 26
      // child comment                                                                                            // 27
      var parentComment = Comments.findOne(parentCommentId);                                                      // 28
      var parentUser = Meteor.users.findOne(parentComment.userId);                                                // 29
                                                                                                                  // 30
      notificationData.parentComment = _.pick(parentComment, '_id', 'userId', 'author');                          // 31
                                                                                                                  // 32
      // reply notification                                                                                       // 33
      // do not notify users of their own actions (i.e. they're replying to themselves)                           // 34
      if(parentUser._id != user._id)                                                                              // 35
        Herald.createNotification(parentUser._id, {courier: 'newReply', data: notificationData})                  // 36
                                                                                                                  // 37
      // comment notification                                                                                     // 38
      // if the original poster is different from the author of the parent comment, notify them too               // 39
      if(postUser._id != user._id && parentComment.userId != post.userId)                                         // 40
        Herald.createNotification(postUser._id, {courier: 'newComment', data: notificationData})                  // 41
                                                                                                                  // 42
    }else{                                                                                                        // 43
      // root comment                                                                                             // 44
      // don't notify users of their own comments                                                                 // 45
      if(postUser._id != user._id)                                                                                // 46
        Herald.createNotification(postUser._id, {courier: 'newComment', data: notificationData})                  // 47
    }                                                                                                             // 48
  }                                                                                                               // 49
                                                                                                                  // 50
  return comment;                                                                                                 // 51
});                                                                                                               // 52
                                                                                                                  // 53
var emailNotifications = {                                                                                        // 54
  propertyName: 'emailNotifications',                                                                             // 55
  propertySchema: {                                                                                               // 56
    type: Boolean,                                                                                                // 57
    optional: true,                                                                                               // 58
    defaultValue: true,                                                                                           // 59
    autoform: {                                                                                                   // 60
      group: 'notifications',                                                                                     // 61
      instructions: 'Enable email notifications for new posts and new comments (requires restart).'               // 62
    }                                                                                                             // 63
  }                                                                                                               // 64
}                                                                                                                 // 65
addToSettingsSchema.push(emailNotifications);                                                                     // 66
                                                                                                                  // 67
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                //
// packages/telescope-notifications/lib/herald.js                                                                 //
//                                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                  //
Meteor.startup(function () {                                                                                      // 1
                                                                                                                  // 2
  Herald.collection.deny({                                                                                        // 3
    update: ! can.editById,                                                                                       // 4
    remove: ! can.editById                                                                                        // 5
  });                                                                                                             // 6
                                                                                                                  // 7
  // disable all email notifications when "emailNotifications" is set to false                                    // 8
  if (getSetting('emailNotifications', true)) {                                                                   // 9
    Herald.settings.overrides.email = false;                                                                      // 10
  } else {                                                                                                        // 11
    Herald.settings.overrides.email = true;                                                                       // 12
  };                                                                                                              // 13
});                                                                                                               // 14
                                                                                                                  // 15
var commentEmail = function (userToNotify) {                                                                      // 16
  var notification = this;                                                                                        // 17
  // put in setTimeout so it doesn't hold up the rest of the method                                               // 18
  Meteor.setTimeout(function () {                                                                                 // 19
    notificationEmail = buildEmailNotification(notification);                                                     // 20
    sendEmail(getEmail(userToNotify), notificationEmail.subject, notificationEmail.html);                         // 21
  }, 1);                                                                                                          // 22
}                                                                                                                 // 23
                                                                                                                  // 24
var getCommenterProfileUrl = function (comment) {                                                                 // 25
  var user = Meteor.users.findOne(comment.userId);                                                                // 26
  if(user) {                                                                                                      // 27
    return getProfileUrl(user);                                                                                   // 28
  } else {                                                                                                        // 29
    return getProfileUrlById(comment.userId)                                                                      // 30
  }                                                                                                               // 31
}                                                                                                                 // 32
                                                                                                                  // 33
var getAuthor = function (comment) {                                                                              // 34
  var user = Meteor.users.findOne(comment.userId);                                                                // 35
  if(user) {                                                                                                      // 36
    return getUserName(user);                                                                                     // 37
  } else {                                                                                                        // 38
    return comment.author;                                                                                        // 39
  }                                                                                                               // 40
}                                                                                                                 // 41
                                                                                                                  // 42
Herald.addCourier('newPost', {                                                                                    // 43
  media: {                                                                                                        // 44
    email: {                                                                                                      // 45
      emailRunner: function (user) {                                                                              // 46
        var p = getPostProperties(this.data);                                                                     // 47
        var subject = p.postAuthorName+' has created a new post: '+p.postTitle;                                   // 48
        var html = buildEmailTemplate(getEmailTemplate('emailNewPost')(p));                                       // 49
        sendEmail(getEmail(user), subject, html);                                                                 // 50
      }                                                                                                           // 51
    }                                                                                                             // 52
  }                                                                                                               // 53
  // message: function (user) { return 'email template?' }                                                        // 54
});                                                                                                               // 55
                                                                                                                  // 56
Herald.addCourier('newComment', {                                                                                 // 57
  media: {                                                                                                        // 58
    onsite: {},                                                                                                   // 59
    email: {                                                                                                      // 60
      emailRunner: commentEmail                                                                                   // 61
    }                                                                                                             // 62
  },                                                                                                              // 63
  message: {                                                                                                      // 64
    default: function (user) {                                                                                    // 65
       return Blaze.toHTML(Blaze.With(this, function(){                                                           // 66
        return Template[getTemplate('notificationNewComment')]                                                    // 67
      }));                                                                                                        // 68
    }                                                                                                             // 69
  },                                                                                                              // 70
  transform: {                                                                                                    // 71
    profileUrl: function () {                                                                                     // 72
      return getCommenterProfileUrl(this.data.comment);                                                           // 73
    },                                                                                                            // 74
    postCommentUrl: function () {                                                                                 // 75
      return '/posts/'+ this.data.post._id;                                                                       // 76
    },                                                                                                            // 77
    author: function () {                                                                                         // 78
      return getAuthor(this.data.comment);                                                                        // 79
    },                                                                                                            // 80
    postTitle: function () {                                                                                      // 81
      return this.data.post.title;                                                                                // 82
    },                                                                                                            // 83
    url: function () {                                                                                            // 84
      return /comments/ + this.comment._id;                                                                       // 85
    }                                                                                                             // 86
  }                                                                                                               // 87
});                                                                                                               // 88
                                                                                                                  // 89
Herald.addCourier('newReply', {                                                                                   // 90
  media: {                                                                                                        // 91
    onsite: {},                                                                                                   // 92
    email: {                                                                                                      // 93
      emailRunner: commentEmail                                                                                   // 94
    }                                                                                                             // 95
  },                                                                                                              // 96
  message: {                                                                                                      // 97
    default: function (user) {                                                                                    // 98
      return Blaze.toHTML(Blaze.With(this, function(){                                                            // 99
        return Template[getTemplate('notificationNewReply')]                                                      // 100
      }));                                                                                                        // 101
    }                                                                                                             // 102
  },                                                                                                              // 103
  transform: {                                                                                                    // 104
    profileUrl: function () {                                                                                     // 105
      return getCommenterProfileUrl(this.data.comment);                                                           // 106
    },                                                                                                            // 107
    postCommentUrl: function () {                                                                                 // 108
      return '/posts/'+ this.data.post._id;                                                                       // 109
    },                                                                                                            // 110
    author: function () {                                                                                         // 111
      return getAuthor(this.data.comment);                                                                        // 112
    },                                                                                                            // 113
    postTitle: function () {                                                                                      // 114
      return this.data.post.title;                                                                                // 115
    },                                                                                                            // 116
    url: function () {                                                                                            // 117
      return /comments/ + this.parentComment._id;                                                                 // 118
    }                                                                                                             // 119
  }                                                                                                               // 120
});                                                                                                               // 121
                                                                                                                  // 122
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                //
// packages/telescope-notifications/lib/client/templates/template.notification_item.js                            //
//                                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                  //
                                                                                                                  // 1
Template.__checkName("notificationItem");                                                                         // 2
Template["notificationItem"] = new Template("Template.notificationItem", (function() {                            // 3
  var view = this;                                                                                                // 4
  return HTML.LI({                                                                                                // 5
    "class": function() {                                                                                         // 6
      return [ "notification-item ", Blaze.If(function() {                                                        // 7
        return Spacebars.call(view.lookup("read"));                                                               // 8
      }, function() {                                                                                             // 9
        return "read";                                                                                            // 10
      }) ];                                                                                                       // 11
    }                                                                                                             // 12
  }, "\n    ", HTML.SPAN({                                                                                        // 13
    "class": "notification-timestamp"                                                                             // 14
  }, Blaze.View(function() {                                                                                      // 15
    return Spacebars.mustache(view.lookup("niceTime"));                                                           // 16
  })), "\n    ", HTML.DIV({                                                                                       // 17
    "class": "notification-html"                                                                                  // 18
  }, "\n      ", Blaze.View(function() {                                                                          // 19
    return Spacebars.makeRaw(Spacebars.mustache(view.lookup("notificationHTML")));                                // 20
  }), "\n    "), "\n  ");                                                                                         // 21
}));                                                                                                              // 22
                                                                                                                  // 23
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                //
// packages/telescope-notifications/lib/client/templates/notification_item.js                                     //
//                                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                  //
Template[getTemplate('notificationItem')].helpers({                                                               // 1
  niceTime: function(){                                                                                           // 2
    return moment(this.timestamp).fromNow();                                                                      // 3
  },                                                                                                              // 4
  properties: function(){                                                                                         // 5
    return this.data;                                                                                             // 6
  },                                                                                                              // 7
  notificationHTML: function(){                                                                                   // 8
    return this.message();                                                                                        // 9
  }                                                                                                               // 10
});                                                                                                               // 11
                                                                                                                  // 12
Template[getTemplate('notificationItem')].events({                                                                // 13
  'click .action-link': function(event, instance){                                                                // 14
    var notificationId=instance.data._id;                                                                         // 15
    Herald.collection.update(                                                                                     // 16
    {_id: notificationId},                                                                                        // 17
    {                                                                                                             // 18
      $set:{                                                                                                      // 19
        read: true                                                                                                // 20
      }                                                                                                           // 21
    },                                                                                                            // 22
    function(error, result){                                                                                      // 23
      if(error){                                                                                                  // 24
        console.log(error);                                                                                       // 25
      }                                                                                                           // 26
    }                                                                                                             // 27
  );                                                                                                              // 28
  }                                                                                                               // 29
});                                                                                                               // 30
                                                                                                                  // 31
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                //
// packages/telescope-notifications/lib/client/templates/template.notification_new_comment.js                     //
//                                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                  //
                                                                                                                  // 1
Template.__checkName("notificationNewComment");                                                                   // 2
Template["notificationNewComment"] = new Template("Template.notificationNewComment", (function() {                // 3
  var view = this;                                                                                                // 4
  return HTML.P("\n    ", HTML.A({                                                                                // 5
    href: function() {                                                                                            // 6
      return Spacebars.mustache(view.lookup("profileUrl"));                                                       // 7
    }                                                                                                             // 8
  }, Blaze.View(function() {                                                                                      // 9
    return Spacebars.mustache(view.lookup("author"));                                                             // 10
  })), " \n    left a new comment on    \n    ", HTML.A({                                                         // 11
    href: function() {                                                                                            // 12
      return Spacebars.mustache(view.lookup("postCommentUrl"));                                                   // 13
    },                                                                                                            // 14
    "class": "action-link"                                                                                        // 15
  }, Blaze.View(function() {                                                                                      // 16
    return Spacebars.mustache(view.lookup("postTitle"));                                                          // 17
  })), "\n  ");                                                                                                   // 18
}));                                                                                                              // 19
                                                                                                                  // 20
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                //
// packages/telescope-notifications/lib/client/templates/template.notification_new_reply.js                       //
//                                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                  //
                                                                                                                  // 1
Template.__checkName("notificationNewReply");                                                                     // 2
Template["notificationNewReply"] = new Template("Template.notificationNewReply", (function() {                    // 3
  var view = this;                                                                                                // 4
  return HTML.P("\n    ", HTML.A({                                                                                // 5
    href: function() {                                                                                            // 6
      return Spacebars.mustache(view.lookup("profileUrl"));                                                       // 7
    }                                                                                                             // 8
  }, Blaze.View(function() {                                                                                      // 9
    return Spacebars.mustache(view.lookup("author"));                                                             // 10
  })), "\n    has replied to your comment on \n    ", HTML.A({                                                    // 11
    href: function() {                                                                                            // 12
      return Spacebars.mustache(view.lookup("postCommentUrl"));                                                   // 13
    },                                                                                                            // 14
    "class": "action-link"                                                                                        // 15
  }, Blaze.View(function() {                                                                                      // 16
    return Spacebars.mustache(view.lookup("postTitle"));                                                          // 17
  })), "\n  ");                                                                                                   // 18
}));                                                                                                              // 19
                                                                                                                  // 20
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                //
// packages/telescope-notifications/lib/client/templates/template.notifications_menu.js                           //
//                                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                  //
                                                                                                                  // 1
Template.__checkName("notificationsMenu");                                                                        // 2
Template["notificationsMenu"] = new Template("Template.notificationsMenu", (function() {                          // 3
  var view = this;                                                                                                // 4
  return Blaze.If(function() {                                                                                    // 5
    return Spacebars.call(view.lookup("isLoggedIn"));                                                             // 6
  }, function() {                                                                                                 // 7
    return [ "\n    ", HTML.DIV({                                                                                 // 8
      "class": "dropdown notifications-menu header-submodule"                                                     // 9
    }, "\n      ", HTML.A({                                                                                       // 10
      "class": "view  dropdown-top-level",                                                                        // 11
      href: "/"                                                                                                   // 12
    }, Blaze.View(function() {                                                                                    // 13
      return Spacebars.mustache(view.lookup("notification_count"));                                               // 14
    })), "\n      ", HTML.DIV({                                                                                   // 15
      "class": "dropdown-menu"                                                                                    // 16
    }, "\n        ", HTML.UL({                                                                                    // 17
      role: "menu",                                                                                               // 18
      "aria-labelledby": "dLabel"                                                                                 // 19
    }, "\n          ", Blaze.If(function() {                                                                      // 20
      return Spacebars.call(view.lookup("hasNotifications"));                                                     // 21
    }, function() {                                                                                               // 22
      return [ "\n            ", HTML.LI(HTML.A({                                                                 // 23
        href: "#",                                                                                                // 24
        "class": "button mark-as-read"                                                                            // 25
      }, Blaze.View(function() {                                                                                  // 26
        return Spacebars.mustache(view.lookup("i18n"), "Mark as read");                                           // 27
      }))), "  \n            ", Blaze.Each(function() {                                                           // 28
        return Spacebars.call(view.lookup("notifications"));                                                      // 29
      }, function() {                                                                                             // 30
        return [ "\n              ", Blaze._TemplateWith(function() {                                             // 31
          return {                                                                                                // 32
            template: Spacebars.call(view.lookup("notificationItem"))                                             // 33
          };                                                                                                      // 34
        }, function() {                                                                                           // 35
          return Spacebars.include(function() {                                                                   // 36
            return Spacebars.call(Template.__dynamic);                                                            // 37
          });                                                                                                     // 38
        }), "\n            " ];                                                                                   // 39
      }), "\n          " ];                                                                                       // 40
    }, function() {                                                                                               // 41
      return [ "\n            ", HTML.LI("No notifications"), "\n          " ];                                   // 42
    }), "\n        "), "\n      "), "\n    "), "\n  " ];                                                          // 43
  });                                                                                                             // 44
}));                                                                                                              // 45
                                                                                                                  // 46
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                //
// packages/telescope-notifications/lib/client/templates/notifications_menu.js                                    //
//                                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                  //
Template[getTemplate('notificationsMenu')].helpers({                                                              // 1
  notificationItem: function () {                                                                                 // 2
    return getTemplate('notificationItem');                                                                       // 3
  },                                                                                                              // 4
  notifications: function(){                                                                                      // 5
    return Herald.collection.find({userId: Meteor.userId(), read: false}, {sort: {timestamp: -1}});               // 6
  },                                                                                                              // 7
  hasNotifications: function () {                                                                                 // 8
    return !!Herald.collection.find({userId: Meteor.userId(), read: false}, {sort: {timestamp: -1}}).count();     // 9
  },                                                                                                              // 10
  notification_count: function(){                                                                                 // 11
    var notifications=Herald.collection.find({userId: Meteor.userId(), read: false}).fetch();                     // 12
    if(notifications.length==0){                                                                                  // 13
      return i18n.t('No notifications');                                                                          // 14
    }else if(notifications.length==1){                                                                            // 15
      return i18n.t('1 notification');                                                                            // 16
    }else{                                                                                                        // 17
      return notifications.length+' '+i18n.t('notifications');                                                    // 18
    }                                                                                                             // 19
  },                                                                                                              // 20
  notification_class: function(){                                                                                 // 21
    var notifications=Herald.collection.find({userId: Meteor.userId(), read: false}).fetch();                     // 22
    if(notifications.length==0)                                                                                   // 23
      return 'no-notifications';                                                                                  // 24
  }                                                                                                               // 25
});                                                                                                               // 26
                                                                                                                  // 27
Template[getTemplate('notificationsMenu')].events({                                                               // 28
  'click .notifications-toggle': function(e){                                                                     // 29
    e.preventDefault();                                                                                           // 30
    $('body').toggleClass('notifications-open');                                                                  // 31
  },                                                                                                              // 32
  'click .mark-as-read': function(){                                                                              // 33
    Meteor.call('markAllNotificationsAsRead',                                                                     // 34
      function(error, result){                                                                                    // 35
        error && console.log(error);                                                                              // 36
      }                                                                                                           // 37
    );                                                                                                            // 38
  }                                                                                                               // 39
});                                                                                                               // 40
                                                                                                                  // 41
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                //
// packages/telescope-notifications/lib/client/templates/template.unsubscribe.js                                  //
//                                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                  //
                                                                                                                  // 1
Template.__checkName("unsubscribe");                                                                              // 2
Template["unsubscribe"] = new Template("Template.unsubscribe", (function() {                                      // 3
  var view = this;                                                                                                // 4
  return HTML.DIV({                                                                                               // 5
    "class": "grid-small grid-block dialog admin"                                                                 // 6
  }, "\n    ", HTML.P(Blaze.View(function() {                                                                     // 7
    return Spacebars.mustache(view.lookup("unsubscribed"));                                                       // 8
  })), "\n  ");                                                                                                   // 9
}));                                                                                                              // 10
                                                                                                                  // 11
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                //
// packages/telescope-notifications/lib/client/templates/unsubscribe.js                                           //
//                                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                  //
Template[getTemplate('unsubscribe')].created = function(){                                                        // 1
  var hash = this.data.hash;                                                                                      // 2
  Meteor.call('unsubscribeUser', hash, function(error, result){                                                   // 3
    if(result){                                                                                                   // 4
      Session.set('unsubscribedMessage', 'You have been unsubscribed from all notifications.');                   // 5
    }else{                                                                                                        // 6
      Session.set('unsubscribedMessage', 'User not found.');                                                      // 7
    }                                                                                                             // 8
  });                                                                                                             // 9
  trackEvent('notificationsUnsubcribe', {hash: hash});                                                            // 10
};                                                                                                                // 11
                                                                                                                  // 12
Template[getTemplate('unsubscribe')].helpers({                                                                    // 13
  unsubscribed : function(){                                                                                      // 14
    // we have to use a session variable because the string we want to display                                    // 15
    // depends on the return value of an asynchronous callback (unsubscribeUser)                                  // 16
    return Session.get('unsubscribedMessage');                                                                    // 17
  }                                                                                                               // 18
});                                                                                                               // 19
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);
