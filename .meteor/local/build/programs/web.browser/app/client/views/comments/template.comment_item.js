(function(){
Template.__checkName("comment_item");
Template["comment_item"] = new Template("Template.comment_item", (function() {
  var view = this;
  return HTML.LI({
    "class": "comment module comment-displayed",
    id: function() {
      return Spacebars.mustache(view.lookup("_id"));
    }
  }, "\n   ", HTML.DIV({
    "class": "comment-body"
  }, "\n      ", Blaze.If(function() {
    return Spacebars.call(view.lookup("isDeleted"));
  }, function() {
    return [ "\n        ", HTML.DIV({
      "class": "comment-deleted"
    }, "This comment has been deleted."), "\n      " ];
  }, function() {
    return [ "\n      ", HTML.DIV({
      "class": "comment-content"
    }, "\n        ", HTML.DIV({
      "class": function() {
        return [ "comment-actions ", Blaze.If(function() {
          return Spacebars.call(view.lookup("upvoted"));
        }, function() {
          return "upvoted";
        }, function() {
          return "not-upvoted";
        }), " ", Blaze.If(function() {
          return Spacebars.call(view.lookup("downvoted"));
        }, function() {
          return "downvoted";
        }, function() {
          return "not-downvoted";
        }) ];
      }
    }, "\n          ", HTML.A({
      "class": "upvote",
      href: "#"
    }, "\n            ", HTML.I({
      "class": "icon-up"
    }), "\n            ", HTML.SPAN(Blaze.View(function() {
      return Spacebars.mustache(view.lookup("i18n"), "upvote");
    })), "\n          "), "\n          ", HTML.A({
      "class": "downvote",
      href: "#"
    }, "\n            ", HTML.I({
      "class": "icon-down"
    }), "\n            ", HTML.SPAN(Blaze.View(function() {
      return Spacebars.mustache(view.lookup("i18n"), "downvote");
    })), "\n          "), "\n        "), "\n        ", HTML.DIV({
      "class": "user-avatar"
    }, Blaze._TemplateWith(function() {
      return {
        userId: Spacebars.call(view.lookup("userId")),
        "class": Spacebars.call("circle")
      };
    }, function() {
      return Spacebars.include(view.lookupTemplate("avatar"));
    })), "\n        ", HTML.DIV({
      "class": "comment-main"
    }, "\n          ", HTML.DIV({
      "class": "comment-meta"
    }, "\n            ", HTML.A({
      "class": "comment-username",
      href: function() {
        return Spacebars.mustache(view.lookup("profileUrl"));
      }
    }, Blaze.View(function() {
      return Spacebars.mustache(view.lookup("authorName"));
    })), "\n            ", HTML.SPAN({
      "class": "comment-time"
    }, Blaze.View(function() {
      return Spacebars.mustache(view.lookup("ago"));
    }), ","), "\n            ", HTML.SPAN({
      "class": "points"
    }, Blaze.View(function() {
      return Spacebars.mustache(view.lookup("upvotes"));
    })), " ", HTML.SPAN({
      "class": "unit"
    }, "points "), "\n            ", HTML.A({
      href: function() {
        return [ "/comments/", Spacebars.mustache(view.lookup("_id")) ];
      },
      "class": "comment-permalink icon-link goto-comment"
    }, Blaze.View(function() {
      return Spacebars.mustache(view.lookup("i18n"), "link");
    })), "\n            ", Blaze.If(function() {
      return Spacebars.call(view.lookup("can_edit"));
    }, function() {
      return [ "\n              | ", HTML.A({
        "class": "edit-link",
        href: function() {
          return [ "/comments/", Spacebars.mustache(view.lookup("_id")), "/edit" ];
        }
      }, Blaze.View(function() {
        return Spacebars.mustache(view.lookup("i18n"), "Edit");
      })), "\n            " ];
    }), "\n            ", Blaze.If(function() {
      return Spacebars.call(view.lookup("isAdmin"));
    }, function() {
      return [ "\n              | ", HTML.SPAN(Blaze.View(function() {
        return Spacebars.mustache(view.lookup("full_date"));
      })), "\n            " ];
    }), "\n          "), "\n          ", HTML.DIV({
      "class": "comment-text markdown"
    }, Blaze.View(function() {
      return Spacebars.makeRaw(Spacebars.mustache(view.lookup("htmlBody")));
    })), "\n          ", Blaze.If(function() {
      return Spacebars.dataMustache(view.lookup("getSetting"), "nestedComments", true);
    }, function() {
      return [ "\n            ", HTML.A({
        href: function() {
          return [ "/comments/", Spacebars.mustache(view.lookup("_id")) ];
        },
        "class": "comment-reply goto-comment"
      }, Blaze.View(function() {
        return Spacebars.mustache(view.lookup("i18n"), "Reply");
      })), "\n          " ];
    }), "\n        "), "\n      "), "\n      " ];
  }), "\n      ", Blaze.If(function() {
    return Spacebars.call(view.lookup("showChildComments"));
  }, function() {
    return [ "\n        ", HTML.UL({
      "class": "comment-children comment-list"
    }, "\n        ", Blaze.Each(function() {
      return Spacebars.call(view.lookup("child_comments"));
    }, function() {
      return [ "\n          ", Spacebars.With(function() {
        return Spacebars.call(view.lookup("."));
      }, function() {
        return [ "\n            ", Blaze._TemplateWith(function() {
          return {
            template: Spacebars.call(view.lookup("comment_item"))
          };
        }, function() {
          return Spacebars.include(function() {
            return Spacebars.call(Template.__dynamic);
          });
        }), "\n          " ];
      }), "\n        " ];
    }), "\n        "), "\n      " ];
  }), "\n    "), "\n  ");
}));

})();
