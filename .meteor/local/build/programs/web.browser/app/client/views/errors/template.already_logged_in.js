(function(){
Template.__checkName("already_logged_in");
Template["already_logged_in"] = new Template("Template.already_logged_in", (function() {
  var view = this;
  return HTML.DIV({
    "class": "grid-small grid-block dialog"
  }, "\n		", HTML.P(Blaze.View(function() {
    return Spacebars.mustache(view.lookup("i18n"), "You are already logged in");
  })), "\n	");
}));

})();
