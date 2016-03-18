(function(){
Template.__checkName("user_email");
Template["user_email"] = new Template("Template.user_email", (function() {
  var view = this;
  return HTML.DIV({
    "class": "grid-small grid-block dialog user-edit"
  }, "\n  	", Spacebars.With(function() {
    return Spacebars.call(view.lookup("user"));
  }, function() {
    return [ "\n    ", HTML.DIV("\n      ", Blaze.View(function() {
      return Spacebars.mustache(view.lookup("i18n"), "Please fill in your email below to finish signing up.");
    }), "\n    "), "\n    ", HTML.FORM("\n      ", HTML.DIV({
      "class": "control-group"
    }, "\n          ", HTML.LABEL(Blaze.View(function() {
      return Spacebars.mustache(view.lookup("i18n"), "Username");
    })), "\n          ", HTML.DIV({
      "class": "controls"
    }, "\n              ", HTML.INPUT({
      name: "username",
      type: "text",
      value: function() {
        return Spacebars.mustache(view.lookup("username"));
      }
    }), "\n          "), "\n        ", HTML.BR(), "\n        ", HTML.LABEL(Blaze.View(function() {
      return Spacebars.mustache(view.lookup("i18n"), "Email");
    })), "\n        ", HTML.DIV({
      "class": "controls"
    }, "\n          ", HTML.INPUT({
      name: "email",
      type: "text",
      value: function() {
        return Spacebars.mustache(Spacebars.dot(view.lookup("profile"), "email"));
      }
    }), "\n        "), "\n      "), "\n      ", HTML.DIV({
      "class": "form-actions"
    }, "\n        ", HTML.INPUT({
      type: "submit",
      "class": "button",
      value: function() {
        return Spacebars.mustache(view.lookup("i18n"), "Submit");
      }
    }), "\n      "), "\n    "), "\n    " ];
  }), "\n  ");
}));

})();
