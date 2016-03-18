(function(){
Template.__checkName("postAdmin");
Template["postAdmin"] = new Template("Template.postAdmin", (function() {
  var view = this;
  return Blaze.If(function() {
    return Spacebars.call(view.lookup("isAdmin"));
  }, function() {
    return [ "\n    ", HTML.DIV({
      "class": "post-meta-item"
    }, "\n      ", Blaze.If(function() {
      return Spacebars.call(view.lookup("postsMustBeApproved"));
    }, function() {
      return [ "\n        |\n        ", Blaze.If(function() {
        return Spacebars.call(view.lookup("isApproved"));
      }, function() {
        return [ "\n          ", HTML.A({
          href: "#",
          "class": "unapprove-link goto-edit"
        }, "Unapprove"), "\n        " ];
      }, function() {
        return [ "\n          ", HTML.A({
          href: "#",
          "class": "approve-link goto-edit"
        }, "Approve"), "\n        " ];
      }), "\n      " ];
    }), "\n      | ", Blaze.View(function() {
      return Spacebars.mustache(view.lookup("i18n"), "score");
    }), ": ", Blaze.View(function() {
      return Spacebars.mustache(view.lookup("shortScore"));
    }), ", ", Blaze.View(function() {
      return Spacebars.mustache(view.lookup("i18n"), "clicks");
    }), ": ", Blaze.View(function() {
      return Spacebars.mustache(view.lookup("clickCount"));
    }), ", ", Blaze.View(function() {
      return Spacebars.mustache(view.lookup("i18n"), "views");
    }), ": ", Blaze.View(function() {
      return Spacebars.mustache(view.lookup("viewCount"));
    }), "\n    "), "\n  " ];
  });
}));

})();
