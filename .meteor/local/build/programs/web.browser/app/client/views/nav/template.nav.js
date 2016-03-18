(function(){
Template.__checkName("nav");
Template["nav"] = new Template("Template.nav", (function() {
  var view = this;
  return HTML.HEADER({
    "class": "header"
  }, "\n\n    ", HTML.A({
    href: "#menu",
    "class": "mobile-only mobile-menu-button button"
  }, "\n      ", HTML.SVG({
    height: "24px",
    id: "Layer_1",
    style: "enable-background:new 0 0 32 32;",
    version: "1.1",
    viewBox: "0 0 32 32",
    width: "32px",
    "xml:space": "preserve",
    xmlns: "http://www.w3.org/2000/svg",
    "xmlns:xlink": "http://www.w3.org/1999/xlink"
  }, HTML.PATH({
    "class": "hamburger",
    d: "M4,10h24c1.104,0,2-0.896,2-2s-0.896-2-2-2H4C2.896,6,2,6.896,2,8S2.896,10,4,10z M28,14H4c-1.104,0-2,0.896-2,2  s0.896,2,2,2h24c1.104,0,2-0.896,2-2S29.104,14,28,14z M28,22H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h24c1.104,0,2-0.896,2-2  S29.104,22,28,22z"
  })), "\n    "), "\n\n    ", Blaze.If(function() {
    return Spacebars.call(view.lookup("logo_url"));
  }, function() {
    return [ "\n      ", HTML.H1({
      "class": "logo logo-image header-module"
    }, "\n        ", HTML.A({
      href: "/"
    }, "\n          ", HTML.IMG({
      src: function() {
        return Spacebars.mustache(view.lookup("logo_url"));
      },
      alt: function() {
        return Spacebars.mustache(view.lookup("site_title"));
      }
    }), "\n        "), "\n      "), "\n    " ];
  }, function() {
    return [ "\n      ", HTML.H1({
      "class": "logo header-module"
    }, HTML.A({
      href: "/"
    }, Blaze.View(function() {
      return Spacebars.mustache(view.lookup("site_title"));
    }))), "\n    " ];
  }), "\n\n    ", Blaze.If(function() {
    return Spacebars.call(view.lookup("hasPrimaryNav"));
  }, function() {
    return [ "\n      ", HTML.UL({
      "class": function() {
        return [ "nav primary-nav desktop-nav ", Spacebars.mustache(view.lookup("dropdownClass")), " header-module desktop-only" ];
      }
    }, "\n        ", Blaze.Each(function() {
      return Spacebars.call(view.lookup("primaryNav"));
    }, function() {
      return [ "\n          ", HTML.LI("\n            ", Blaze._TemplateWith(function() {
        return {
          template: Spacebars.call(view.lookup("getTemplate"))
        };
      }, function() {
        return Spacebars.include(function() {
          return Spacebars.call(Template.__dynamic);
        });
      }), "\n          "), "\n        " ];
    }), "\n      "), "\n    " ];
  }), "\n\n    ", Blaze.If(function() {
    return Spacebars.call(view.lookup("hasSecondaryNav"));
  }, function() {
    return [ "\n      ", HTML.UL({
      "class": function() {
        return [ "nav secondary-nav desktop-nav ", Spacebars.mustache(view.lookup("dropdownClass")), " header-module desktop-only" ];
      }
    }, "\n        ", Blaze.Each(function() {
      return Spacebars.call(view.lookup("secondaryNav"));
    }, function() {
      return [ "\n          ", HTML.LI("\n            ", Blaze._TemplateWith(function() {
        return {
          template: Spacebars.call(view.lookup("getTemplate"))
        };
      }, function() {
        return Spacebars.include(function() {
          return Spacebars.call(Template.__dynamic);
        });
      }), "\n          "), "\n        " ];
    }), "\n      "), "\n    " ];
  }), "\n\n  ");
}));

})();
