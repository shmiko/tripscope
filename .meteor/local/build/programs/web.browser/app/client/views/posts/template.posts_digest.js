(function(){
Template.__checkName("posts_digest");
Template["posts_digest"] = new Template("Template.posts_digest", (function() {
  var view = this;
  return [ HTML.DIV({
    "class": "grid"
  }, "\n    ", HTML.DIV({
    "class": "grid-block"
  }, "\n      ", Blaze.View(function() {
    return Spacebars.mustache(view.lookup("i18n"), "The top 5 posts of each day.");
  }), " |\n    ", Blaze.If(function() {
    return Spacebars.call(view.lookup("showPreviousDate"));
  }, function() {
    return [ "\n    ", HTML.A({
      href: function() {
        return Spacebars.mustache(view.lookup("previousDateURL"));
      },
      "class": "prev-link"
    }, Blaze.View(function() {
      return Spacebars.mustache(view.lookup("i18n"), "Previous Day");
    })), " |\n    " ];
  }), "\n    ", Blaze.View(function() {
    return Spacebars.mustache(view.lookup("currentDate"));
  }), " |\n    ", Blaze.If(function() {
    return Spacebars.call(view.lookup("showNextDate"));
  }, function() {
    return [ "\n    ", HTML.A({
      href: function() {
        return Spacebars.mustache(view.lookup("nextDateURL"));
      },
      "class": "next-link"
    }, Blaze.View(function() {
      return Spacebars.mustache(view.lookup("i18n"), "Next Day");
    })), "\n    " ];
  }), "\n    "), "\n  "), "\n  \n  ", Blaze._TemplateWith(function() {
    return {
      template: Spacebars.call(view.lookup("postsListIncoming")),
      data: Spacebars.call(view.lookup("incoming"))
    };
  }, function() {
    return Spacebars.include(function() {
      return Spacebars.call(Template.__dynamic);
    });
  }), "\n\n  ", Blaze.If(function() {
    return Spacebars.call(view.lookup("hasPosts"));
  }, function() {
    return [ "\n    ", HTML.DIV({
      "class": "posts grid list"
    }, "\n      ", Blaze.Each(function() {
      return Spacebars.call(view.lookup("posts"));
    }, function() {
      return [ "\n        ", Blaze._TemplateWith(function() {
        return {
          template: Spacebars.call(view.lookup("post_item"))
        };
      }, function() {
        return Spacebars.include(function() {
          return Spacebars.call(Template.__dynamic);
        });
      }), "\n      " ];
    }), "\n    "), "\n  " ];
  }, function() {
    return [ "\n    ", HTML.DIV({
      "class": "grid-small grid-block dialog"
    }, "\n      ", HTML.P(Blaze.View(function() {
      return Spacebars.mustache(view.lookup("i18n"), "Sorry, no posts for");
    }), " ", Blaze.View(function() {
      return Spacebars.mustache(view.lookup("currentDate"));
    }), "."), "\n    "), "\n  " ];
  }) ];
}));

})();
