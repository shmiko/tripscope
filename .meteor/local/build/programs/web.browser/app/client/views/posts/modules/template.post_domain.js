(function(){
Template.__checkName("postDomain");
Template["postDomain"] = new Template("Template.postDomain", (function() {
  var view = this;
  return Blaze.If(function() {
    return Spacebars.call(view.lookup("url"));
  }, function() {
    return HTML.SPAN({
      "class": "post-domain"
    }, Blaze.View(function() {
      return Spacebars.mustache(view.lookup("domain"));
    }));
  });
}));

})();
