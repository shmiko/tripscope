(function(){
Template.__checkName("posts_list");
Template["posts_list"] = new Template("Template.posts_list", (function() {
  var view = this;
  return [ Blaze._TemplateWith(function() {
    return {
      template: Spacebars.call(view.lookup("postsListIncoming")),
      data: Spacebars.call(view.lookup("incoming"))
    };
  }, function() {
    return Spacebars.include(function() {
      return Spacebars.call(Template.__dynamic);
    });
  }), "\n  ", HTML.DIV({
    "class": "posts-wrapper grid grid-module"
  }, "\n    ", HTML.DIV({
    "class": "posts list"
  }, "\n      ", Blaze.Each(function() {
    return Spacebars.call(view.lookup("posts"));
  }, function() {
    return [ "\n        ", Blaze._TemplateWith(function() {
      return {
        template: Spacebars.call(view.lookup("post_item"))
      };
    }, function() {
      return Spacebars.include(function() {
        return Spacebars.call(Template.__dynamic);
      });
    }), "\n      " ];
  }), "\n    "), "\n  "), "\n  ", Blaze._TemplateWith(function() {
    return {
      template: Spacebars.call(view.lookup("postsLoadMore"))
    };
  }, function() {
    return Spacebars.include(function() {
      return Spacebars.call(Template.__dynamic);
    });
  }) ];
}));

})();
