(function(){
Template.__checkName("postContent");
Template["postContent"] = new Template("Template.postContent", (function() {
  var view = this;
  return HTML.DIV({
    "class": "post-info"
  }, "\n    ", HTML.H3({
    "class": "post-heading"
  }, "\n      ", Blaze.Each(function() {
    return Spacebars.call(view.lookup("postHeading"));
  }, function() {
    return [ "\n        ", Blaze._TemplateWith(function() {
      return {
        template: Spacebars.call(view.lookup("getTemplate")),
        data: Spacebars.call(view.lookup(".."))
      };
    }, function() {
      return Spacebars.include(function() {
        return Spacebars.call(Template.__dynamic);
      });
    }), "\n      " ];
  }), "\n    "), "\n    ", HTML.DIV({
    "class": "post-meta"
  }, "\n      ", Blaze.Each(function() {
    return Spacebars.call(view.lookup("postMeta"));
  }, function() {
    return [ "\n        ", Blaze._TemplateWith(function() {
      return {
        template: Spacebars.call(view.lookup("getTemplate")),
        data: Spacebars.call(view.lookup(".."))
      };
    }, function() {
      return Spacebars.include(function() {
        return Spacebars.call(Template.__dynamic);
      });
    }), "\n      " ];
  }), "\n    "), "\n  ");
}));

})();
