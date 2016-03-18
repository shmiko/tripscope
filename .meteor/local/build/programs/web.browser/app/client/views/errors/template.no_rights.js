(function(){
Template.__checkName("no_rights");
Template["no_rights"] = new Template("Template.no_rights", (function() {
  var view = this;
  return HTML.DIV({
    "class": "grid-small grid-block dialog"
  }, "\n    ", Blaze.View(function() {
    return Spacebars.mustache(view.lookup("i18n"), "Sorry, you don't have the rights to view this page.");
  }), "\n  ");
}));

})();
