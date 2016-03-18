(function(){
Template.__checkName("postsLoadMore");
Template["postsLoadMore"] = new Template("Template.postsLoadMore", (function() {
  var view = this;
  return Blaze.If(function() {
    return Spacebars.call(view.lookup("hasMorePosts"));
  }, function() {
    return [ "\n    ", HTML.A({
      "class": "more-button grid-module",
      href: function() {
        return Spacebars.mustache(view.lookup("loadMoreUrl"));
      }
    }, HTML.SPAN(Blaze.View(function() {
      return Spacebars.mustache(view.lookup("i18n"), "Load more");
    }))), "\n  " ];
  }, function() {
    return [ "\n    ", Blaze.Unless(function() {
      return Spacebars.call(view.lookup("ready"));
    }, function() {
      return [ "\n      ", HTML.DIV({
        "class": "grid loading-module"
      }, "\n        ", Spacebars.include(view.lookupTemplate("spinner")), "\n      "), "\n    " ];
    }), "\n  " ];
  });
}));

})();
