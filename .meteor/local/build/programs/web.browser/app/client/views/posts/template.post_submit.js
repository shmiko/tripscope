(function(){
Template.__checkName("post_submit");
Template["post_submit"] = new Template("Template.post_submit", (function() {
  var view = this;
  return HTML.DIV({
    "class": "grid submit"
  }, "\n    ", HTML.FORM({
    "class": "grid-block form-horizontal"
  }, "\n      ", HTML.DIV({
    "class": "control-group"
  }, "\n        ", HTML.LABEL({
    "class": "control-label"
  }, Blaze.View(function() {
    return Spacebars.mustache(view.lookup("i18n"), "URL");
  })), "\n        ", HTML.Raw('<div class="controls"><input id="url" type="text" value=""></div>'), "\n      "), "\n      ", HTML.DIV({
    "class": "control-group"
  }, "\n        ", HTML.LABEL({
    "class": "control-label"
  }, Blaze.View(function() {
    return Spacebars.mustache(view.lookup("i18n"), "Title");
  })), "\n        ", HTML.DIV({
    "class": "controls"
  }, HTML.Raw('<input id="title" type="text" value="">'), HTML.A({
    href: "#",
    "class": "get-title-link inline-link"
  }, Blaze.View(function() {
    return Spacebars.mustache(view.lookup("i18n"), "Suggest title");
  }))), "\n      "), "\n      ", HTML.DIV({
    "class": "control-group"
  }, "\n        ", HTML.LABEL({
    "class": "control-label"
  }, Blaze.View(function() {
    return Spacebars.mustache(view.lookup("i18n"), "Body");
  })), "\n        ", HTML.DIV({
    "class": "controls",
    id: "editor"
  }, HTML.TEXTAREA({
    id: "body",
    value: "",
    "class": "input-xlarge"
  })), "\n      "), "\n      ", Blaze.If(function() {
    return Spacebars.call(view.lookup("categoriesEnabled"));
  }, function() {
    return [ "\n      ", HTML.DIV({
      "class": "control-group"
    }, "\n        ", HTML.LABEL({
      "class": "control-label"
    }, Blaze.View(function() {
      return Spacebars.mustache(view.lookup("i18n"), "Category");
    })), "\n        ", HTML.DIV({
      "class": "controls"
    }, "\n          ", Blaze.Each(function() {
      return Spacebars.call(view.lookup("categories"));
    }, function() {
      return [ "\n          ", HTML.LABEL({
        "class": "radio inline"
      }, "\n            ", HTML.INPUT({
        id: function() {
          return [ "category_", Spacebars.mustache(view.lookup("_id")) ];
        },
        type: "checkbox",
        value: function() {
          return Spacebars.mustache(view.lookup("_id"));
        },
        name: "category"
      }), " ", Blaze.View(function() {
        return Spacebars.mustache(view.lookup("name"));
      }), "\n          "), "\n          " ];
    }), "\n        "), "\n      "), "\n      " ];
  }), "\n      ", Blaze.If(function() {
    return Spacebars.call(view.lookup("isAdmin"));
  }, function() {
    return [ "\n        ", HTML.DIV({
      "class": "control-group"
    }, "\n          ", HTML.LABEL({
      "class": "control-label"
    }, Blaze.View(function() {
      return Spacebars.mustache(view.lookup("i18n"), "Sticky?");
    })), "\n          ", HTML.DIV({
      "class": "controls"
    }, "\n            ", HTML.INPUT({
      type: "checkbox",
      name: "sticky",
      id: "sticky"
    }), "\n          "), "\n        "), "\n        ", HTML.DIV({
      "class": "control-group"
    }, "\n          ", HTML.LABEL({
      "class": "control-label"
    }, Blaze.View(function() {
      return Spacebars.mustache(view.lookup("i18n"), "User");
    })), "\n          ", HTML.DIV({
      "class": "controls"
    }, "\n            ", HTML.SELECT({
      id: "postUser"
    }, "\n              ", Blaze.Each(function() {
      return Spacebars.call(view.lookup("users"));
    }, function() {
      return [ "\n                ", HTML.OPTION(HTML.Attrs({
        value: function() {
          return Spacebars.mustache(view.lookup("_id"));
        }
      }, function() {
        return Spacebars.attrMustache(view.lookup("isSelected"), view.lookup("."));
      }), Blaze.View(function() {
        return Spacebars.mustache(view.lookup("userName"));
      })), "\n              " ];
    }), "\n            "), "\n          "), "\n        "), "\n        ", HTML.DIV({
      "class": "control-group"
    }, "\n          ", HTML.LABEL({
      "class": "control-label"
    }, Blaze.View(function() {
      return Spacebars.mustache(view.lookup("i18n"), "Status");
    })), "\n          ", HTML.DIV({
      "class": "controls"
    }, "\n            ", HTML.LABEL({
      "class": "radio inline"
    }, "\n              ", HTML.INPUT({
      id: "status_pending",
      type: "radio",
      value: "1",
      name: "status"
    }), " ", Blaze.View(function() {
      return Spacebars.mustache(view.lookup("i18n"), "Pending");
    }), "\n            "), "\n            ", HTML.LABEL({
      "class": "radio inline"
    }, "\n              ", HTML.INPUT({
      id: "status_approved",
      type: "radio",
      value: "2",
      name: "status",
      checked: ""
    }), " ", Blaze.View(function() {
      return Spacebars.mustache(view.lookup("i18n"), "Approved");
    }), "\n            "), "\n            ", HTML.LABEL({
      "class": "radio inline"
    }, "  \n              ", HTML.INPUT({
      id: "status_rejected",
      type: "radio",
      value: "3",
      name: "status"
    }), " ", Blaze.View(function() {
      return Spacebars.mustache(view.lookup("i18n"), "Rejected");
    }), "\n            "), "\n          "), "\n        "), "\n        ", HTML.DIV({
      id: "postedAt",
      "class": function() {
        return Spacebars.mustache(view.lookup("showPostedAt"));
      }
    }, "\n          ", HTML.DIV({
      "class": "control-group"
    }, "\n            ", HTML.LABEL({
      "class": "control-label post-form-date"
    }, Blaze.View(function() {
      return Spacebars.mustache(view.lookup("i18n"), "Posted Date");
    })), "\n            ", HTML.DIV({
      "class": "controls"
    }, HTML.INPUT({
      id: "postedAtDate",
      type: "text",
      value: function() {
        return Spacebars.mustache(view.lookup("postedAtDate"));
      }
    })), "\n          "), "\n          ", HTML.DIV({
      "class": "control-group"
    }, "\n            ", HTML.LABEL({
      "class": "control-label post-form-time"
    }, Blaze.View(function() {
      return Spacebars.mustache(view.lookup("i18n"), "Posted Time");
    })), "\n            ", HTML.DIV({
      "class": "controls"
    }, HTML.INPUT({
      id: "postedAtTime",
      type: "text",
      value: function() {
        return Spacebars.mustache(view.lookup("postedAtTime"));
      }
    })), "\n          "), "\n          ", HTML.P({
      "class": "help-block"
    }, "Leave blank to post at current time."), "\n        "), "\n      " ];
  }), "\n      ", HTML.DIV({
    "class": "form-actions"
  }, "\n        ", HTML.INPUT({
    type: "submit",
    "class": "button",
    value: function() {
      return Spacebars.mustache(view.lookup("i18n"), "Submit");
    }
  }), "\n      "), "\n    "), "\n  ");
}));

})();
