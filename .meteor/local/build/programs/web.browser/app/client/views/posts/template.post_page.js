(function(){
Template.__checkName("post_page");
Template["post_page"] = new Template("Template.post_page", (function() {
  var view = this;
  return HTML.DIV({
    "class": "single-post grid"
  }, "\n    ", HTML.DIV({
    "class": "posts"
  }, "\n      ", Blaze._TemplateWith(function() {
    return {
      template: Spacebars.call(view.lookup("post_item"))
    };
  }, function() {
    return Spacebars.include(function() {
      return Spacebars.call(Template.__dynamic);
    });
  }), "\n    "), "\n    ", Blaze.If(function() {
    return Spacebars.call(view.lookup("body"));
  }, function() {
    return [ "\n      ", Blaze._TemplateWith(function() {
      return {
        template: Spacebars.call(view.lookup("post_body"))
      };
    }, function() {
      return Spacebars.include(function() {
        return Spacebars.call(Template.__dynamic);
      });
    }), "\n    " ];
  }), "\n    ", Blaze._TemplateWith(function() {
    return {
      template: Spacebars.call(view.lookup("comment_form"))
    };
  }, function() {
    return Spacebars.include(function() {
      return Spacebars.call(Template.__dynamic);
    });
  }), "\n    ", Blaze._TemplateWith(function() {
    return {
      template: Spacebars.call(view.lookup("comment_list"))
    };
  }, function() {
    return Spacebars.include(function() {
      return Spacebars.call(Template.__dynamic);
    });
  }), "\n  ");
}));

})();
