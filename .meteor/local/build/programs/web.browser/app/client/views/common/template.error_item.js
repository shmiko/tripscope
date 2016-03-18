(function(){
Template.__checkName("error_item");
Template["error_item"] = new Template("Template.error_item", (function() {
  var view = this;
  return Blaze.If(function() {
    return Spacebars.call(view.lookup("show"));
  }, function() {
    return [ "\n    ", HTML.DIV({
      "class": "grid"
    }, "\n      ", HTML.DIV({
      "class": function() {
        return [ "error ", Spacebars.mustache(view.lookup("type")), "-message module" ];
      }
    }, "\n        ", Blaze.View(function() {
      return Spacebars.mustache(view.lookup("message"));
    }), "\n      "), "\n    "), "\n  " ];
  });
}));

})();
