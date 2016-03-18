(function(){
Template.__checkName("post_item");
Template["post_item"] = new Template("Template.post_item", (function() {
  var view = this;
  return HTML.DIV({
    "class": function() {
      return [ "post ", Spacebars.mustache(view.lookup("rankClass")), " ", Blaze.If(function() {
        return Spacebars.call(view.lookup("sticky"));
      }, function() {
        return "sticky";
      }), " ", Spacebars.mustache(view.lookup("inactiveClass")) ];
    },
    id: function() {
      return Spacebars.mustache(view.lookup("_id"));
    }
  }, "\n    ", HTML.DIV({
    "class": "modules-group left-modules"
  }, "\n      ", HTML.DIV({
    "class": "inner"
  }, "\n      ", Blaze.Each(function() {
    return Spacebars.call(view.lookup("leftPostModules"));
  }, function() {
    return [ "\n        ", HTML.DIV({
      "class": function() {
        return Spacebars.mustache(view.lookup("moduleClass"));
      }
    }, "\n          ", Blaze._TemplateWith(function() {
      return {
        template: Spacebars.call(view.lookup("getTemplate")),
        data: Spacebars.call(view.lookup(".."))
      };
    }, function() {
      return Spacebars.include(function() {
        return Spacebars.call(Template.__dynamic);
      });
    }), "\n        "), "\n      " ];
  }), "\n      "), "\n    "), "\n    ", HTML.DIV({
    "class": "modules-group center-modules"
  }, "\n      ", HTML.DIV({
    "class": "inner"
  }, "\n      ", Blaze.Each(function() {
    return Spacebars.call(view.lookup("centerPostModules"));
  }, function() {
    return [ "\n        ", HTML.DIV({
      "class": function() {
        return Spacebars.mustache(view.lookup("moduleClass"));
      }
    }, "\n          ", Blaze._TemplateWith(function() {
      return {
        template: Spacebars.call(view.lookup("getTemplate")),
        data: Spacebars.call(view.lookup(".."))
      };
    }, function() {
      return Spacebars.include(function() {
        return Spacebars.call(Template.__dynamic);
      });
    }), "\n        "), "\n      " ];
  }), "\n      "), "\n    "), "\n    ", HTML.DIV({
    "class": "modules-group right-modules"
  }, "\n      ", HTML.DIV({
    "class": "inner"
  }, "\n      ", Blaze.Each(function() {
    return Spacebars.call(view.lookup("rightPostModules"));
  }, function() {
    return [ "\n        ", HTML.DIV({
      "class": function() {
        return Spacebars.mustache(view.lookup("moduleClass"));
      }
    }, "\n          ", Blaze._TemplateWith(function() {
      return {
        template: Spacebars.call(view.lookup("getTemplate")),
        data: Spacebars.call(view.lookup(".."))
      };
    }, function() {
      return Spacebars.include(function() {
        return Spacebars.call(Template.__dynamic);
      });
    }), "\n        "), "\n      " ];
  }), "\n      "), "\n    "), "\n  ");
}));

})();
