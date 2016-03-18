(function(){
Template.__checkName("userMenu");
Template["userMenu"] = new Template("Template.userMenu", (function() {
  var view = this;
  return Blaze.If(function() {
    return Spacebars.call(view.lookup("isLoggedIn"));
  }, function() {
    return [ "\n    ", HTML.DIV({
      "class": "user-menu dropdown header-submodule"
    }, "\n      ", HTML.A({
      "class": "view dropdown-top-level",
      href: "/"
    }, Blaze.View(function() {
      return Spacebars.mustache(view.lookup("name"));
    })), "\n      ", HTML.DIV({
      "class": "dropdown-menu"
    }, "\n        ", HTML.UL({
      role: "menu",
      "aria-labelledby": "dLabel"
    }, "\n          ", HTML.LI(HTML.A({
      href: function() {
        return Spacebars.mustache(view.lookup("profileUrl"));
      }
    }, Blaze.View(function() {
      return Spacebars.mustache(view.lookup("i18n"), "Profile");
    }))), "\n          ", HTML.LI(HTML.A({
      href: "/account"
    }, Blaze.View(function() {
      return Spacebars.mustache(view.lookup("i18n"), "Edit Account");
    }))), " \n          ", HTML.LI(HTML.A({
      href: "/sign-out"
    }, Blaze.View(function() {
      return Spacebars.mustache(view.lookup("i18n"), "Sign Out");
    }))), "\n        "), "\n      "), "\n    "), "\n  " ];
  }, function() {
    return [ "\n    ", HTML.A({
      "class": "account-link sign-in",
      href: "/sign-in"
    }, Blaze.View(function() {
      return Spacebars.mustache(view.lookup("i18n"), "Sign In");
    })), "\n    ", HTML.A({
      "class": "account-link sign-up",
      href: "/sign-up"
    }, Blaze.View(function() {
      return Spacebars.mustache(view.lookup("i18n"), "Sign Up");
    })), "\n  " ];
  });
}));

})();
