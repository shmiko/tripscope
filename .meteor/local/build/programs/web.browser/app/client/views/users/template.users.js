(function(){
Template.__checkName("users");
Template["users"] = new Template("Template.users", (function() {
  var view = this;
  return HTML.DIV({
    "class": "grid grid-module"
  }, "\n      ", HTML.DIV({
    "class": "user-table grid-block"
  }, "\n        ", HTML.H2(Blaze.View(function() {
    return Spacebars.mustache(view.lookup("i18n"), "Users");
  })), "\n        ", HTML.DIV({
    "class": "filter-sort"
  }, "\n          ", HTML.P({
    "class": "filter"
  }, "\n            ", HTML.SPAN(Blaze.View(function() {
    return Spacebars.mustache(view.lookup("i18n"), "Filter by");
  }), ": "), "\n            ", HTML.A({
    "class": function() {
      return Spacebars.mustache(view.lookup("activeClass"), "all");
    },
    href: function() {
      return Spacebars.mustache(view.lookup("filterBy"), "all");
    }
  }, Blaze.View(function() {
    return Spacebars.mustache(view.lookup("i18n"), "All");
  })), "\n            ", HTML.A({
    "class": function() {
      return Spacebars.mustache(view.lookup("activeClass"), "invited");
    },
    href: function() {
      return Spacebars.mustache(view.lookup("filterBy"), "invited");
    }
  }, Blaze.View(function() {
    return Spacebars.mustache(view.lookup("i18n"), "Invited");
  })), "\n            ", HTML.A({
    "class": function() {
      return Spacebars.mustache(view.lookup("activeClass"), "uninvited");
    },
    href: function() {
      return Spacebars.mustache(view.lookup("filterBy"), "uninvited");
    }
  }, Blaze.View(function() {
    return Spacebars.mustache(view.lookup("i18n"), "Uninvited");
  })), "\n            ", HTML.A({
    "class": function() {
      return Spacebars.mustache(view.lookup("activeClass"), "admin");
    },
    href: function() {
      return Spacebars.mustache(view.lookup("filterBy"), "admin");
    }
  }, Blaze.View(function() {
    return Spacebars.mustache(view.lookup("i18n"), "Admin");
  })), "\n          "), "\n          ", HTML.P({
    "class": "sort"
  }, "\n            ", HTML.SPAN(Blaze.View(function() {
    return Spacebars.mustache(view.lookup("i18n"), "Sort by");
  }), ": "), "\n            ", HTML.A({
    "class": function() {
      return Spacebars.mustache(view.lookup("activeClass"), "createdAt");
    },
    href: function() {
      return Spacebars.mustache(view.lookup("sortBy"), "createdAt");
    }
  }, Blaze.View(function() {
    return Spacebars.mustache(view.lookup("i18n"), "Created");
  })), "\n            ", HTML.A({
    "class": function() {
      return Spacebars.mustache(view.lookup("activeClass"), "karma");
    },
    href: function() {
      return Spacebars.mustache(view.lookup("sortBy"), "karma");
    }
  }, Blaze.View(function() {
    return Spacebars.mustache(view.lookup("i18n"), "Karma");
  })), "\n            ", HTML.A({
    "class": function() {
      return Spacebars.mustache(view.lookup("activeClass"), "username");
    },
    href: function() {
      return Spacebars.mustache(view.lookup("sortBy"), "username");
    }
  }, Blaze.View(function() {
    return Spacebars.mustache(view.lookup("i18n"), "Username");
  })), "\n            ", HTML.A({
    "class": function() {
      return Spacebars.mustache(view.lookup("activeClass"), "postCount");
    },
    href: function() {
      return Spacebars.mustache(view.lookup("sortBy"), "postCount");
    }
  }, Blaze.View(function() {
    return Spacebars.mustache(view.lookup("i18n"), "Posts");
  })), "\n            ", HTML.A({
    "class": function() {
      return Spacebars.mustache(view.lookup("activeClass"), "commentCount");
    },
    href: function() {
      return Spacebars.mustache(view.lookup("sortBy"), "commentCount");
    }
  }, Blaze.View(function() {
    return Spacebars.mustache(view.lookup("i18n"), "Comments");
  })), "\n            ", HTML.A({
    "class": function() {
      return Spacebars.mustache(view.lookup("activeClass"), "invitedCount");
    },
    href: function() {
      return Spacebars.mustache(view.lookup("sortBy"), "invitedCount");
    }
  }, Blaze.View(function() {
    return Spacebars.mustache(view.lookup("i18n"), "InvitedCount");
  })), "\n          "), "\n        "), "\n        ", HTML.TABLE("\n          ", HTML.THEAD("\n            ", HTML.TR("\n              ", HTML.TD({
    colspan: "2"
  }, Blaze.View(function() {
    return Spacebars.mustache(view.lookup("i18n"), "Name");
  })), "\n              ", HTML.TD(Blaze.View(function() {
    return Spacebars.mustache(view.lookup("i18n"), "Member since");
  })), "\n              ", HTML.TD(Blaze.View(function() {
    return Spacebars.mustache(view.lookup("i18n"), "Posts");
  })), "\n              ", HTML.TD(Blaze.View(function() {
    return Spacebars.mustache(view.lookup("i18n"), "Comments");
  })), "\n              ", HTML.TD(Blaze.View(function() {
    return Spacebars.mustache(view.lookup("i18n"), "Karma");
  })), "\n              ", HTML.TD(Blaze.View(function() {
    return Spacebars.mustache(view.lookup("i18n"), "Invites");
  })), "\n              ", HTML.TD(Blaze.View(function() {
    return Spacebars.mustache(view.lookup("i18n"), "Invited?");
  })), "\n              ", HTML.TD(Blaze.View(function() {
    return Spacebars.mustache(view.lookup("i18n"), "Admin?");
  })), "\n              ", HTML.TD(Blaze.View(function() {
    return Spacebars.mustache(view.lookup("i18n"), "Actions");
  })), "\n            "), "\n          "), "\n          ", HTML.TBODY("\n              ", Blaze.Each(function() {
    return Spacebars.call(view.lookup("users"));
  }, function() {
    return [ "\n                ", Blaze._TemplateWith(function() {
      return {
        template: Spacebars.call(view.lookup("user_item"))
      };
    }, function() {
      return Spacebars.include(function() {
        return Spacebars.call(Template.__dynamic);
      });
    }), "\n              " ];
  }), "\n          "), "\n        "), "\n        ", HTML.DIV({
    "class": function() {
      return [ "grid more-button ", Blaze.If(function() {
        return Spacebars.call(view.lookup("allPostsLoaded"));
      }, function() {
        return " hidden ";
      }) ];
    }
  }, "\n          ", HTML.A({
    "class": "more-link",
    href: function() {
      return Spacebars.mustache(view.lookup("loadMoreUrl"));
    }
  }, Blaze.View(function() {
    return Spacebars.mustache(view.lookup("i18n"), "Load more");
  })), "\n        "), "\n      "), "\n    ");
}));

})();
