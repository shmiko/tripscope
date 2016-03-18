(function(){
Template.__checkName("submitButton");
Template["submitButton"] = new Template("Template.submitButton", (function() {
  var view = this;
  return Blaze.If(function() {
    return Spacebars.call(view.lookup("canPost"));
  }, function() {
    return [ "\n    ", HTML.A({
      id: "submit",
      "class": "submit button header-submodule",
      href: "/submit"
    }, Blaze.View(function() {
      return Spacebars.mustache(view.lookup("i18n"), "Post");
    })), "\n  " ];
  });
}));

})();
