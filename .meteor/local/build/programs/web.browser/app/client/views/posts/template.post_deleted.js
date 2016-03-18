(function(){
Template.__checkName("post_deleted");
Template["post_deleted"] = new Template("Template.post_deleted", (function() {
  var view = this;
  return HTML.DIV({
    "class": "grid-small grid-block"
  }, "\n  	", HTML.P(Blaze.View(function() {
    return Spacebars.mustache(view.lookup("i18n"), "Your post has been deleted.");
  })), "\n  ");
}));

})();
