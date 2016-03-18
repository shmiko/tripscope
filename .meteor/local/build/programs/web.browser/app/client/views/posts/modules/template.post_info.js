(function(){
Template.__checkName("postInfo");
Template["postInfo"] = new Template("Template.postInfo", (function() {
  var view = this;
  return HTML.DIV({
    "class": "post-meta-item"
  }, "\n    ", HTML.SPAN({
    "class": "points"
  }, Blaze.View(function() {
    return Spacebars.mustache(view.lookup("baseScore"));
  }), " ", HTML.SPAN({
    "class": "unit"
  }, Blaze.View(function() {
    return Spacebars.mustache(view.lookup("pointsUnitDisplayText"));
  }), " ")), "by ", HTML.A({
    "class": "post-author",
    href: function() {
      return Spacebars.mustache(view.lookup("profileUrl"));
    }
  }, Blaze.View(function() {
    return Spacebars.mustache(view.lookup("authorName"));
  })), " ", HTML.SPAN({
    "class": "post-time"
  }, Blaze.View(function() {
    return Spacebars.mustache(view.lookup("ago"));
  })), "\n    ", Blaze.If(function() {
    return Spacebars.call(view.lookup("can_edit"));
  }, function() {
    return [ "\n      | ", HTML.A({
      href: function() {
        return [ "/posts/", Spacebars.mustache(view.lookup("_id")), "/edit" ];
      },
      "class": "edit-link goto-edit"
    }, "Edit"), "\n    " ];
  }), "\n  ");
}));

})();
