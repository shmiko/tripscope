(function(){
Template.__checkName("settings");
Template["settings"] = new Template("Template.settings", (function() {
  var view = this;
  return HTML.DIV({
    "class": "grid-small grid-module dialog settings"
  }, "\n    ", Blaze.If(function() {
    return Spacebars.call(Spacebars.dot(view.lookup("."), "hasSettings"));
  }, function() {
    return [ "\n      ", Blaze._TemplateWith(function() {
      return {
        collection: Spacebars.call("Settings"),
        id: Spacebars.call("updateSettingsForm"),
        type: Spacebars.call("update"),
        doc: Spacebars.call(Spacebars.dot(view.lookup("."), "settings")),
        "label-class": Spacebars.call("control-label"),
        "input-col-class": Spacebars.call("controls"),
        template: Spacebars.call("settings")
      };
    }, function() {
      return Spacebars.include(view.lookupTemplate("quickForm"));
    }), "\n    " ];
  }, function() {
    return [ "\n      ", Blaze._TemplateWith(function() {
      return {
        collection: Spacebars.call("Settings"),
        id: Spacebars.call("updateSettingsForm"),
        type: Spacebars.call("insert"),
        template: Spacebars.call("settings"),
        "label-class": Spacebars.call("control-label"),
        "input-col-class": Spacebars.call("controls")
      };
    }, function() {
      return Spacebars.include(view.lookupTemplate("quickForm"));
    }), "\n    " ];
  }), "\n  ");
}));

})();
