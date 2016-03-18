(function(){
Template.__checkName("post_edit");
Template["post_edit"] = new Template("Template.post_edit", (function() {
  var view = this;
  return HTML.DIV({
    "class": "grid submit"
  }, "\n    ", Spacebars.With(function() {
    return Spacebars.call(view.lookup("post"));
  }, function() {
    return [ "\n      ", HTML.FORM({
      "class": "grid-block form-horizontal"
    }, "\n        ", HTML.DIV({
      "class": "control-group"
    }, "\n          ", HTML.LABEL({
      "class": "control-label post-form-headline"
    }, Blaze.View(function() {
      return Spacebars.mustache(view.lookup("i18n"), "Created");
    })), "\n          ", HTML.DIV({
      "class": "controls"
    }, HTML.P(Blaze.View(function() {
      return Spacebars.mustache(view.lookup("created"));
    }))), "\n        "), "\n        ", HTML.DIV({
      "class": "control-group"
    }, "\n          ", HTML.LABEL({
      "class": "control-label post-form-headline"
    }, Blaze.View(function() {
      return Spacebars.mustache(view.lookup("i18n"), "Title");
    })), "\n          ", HTML.DIV({
      "class": "controls"
    }, HTML.INPUT({
      id: "title",
      type: "text",
      value: function() {
        return Spacebars.mustache(view.lookup("title"));
      }
    })), "\n        "), "\n        ", HTML.DIV({
      "class": "control-group"
    }, "\n          ", HTML.LABEL({
      "class": "control-label post-form-url"
    }, Blaze.View(function() {
      return Spacebars.mustache(view.lookup("i18n"), "URL");
    })), "\n          ", HTML.DIV({
      "class": "controls"
    }, HTML.INPUT({
      id: "url",
      type: "text",
      value: function() {
        return Spacebars.mustache(view.lookup("url"));
      }
    })), "\n        "), "\n        ", Blaze.If(function() {
      return Spacebars.call(view.lookup("shorten"));
    }, function() {
      return [ "\n        ", HTML.DIV({
        "class": "control-group"
      }, "\n          ", HTML.LABEL({
        "class": "control-label post-form-url"
      }, Blaze.View(function() {
        return Spacebars.mustache(view.lookup("i18n"), "Short URL");
      })), "\n          ", HTML.DIV({
        "class": "controls"
      }, HTML.INPUT({
        id: "short-url",
        type: "text",
        value: function() {
          return Spacebars.mustache(view.lookup("shortUrl"));
        }
      })), "\n        "), "\n        " ];
    }), "\n        ", HTML.DIV({
      "class": "control-group"
    }, "\n          ", HTML.LABEL({
      "class": "control-label post-form-body"
    }, Blaze.View(function() {
      return Spacebars.mustache(view.lookup("i18n"), "Body");
    })), "\n          ", HTML.DIV({
      "class": "controls",
      id: "editor"
    }, HTML.TEXTAREA({
      id: "body",
      value: function() {
        return Spacebars.mustache(view.lookup("body"));
      },
      "class": "input-xlarge"
    })), "\n        "), "\n        ", Blaze.If(function() {
      return Spacebars.call(view.lookup("categoriesEnabled"));
    }, function() {
      return [ "\n        ", HTML.DIV({
        "class": "control-group post-form-category"
      }, "\n          ", HTML.LABEL({
        "class": "control-label"
      }, Blaze.View(function() {
        return Spacebars.mustache(view.lookup("i18n"), "Categories");
      })), "\n          ", HTML.DIV({
        "class": "controls"
      }, "\n            ", Blaze.Each(function() {
        return Spacebars.call(view.lookup("categories"));
      }, function() {
        return [ "\n            ", HTML.LABEL({
          "class": "radio inline"
        }, "\n              ", HTML.INPUT(HTML.Attrs({
          id: function() {
            return [ "category_", Spacebars.mustache(view.lookup("_id")) ];
          },
          type: "checkbox",
          value: function() {
            return Spacebars.mustache(view.lookup("_id"));
          },
          name: "category"
        }, function() {
          return Spacebars.attrMustache(view.lookup("checked"));
        })), " ", Blaze.View(function() {
          return Spacebars.mustache(view.lookup("name"));
        }), "\n            "), "\n            " ];
      }), "\n          "), "\n        "), "\n        " ];
    }), "\n        ", Blaze.If(function() {
      return Spacebars.call(view.lookup("isAdmin"));
    }, function() {
      return [ "\n          ", HTML.DIV({
        "class": "control-group post-form-sticky"
      }, "\n            ", HTML.LABEL({
        "class": "control-label"
      }, Blaze.View(function() {
        return Spacebars.mustache(view.lookup("i18n"), "Inactive?");
      })), "\n            ", HTML.DIV({
        "class": "controls"
      }, "\n              ", Blaze.View(function() {
        return Spacebars.mustache(view.lookup("inactive"));
      }), "\n            "), "\n          "), "\n          ", HTML.DIV({
        "class": "control-group post-form-sticky"
      }, "\n            ", HTML.LABEL({
        "class": "control-label"
      }, Blaze.View(function() {
        return Spacebars.mustache(view.lookup("i18n"), "Sticky?");
      })), "\n            ", HTML.DIV({
        "class": "controls"
      }, "\n              ", HTML.INPUT(HTML.Attrs({
        type: "checkbox",
        name: "sticky",
        id: "sticky"
      }, function() {
        return Spacebars.attrMustache(view.lookup("isSticky"));
      })), "\n            "), "\n          "), "\n          ", HTML.DIV({
        "class": "control-group post-form-user"
      }, "\n            ", HTML.LABEL({
        "class": "control-label"
      }, Blaze.View(function() {
        return Spacebars.mustache(view.lookup("i18n"), "User");
      })), "\n            ", HTML.DIV({
        "class": "controls"
      }, "\n              ", HTML.SELECT({
        id: "postUser"
      }, "\n                ", Blaze.Each(function() {
        return Spacebars.call(view.lookup("users"));
      }, function() {
        return [ "\n                  ", HTML.OPTION(HTML.Attrs({
          value: function() {
            return Spacebars.mustache(view.lookup("_id"));
          }
        }, function() {
          return Spacebars.attrMustache(view.lookup("isSelected"), view.lookup(".."));
        }), Blaze.View(function() {
          return Spacebars.mustache(view.lookup("userName"));
        })), "\n                " ];
      }), "\n              "), "\n            "), "\n          "), "\n          ", HTML.DIV({
        "class": "control-group post-form-status"
      }, "\n            ", HTML.LABEL({
        "class": "control-label"
      }, Blaze.View(function() {
        return Spacebars.mustache(view.lookup("i18n"), "Status");
      })), "\n            ", HTML.DIV({
        "class": "controls"
      }, "\n              ", HTML.LABEL({
        "class": "radio inline"
      }, "\n                ", HTML.INPUT(HTML.Attrs({
        id: "status_pending",
        type: "radio",
        value: "1",
        name: "status"
      }, function() {
        return Spacebars.attrMustache(view.lookup("hasStatusPending"));
      })), " ", Blaze.View(function() {
        return Spacebars.mustache(view.lookup("i18n"), "Pending");
      }), "\n              "), "\n              ", HTML.LABEL({
        "class": "radio inline"
      }, "\n                ", HTML.INPUT(HTML.Attrs({
        id: "status_approved",
        type: "radio",
        value: "2",
        name: "status"
      }, function() {
        return Spacebars.attrMustache(view.lookup("hasStatusApproved"));
      })), " ", Blaze.View(function() {
        return Spacebars.mustache(view.lookup("i18n"), "Approved");
      }), "\n              "), "\n              ", HTML.LABEL({
        "class": "radio inline"
      }, "  \n                ", HTML.INPUT(HTML.Attrs({
        id: "status_rejected",
        type: "radio",
        value: "3",
        name: "status"
      }, function() {
        return Spacebars.attrMustache(view.lookup("hasStatusRejected"));
      })), " ", Blaze.View(function() {
        return Spacebars.mustache(view.lookup("i18n"), "Rejected");
      }), "\n              "), "\n            "), "\n          "), "\n          ", HTML.DIV({
        id: "postedAt",
        "class": function() {
          return Spacebars.mustache(view.lookup("showPostedAt"));
        }
      }, "\n            ", HTML.DIV({
        "class": "control-group"
      }, "\n              ", HTML.LABEL({
        "class": "control-label post-form-date"
      }, Blaze.View(function() {
        return Spacebars.mustache(view.lookup("i18n"), "Posted Date");
      })), "\n              ", HTML.DIV({
        "class": "controls"
      }, HTML.INPUT({
        id: "postedAtDate",
        type: "text",
        value: function() {
          return Spacebars.mustache(view.lookup("postedAtDate"));
        }
      })), "\n            "), "\n            ", HTML.DIV({
        "class": "control-group"
      }, "\n              ", HTML.LABEL({
        "class": "control-label post-form-time"
      }, Blaze.View(function() {
        return Spacebars.mustache(view.lookup("i18n"), "Posted Time");
      })), "\n              ", HTML.DIV({
        "class": "controls"
      }, HTML.INPUT({
        id: "postedAtTime",
        type: "text",
        value: function() {
          return Spacebars.mustache(view.lookup("postedAtTime"));
        }
      })), "\n            "), "\n          "), "\n        " ];
    }), "\n        ", HTML.DIV({
      "class": "form-actions"
    }, "\n          ", HTML.A({
      "class": "delete-link",
      href: "/posts/deleted"
    }, Blaze.View(function() {
      return Spacebars.mustache(view.lookup("i18n"), "Delete Post");
    })), "\n          ", HTML.INPUT({
      type: "submit",
      "class": "button",
      value: function() {
        return Spacebars.mustache(view.lookup("i18n"), "Submit");
      }
    }), "\n        "), "\n      "), "\n    " ];
  }), "\n  ");
}));

})();
