(function(){
Template.__checkName("comment_form");
Template["comment_form"] = new Template("Template.comment_form", (function() {
  var view = this;
  return Blaze.If(function() {
    return Spacebars.call(view.lookup("canComment"));
  }, function() {
    return [ "\n    ", HTML.DIV({
      "class": "comment-new module"
    }, "\n      ", HTML.FORM("\n        ", HTML.DIV({
      "class": "comment-field",
      id: "editor"
    }, "\n          ", HTML.TEXTAREA({
      id: "comment",
      rows: "3",
      autofocus: "autofocus"
    }), "\n        "), "\n        ", HTML.DIV({
      "class": "comment-submit"
    }, "\n          ", HTML.INPUT({
      type: "submit",
      "class": "button",
      value: function() {
        return Spacebars.mustache(view.lookup("i18n"), "Add Comment");
      },
      title: "(⌘+enter)"
    }), "\n        "), "\n      "), "\n    "), "\n  " ];
  });
}));

})();
