(function(){
Template.__checkName("notFound");
Template["notFound"] = new Template("Template.notFound", (function() {
  var view = this;
  return HTML.DIV({
    "class": "grid-small grid-block dialog"
  }, "\n		", HTML.H2(Blaze.View(function() {
    return Spacebars.mustache(view.lookup("i18n"), "Not Found!");
  })), "\n    ", HTML.P(Blaze.View(function() {
    return Spacebars.mustache(view.lookup("i18n"), "We're sorry; whatever you were looking for isn't here..");
  })), "\n	");
}));

})();
