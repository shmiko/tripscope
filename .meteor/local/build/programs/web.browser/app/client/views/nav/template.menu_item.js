(function(){
Template.__checkName("menuItem");
Template["menuItem"] = new Template("Template.menuItem", (function() {
  var view = this;
  return HTML.LI(HTML.A({
    "class": "dropdown-sub-level",
    href: function() {
      return Spacebars.mustache(view.lookup("pathFor"), view.lookup("route"));
    }
  }, Blaze.View(function() {
    return Spacebars.mustache(view.lookup("i18n"), view.lookup("label"));
  })));
}));

})();
