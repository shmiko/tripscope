(function(){
Template.__checkName("postDiscuss");
Template["postDiscuss"] = new Template("Template.postDiscuss", (function() {
  var view = this;
  return HTML.A({
    "class": "discuss-link go-to-comments",
    href: function() {
      return [ "/posts/", Spacebars.mustache(view.lookup("_id")) ];
    }
  }, HTML.Raw('\n    <i class="icon-comment"></i>\n    '), HTML.SPAN({
    "class": "count"
  }, Blaze.View(function() {
    return Spacebars.mustache(view.lookup("commentCount"));
  })), "\n    ", HTML.SPAN({
    "class": "action"
  }, Blaze.View(function() {
    return Spacebars.mustache(view.lookup("i18n"), "Discuss");
  })), "\n  ");
}));

})();
