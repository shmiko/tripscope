(function(){
Template.__checkName("adminMenu");
Template["adminMenu"] = new Template("Template.adminMenu", (function() {
  var view = this;
  return Blaze.If(function() {
    return Spacebars.call(view.lookup("isAdmin"));
  }, function() {
    return [ "\n    ", HTML.DIV({
      "class": "dropdown header-submodule admin-menu"
    }, "\n      ", HTML.A({
      "class": "admin dropdown-top-level",
      href: "/"
    }, Blaze.View(function() {
      return Spacebars.mustache(view.lookup("i18n"), "Admin");
    })), "\n      ", HTML.DIV({
      "class": "dropdown-menu"
    }, "\n        ", HTML.UL({
      role: "menu",
      "aria-labelledby": "dLabel"
    }, "\n          ", Blaze.Each(function() {
      return Spacebars.call(view.lookup("menu"));
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
