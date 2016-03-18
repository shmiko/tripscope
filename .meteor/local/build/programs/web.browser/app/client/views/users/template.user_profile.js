(function(){
Template.__checkName("user_profile");
Template["user_profile"] = new Template("Template.user_profile", (function() {
  var view = this;
  return Spacebars.With(function() {
    return Spacebars.call(view.lookup("user"));
  }, function() {
    return [ "\n		", HTML.DIV({
      "class": "user-profile grid grid-module"
    }, "\n			", HTML.TABLE("\n				", HTML.TR("\n					", HTML.TD({
      colspan: "2"
    }, Blaze._TemplateWith(function() {
      return {
        user: Spacebars.call(view.lookup(".")),
        "class": Spacebars.call("large circle")
      };
    }, function() {
      return Spacebars.include(view.lookupTemplate("avatar"));
    })), "\n				"), "\n				", Blaze.If(function() {
      return Spacebars.call(view.lookup("isAdmin"));
    }, function() {
      return [ "\n					", HTML.TR("\n						", HTML.TD(Blaze.View(function() {
        return Spacebars.mustache(view.lookup("i18n"), "ID");
      }), ": "), "\n						", HTML.TD(Blaze.View(function() {
        return Spacebars.mustache(view.lookup("_id"));
      })), "\n					"), "\n				" ];
    }), "\n				", HTML.TR("\n					", HTML.TD(Blaze.View(function() {
      return Spacebars.mustache(view.lookup("i18n"), "Name:");
    })), "\n					", HTML.TD(Blaze.View(function() {
      return Spacebars.mustache(Spacebars.dot(view.lookup("profile"), "name"));
    })), "\n				"), "\n				", HTML.TR("\n					", HTML.TD(Blaze.View(function() {
      return Spacebars.mustache(view.lookup("i18n"), "Member since");
    }), ":"), "\n					", HTML.TD(Blaze.View(function() {
      return Spacebars.mustache(view.lookup("createdAtFormatted"));
    })), "\n				"), "\n				", HTML.TR("\n					", HTML.TD(Blaze.View(function() {
      return Spacebars.mustache(view.lookup("i18n"), "Bio:");
    })), "\n					", HTML.TD(Blaze.View(function() {
      return Spacebars.mustache(Spacebars.dot(view.lookup("profile"), "bio"));
    })), "\n				"), "\n				", Blaze.If(function() {
      return Spacebars.call(view.lookup("getTwitterName"));
    }, function() {
      return [ "\n					", HTML.TR("\n						", HTML.TD("Twitter: "), "\n						", HTML.TD(HTML.A({
        href: function() {
          return [ "http://twitter.com/", Spacebars.mustache(view.lookup("getTwitterName")) ];
        }
      }, Blaze.View(function() {
        return Spacebars.mustache(view.lookup("getTwitterName"));
      }))), "\n					"), "\n				" ];
    }), "\n				", Blaze.If(function() {
      return Spacebars.call(view.lookup("getGitHubName"));
    }, function() {
      return [ "\n					", HTML.TR("\n						", HTML.TD(Blaze.View(function() {
        return Spacebars.mustache(view.lookup("i18n"), "GitHub");
      }), ":"), "\n						", HTML.TD(HTML.A({
        href: function() {
          return [ "http://github.com/", Spacebars.mustache(view.lookup("getGitHubName")) ];
        }
      }, Blaze.View(function() {
        return Spacebars.mustache(view.lookup("getGitHubName"));
      }))), "\n					"), "\n				" ];
    }), "\n				", Blaze.If(function() {
      return Spacebars.call(Spacebars.dot(view.lookup("profile"), "site"));
    }, function() {
      return [ "\n					", HTML.TR("\n						", HTML.TD(Blaze.View(function() {
        return Spacebars.mustache(view.lookup("i18n"), "Site");
      }), ":"), "\n						", HTML.TD(HTML.A({
        href: function() {
          return Spacebars.mustache(Spacebars.dot(view.lookup("profile"), "site"));
        }
      }, Blaze.View(function() {
        return Spacebars.mustache(Spacebars.dot(view.lookup("profile"), "site"));
      }))), "\n					"), "\n				" ];
    }), "\n			"), "\n			", Blaze.If(function() {
      return Spacebars.call(view.lookup("canEditProfile"));
    }, function() {
      return [ "\n				", HTML.A({
        "class": "button inline",
        href: function() {
          return [ "/users/", Spacebars.mustache(view.lookup("slug")), "/edit" ];
        }
      }, Blaze.View(function() {
        return Spacebars.mustache(view.lookup("i18n"), "Edit profile");
      })), "\n			" ];
    }), "\n			", Blaze.If(function() {
      return Spacebars.call(view.lookup("canInvite"));
    }, function() {
      return [ "\n				", Blaze.If(function() {
        return Spacebars.call(view.lookup("inviteCount"));
      }, function() {
        return [ "\n					", HTML.A({
          "class": "button inline invite-link",
          href: "#"
        }, Blaze.View(function() {
          return Spacebars.mustache(view.lookup("i18n"), "Invite");
        }), " (", Blaze.View(function() {
          return Spacebars.mustache(view.lookup("inviteCount"));
        }), " ", Blaze.View(function() {
          return Spacebars.mustache(view.lookup("i18n"), "left");
        }), ")"), "\n				" ];
      }, function() {
        return [ "\n					", HTML.A({
          "class": "button inline disabled",
          href: "#"
        }, Blaze.View(function() {
          return Spacebars.mustache(view.lookup("i18n"), "Invite (none left)");
        })), "\n				" ];
      }), "\n			" ];
    }), "\n		"), "\n\n		", HTML.DIV({
      "class": "user-profile-posts grid grid-module"
    }, "\n			", HTML.H3(Blaze.View(function() {
      return Spacebars.mustache(view.lookup("i18n"), "Posts");
    })), "\n			", HTML.TABLE("\n			", HTML.THEAD("\n				", HTML.TR("\n					", HTML.TD("Post"), "\n					", HTML.TD("Created At"), "\n				"), "\n			"), "\n			", Blaze.Each(function() {
      return Spacebars.call(view.lookup("posts"));
    }, function() {
      return [ "\n				", HTML.TR("\n					", HTML.TD(HTML.A({
        href: function() {
          return [ "/posts/", Spacebars.mustache(view.lookup("_id")), "/" ];
        }
      }, Blaze.View(function() {
        return Spacebars.mustache(view.lookup("title"));
      }))), "\n					", HTML.TD(Blaze.View(function() {
        return Spacebars.mustache(view.lookup("formatDate"), view.lookup("createdAt"), "MM/DD/YYYY, HH:mm");
      })), "\n				"), "\n			" ];
    }), "\n			", Blaze.If(function() {
      return Spacebars.call(view.lookup("hasMorePosts"));
    }, function() {
      return [ "\n				", HTML.TR("\n					", HTML.TD({
        colspan: "2"
      }, "\n    				", HTML.A({
        "class": "posts-more more-button grid-module",
        href: "#"
      }, HTML.SPAN(Blaze.View(function() {
        return Spacebars.mustache(view.lookup("i18n"), "Load more");
      }))), "\n					"), "\n				"), "\n			" ];
    }), "\n			"), "\n		"), "\n\n		", HTML.DIV({
      "class": "user-profile-votes grid grid-module"
    }, "\n			", HTML.H3(Blaze.View(function() {
      return Spacebars.mustache(view.lookup("i18n"), "Upvoted Posts");
    })), "\n			", HTML.TABLE("\n			", HTML.THEAD("\n				", HTML.TR("\n					", HTML.TD("Post"), "\n					", HTML.TD("Upvoted At"), "\n				"), "\n			"), "\n			", Blaze.Each(function() {
      return Spacebars.call(view.lookup("upvotedPosts"));
    }, function() {
      return [ "\n				", HTML.TR("\n					", HTML.TD(HTML.A({
        href: function() {
          return [ "/posts/", Spacebars.mustache(view.lookup("_id")), "/" ];
        }
      }, Blaze.View(function() {
        return Spacebars.mustache(view.lookup("title"));
      }))), "\n					", HTML.TD(Blaze.View(function() {
        return Spacebars.mustache(view.lookup("formatDate"), view.lookup("votedAt"), "MM/DD/YYYY, HH:mm");
      })), "\n				"), "\n			" ];
    }), "\n			", Blaze.If(function() {
      return Spacebars.call(view.lookup("hasMoreUpvotedPosts"));
    }, function() {
      return [ "\n				", HTML.TR("\n					", HTML.TD({
        colspan: "2"
      }, "\n    				", HTML.A({
        "class": "upvotedposts-more more-button grid-module",
        href: "#"
      }, HTML.SPAN(Blaze.View(function() {
        return Spacebars.mustache(view.lookup("i18n"), "Load more");
      }))), "\n					"), "\n				"), "\n			" ];
    }), "\n			"), "\n		"), "\n\n		", HTML.DIV({
      "class": "user-profile-votes grid grid-module"
    }, "\n			", HTML.H3(Blaze.View(function() {
      return Spacebars.mustache(view.lookup("i18n"), "Downvoted Posts");
    })), "\n			", HTML.TABLE("\n			", HTML.THEAD("\n				", HTML.TR("\n					", HTML.TD("Post"), "\n					", HTML.TD("Downvoted At"), "\n				"), "\n			"), "\n			", Blaze.Each(function() {
      return Spacebars.call(view.lookup("downvoted"));
    }, function() {
      return [ "\n				", HTML.TR("\n					", HTML.TD(HTML.A({
        href: function() {
          return [ "/posts/", Spacebars.mustache(view.lookup("_id")), "/" ];
        }
      }, Blaze.View(function() {
        return Spacebars.mustache(view.lookup("title"));
      }))), "\n					", HTML.TD(Blaze.View(function() {
        return Spacebars.mustache(view.lookup("formatDate"), view.lookup("votedAt"), "MM/DD/YYYY, HH:mm");
      })), "\n				"), "\n			" ];
    }), "\n			", Blaze.If(function() {
      return Spacebars.call(view.lookup("hasMoreDownvotedPosts"));
    }, function() {
      return [ "\n				", HTML.TR("\n					", HTML.TD({
        colspan: "2"
      }, "\n    				", HTML.A({
        "class": "downvoted-more more-button grid-module",
        href: "#"
      }, HTML.SPAN(Blaze.View(function() {
        return Spacebars.mustache(view.lookup("i18n"), "Load more");
      }))), "\n					"), "\n				"), "\n			" ];
    }), "\n			"), "\n		"), "\n\n		", HTML.DIV({
      "class": "user-profile-comments grid grid-module"
    }, "\n			", HTML.H3(Blaze.View(function() {
      return Spacebars.mustache(view.lookup("i18n"), "Comments");
    })), "\n			", HTML.TABLE("\n			", HTML.THEAD("\n				", HTML.TR("\n					", HTML.TD("Post"), "\n					", HTML.TD("Comment"), "\n					", HTML.TD("Commented At"), "\n				"), "\n			"), "\n			", Blaze.Each(function() {
      return Spacebars.call(view.lookup("comments"));
    }, function() {
      return [ "\n				", HTML.TR("\n					", HTML.TD(HTML.A({
        href: function() {
          return [ "/posts/", Spacebars.mustache(view.lookup("postId")), "/" ];
        }
      }, Blaze.View(function() {
        return Spacebars.mustache(view.lookup("postTitle"));
      }))), "\n					", HTML.TD(Blaze.View(function() {
        return Spacebars.makeRaw(Spacebars.mustache(view.lookup("htmlBody")));
      })), "\n					", HTML.TD(Blaze.View(function() {
        return Spacebars.mustache(view.lookup("formatDate"), view.lookup("createdAt"), "MM/DD/YYYY, HH:mm");
      })), "\n				"), "\n			" ];
    }), "\n			", Blaze.If(function() {
      return Spacebars.call(view.lookup("hasMoreComments"));
    }, function() {
      return [ "\n				", HTML.TR("\n					", HTML.TD({
        colspan: "2"
      }, "\n    				", HTML.A({
        "class": "comments-more more-button grid-module",
        href: "#"
      }, HTML.SPAN(Blaze.View(function() {
        return Spacebars.mustache(view.lookup("i18n"), "Load more");
      }))), "\n					"), "\n				"), "\n			" ];
    }), "\n			"), "\n		"), "\n\n	" ];
  });
}));

})();
