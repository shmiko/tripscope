//////////////////////////////////////////////////////////////////////////
//                                                                      //
// This is a generated file. You can view the original                  //
// source in your browser if your browser supports source maps.         //
//                                                                      //
// If you are using Chrome, open the Developer Tools and click the gear //
// icon in its lower right corner. In the General Settings panel, turn  //
// on 'Enable source maps'.                                             //
//                                                                      //
// If you are using Firefox 23, go to `about:config` and set the        //
// `devtools.debugger.source-maps-enabled` preference to true.          //
// (The preference should be on by default in Firefox 24; versions      //
// older than 23 do not support source maps.)                           //
//                                                                      //
//////////////////////////////////////////////////////////////////////////


(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var Template = Package.templating.Template;
var AccountsTemplates = Package['useraccounts:core'].AccountsTemplates;
var Blaze = Package.blaze.Blaze;
var UI = Package.blaze.UI;
var Handlebars = Package.blaze.Handlebars;
var Accounts = Package['accounts-base'].Accounts;
var T9n = Package['softwarerero:accounts-t9n'].T9n;
var Router = Package['iron:router'].Router;
var RouteController = Package['iron:router'].RouteController;
var HTML = Package.htmljs.HTML;
var Iron = Package['iron:core'].Iron;

(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                 //
// packages/useraccounts:unstyled/lib/template.at_error.js                                         //
//                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                   //
                                                                                                   // 1
Template.__checkName("atError");                                                                   // 2
Template["atError"] = new Template("Template.atError", (function() {                               // 3
  var view = this;                                                                                 // 4
  return HTML.DIV({                                                                                // 5
    "class": "at-error"                                                                            // 6
  }, "\n    ", Blaze.Each(function() {                                                             // 7
    return Spacebars.call(view.lookup("error"));                                                   // 8
  }, function() {                                                                                  // 9
    return [ "\n      ", HTML.P(Blaze.View(function() {                                            // 10
      return Spacebars.mustache(view.lookup("errorText"));                                         // 11
    })), "\n    " ];                                                                               // 12
  }), "\n  ");                                                                                     // 13
}));                                                                                               // 14
                                                                                                   // 15
/////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                 //
// packages/useraccounts:unstyled/lib/at_error.js                                                  //
//                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                   //
// Simply 'inherites' helpers from AccountsTemplates                                               // 1
Template.atError.helpers(AccountsTemplates.atErrorHelpers);                                        // 2
/////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                 //
// packages/useraccounts:unstyled/lib/template.at_form.js                                          //
//                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                   //
                                                                                                   // 1
Template.__checkName("atForm");                                                                    // 2
Template["atForm"] = new Template("Template.atForm", (function() {                                 // 3
  var view = this;                                                                                 // 4
  return Blaze.Unless(function() {                                                                 // 5
    return Spacebars.call(view.lookup("hide"));                                                    // 6
  }, function() {                                                                                  // 7
    return [ "\n    ", HTML.DIV({                                                                  // 8
      "class": "at-form"                                                                           // 9
    }, "\n      ", Blaze.If(function() {                                                           // 10
      return Spacebars.call(view.lookup("showTitle"));                                             // 11
    }, function() {                                                                                // 12
      return [ "\n        ", Spacebars.include(view.lookupTemplate("atTitle")), "\n      " ];      // 13
    }), "\n      ", Blaze.If(function() {                                                          // 14
      return Spacebars.call(view.lookup("showOauthServices"));                                     // 15
    }, function() {                                                                                // 16
      return [ "\n        ", Spacebars.include(view.lookupTemplate("atOauth")), "\n      " ];      // 17
    }), "\n      ", Blaze.If(function() {                                                          // 18
      return Spacebars.call(view.lookup("showServicesSeparator"));                                 // 19
    }, function() {                                                                                // 20
      return [ "\n        ", Spacebars.include(view.lookupTemplate("atSep")), "\n      " ];        // 21
    }), "\n      ", Blaze.If(function() {                                                          // 22
      return Spacebars.call(view.lookup("showError"));                                             // 23
    }, function() {                                                                                // 24
      return [ "\n        ", Spacebars.include(view.lookupTemplate("atError")), "\n      " ];      // 25
    }), "\n      ", Blaze.If(function() {                                                          // 26
      return Spacebars.call(view.lookup("showResult"));                                            // 27
    }, function() {                                                                                // 28
      return [ "\n        ", Spacebars.include(view.lookupTemplate("atResult")), "\n      " ];     // 29
    }), "\n      ", Blaze.If(function() {                                                          // 30
      return Spacebars.call(view.lookup("showPwdForm"));                                           // 31
    }, function() {                                                                                // 32
      return [ "\n        ", Spacebars.include(view.lookupTemplate("atPwdForm")), "\n      " ];    // 33
    }), "\n      ", Blaze.If(function() {                                                          // 34
      return Spacebars.call(view.lookup("showSignInLink"));                                        // 35
    }, function() {                                                                                // 36
      return [ "\n        ", Spacebars.include(view.lookupTemplate("atSigninLink")), "\n      " ]; // 37
    }), "\n      ", Blaze.If(function() {                                                          // 38
      return Spacebars.call(view.lookup("showSignUpLink"));                                        // 39
    }, function() {                                                                                // 40
      return [ "\n        ", Spacebars.include(view.lookupTemplate("atSignupLink")), "\n      " ]; // 41
    }), "\n      ", Blaze.If(function() {                                                          // 42
      return Spacebars.call(view.lookup("showTermsLink"));                                         // 43
    }, function() {                                                                                // 44
      return [ "\n        ", Spacebars.include(view.lookupTemplate("atTermsLink")), "\n      " ];  // 45
    }), "\n    "), "\n  " ];                                                                       // 46
  });                                                                                              // 47
}));                                                                                               // 48
                                                                                                   // 49
/////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                 //
// packages/useraccounts:unstyled/lib/at_form.js                                                   //
//                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                   //
// Simply 'inherites' helpers from AccountsTemplates                                               // 1
Template.atForm.helpers(AccountsTemplates.atFormHelpers);                                          // 2
/////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                 //
// packages/useraccounts:unstyled/lib/template.at_input.js                                         //
//                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                   //
                                                                                                   // 1
Template.__checkName("atInput");                                                                   // 2
Template["atInput"] = new Template("Template.atInput", (function() {                               // 3
  var view = this;                                                                                 // 4
  return Blaze._TemplateWith(function() {                                                          // 5
    return {                                                                                       // 6
      template: Spacebars.call(view.lookup("templateName"))                                        // 7
    };                                                                                             // 8
  }, function() {                                                                                  // 9
    return Spacebars.include(function() {                                                          // 10
      return Spacebars.call(Template.__dynamic);                                                   // 11
    });                                                                                            // 12
  });                                                                                              // 13
}));                                                                                               // 14
                                                                                                   // 15
Template.__checkName("atTextInput");                                                               // 16
Template["atTextInput"] = new Template("Template.atTextInput", (function() {                       // 17
  var view = this;                                                                                 // 18
  return HTML.DIV({                                                                                // 19
    "class": function() {                                                                          // 20
      return [ "at-input ", Blaze.If(function() {                                                  // 21
        return Spacebars.call(view.lookup("isValidating"));                                        // 22
      }, function() {                                                                              // 23
        return "validating";                                                                       // 24
      }), " ", Blaze.If(function() {                                                               // 25
        return Spacebars.call(view.lookup("hasError"));                                            // 26
      }, function() {                                                                              // 27
        return "has-error";                                                                        // 28
      }), " ", Blaze.If(function() {                                                               // 29
        return Spacebars.call(view.lookup("hasSuccess"));                                          // 30
      }, function() {                                                                              // 31
        return "has-success";                                                                      // 32
      }), " ", Blaze.If(function() {                                                               // 33
        return Spacebars.call(view.lookup("feedback"));                                            // 34
      }, function() {                                                                              // 35
        return "has-feedback";                                                                     // 36
      }) ];                                                                                        // 37
    }                                                                                              // 38
  }, "\n    ", Blaze.If(function() {                                                               // 39
    return Spacebars.call(view.lookup("showLabels"));                                              // 40
  }, function() {                                                                                  // 41
    return [ "\n      ", HTML.LABEL({                                                              // 42
      "for": function() {                                                                          // 43
        return [ "at-field-", Spacebars.mustache(view.lookup("_id")) ];                            // 44
      }                                                                                            // 45
    }, "\n        ", Blaze.View(function() {                                                       // 46
      return Spacebars.mustache(view.lookup("displayName"));                                       // 47
    }), " ", Blaze.Unless(function() {                                                             // 48
      return Spacebars.call(view.lookup("required"));                                              // 49
    }, function() {                                                                                // 50
      return Blaze.View(function() {                                                               // 51
        return Spacebars.mustache(view.lookup("optionalText"));                                    // 52
      });                                                                                          // 53
    }), "\n      "), "\n    " ];                                                                   // 54
  }), "\n    ", HTML.INPUT({                                                                       // 55
    type: function() {                                                                             // 56
      return Spacebars.mustache(view.lookup("type"));                                              // 57
    },                                                                                             // 58
    id: function() {                                                                               // 59
      return [ "at-field-", Spacebars.mustache(view.lookup("_id")) ];                              // 60
    },                                                                                             // 61
    name: function() {                                                                             // 62
      return [ "at-field-", Spacebars.mustache(view.lookup("_id")) ];                              // 63
    },                                                                                             // 64
    placeholder: function() {                                                                      // 65
      return Spacebars.mustache(view.lookup("placeholder"));                                       // 66
    },                                                                                             // 67
    autocapitalize: "none",                                                                        // 68
    autocorrect: "off"                                                                             // 69
  }), "\n    ", Blaze.If(function() {                                                              // 70
    return Spacebars.call(view.lookup("hasIcon"));                                                 // 71
  }, function() {                                                                                  // 72
    return [ "\n        ", HTML.SPAN({                                                             // 73
      "class": function() {                                                                        // 74
        return Spacebars.mustache(view.lookup("iconClass"));                                       // 75
      }                                                                                            // 76
    }), "\n    " ];                                                                                // 77
  }), "\n    ", Blaze.If(function() {                                                              // 78
    return Spacebars.call(view.lookup("hasError"));                                                // 79
  }, function() {                                                                                  // 80
    return [ "\n      ", HTML.SPAN(Blaze.View(function() {                                         // 81
      return Spacebars.mustache(view.lookup("errorText"));                                         // 82
    })), "\n    " ];                                                                               // 83
  }), "\n  ");                                                                                     // 84
}));                                                                                               // 85
                                                                                                   // 86
Template.__checkName("atCheckboxInput");                                                           // 87
Template["atCheckboxInput"] = new Template("Template.atCheckboxInput", (function() {               // 88
  var view = this;                                                                                 // 89
  return HTML.DIV({                                                                                // 90
    "class": "at-input"                                                                            // 91
  }, "\n      ", HTML.INPUT(HTML.Attrs({                                                           // 92
    type: function() {                                                                             // 93
      return Spacebars.mustache(view.lookup("type"));                                              // 94
    },                                                                                             // 95
    id: function() {                                                                               // 96
      return [ "at-field-", Spacebars.mustache(view.lookup("_id")) ];                              // 97
    },                                                                                             // 98
    name: function() {                                                                             // 99
      return [ "at-field-", Spacebars.mustache(view.lookup("_id")) ];                              // 100
    }                                                                                              // 101
  }, function() {                                                                                  // 102
    return Spacebars.attrMustache(view.lookup("disabled"));                                        // 103
  })), "\n      ", HTML.LABEL({                                                                    // 104
    "for": function() {                                                                            // 105
      return [ "at-field-", Spacebars.mustache(view.lookup("_id")) ];                              // 106
    }                                                                                              // 107
  }, Blaze.View(function() {                                                                       // 108
    return Spacebars.mustache(view.lookup("displayName"));                                         // 109
  })), "\n  ");                                                                                    // 110
}));                                                                                               // 111
                                                                                                   // 112
Template.__checkName("atSelectInput");                                                             // 113
Template["atSelectInput"] = new Template("Template.atSelectInput", (function() {                   // 114
  var view = this;                                                                                 // 115
  return HTML.DIV({                                                                                // 116
    "class": "at-input"                                                                            // 117
  }, "\n    ", HTML.LABEL({                                                                        // 118
    "for": function() {                                                                            // 119
      return [ "at-field-", Spacebars.mustache(view.lookup("_id")) ];                              // 120
    }                                                                                              // 121
  }, Blaze.View(function() {                                                                       // 122
    return Spacebars.mustache(view.lookup("displayName"));                                         // 123
  })), "\n    ", HTML.SELECT({                                                                     // 124
    id: function() {                                                                               // 125
      return [ "at-field-", Spacebars.mustache(view.lookup("_id")) ];                              // 126
    },                                                                                             // 127
    name: function() {                                                                             // 128
      return [ "at-field-", Spacebars.mustache(view.lookup("_id")) ];                              // 129
    }                                                                                              // 130
  }, "\n      ", Blaze.Each(function() {                                                           // 131
    return Spacebars.call(view.lookup("values"));                                                  // 132
  }, function() {                                                                                  // 133
    return [ "\n        ", HTML.OPTION({                                                           // 134
      value: function() {                                                                          // 135
        return Spacebars.mustache(view.lookup("value"));                                           // 136
      }                                                                                            // 137
    }, Blaze.View(function() {                                                                     // 138
      return Spacebars.mustache(view.lookup("text"));                                              // 139
    })), "\n      " ];                                                                             // 140
  }), "\n    "), "\n  ");                                                                          // 141
}));                                                                                               // 142
                                                                                                   // 143
Template.__checkName("atRadioInput");                                                              // 144
Template["atRadioInput"] = new Template("Template.atRadioInput", (function() {                     // 145
  var view = this;                                                                                 // 146
  return [ HTML.DIV({                                                                              // 147
    "class": "at-input"                                                                            // 148
  }, "\n    ", HTML.LABEL(Blaze.View(function() {                                                  // 149
    return Spacebars.mustache(view.lookup("displayName"));                                         // 150
  })), "\n  "), "\n  ", Blaze.Each(function() {                                                    // 151
    return Spacebars.call(view.lookup("values"));                                                  // 152
  }, function() {                                                                                  // 153
    return [ "\n    ", HTML.DIV({                                                                  // 154
      "class": "at-input"                                                                          // 155
    }, "\n      ", HTML.INPUT({                                                                    // 156
      id: function() {                                                                             // 157
        return [ "at-field-", Spacebars.mustache(view.lookup("id")), "-choice-", Spacebars.mustache(view.lookup("value")) ];
      },                                                                                           // 159
      type: "radio",                                                                               // 160
      name: function() {                                                                           // 161
        return [ "at-field-", Spacebars.mustache(view.lookup("id")) ];                             // 162
      },                                                                                           // 163
      value: function() {                                                                          // 164
        return Spacebars.mustache(view.lookup("value"));                                           // 165
      }                                                                                            // 166
    }), "\n      ", HTML.LABEL(Blaze.View(function() {                                             // 167
      return Spacebars.mustache(view.lookup("text"));                                              // 168
    })), "\n    "), "\n  " ];                                                                      // 169
  }) ];                                                                                            // 170
}));                                                                                               // 171
                                                                                                   // 172
Template.__checkName("atHiddenInput");                                                             // 173
Template["atHiddenInput"] = new Template("Template.atHiddenInput", (function() {                   // 174
  var view = this;                                                                                 // 175
  return HTML.INPUT({                                                                              // 176
    type: "hidden",                                                                                // 177
    id: function() {                                                                               // 178
      return [ "at-field-", Spacebars.mustache(view.lookup("_id")) ];                              // 179
    },                                                                                             // 180
    name: function() {                                                                             // 181
      return [ "at-field-", Spacebars.mustache(view.lookup("_id")) ];                              // 182
    }                                                                                              // 183
  });                                                                                              // 184
}));                                                                                               // 185
                                                                                                   // 186
/////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                 //
// packages/useraccounts:unstyled/lib/at_input.js                                                  //
//                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                   //
Template.atInput.rendered = AccountsTemplates.atInputRendered;                                     // 1
                                                                                                   // 2
// Simply 'inherites' helpers from AccountsTemplates                                               // 3
Template.atInput.helpers(AccountsTemplates.atInputHelpers);                                        // 4
                                                                                                   // 5
// Simply 'inherites' events from AccountsTemplates                                                // 6
Template.atInput.events(AccountsTemplates.atInputEvents);                                          // 7
                                                                                                   // 8
// Simply 'inherites' helpers from AccountsTemplates                                               // 9
Template.atTextInput.helpers(AccountsTemplates.atInputHelpers);                                    // 10
                                                                                                   // 11
// Simply 'inherites' helpers from AccountsTemplates                                               // 12
Template.atCheckboxInput.helpers(AccountsTemplates.atInputHelpers);                                // 13
                                                                                                   // 14
// Simply 'inherites' helpers from AccountsTemplates                                               // 15
Template.atSelectInput.helpers(AccountsTemplates.atInputHelpers);                                  // 16
                                                                                                   // 17
// Simply 'inherites' helpers from AccountsTemplates                                               // 18
Template.atRadioInput.helpers(AccountsTemplates.atInputHelpers);                                   // 19
                                                                                                   // 20
// Simply 'inherites' helpers from AccountsTemplates                                               // 21
Template.atHiddenInput.helpers(AccountsTemplates.atInputHelpers);                                  // 22
/////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                 //
// packages/useraccounts:unstyled/lib/template.at_nav_button.js                                    //
//                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                   //
                                                                                                   // 1
Template.__checkName("atNavButton");                                                               // 2
Template["atNavButton"] = new Template("Template.atNavButton", (function() {                       // 3
  var view = this;                                                                                 // 4
  return HTML.A({                                                                                  // 5
    id: "at-nav-button"                                                                            // 6
  }, Blaze.View(function() {                                                                       // 7
    return Spacebars.mustache(view.lookup("text"));                                                // 8
  }));                                                                                             // 9
}));                                                                                               // 10
                                                                                                   // 11
/////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                 //
// packages/useraccounts:unstyled/lib/at_nav_button.js                                             //
//                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                   //
// Simply 'inherites' helpers from AccountsTemplates                                               // 1
Template.atNavButton.helpers(AccountsTemplates.atNavButtonHelpers);                                // 2
                                                                                                   // 3
// Simply 'inherites' events from AccountsTemplates                                                // 4
Template.atNavButton.events(AccountsTemplates.atNavButtonEvents);                                  // 5
/////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                 //
// packages/useraccounts:unstyled/lib/template.at_oauth.js                                         //
//                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                   //
                                                                                                   // 1
Template.__checkName("atOauth");                                                                   // 2
Template["atOauth"] = new Template("Template.atOauth", (function() {                               // 3
  var view = this;                                                                                 // 4
  return HTML.DIV({                                                                                // 5
    "class": "at-oauth"                                                                            // 6
  }, "\n    ", Blaze.Each(function() {                                                             // 7
    return Spacebars.call(view.lookup("oauthService"));                                            // 8
  }, function() {                                                                                  // 9
    return [ "\n      ", Spacebars.include(view.lookupTemplate("atSocial")), "\n    " ];           // 10
  }), "\n  ");                                                                                     // 11
}));                                                                                               // 12
                                                                                                   // 13
/////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                 //
// packages/useraccounts:unstyled/lib/at_oauth.js                                                  //
//                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                   //
// Simply 'inherites' helpers from AccountsTemplates                                               // 1
Template.atOauth.helpers(AccountsTemplates.atOauthHelpers);                                        // 2
/////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                 //
// packages/useraccounts:unstyled/lib/template.at_pwd_form.js                                      //
//                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                   //
                                                                                                   // 1
Template.__checkName("atPwdForm");                                                                 // 2
Template["atPwdForm"] = new Template("Template.atPwdForm", (function() {                           // 3
  var view = this;                                                                                 // 4
  return HTML.DIV({                                                                                // 5
    "class": "at-pwd-form"                                                                         // 6
  }, "\n    ", HTML.FORM({                                                                         // 7
    role: "form",                                                                                  // 8
    id: "at-pwd-form",                                                                             // 9
    "class": function() {                                                                          // 10
      return Spacebars.mustache(view.lookup("disabled"));                                          // 11
    },                                                                                             // 12
    novalidate: "",                                                                                // 13
    action: "#",                                                                                   // 14
    method: "POST"                                                                                 // 15
  }, "\n      ", Blaze.Each(function() {                                                           // 16
    return Spacebars.call(view.lookup("fields"));                                                  // 17
  }, function() {                                                                                  // 18
    return [ "\n        ", Spacebars.include(view.lookupTemplate("atInput")), "\n      " ];        // 19
  }), "\n      ", Blaze.If(function() {                                                            // 20
    return Spacebars.call(view.lookup("showForgotPasswordLink"));                                  // 21
  }, function() {                                                                                  // 22
    return [ "\n        ", Spacebars.include(view.lookupTemplate("atPwdLink")), "\n      " ];      // 23
  }), "\n      ", Spacebars.include(view.lookupTemplate("atPwdFormBtn")), "\n    "), "\n  ");      // 24
}));                                                                                               // 25
                                                                                                   // 26
/////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                 //
// packages/useraccounts:unstyled/lib/at_pwd_form.js                                               //
//                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                   //
// Simply 'inherites' helpers from AccountsTemplates                                               // 1
Template.atPwdForm.helpers(AccountsTemplates.atPwdFormHelpers);                                    // 2
                                                                                                   // 3
// Simply 'inherites' events from AccountsTemplates                                                // 4
Template.atPwdForm.events(AccountsTemplates.atPwdFormEvents);                                      // 5
/////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                 //
// packages/useraccounts:unstyled/lib/template.at_pwd_form_btn.js                                  //
//                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                   //
                                                                                                   // 1
Template.__checkName("atPwdFormBtn");                                                              // 2
Template["atPwdFormBtn"] = new Template("Template.atPwdFormBtn", (function() {                     // 3
  var view = this;                                                                                 // 4
  return HTML.BUTTON({                                                                             // 5
    type: "submit",                                                                                // 6
    "class": function() {                                                                          // 7
      return [ "at-btn submit ", Spacebars.mustache(view.lookup("submitDisabled")) ];              // 8
    },                                                                                             // 9
    id: "at-btn"                                                                                   // 10
  }, "\n    ", Blaze.View(function() {                                                             // 11
    return Spacebars.mustache(view.lookup("buttonText"));                                          // 12
  }), "\n  ");                                                                                     // 13
}));                                                                                               // 14
                                                                                                   // 15
/////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                 //
// packages/useraccounts:unstyled/lib/at_pwd_form_btn.js                                           //
//                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                   //
// Simply 'inherites' helpers from AccountsTemplates                                               // 1
Template.atPwdFormBtn.helpers(AccountsTemplates.atPwdFormBtnHelpers);                              // 2
/////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                 //
// packages/useraccounts:unstyled/lib/template.at_pwd_link.js                                      //
//                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                   //
                                                                                                   // 1
Template.__checkName("atPwdLink");                                                                 // 2
Template["atPwdLink"] = new Template("Template.atPwdLink", (function() {                           // 3
  var view = this;                                                                                 // 4
  return HTML.DIV({                                                                                // 5
    "class": "at-pwd-link"                                                                         // 6
  }, "\n    ", HTML.P("\n      ", Blaze.View(function() {                                          // 7
    return Spacebars.mustache(view.lookup("preText"));                                             // 8
  }), "\n      ", HTML.A({                                                                         // 9
    href: function() {                                                                             // 10
      return Spacebars.mustache(view.lookup("forgotPwdLink"));                                     // 11
    },                                                                                             // 12
    id: "at-forgotPwd",                                                                            // 13
    "class": function() {                                                                          // 14
      return [ "at-link at-pwd ", Spacebars.mustache(view.lookup("disabled")) ];                   // 15
    }                                                                                              // 16
  }, Blaze.View(function() {                                                                       // 17
    return Spacebars.mustache(view.lookup("linkText"));                                            // 18
  })), "\n      ", Blaze.View(function() {                                                         // 19
    return Spacebars.mustache(view.lookup("suffText"));                                            // 20
  }), "\n    "), "\n  ");                                                                          // 21
}));                                                                                               // 22
                                                                                                   // 23
/////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                 //
// packages/useraccounts:unstyled/lib/at_pwd_link.js                                               //
//                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                   //
// Simply 'inherites' helpers from AccountsTemplates                                               // 1
Template.atPwdLink.helpers(AccountsTemplates.atPwdLinkHelpers);                                    // 2
                                                                                                   // 3
// Simply 'inherites' events from AccountsTemplates                                                // 4
Template.atPwdLink.events(AccountsTemplates.atPwdLinkEvents);                                      // 5
/////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                 //
// packages/useraccounts:unstyled/lib/template.at_result.js                                        //
//                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                   //
                                                                                                   // 1
Template.__checkName("atResult");                                                                  // 2
Template["atResult"] = new Template("Template.atResult", (function() {                             // 3
  var view = this;                                                                                 // 4
  return HTML.DIV({                                                                                // 5
    "class": "at-result"                                                                           // 6
  }, "\n    ", Blaze.View(function() {                                                             // 7
    return Spacebars.mustache(view.lookup("result"));                                              // 8
  }), "\n  ");                                                                                     // 9
}));                                                                                               // 10
                                                                                                   // 11
/////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                 //
// packages/useraccounts:unstyled/lib/at_result.js                                                 //
//                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                   //
// Simply 'inherites' helpers from AccountsTemplates                                               // 1
Template.atResult.helpers(AccountsTemplates.atResultHelpers);                                      // 2
/////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                 //
// packages/useraccounts:unstyled/lib/template.at_sep.js                                           //
//                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                   //
                                                                                                   // 1
Template.__checkName("atSep");                                                                     // 2
Template["atSep"] = new Template("Template.atSep", (function() {                                   // 3
  var view = this;                                                                                 // 4
  return HTML.DIV({                                                                                // 5
    "class": "at-sep"                                                                              // 6
  }, "\n    ", HTML.STRONG(Blaze.View(function() {                                                 // 7
    return Spacebars.mustache(view.lookup("sepText"));                                             // 8
  })), "\n  ");                                                                                    // 9
}));                                                                                               // 10
                                                                                                   // 11
/////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                 //
// packages/useraccounts:unstyled/lib/at_sep.js                                                    //
//                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                   //
// Simply 'inherites' helpers from AccountsTemplates                                               // 1
Template.atSep.helpers(AccountsTemplates.atSepHelpers);                                            // 2
/////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                 //
// packages/useraccounts:unstyled/lib/template.at_signin_link.js                                   //
//                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                   //
                                                                                                   // 1
Template.__checkName("atSigninLink");                                                              // 2
Template["atSigninLink"] = new Template("Template.atSigninLink", (function() {                     // 3
  var view = this;                                                                                 // 4
  return HTML.DIV({                                                                                // 5
    "class": "at-signin-link"                                                                      // 6
  }, "\n    ", HTML.P("\n      ", Blaze.View(function() {                                          // 7
    return Spacebars.mustache(view.lookup("preText"));                                             // 8
  }), "\n      ", HTML.A({                                                                         // 9
    href: function() {                                                                             // 10
      return Spacebars.mustache(view.lookup("signInLink"));                                        // 11
    },                                                                                             // 12
    id: "at-signIn",                                                                               // 13
    "class": function() {                                                                          // 14
      return [ "at-link at-signin ", Spacebars.mustache(view.lookup("disabled")) ];                // 15
    }                                                                                              // 16
  }, Blaze.View(function() {                                                                       // 17
    return Spacebars.mustache(view.lookup("linkText"));                                            // 18
  })), "\n      ", Blaze.View(function() {                                                         // 19
    return Spacebars.mustache(view.lookup("suffText"));                                            // 20
  }), "\n    "), "\n  ");                                                                          // 21
}));                                                                                               // 22
                                                                                                   // 23
/////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                 //
// packages/useraccounts:unstyled/lib/at_signin_link.js                                            //
//                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                   //
// Simply 'inherites' helpers from AccountsTemplates                                               // 1
Template.atSigninLink.helpers(AccountsTemplates.atSigninLinkHelpers);                              // 2
                                                                                                   // 3
// Simply 'inherites' events from AccountsTemplates                                                // 4
Template.atSigninLink.events(AccountsTemplates.atSigninLinkEvents);                                // 5
/////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                 //
// packages/useraccounts:unstyled/lib/template.at_signup_link.js                                   //
//                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                   //
                                                                                                   // 1
Template.__checkName("atSignupLink");                                                              // 2
Template["atSignupLink"] = new Template("Template.atSignupLink", (function() {                     // 3
  var view = this;                                                                                 // 4
  return HTML.DIV({                                                                                // 5
    "class": "at-signup-link"                                                                      // 6
  }, "\n    ", HTML.P("\n      ", Blaze.View(function() {                                          // 7
    return Spacebars.mustache(view.lookup("preText"));                                             // 8
  }), "\n      ", HTML.A({                                                                         // 9
    href: function() {                                                                             // 10
      return Spacebars.mustache(view.lookup("signUpLink"));                                        // 11
    },                                                                                             // 12
    id: "at-signUp",                                                                               // 13
    "class": function() {                                                                          // 14
      return [ "at-link at-signup ", Spacebars.mustache(view.lookup("disabled")) ];                // 15
    }                                                                                              // 16
  }, Blaze.View(function() {                                                                       // 17
    return Spacebars.mustache(view.lookup("linkText"));                                            // 18
  })), "\n      ", Blaze.View(function() {                                                         // 19
    return Spacebars.mustache(view.lookup("suffText"));                                            // 20
  }), "\n    "), "\n  ");                                                                          // 21
}));                                                                                               // 22
                                                                                                   // 23
/////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                 //
// packages/useraccounts:unstyled/lib/at_signup_link.js                                            //
//                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                   //
// Simply 'inherites' helpers from AccountsTemplates                                               // 1
Template.atSignupLink.helpers(AccountsTemplates.atSignupLinkHelpers);                              // 2
                                                                                                   // 3
// Simply 'inherites' events from AccountsTemplates                                                // 4
Template.atSignupLink.events(AccountsTemplates.atSignupLinkEvents);                                // 5
/////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                 //
// packages/useraccounts:unstyled/lib/template.at_social.js                                        //
//                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                   //
                                                                                                   // 1
Template.__checkName("atSocial");                                                                  // 2
Template["atSocial"] = new Template("Template.atSocial", (function() {                             // 3
  var view = this;                                                                                 // 4
  return HTML.BUTTON({                                                                             // 5
    "class": function() {                                                                          // 6
      return [ "at-social-btn ", Spacebars.mustache(view.lookup("disabled")) ];                    // 7
    },                                                                                             // 8
    id: function() {                                                                               // 9
      return [ "at-", Spacebars.mustache(view.lookup("name")) ];                                   // 10
    },                                                                                             // 11
    name: function() {                                                                             // 12
      return Spacebars.mustache(view.lookup("name"));                                              // 13
    }                                                                                              // 14
  }, "\n    ", HTML.I({                                                                            // 15
    "class": function() {                                                                          // 16
      return Spacebars.mustache(view.lookup("iconClass"));                                         // 17
    }                                                                                              // 18
  }), " ", Blaze.View(function() {                                                                 // 19
    return Spacebars.mustache(view.lookup("buttonText"));                                          // 20
  }), "\n  ");                                                                                     // 21
}));                                                                                               // 22
                                                                                                   // 23
/////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                 //
// packages/useraccounts:unstyled/lib/at_social.js                                                 //
//                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                   //
// Simply 'inherites' helpers from AccountsTemplates                                               // 1
Template.atSocial.helpers(AccountsTemplates.atSocialHelpers);                                      // 2
                                                                                                   // 3
// Simply 'inherites' events from AccountsTemplates                                                // 4
Template.atSocial.events(AccountsTemplates.atSocialEvents);                                        // 5
/////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                 //
// packages/useraccounts:unstyled/lib/template.at_terms_link.js                                    //
//                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                   //
                                                                                                   // 1
Template.__checkName("atTermsLink");                                                               // 2
Template["atTermsLink"] = new Template("Template.atTermsLink", (function() {                       // 3
  var view = this;                                                                                 // 4
  return HTML.DIV({                                                                                // 5
    "class": "at-terms-link"                                                                       // 6
  }, "\n    ", HTML.P("\n      ", Blaze.View(function() {                                          // 7
    return Spacebars.mustache(view.lookup("text"));                                                // 8
  }), "\n      ", Blaze.If(function() {                                                            // 9
    return Spacebars.call(view.lookup("privacyUrl"));                                              // 10
  }, function() {                                                                                  // 11
    return [ "\n        ", HTML.A({                                                                // 12
      href: function() {                                                                           // 13
        return Spacebars.mustache(view.lookup("privacyUrl"));                                      // 14
      },                                                                                           // 15
      "class": function() {                                                                        // 16
        return Spacebars.mustache(view.lookup("disabled"));                                        // 17
      }                                                                                            // 18
    }, Blaze.View(function() {                                                                     // 19
      return Spacebars.mustache(view.lookup("privacyLinkText"));                                   // 20
    })), "\n      " ];                                                                             // 21
  }), "\n      ", Blaze.If(function() {                                                            // 22
    return Spacebars.call(view.lookup("showTermsAnd"));                                            // 23
  }, function() {                                                                                  // 24
    return [ "\n        ", Blaze.View(function() {                                                 // 25
      return Spacebars.mustache(view.lookup("and"));                                               // 26
    }), "\n      " ];                                                                              // 27
  }), "\n      ", Blaze.If(function() {                                                            // 28
    return Spacebars.call(view.lookup("termsUrl"));                                                // 29
  }, function() {                                                                                  // 30
    return [ "\n        ", HTML.A({                                                                // 31
      href: function() {                                                                           // 32
        return Spacebars.mustache(view.lookup("termsUrl"));                                        // 33
      },                                                                                           // 34
      "class": function() {                                                                        // 35
        return Spacebars.mustache(view.lookup("disabled"));                                        // 36
      }                                                                                            // 37
    }, Blaze.View(function() {                                                                     // 38
      return Spacebars.mustache(view.lookup("termsLinkText"));                                     // 39
    })), "\n      " ];                                                                             // 40
  }), "\n    "), "\n  ");                                                                          // 41
}));                                                                                               // 42
                                                                                                   // 43
/////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                 //
// packages/useraccounts:unstyled/lib/at_terms_link.js                                             //
//                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                   //
// Simply 'inherites' helpers from AccountsTemplates                                               // 1
Template.atTermsLink.helpers(AccountsTemplates.atTermsLinkHelpers);                                // 2
                                                                                                   // 3
// Simply 'inherites' events from AccountsTemplates                                                // 4
Template.atTermsLink.events(AccountsTemplates.atTermsLinkEvents);                                  // 5
/////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                 //
// packages/useraccounts:unstyled/lib/template.at_title.js                                         //
//                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                   //
                                                                                                   // 1
Template.__checkName("atTitle");                                                                   // 2
Template["atTitle"] = new Template("Template.atTitle", (function() {                               // 3
  var view = this;                                                                                 // 4
  return HTML.DIV({                                                                                // 5
    "class": "at-title"                                                                            // 6
  }, "\n    ", HTML.H3(Blaze.View(function() {                                                     // 7
    return Spacebars.mustache(view.lookup("title"));                                               // 8
  })), "\n  ");                                                                                    // 9
}));                                                                                               // 10
                                                                                                   // 11
/////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                 //
// packages/useraccounts:unstyled/lib/at_title.js                                                  //
//                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                   //
// Simply 'inherites' helpers from AccountsTemplates                                               // 1
Template.atTitle.helpers(AccountsTemplates.atTitleHelpers);                                        // 2
/////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                 //
// packages/useraccounts:unstyled/lib/template.full_page_at_form.js                                //
//                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                   //
                                                                                                   // 1
Template.__checkName("fullPageAtForm");                                                            // 2
Template["fullPageAtForm"] = new Template("Template.fullPageAtForm", (function() {                 // 3
  var view = this;                                                                                 // 4
  return Spacebars.include(view.lookupTemplate("atForm"));                                         // 5
}));                                                                                               // 6
                                                                                                   // 7
/////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['useraccounts:unstyled'] = {};

})();
