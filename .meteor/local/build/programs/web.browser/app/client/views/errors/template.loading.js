(function(){
Template.__checkName("loading");
Template["loading"] = new Template("Template.loading", (function() {
  var view = this;
  return HTML.DIV({
    "class": "grid loading-page"
  }, "\n    ", Spacebars.include(view.lookupTemplate("spinner")), "\n  ");
}));

})();
