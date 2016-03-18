(function(){
Template.__checkName("invites");
Template["invites"] = new Template("Template.invites", (function() {
  var view = this;
  return HTML.DIV({
    "class": "grid-small grid-block dialog admin"
  }, HTML.Raw("\n    <h2>Invites</h2>\n    \n    "), Blaze.If(function() {
    return Spacebars.call(view.lookup("canCurrentUserInvite"));
  }, function() {
    return [ "\n      ", Blaze._TemplateWith(function() {
      return {
        schema: Spacebars.call(view.lookup("invitesSchema")),
        id: Spacebars.call("inviteForm"),
        "class": Spacebars.call("form-block"),
        type: Spacebars.call("method"),
        meteormethod: Spacebars.call("inviteUser")
      };
    }, function() {
      return Spacebars.include(view.lookupTemplate("autoForm"), function() {
        return [ "\n        ", HTML.H3("Invite someone"), "\n        ", HTML.DIV({
          "class": "control-group"
        }, "\n          ", HTML.LABEL("Email"), "\n          ", HTML.DIV({
          "class": "controls"
        }, "\n            ", Blaze._TemplateWith(function() {
          return {
            name: Spacebars.call("invitedUserEmail")
          };
        }, function() {
          return Spacebars.include(view.lookupTemplate("afFieldInput"));
        }), "\n          "), "\n        "), "\n        ", HTML.DIV({
          "class": "form-actions"
        }, "\n          ", Blaze.If(function() {
          return Spacebars.dataMustache(view.lookup("afFieldIsInvalid"), Spacebars.kw({
            name: "invitedUserEmail"
          }));
        }, function() {
          return "\n            This is not a valid email\n          ";
        }), "\n          ", HTML.INPUT({
          type: "submit",
          "class": "button",
          value: "Invite"
        }), "\n        "), "\n      " ];
      });
    }), "\n    " ];
  }), "\n\n    ", HTML.TABLE("\n      ", HTML.THEAD("\n        ", HTML.TR("\n          ", HTML.TD("Email"), "\n          ", HTML.TD("Accepted"), "\n        "), "\n      "), "\n      ", HTML.TBODY("\n          ", Blaze.Each(function() {
    return Spacebars.call(view.lookup("invites"));
  }, function() {
    return [ "\n          ", HTML.TR("\n            ", HTML.TD(Blaze.View(function() {
      return Spacebars.mustache(view.lookup("invitedUserEmail"));
    })), "\n            ", HTML.TD(Blaze.If(function() {
      return Spacebars.call(view.lookup("accepted"));
    }, function() {
      return HTML.I({
        "class": "icon-check"
      });
    })), "\n          "), "\n          " ];
  }), "\n      "), "\n    "), "\n\n  ");
}));

})();
