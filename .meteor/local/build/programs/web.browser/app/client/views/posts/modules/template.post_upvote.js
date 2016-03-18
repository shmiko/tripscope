(function(){
Template.__checkName("postUpvote");
Template["postUpvote"] = new Template("Template.postUpvote", (function() {
  var view = this;
  return [ HTML.DIV({
    "class": "post-rank"
  }, HTML.SPAN(Blaze.View(function() {
    return Spacebars.mustache(view.lookup("oneBasedRank"));
  }))), "\n  ", Blaze.If(function() {
    return Spacebars.call(view.lookup("upvoted"));
  }, function() {
    return [ "\n    ", HTML.SPAN({
      "class": "upvote-link voted"
    }, HTML.I({
      "class": "icon-check"
    }), HTML.SPAN(Blaze.View(function() {
      return Spacebars.mustache(view.lookup("i18n"), "Upvoted");
    }))), "\n  " ];
  }, function() {
    return [ "\n    ", HTML.A({
      "class": "upvote-link not-voted",
      href: "#"
    }, HTML.I({
      "class": "icon-up"
    }), HTML.SPAN(Blaze.View(function() {
      return Spacebars.mustache(view.lookup("i18n"), "Upvote");
    }))), "\n  " ];
  }) ];
}));

})();
