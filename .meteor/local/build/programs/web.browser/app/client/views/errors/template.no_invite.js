(function(){
Template.__checkName("no_invite");
Template["no_invite"] = new Template("Template.no_invite", (function() {
  var view = this;
  return HTML.DIV({
    "class": "grid-small grid-block dialog"
  }, "\n		", HTML.H2(Blaze.View(function() {
    return Spacebars.mustache(view.lookup("i18n"), "Thanks for signing up!");
  })), "\n		", Blaze.View(function() {
    return Spacebars.mustache(view.lookup("afterSignupText"));
  }), "\n		", HTML.P(Blaze.View(function() {
    return Spacebars.mustache(view.lookup("i18n"), "The site is currently invite-only, but we will let you know as soon as a spot opens up.");
  })), "\n	");
}));

})();
