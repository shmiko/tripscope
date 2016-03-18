(function(){
Template.__checkName("no_account");
Template["no_account"] = new Template("Template.no_account", (function() {
  var view = this;
  return HTML.DIV({
    "class": "grid-small grid-block dialog"
  }, "\n		", HTML.P(Blaze.View(function() {
    return Spacebars.mustache(view.lookup("i18n"), "Sorry, this is a private site. Please sign up first.");
  })), "\n		", Blaze.View(function() {
    return Spacebars.mustache(view.lookup("landingPageText"));
  }), "\n		", HTML.DIV({
    "class": "twitter-signup twitter-auth"
  }, "\n      		", HTML.A({
    "class": "twitter-button button",
    href: "#"
  }, Blaze.View(function() {
    return Spacebars.mustache(view.lookup("i18n"), "Sign In/Sign Up with Twitter");
  })), "\n    	"), "\n	");
}));

})();
