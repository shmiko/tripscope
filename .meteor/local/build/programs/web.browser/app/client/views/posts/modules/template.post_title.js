(function(){
Template.__checkName("postTitle");
Template["postTitle"] = new Template("Template.postTitle", (function() {
  var view = this;
  return HTML.A({
    href: function() {
      return Spacebars.mustache(view.lookup("postLink"));
    },
    "class": "post-title",
    target: function() {
      return Spacebars.mustache(view.lookup("postTarget"));
    }
  }, Blaze.View(function() {
    return Spacebars.mustache(view.lookup("title"));
  }));
}));

})();
