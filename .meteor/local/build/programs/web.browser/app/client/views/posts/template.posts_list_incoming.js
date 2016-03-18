(function(){
Template.__checkName("postsListIncoming");
Template["postsListIncoming"] = new Template("Template.postsListIncoming", (function() {
  var view = this;
  return Blaze.If(function() {
    return Spacebars.call(view.lookup("count"));
  }, function() {
    return [ "\n    ", HTML.A({
      "class": "more-button show-new grid-module",
      href: ""
    }, "\n      ", HTML.SPAN("\n        ", Blaze.View(function() {
      return Spacebars.mustache(view.lookup("i18n"), "View");
    }), " ", Blaze.View(function() {
      return Spacebars.mustache(view.lookup("count"));
    }), " ", Blaze.View(function() {
      return Spacebars.mustache(view.lookup("i18n"), "new");
    }), " ", Blaze.View(function() {
      return Spacebars.mustache(view.lookup("pluralize"), view.lookup("count"), "post");
    }), "\n      "), "\n    "), "\n  " ];
  });
}));

})();
