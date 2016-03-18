(function(){
Template.__checkName("user_item");
Template["user_item"] = new Template("Template.user_item", (function() {
  var view = this;
  return HTML.TR({
    "class": "user"
  }, "\n	", HTML.TD(Blaze._TemplateWith(function() {
    return {
      user: Spacebars.call(view.lookup(".")),
      "class": Spacebars.call("circle")
    };
  }, function() {
    return Spacebars.include(view.lookupTemplate("avatar"));
  })), "\n	", HTML.TD("\n		", HTML.A({
    href: function() {
      return Spacebars.mustache(view.lookup("getProfileUrl"));
    }
  }, Blaze.View(function() {
    return Spacebars.mustache(view.lookup("displayName"));
  })), "\n		", HTML.Raw("<br>"), "\n		", HTML.A({
    href: function() {
      return [ "mailto:", Spacebars.mustache(view.lookup("getEmail")) ];
    }
  }, Blaze.View(function() {
    return Spacebars.mustache(view.lookup("getEmail"));
  })), "\n	"), "\n	", HTML.TD(Blaze.View(function() {
    return Spacebars.mustache(view.lookup("createdAtFormatted"));
  })), "\n	", HTML.TD(Blaze.View(function() {
    return Spacebars.mustache(view.lookup("postCount"));
  })), "\n	", HTML.TD(Blaze.View(function() {
    return Spacebars.mustache(view.lookup("commentCount"));
  })), "\n	", HTML.TD(Blaze.View(function() {
    return Spacebars.mustache(view.lookup("getKarma"));
  })), "\n	", HTML.TD("\n		", Blaze.If(function() {
    return Spacebars.call(view.lookup("invites"));
  }, function() {
    return [ "\n		", HTML.H4(Blaze.View(function() {
      return Spacebars.mustache(view.lookup("i18n"), "Invited");
    }), " ", Blaze.View(function() {
      return Spacebars.mustache(view.lookup("invitedCount"));
    }), " ", Blaze.View(function() {
      return Spacebars.mustache(view.lookup("i18n"), "users");
    }), ":"), "\n		", HTML.UL("\n			", Blaze.Each(function() {
      return Spacebars.call(view.lookup("invites"));
    }, function() {
      return [ "\n				", HTML.LI(HTML.A({
        href: function() {
          return Spacebars.mustache(view.lookup("getInvitedUserProfileUrl"));
        }
      }, Blaze.View(function() {
        return Spacebars.mustache(view.lookup("invitedName"));
      }))), "\n			" ];
    }), "\n		"), "\n		" ];
  }), "\n		", HTML.P("(", Blaze.View(function() {
    return Spacebars.mustache(view.lookup("inviteCount"));
  }), " ", Blaze.View(function() {
    return Spacebars.mustache(view.lookup("i18n"), "invites left");
  }), ")"), "\n	"), "\n	", HTML.TD(Blaze.If(function() {
    return Spacebars.call(view.lookup("isInvited"));
  }, function() {
    return HTML.I({
      "class": "icon-check"
    });
  })), "\n	", HTML.TD(Blaze.If(function() {
    return Spacebars.call(view.lookup("userIsAdmin"));
  }, function() {
    return HTML.I({
      "class": "icon-check"
    });
  })), "\n	", HTML.TD("\n		", HTML.UL("\n			", HTML.LI(Blaze.If(function() {
    return Spacebars.call(view.lookup("isInvited"));
  }, function() {
    return HTML.A({
      "class": "uninvite-link",
      href: "#"
    }, Blaze.View(function() {
      return Spacebars.mustache(view.lookup("i18n"), "Uninvite");
    }));
  }, function() {
    return HTML.A({
      href: "#",
      "class": "invite-link"
    }, Blaze.View(function() {
      return Spacebars.mustache(view.lookup("i18n"), "Invite");
    }));
  })), "\n			", HTML.LI(Blaze.If(function() {
    return Spacebars.call(view.lookup("userIsAdmin"));
  }, function() {
    return HTML.A({
      "class": "unadmin-link",
      href: "#"
    }, Blaze.View(function() {
      return Spacebars.mustache(view.lookup("i18n"), "Unadmin");
    }));
  }, function() {
    return HTML.A({
      href: "#",
      "class": "admin-link"
    }, Blaze.View(function() {
      return Spacebars.mustache(view.lookup("i18n"), "Make admin");
    }));
  })), "\n			", HTML.LI(HTML.A({
    "class": "delete-link",
    href: "#"
  }, Blaze.View(function() {
    return Spacebars.mustache(view.lookup("i18n"), "Delete User");
  }))), "\n		"), "\n	"), "\n");
}));

})();
