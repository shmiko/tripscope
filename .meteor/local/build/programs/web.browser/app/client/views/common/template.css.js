(function(){
Template.__checkName("css");
Template["css"] = new Template("Template.css", (function() {
  var view = this;
  return HTML.STYLE("\n      body{\n        background: ", Blaze.View(function() {
    return Spacebars.mustache(view.lookup("getSetting"), "backgroundCSS");
  }), ';\n      }\n      input[type="submit"], button, .button, .auth-buttons #login-buttons #login-buttons-password, .btn, .error, .mobile-menu-button, .login-link-text{\n        background-color: ', Blaze.View(function() {
    return Spacebars.mustache(view.lookup("getSetting"), "buttonColor");
  }), " !important;\n        color: ", Blaze.View(function() {
    return Spacebars.mustache(view.lookup("getSetting"), "buttonTextColor");
  }), " !important;\n      }\n      a:hover, .post-content .post-heading .post-title:hover, .post-content .post-upvote .upvote-link i, .comment-actions a i, .comment-actions.upvoted .upvote i, .comment-actions.downvoted .downvote i, .toggle-actions-link{\n        color: ", Blaze.View(function() {
    return Spacebars.mustache(view.lookup("getSetting"), "buttonColor");
  }), ";\n      }\n      .toggle-actions-link{\n        border-color: ", Blaze.View(function() {
    return Spacebars.mustache(view.lookup("getSetting"), "buttonColor");
  }), ";\n      }\n      .post-content .post-upvote .upvote-link.voted i.icon-check{\n        /*color: ", Blaze.View(function() {
    return Spacebars.mustache(view.lookup("getSetting"), "secondaryColor");
  }), ";*/\n      }\n      .header{\n        background-color: ", Blaze.View(function() {
    return Spacebars.mustache(view.lookup("getSetting"), "headerColor");
  }), ";\n        color: ", Blaze.View(function() {
    return Spacebars.mustache(view.lookup("getSetting"), "headerTextColor");
  }), ";\n      }\n    .logo-image a{\n      height:", Blaze.View(function() {
    return Spacebars.mustache(view.lookup("getSetting"), "logoHeight");
  }), "px; \n      width:", Blaze.View(function() {
    return Spacebars.mustache(view.lookup("getSetting"), "logoWidth");
  }), "px; \n    }\n  ");
}));

})();
