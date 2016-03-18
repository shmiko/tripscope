(function(){
Template.__checkName("error");
Template["error"] = new Template("Template.error", (function() {
  var view = this;
  return Blaze.Each(function() {
    return Spacebars.call(view.lookup("errors"));
  }, function() {
    return [ "\n		", Blaze._TemplateWith(function() {
      return {
        template: Spacebars.call(view.lookup("error_item"))
      };
    }, function() {
      return Spacebars.include(function() {
        return Spacebars.call(Template.__dynamic);
      });
    }), "\n	" ];
  });
}));

})();
