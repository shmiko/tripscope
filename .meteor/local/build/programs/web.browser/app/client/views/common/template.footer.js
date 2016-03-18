(function(){
Template.__checkName("footer");
Template["footer"] = new Template("Template.footer", (function() {
  var view = this;
  return [ Blaze.If(function() {
    return Spacebars.call(view.lookup("footerCode"));
  }, function() {
    return [ "\n    ", HTML.DIV({
      "class": function() {
        return [ "footer grid ", Spacebars.mustache(view.lookup("footerClass")) ];
      }
    }, "\n      ", Blaze.View(function() {
      return Spacebars.makeRaw(Spacebars.mustache(view.lookup("footerCode")));
    }), "\n    "), "\n  " ];
  }), "\n  ", Blaze.Each(function() {
    return Spacebars.call(view.lookup("footerModules"));
  }, function() {
    return [ "\n    ", Blaze._TemplateWith(function() {
      return {
        template: Spacebars.call(view.lookup("getTemplate"))
      };
    }, function() {
      return Spacebars.include(function() {
        return Spacebars.call(Template.__dynamic);
      });
    }), "\n  " ];
  }) ];
}));

})();
