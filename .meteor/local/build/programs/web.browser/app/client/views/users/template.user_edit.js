(function(){
Template.__checkName("user_edit");
Template["user_edit"] = new Template("Template.user_edit", (function() {
  var view = this;
  return [ HTML.DIV({
    "class": "grid-small grid-module dialog user-edit"
  }, "\n  	", Spacebars.With(function() {
    return Spacebars.call(view.lookup("user"));
  }, function() {
    return [ "\n    ", Blaze.If(function() {
      return Spacebars.call(view.lookup("profileIncomplete"));
    }, function() {
      return [ "\n    ", HTML.DIV("\n      ", Blaze.View(function() {
        return Spacebars.mustache(view.lookup("i18n"), "Please complete your profile below before continuing.");
      }), "\n    "), "\n    " ];
    }), "\n    ", HTML.FORM({
      id: "account-form"
    }, "\n      ", HTML.H2(Blaze.View(function() {
      return Spacebars.mustache(view.lookup("i18n"), "Account");
    })), "\n      ", HTML.DIV({
      "class": "control-group"
    }, "\n        ", HTML.LABEL(Blaze.View(function() {
      return Spacebars.mustache(view.lookup("i18n"), "Username");
    })), "\n        ", HTML.DIV({
      "class": "controls"
    }, "\n          ", HTML.INPUT({
      id: "username",
      name: "username",
      disabled: "disabled",
      type: "text",
      value: function() {
        return Spacebars.mustache(view.lookup("userName"));
      }
    }), "\n        "), "\n        ", HTML.P({
      "class": "note"
    }, "Profile URL: ", Blaze.View(function() {
      return Spacebars.mustache(view.lookup("profileUrl"));
    })), "\n      "), "\n", HTML.Comment('       <div class="control-group">\n        <label>Email</label>\n        <div class="controls">\n          <input id="email" name="email" disabled="disabled" type="text" value="{{email}}" />\n        </div>\n      </div> '), "\n      ", HTML.DIV({
      "class": "control-group"
    }, "\n        ", HTML.LABEL(Blaze.View(function() {
      return Spacebars.mustache(view.lookup("i18n"), "Display Name");
    })), "\n        ", HTML.DIV({
      "class": "controls"
    }, "\n          ", HTML.INPUT({
      name: "name",
      type: "text",
      value: function() {
        return Spacebars.mustache(Spacebars.dot(view.lookup("profile"), "name"));
      }
    }), "\n        "), "\n      "), "\n      ", HTML.DIV({
      "class": "control-group"
    }, "\n        ", HTML.LABEL(Blaze.View(function() {
      return Spacebars.mustache(view.lookup("i18n"), "Email");
    })), "\n        ", HTML.DIV({
      "class": "controls"
    }, "\n          ", HTML.INPUT({
      name: "email",
      type: "text",
      value: function() {
        return Spacebars.mustache(view.lookup("userEmail"));
      }
    }), "\n        "), "\n      "), "\n      ", HTML.DIV({
      "class": "control-group"
    }, "\n        ", HTML.LABEL(Blaze.View(function() {
      return Spacebars.mustache(view.lookup("i18n"), "Bio");
    })), "\n        ", HTML.DIV({
      "class": "controls"
    }, HTML.TEXTAREA({
      name: "bio",
      type: "text",
      value: function() {
        return Spacebars.mustache(Spacebars.dot(view.lookup("profile"), "bio"));
      }
    })), "\n      "), "\n      ", HTML.DIV({
      "class": "control-group"
    }, "\n      ", HTML.LABEL("Twitter Username"), "\n        ", HTML.DIV({
      "class": "controls"
    }, "\n          ", HTML.INPUT({
      name: "twitter",
      type: "text",
      value: function() {
        return Spacebars.mustache(view.lookup("getTwitter"));
      }
    }), "\n        "), "\n      "), "\n      ", HTML.DIV({
      "class": "control-group"
    }, "\n        ", HTML.LABEL("GitHub Username"), "\n        ", HTML.DIV({
      "class": "controls"
    }, "\n          ", HTML.INPUT({
      name: "github",
      type: "text",
      value: function() {
        return Spacebars.mustache(view.lookup("getGitHub"));
      }
    }), "\n        "), "\n      "), "\n      ", HTML.DIV({
      "class": "control-group"
    }, "\n        ", HTML.LABEL("Site"), "\n        ", HTML.DIV({
      "class": "controls"
    }, "\n          ", HTML.INPUT({
      name: "site",
      type: "text",
      value: function() {
        return Spacebars.mustache(Spacebars.dot(view.lookup("profile"), "site"));
      }
    }), "\n        "), "\n      "), "\n      ", Blaze.If(function() {
      return Spacebars.call(view.lookup("hasPassword"));
    }, function() {
      return [ "\n        ", HTML.H3(Blaze.View(function() {
        return Spacebars.mustache(view.lookup("i18n"), "Change Password?");
      })), "\n        ", HTML.DIV({
        "class": "control-group"
      }, "\n          ", HTML.LABEL(Blaze.View(function() {
        return Spacebars.mustache(view.lookup("i18n"), "Old Password");
      })), "\n          ", HTML.DIV({
        "class": "controls"
      }, HTML.INPUT({
        name: "old_password",
        type: "password",
        value: ""
      })), "\n        "), "\n        ", HTML.DIV({
        "class": "control-group"
      }, "\n          ", HTML.LABEL(Blaze.View(function() {
        return Spacebars.mustache(view.lookup("i18n"), "New Password");
      })), "\n          ", HTML.DIV({
        "class": "controls"
      }, HTML.INPUT({
        name: "new_password",
        type: "password",
        value: ""
      })), "\n        "), "\n      " ];
    }), "\n      ", HTML.DIV({
      "class": "control-group"
    }, "\n        ", HTML.LABEL({
      "class": "control-label"
    }, Blaze.View(function() {
      return Spacebars.mustache(view.lookup("i18n"), "Email Notifications");
    })), "\n        ", HTML.DIV({
      "class": "controls"
    }, "\n          ", Blaze.If(function() {
      return Spacebars.call(view.lookup("isAdmin"));
    }, function() {
      return [ "\n            ", HTML.LABEL({
        "class": "checkbox"
      }, "\n              ", HTML.INPUT(HTML.Attrs({
        id: "notifications_users",
        type: "checkbox",
        name: "notifications_users"
      }, function() {
        return Spacebars.attrMustache(view.lookup("hasNotificationsUsers"));
      })), " New Users\n            "), "\n          " ];
    }), "\n          ", HTML.LABEL({
      "class": "checkbox"
    }, "\n            ", HTML.INPUT(HTML.Attrs({
      id: "notifications_posts",
      type: "checkbox",
      name: "notifications_posts"
    }, function() {
      return Spacebars.attrMustache(view.lookup("hasNotificationsPosts"));
    })), " ", Blaze.View(function() {
      return Spacebars.mustache(view.lookup("i18n"), "New Posts");
    }), "\n          "), "\n          ", HTML.LABEL({
      "class": "checkbox"
    }, "\n            ", HTML.INPUT(HTML.Attrs({
      id: "notifications_comments",
      type: "checkbox",
      name: "notifications_comments"
    }, function() {
      return Spacebars.attrMustache(view.lookup("hasNotificationsComments"));
    })), " ", Blaze.View(function() {
      return Spacebars.mustache(view.lookup("i18n"), "Comments on my posts");
    }), "\n          "), "\n          ", HTML.LABEL({
      "class": "checkbox"
    }, "\n            ", HTML.INPUT(HTML.Attrs({
      id: "notifications_replies",
      type: "checkbox",
      name: "notifications_replies"
    }, function() {
      return Spacebars.attrMustache(view.lookup("hasNotificationsReplies"));
    })), " ", Blaze.View(function() {
      return Spacebars.mustache(view.lookup("i18n"), "Replies to my comments");
    }), "\n          "), "\n        "), "\n      "), "\n      ", Blaze.If(function() {
      return Spacebars.call(view.lookup("isAdmin"));
    }, function() {
      return [ "\n      ", HTML.DIV({
        "class": "control-group"
      }, "\n        ", HTML.H3("Invites"), "\n        ", HTML.LABEL("Invites"), "\n        ", HTML.DIV({
        "class": "controls"
      }, "\n          ", HTML.INPUT({
        name: "inviteCount",
        type: "text",
        value: function() {
          return Spacebars.mustache(view.lookup("inviteCount"));
        }
      }), "\n        "), "\n      "), "\n      " ];
    }), "\n      ", HTML.DIV({
      "class": "form-actions"
    }, "\n        ", HTML.A({
      href: "/forgot-password"
    }, Blaze.View(function() {
      return Spacebars.mustache(view.lookup("i18n"), "Forgot password?");
    })), "\n        ", HTML.INPUT({
      type: "submit",
      "class": "button",
      value: function() {
        return Spacebars.mustache(view.lookup("i18n"), "Submit");
      }
    }), "\n      "), "\n    "), "\n    " ];
  }), "\n  "), "\n\n  ", Spacebars.include(view.lookupTemplate("invites")) ];
}));

})();
