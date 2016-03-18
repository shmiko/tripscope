(function(){
Template.__checkName("layout");
Template["layout"] = new Template("Template.layout", (function() {
  var view = this;
  return [ Blaze._TemplateWith(function() {
    return {
      template: Spacebars.call(view.lookup("css"))
    };
  }, function() {
    return Spacebars.include(function() {
      return Spacebars.call(Template.__dynamic);
    });
  }), "\n  ", HTML.DIV({
    "class": function() {
      return [ "outer-wrapper ", Spacebars.mustache(view.lookup("currentPage")) ];
    }
  }, "\n    ", Blaze._TemplateWith(function() {
    return {
      template: Spacebars.call(view.lookup("mobile_nav"))
    };
  }, function() {
    return Spacebars.include(function() {
      return Spacebars.call(Template.__dynamic);
    });
  }), "\n    ", HTML.DIV({
    "class": function() {
      return [ "inner-wrapper template-", Spacebars.mustache(view.lookup("pageName")) ];
    }
  }, "\n      ", Blaze._TemplateWith(function() {
    return {
      template: Spacebars.call(view.lookup("nav"))
    };
  }, function() {
    return Spacebars.include(function() {
      return Spacebars.call(Template.__dynamic);
    });
  }), "\n      ", HTML.DIV({
    "class": "content-wrapper"
  }, "\n        ", Blaze._TemplateWith(function() {
    return {
      template: Spacebars.call(view.lookup("error"))
    };
  }, function() {
    return Spacebars.include(function() {
      return Spacebars.call(Template.__dynamic);
    });
  }), "\n        ", Blaze.Each(function() {
    return Spacebars.call(view.lookup("heroModules"));
  }, function() {
    return [ "\n          ", Blaze._TemplateWith(function() {
      return {
        template: Spacebars.call(view.lookup("getTemplate"))
      };
    }, function() {
      return Spacebars.include(function() {
        return Spacebars.call(Template.__dynamic);
      });
    }), "\n        " ];
  }), "\n        ", Spacebars.include(view.lookupTemplate("yield")), "\n        ", Blaze._TemplateWith(function() {
    return {
      template: Spacebars.call(view.lookup("footer"))
    };
  }, function() {
    return Spacebars.include(function() {
      return Spacebars.call(Template.__dynamic);
    });
  }), "\n      "), "\n      ", HTML.Raw('<div class="overlay hidden"></div>'), "\n    "), "\n    ", Blaze.View(function() {
    return Spacebars.makeRaw(Spacebars.mustache(view.lookup("extraCode")));
  }), "\n  ") ];
}));

})();
