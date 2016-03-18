(function(){
Template.__checkName("comment_deleted");
Template["comment_deleted"] = new Template("Template.comment_deleted", (function() {
  var view = this;
  return HTML.DIV({
    "class": "grid-small grid-block"
  }, "\n  	", HTML.P(Blaze.View(function() {
    return Spacebars.mustache(view.lookup("i18n"), "Your comment has been deleted.");
  })), "\n  ");
}));

})();
