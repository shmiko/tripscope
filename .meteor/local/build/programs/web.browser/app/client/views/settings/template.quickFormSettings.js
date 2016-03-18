(function(){
Template.__checkName("quickForm_settings");
Template["quickForm_settings"] = new Template("Template.quickForm_settings", (function() {
  var view = this;
  return Blaze._TemplateWith(function() {
    return Spacebars.call(view.lookup("qfAutoFormContext"));
  }, function() {
    return Spacebars.include(view.lookupTemplate("autoForm"), function() {
      return [ "\n\n    ", Blaze.Each(function() {
        return Spacebars.call(view.lookup("afFieldsets"));
      }, function() {
        return [ "\n      ", HTML.FIELDSET("\n        ", HTML.H3({
          "class": "fieldset-heading"
        }, Blaze.View(function() {
          return Spacebars.mustache(view.lookup("."));
        })), "\n        ", Blaze._TemplateWith(function() {
          return {
            fields: Spacebars.call(view.lookup("fieldsForFieldset")),
            omitFields: Spacebars.call(Spacebars.dot(view.lookup(".."), "atts", "omitFields")),
            template: Spacebars.call("settings"),
            "input-col-class": Spacebars.call(view.lookup("inputClass")),
            "label-class": Spacebars.call(view.lookup("labelClass"))
          };
        }, function() {
          return Spacebars.include(view.lookupTemplate("afQuickFields"));
        }), "\n      "), "\n    " ];
      }), "\n    \n    ", Blaze.If(function() {
        return Spacebars.call(view.lookup("qfShouldRenderButton"));
      }, function() {
        return [ "\n      ", HTML.DIV({
          "class": "form-group"
        }, "\n        ", HTML.DIV({
          "class": function() {
            return Spacebars.mustache(view.lookup("labelClass"));
          }
        }), "\n        ", HTML.DIV({
          "class": function() {
            return Spacebars.mustache(view.lookup("inputClass"));
          }
        }, "\n          ", HTML.BUTTON(HTML.Attrs(function() {
          return Spacebars.attrMustache(view.lookup("submitButtonAtts"));
        }), "\n          ", Spacebars.With(function() {
          return Spacebars.call(Spacebars.dot(view.lookup(".."), "atts", "buttonContent"));
        }, function() {
          return [ "\n            ", Blaze.View(function() {
            return Spacebars.mustache(view.lookup("."));
          }), "\n          " ];
        }, function() {
          return "\n            Submit\n          ";
        }), "\n          "), "\n        "), "\n      "), "\n    " ];
      }), "\n\n  " ];
    });
  });
}));

Template.__checkName("afFormGroup_settings");
Template["afFormGroup_settings"] = new Template("Template.afFormGroup_settings", (function() {
  var view = this;
  return Blaze.If(function() {
    return Spacebars.call(view.lookup("showField"));
  }, function() {
    return [ "\n    ", HTML.DIV({
      "class": function() {
        return [ "form-group ", Blaze.If(function() {
          return Spacebars.dataMustache(view.lookup("afFieldIsInvalid"), Spacebars.kw({
            name: Spacebars.dot(view.lookup("."), "atts", "name")
          }));
        }, function() {
          return "has-error";
        }) ];
      }
    }, "\n      ", HTML.LABEL({
      "class": "control-label"
    }, Blaze.View(function() {
      return Spacebars.mustache(view.lookup("afFieldLabelText"), Spacebars.kw({
        name: Spacebars.dot(view.lookup("."), "atts", "name")
      }));
    })), "\n      ", HTML.DIV({
      "class": function() {
        return Spacebars.mustache(view.lookup("rightColumnClass"));
      }
    }, "\n        ", Blaze._TemplateWith(function() {
      return Spacebars.call(view.lookup("afFieldInputAtts"));
    }, function() {
      return Spacebars.include(view.lookupTemplate("afFieldInput"));
    }), "\n        ", Blaze.If(function() {
      return Spacebars.call(view.lookup("afFieldInstructions"));
    }, function() {
      return [ "\n          ", HTML.SPAN({
        "class": "instructions-block"
      }, Blaze.View(function() {
        return Spacebars.mustache(view.lookup("afFieldInstructions"));
      })), "\n        " ];
    }), "\n        ", HTML.SPAN({
      "class": "help-block"
    }, Blaze.View(function() {
      return Spacebars.makeRaw(Spacebars.mustache(view.lookup("afFieldMessage"), Spacebars.kw({
        name: Spacebars.dot(view.lookup("."), "atts", "name")
      })));
    })), "\n      "), "\n    "), "\n  " ];
  });
}));

Template.__checkName("afObjectField_settings");
Template["afObjectField_settings"] = new Template("Template.afObjectField_settings", (function() {
  var view = this;
  return HTML.DIV({
    "class": function() {
      return [ "form-group ", Blaze.If(function() {
        return Spacebars.dataMustache(view.lookup("afFieldIsInvalid"), Spacebars.kw({
          name: Spacebars.dot(view.lookup("."), "atts", "name")
        }));
      }, function() {
        return "has-error";
      }) ];
    }
  }, "\n    ", HTML.LABEL({
    "class": "control-label"
  }, Blaze.View(function() {
    return Spacebars.mustache(view.lookup("afFieldLabelText"), Spacebars.kw({
      name: Spacebars.dot(view.lookup("."), "atts", "name")
    }));
  })), "\n    ", HTML.DIV({
    "class": function() {
      return Spacebars.mustache(view.lookup("rightColumnClass"));
    }
  }, "\n      ", HTML.DIV({
    "class": "panel panel-default autoform-padding-fix"
  }, "\n        ", HTML.DIV({
    "class": "panel-body"
  }, "\n        ", Blaze._TemplateWith(function() {
    return {
      name: Spacebars.call(Spacebars.dot(view.lookup("."), "atts", "name")),
      fields: Spacebars.call(Spacebars.dot(view.lookup("."), "atts", "fields")),
      omitFields: Spacebars.call(Spacebars.dot(view.lookup("."), "atts", "omitFields")),
      template: Spacebars.call("bootstrap3")
    };
  }, function() {
    return Spacebars.include(view.lookupTemplate("afQuickFields"));
  }), "\n        "), "\n      "), "\n    "), "\n  ");
}));

Template.__checkName("afArrayField_settings");
Template["afArrayField_settings"] = new Template("Template.afArrayField_settings", (function() {
  var view = this;
  return HTML.DIV({
    "class": function() {
      return [ "form-group ", Blaze.If(function() {
        return Spacebars.dataMustache(view.lookup("afFieldIsInvalid"), Spacebars.kw({
          name: Spacebars.dot(view.lookup("."), "atts", "name")
        }));
      }, function() {
        return "has-error";
      }) ];
    }
  }, "\n    ", HTML.LABEL({
    "class": "control-label"
  }, Blaze.View(function() {
    return Spacebars.mustache(view.lookup("afFieldLabelText"), Spacebars.kw({
      name: Spacebars.dot(view.lookup("."), "atts", "name")
    }));
  })), "\n    ", HTML.DIV({
    "class": function() {
      return Spacebars.mustache(view.lookup("rightColumnClass"));
    }
  }, "\n      ", HTML.DIV({
    "class": "panel panel-default autoform-padding-fix"
  }, "\n        ", Blaze.If(function() {
    return Spacebars.dataMustache(view.lookup("afFieldIsInvalid"), Spacebars.kw({
      name: Spacebars.dot(view.lookup("."), "atts", "name")
    }));
  }, function() {
    return [ "\n        ", HTML.DIV({
      "class": "panel-body has-error"
    }, "\n          ", HTML.SPAN({
      "class": "help-block"
    }, Blaze.View(function() {
      return Spacebars.makeRaw(Spacebars.mustache(view.lookup("afFieldMessage"), Spacebars.kw({
        name: Spacebars.dot(view.lookup("."), "atts", "name")
      })));
    })), "\n        "), "\n        " ];
  }), "\n        ", HTML.UL({
    "class": "list-group"
  }, "\n          ", Blaze._TemplateWith(function() {
    return {
      name: Spacebars.call(Spacebars.dot(view.lookup("."), "atts", "name")),
      minCount: Spacebars.call(Spacebars.dot(view.lookup("."), "atts", "minCount")),
      maxCount: Spacebars.call(Spacebars.dot(view.lookup("."), "atts", "maxCount"))
    };
  }, function() {
    return Spacebars.include(view.lookupTemplate("afEachArrayItem"), function() {
      return [ "\n          ", HTML.LI({
        "class": "list-group-item autoform-array-item"
      }, "\n            ", HTML.DIV({
        "class": "media"
      }, "\n              ", Blaze.If(function() {
        return Spacebars.dataMustache(view.lookup("afArrayFieldHasMoreThanMinimum"), Spacebars.kw({
          name: Spacebars.dot(view.lookup(".."), "atts", "name"),
          minCount: Spacebars.dot(view.lookup(".."), "atts", "minCount"),
          maxCount: Spacebars.dot(view.lookup(".."), "atts", "maxCount")
        }));
      }, function() {
        return [ "\n              ", HTML.BUTTON({
          "class": "btn btn-primary autoform-remove-item pull-left"
        }, HTML.SPAN({
          "class": "glyphicon glyphicon-minus"
        })), "\n              " ];
      }), "\n              ", HTML.DIV({
        "class": "media-body"
      }, "\n                ", Blaze._TemplateWith(function() {
        return {
          name: Spacebars.call(Spacebars.dot(view.lookup("."), "name")),
          label: Spacebars.call(false)
        };
      }, function() {
        return Spacebars.include(view.lookupTemplate("afQuickField"));
      }), "\n              "), "\n            "), "\n          "), "\n          " ];
    });
  }), "\n          ", Blaze.If(function() {
    return Spacebars.dataMustache(view.lookup("afArrayFieldHasLessThanMaximum"), Spacebars.kw({
      name: Spacebars.dot(view.lookup("."), "atts", "name"),
      minCount: Spacebars.dot(view.lookup("."), "atts", "minCount"),
      maxCount: Spacebars.dot(view.lookup("."), "atts", "maxCount")
    }));
  }, function() {
    return [ "\n          ", HTML.LI({
      "class": "list-group-item"
    }, "\n            ", HTML.BUTTON({
      "class": "btn btn-primary autoform-add-item",
      "data-autoform-field": function() {
        return Spacebars.mustache(Spacebars.dot(view.lookup("."), "atts", "name"));
      },
      "data-autoform-mincount": function() {
        return Spacebars.mustache(Spacebars.dot(view.lookup("."), "atts", "minCount"));
      },
      "data-autoform-maxcount": function() {
        return Spacebars.mustache(Spacebars.dot(view.lookup("."), "atts", "maxCount"));
      }
    }, HTML.SPAN({
      "class": "glyphicon glyphicon-plus"
    })), "\n          "), "\n          " ];
  }), "\n        "), "\n      "), "\n    "), "\n  ");
}));

Template.__checkName("afCheckbox_settings");
Template["afCheckbox_settings"] = new Template("Template.afCheckbox_settings", (function() {
  var view = this;
  return HTML.DIV({
    "class": "checkbox"
  }, "\n    ", HTML.LABEL("\n      ", HTML.INPUT(HTML.Attrs({
    type: "checkbox",
    value: function() {
      return Spacebars.mustache(Spacebars.dot(view.lookup("."), "value"));
    }
  }, function() {
    return Spacebars.attrMustache(view.lookup("atts"));
  })), "aaaa\n    "), "\n  ");
}));

})();
