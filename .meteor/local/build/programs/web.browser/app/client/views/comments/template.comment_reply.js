(function(){
Template.__checkName("comment_reply");
Template["comment_reply"] = new Template("Template.comment_reply", (function() {
  var view = this;
  return HTML.DIV({
    "class": "grid comment-page single-post"
  }, "\n    \n    ", Spacebars.With(function() {
    return Spacebars.call(view.lookup("post"));
  }, function() {
    return [ "\n      ", HTML.DIV({
      "class": "posts"
    }, "\n        ", Blaze._TemplateWith(function() {
      return {
        template: Spacebars.call(view.lookup("post_item"))
      };
    }, function() {
      return Spacebars.include(function() {
        return Spacebars.call(Template.__dynamic);
      });
    }), "\n      "), "\n    " ];
  }), "\n\n    ", Spacebars.With(function() {
    return Spacebars.call(view.lookup("comment"));
  }, function() {
    return [ "\n      ", HTML.UL({
      "class": "selected-comment"
    }, "\n       ", Blaze._TemplateWith(function() {
      return {
        template: Spacebars.call(view.lookup("comment_item"))
      };
    }, function() {
      return Spacebars.include(function() {
        return Spacebars.call(Template.__dynamic);
      });
    }), "\n      "), "\n    " ];
  }), "\n\n    ", Blaze.If(function() {
    return Spacebars.call(view.lookup("canComment"));
  }, function() {
    return [ "\n      ", Blaze._TemplateWith(function() {
      return {
        template: Spacebars.call(view.lookup("comment_form"))
      };
    }, function() {
      return Spacebars.include(function() {
        return Spacebars.call(Template.__dynamic);
      });
    }), "\n    " ];
  }), "\n\n  ");
}));

})();
