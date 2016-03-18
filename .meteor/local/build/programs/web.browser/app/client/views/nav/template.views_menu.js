(function(){
Template.__checkName("viewsMenu");
Template["viewsMenu"] = new Template("Template.viewsMenu", (function() {
  var view = this;
  return Blaze.If(function() {
    return Spacebars.call(view.lookup("canView"));
  }, function() {
    return [ "\n    ", HTML.DIV({
      "class": "dropdown header-submodule views-menu"
    }, "\n      ", HTML.A({
      "class": "view dropdown-top-level",
      href: "/"
    }, Blaze.View(function() {
      return Spacebars.mustache(view.lookup("i18n"), "View");
    })), "\n      ", HTML.DIV({
      "class": "dropdown-menu"
    }, "\n        ", HTML.UL({
      role: "menu",
      "aria-labelledby": "dLabel"
    }, "\n          ", Blaze.Each(function() {
      return Spacebars.call(view.lookup("views"));
    }, function() {
      return [ "\n            ", Blaze._TemplateWith(function() {
        return {
          template: Spacebars.call(view.lookup("menuItem")),
          data: Spacebars.call(view.lookup("."))
        };
      }, function() {
        return Spacebars.include(function() {
          return Spacebars.call(Template.__dynamic);
        });
      }), "\n          " ];
    }), "\n        "), "\n      "), "\n    "), "\n  " ];
  });
}));

})();
