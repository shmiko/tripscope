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
var Accounts = Package['accounts-base'].Accounts;
var check = Package.check.check;
var Match = Package.check.Match;
var _ = Package.underscore._;
var Router = Package['iron:router'].Router;
var RouteController = Package['iron:router'].RouteController;
var ReactiveVar = Package['reactive-var'].ReactiveVar;
var Blaze = Package.blaze.Blaze;
var UI = Package.blaze.UI;
var Handlebars = Package.blaze.Handlebars;
var ReactiveDict = Package['reactive-dict'].ReactiveDict;
var SHA256 = Package.sha.SHA256;
var Iron = Package['iron:core'].Iron;
var HTML = Package.htmljs.HTML;

/* Package-scope variables */
var AccountsTemplates, capitalize, signedInAs, Field, STATE_PAT, ERRORS_PAT, INFO_PAT, INPUT_ICONS_PAT, ObjWithStringValues, TEXTS_PAT, CONFIG_PAT, FIELD_SUB_PAT, FIELD_PAT, AT, form, markIfMissing, options;

(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages/useraccounts:core/lib/utils.js                                                                          //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
capitalize = function(str) {                                                                                        // 1
    return str.charAt(0).toUpperCase() + str.slice(1);                                                              // 2
};                                                                                                                  // 3
                                                                                                                    // 4
signedInAs =  function() {                                                                                          // 5
    var user = Meteor.user();                                                                                       // 6
    if (user) {                                                                                                     // 7
        if (user.username) {                                                                                        // 8
            return user.username;                                                                                   // 9
        } else if (user.profile && user.profile.name) {                                                             // 10
            return user.profile.name;                                                                               // 11
        } else if (user.emails && user.emails[0]) {                                                                 // 12
            return user.emails[0].address;                                                                          // 13
        } else {                                                                                                    // 14
            return "Signed In";                                                                                     // 15
        }                                                                                                           // 16
    }                                                                                                               // 17
};                                                                                                                  // 18
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages/useraccounts:core/lib/field.js                                                                          //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
// ---------------------------------------------------------------------------------                                // 1
                                                                                                                    // 2
// Field object                                                                                                     // 3
                                                                                                                    // 4
// ---------------------------------------------------------------------------------                                // 5
                                                                                                                    // 6
                                                                                                                    // 7
Field = function(field){                                                                                            // 8
    check(field, FIELD_PAT);                                                                                        // 9
    _.defaults(this, field);                                                                                        // 10
                                                                                                                    // 11
    this.validating = new ReactiveVar(false);                                                                       // 12
    this.status = new ReactiveVar(null);                                                                            // 13
};                                                                                                                  // 14
                                                                                                                    // 15
if (Meteor.isClient)                                                                                                // 16
    Field.prototype.clearStatus = function(){                                                                       // 17
        return this.status.set(null);                                                                               // 18
    };                                                                                                              // 19
if (Meteor.isServer)                                                                                                // 20
    Field.prototype.clearStatus = function(){                                                                       // 21
        // Nothing to do server-side                                                                                // 22
        return                                                                                                      // 23
    };                                                                                                              // 24
                                                                                                                    // 25
Field.prototype.fixValue = function(value){                                                                         // 26
    if (this.type === "checkbox")                                                                                   // 27
        return !!value;                                                                                             // 28
    if (this.type === "select")                                                                                     // 29
        // TODO: something working...                                                                               // 30
        return value;                                                                                               // 31
    if (this.type === "radio")                                                                                      // 32
        // TODO: something working...                                                                               // 33
        return value;                                                                                               // 34
    // Possibly applies required transformations to the input value                                                 // 35
    if (this.trim)                                                                                                  // 36
        value = value.trim();                                                                                       // 37
    if (this.lowercase)                                                                                             // 38
        value = value.toLowerCase();                                                                                // 39
    if (this.uppercase)                                                                                             // 40
        value = value.toUpperCase();                                                                                // 41
    return value;                                                                                                   // 42
};                                                                                                                  // 43
                                                                                                                    // 44
if (Meteor.isClient)                                                                                                // 45
    Field.prototype.getDisplayName = function(state){                                                               // 46
        var dN = this.displayName;                                                                                  // 47
        if (_.isObject(dN))                                                                                         // 48
            dN = dN[state] || dN.default;                                                                           // 49
        if (!dN)                                                                                                    // 50
            dN = this._id;                                                                                          // 51
        return dN;                                                                                                  // 52
    };                                                                                                              // 53
                                                                                                                    // 54
if (Meteor.isClient)                                                                                                // 55
    Field.prototype.getPlaceholder = function(state){                                                               // 56
        var placeholder = this.placeholder;                                                                         // 57
        if (_.isObject(placeholder))                                                                                // 58
            placeholder = placeholder[state] || placeholder.default;                                                // 59
        if (!placeholder)                                                                                           // 60
            placeholder = this._id;                                                                                 // 61
        return placeholder;                                                                                         // 62
    };                                                                                                              // 63
                                                                                                                    // 64
Field.prototype.getStatus = function(){                                                                             // 65
    return this.status.get();                                                                                       // 66
};                                                                                                                  // 67
                                                                                                                    // 68
if (Meteor.isClient)                                                                                                // 69
    Field.prototype.getValue = function(tempalteInstance){                                                          // 70
        if (this.type === "checkbox")                                                                               // 71
            return !!(tempalteInstance.$("#at-field-" + this._id + ":checked").val());                              // 72
        if (this.type === "radio")                                                                                  // 73
            return tempalteInstance.$("[name=at-field-"+ this._id + "]:checked").val();                             // 74
        return tempalteInstance.$("#at-field-" + this._id).val();                                                   // 75
    };                                                                                                              // 76
                                                                                                                    // 77
if (Meteor.isClient)                                                                                                // 78
    Field.prototype.hasError = function() {                                                                         // 79
        return this.negativeValidation && this.status.get();                                                        // 80
    };                                                                                                              // 81
                                                                                                                    // 82
if (Meteor.isClient)                                                                                                // 83
    Field.prototype.hasIcon = function(){                                                                           // 84
        if (this.showValidating && this.isValidating())                                                             // 85
            return true;                                                                                            // 86
        if (this.negativeFeedback && this.hasError())                                                               // 87
            return true;                                                                                            // 88
        if (this.positiveFeedback && this.hasSuccess())                                                             // 89
            return true;                                                                                            // 90
    };                                                                                                              // 91
                                                                                                                    // 92
if (Meteor.isClient)                                                                                                // 93
    Field.prototype.hasSuccess = function() {                                                                       // 94
        return this.positiveValidation && this.status.get() === false;                                              // 95
    };                                                                                                              // 96
                                                                                                                    // 97
if (Meteor.isClient)                                                                                                // 98
    Field.prototype.iconClass = function(){                                                                         // 99
        if (this.isValidating())                                                                                    // 100
            return AccountsTemplates.texts.inputIcons["isValidating"];                                              // 101
        if (this.hasError())                                                                                        // 102
            return AccountsTemplates.texts.inputIcons["hasError"];                                                  // 103
        if (this.hasSuccess())                                                                                      // 104
            return AccountsTemplates.texts.inputIcons["hasSuccess"];                                                // 105
    };                                                                                                              // 106
                                                                                                                    // 107
if (Meteor.isClient)                                                                                                // 108
    Field.prototype.isValidating = function(){                                                                      // 109
        return this.validating.get();                                                                               // 110
    };                                                                                                              // 111
                                                                                                                    // 112
if (Meteor.isClient)                                                                                                // 113
    Field.prototype.setError = function(err){                                                                       // 114
        check(err, Match.OneOf(String, undefined));                                                                 // 115
        console.log(this._id + " setErr: " + err || true);                                                          // 116
        return this.status.set(err || true);                                                                        // 117
    };                                                                                                              // 118
if (Meteor.isServer)                                                                                                // 119
    Field.prototype.setError = function(err){                                                                       // 120
        // Nothing to do server-side                                                                                // 121
        return                                                                                                      // 122
    };                                                                                                              // 123
                                                                                                                    // 124
if (Meteor.isClient)                                                                                                // 125
    Field.prototype.setSuccess = function(){                                                                        // 126
        return this.status.set(false);                                                                              // 127
    };                                                                                                              // 128
if (Meteor.isServer)                                                                                                // 129
    Field.prototype.setSuccess = function(){                                                                        // 130
        // Nothing to do server-side                                                                                // 131
        return                                                                                                      // 132
    };                                                                                                              // 133
                                                                                                                    // 134
                                                                                                                    // 135
if (Meteor.isClient)                                                                                                // 136
    Field.prototype.setValidating = function(state){                                                                // 137
        check(state, Boolean);                                                                                      // 138
        return this.validating.set(state);                                                                          // 139
    };                                                                                                              // 140
if (Meteor.isServer)                                                                                                // 141
    Field.prototype.setValidating = function(state){                                                                // 142
        // Nothing to do server-side                                                                                // 143
        return                                                                                                      // 144
    };                                                                                                              // 145
                                                                                                                    // 146
if (Meteor.isClient)                                                                                                // 147
    Field.prototype.setValue = function(tempalteInstance, value){                                                   // 148
        if (this.type === "checkbox") {                                                                             // 149
            tempalteInstance.$("#at-field-" + this._id).prop('checked', true);                                      // 150
            return;                                                                                                 // 151
        }                                                                                                           // 152
        if (this.type === "radio") {                                                                                // 153
            tempalteInstance.$("[name=at-field-"+ this._id + "]").prop('checked', true);                            // 154
            return;                                                                                                 // 155
        }                                                                                                           // 156
        tempalteInstance.$("#at-field-" + this._id).val(value);                                                     // 157
    };                                                                                                              // 158
                                                                                                                    // 159
Field.prototype.validate = function(value, strict) {                                                                // 160
    check(value, Match.OneOf(undefined, String, Boolean));                                                          // 161
    this.setValidating(true);                                                                                       // 162
    this.clearStatus();                                                                                             // 163
    if (!value){                                                                                                    // 164
        if (!!strict){                                                                                              // 165
            if (this.required) {                                                                                    // 166
                this.setError("Required Field");                                                                    // 167
                this.setValidating(false);                                                                          // 168
                return "Required Field";                                                                            // 169
            }                                                                                                       // 170
            else {                                                                                                  // 171
                this.setSuccess();                                                                                  // 172
                this.setValidating(false);                                                                          // 173
                return false;                                                                                       // 174
            }                                                                                                       // 175
        }                                                                                                           // 176
        else {                                                                                                      // 177
            this.clearStatus();                                                                                     // 178
            this.setValidating(false);                                                                              // 179
            return null;                                                                                            // 180
        }                                                                                                           // 181
    }                                                                                                               // 182
    var valueLength = value.length;                                                                                 // 183
    var minLength = this.minLength;                                                                                 // 184
    if (minLength && valueLength < minLength) {                                                                     // 185
        this.setError("Minimum required length: " + minLength);                                                     // 186
        this.setValidating(false);                                                                                  // 187
        return "Minimum required length: " + minLength;                                                             // 188
    }                                                                                                               // 189
    var maxLength = this.maxLength;                                                                                 // 190
    if (maxLength && valueLength > maxLength) {                                                                     // 191
        this.setError("Maximum allowed length: " + maxLength);                                                      // 192
        this.setValidating(false);                                                                                  // 193
        return "Maximum allowed length: " + maxLength;                                                              // 194
    }                                                                                                               // 195
    if (this.re && valueLength && !value.match(this.re)) {                                                          // 196
        this.setError(this.errStr);                                                                                 // 197
        this.setValidating(false);                                                                                  // 198
        return this.errStr;                                                                                         // 199
    }                                                                                                               // 200
    if (this.func && valueLength){                                                                                  // 201
        var result = this.func(value);                                                                              // 202
        return result === true ? this.errStr || true : result;                                                      // 203
    }                                                                                                               // 204
    this.setSuccess();                                                                                              // 205
    this.setValidating(false);                                                                                      // 206
    return false;                                                                                                   // 207
};                                                                                                                  // 208
                                                                                                                    // 209
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages/useraccounts:core/lib/core.js                                                                           //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
// ---------------------------------------------------------------------------------                                // 1
                                                                                                                    // 2
// Patterns for methods" parameters                                                                                 // 3
                                                                                                                    // 4
// ---------------------------------------------------------------------------------                                // 5
                                                                                                                    // 6
STATE_PAT = {                                                                                                       // 7
    changePwd: Match.Optional(String),                                                                              // 8
    enrollAccount: Match.Optional(String),                                                                          // 9
    forgotPwd: Match.Optional(String),                                                                              // 10
    resetPwd: Match.Optional(String),                                                                               // 11
    signIn: Match.Optional(String),                                                                                 // 12
    signUp: Match.Optional(String),                                                                                 // 13
};                                                                                                                  // 14
                                                                                                                    // 15
ERRORS_PAT = {                                                                                                      // 16
    mustBeLoggedIn: Match.Optional(String),                                                                         // 17
    pwdMismatch: Match.Optional(String),                                                                            // 18
};                                                                                                                  // 19
                                                                                                                    // 20
INFO_PAT = {                                                                                                        // 21
    emailSent: Match.Optional(String),                                                                              // 22
    emailVerified: Match.Optional(String),                                                                          // 23
    pwdReset: Match.Optional(String),                                                                               // 24
    pwdChanged: Match.Optional(String),                                                                             // 25
    singUpVerifyEmail: Match.Optional(String),                                                                      // 26
};                                                                                                                  // 27
                                                                                                                    // 28
INPUT_ICONS_PAT = {                                                                                                 // 29
    isValidating: Match.Optional(String),                                                                           // 30
    hasError: Match.Optional(String),                                                                               // 31
    hasSuccess: Match.Optional(String),                                                                             // 32
};                                                                                                                  // 33
                                                                                                                    // 34
ObjWithStringValues = Match.Where(function (x) {                                                                    // 35
    check(x, Object);                                                                                               // 36
    _.each(_.values(x), function(value){                                                                            // 37
        check(value, String);                                                                                       // 38
    });                                                                                                             // 39
    return true;                                                                                                    // 40
});                                                                                                                 // 41
                                                                                                                    // 42
TEXTS_PAT = {                                                                                                       // 43
    button: Match.Optional(STATE_PAT),                                                                              // 44
    errors: Match.Optional(ERRORS_PAT),                                                                             // 45
    navSignIn: Match.Optional(String),                                                                              // 46
    navSignOut: Match.Optional(String),                                                                             // 47
    info: Match.Optional(INFO_PAT),                                                                                 // 48
    inputIcons: Match.Optional(INPUT_ICONS_PAT),                                                                    // 49
    optionalField: Match.Optional(String),                                                                          // 50
    pwdLink_pre: Match.Optional(String),                                                                            // 51
    pwdLink_link: Match.Optional(String),                                                                           // 52
    pwdLink_suff: Match.Optional(String),                                                                           // 53
    sep: Match.Optional(String),                                                                                    // 54
    signInLink_pre: Match.Optional(String),                                                                         // 55
    signInLink_link: Match.Optional(String),                                                                        // 56
    signInLink_suff: Match.Optional(String),                                                                        // 57
    signUpLink_pre: Match.Optional(String),                                                                         // 58
    signUpLink_link: Match.Optional(String),                                                                        // 59
    signUpLink_suff: Match.Optional(String),                                                                        // 60
    socialAdd: Match.Optional(String),                                                                              // 61
    socialConfigure: Match.Optional(String),                                                                        // 62
    socialIcons: Match.Optional(ObjWithStringValues),                                                               // 63
    socialRemove: Match.Optional(String),                                                                           // 64
    socialSignIn: Match.Optional(String),                                                                           // 65
    socialSignUp: Match.Optional(String),                                                                           // 66
    socialWith: Match.Optional(String),                                                                             // 67
    termsPreamble: Match.Optional(String),                                                                          // 68
    termsPrivacy: Match.Optional(String),                                                                           // 69
    termsAnd: Match.Optional(String),                                                                               // 70
    termsTerms: Match.Optional(String),                                                                             // 71
    title: Match.Optional(STATE_PAT),                                                                               // 72
};                                                                                                                  // 73
                                                                                                                    // 74
// Configuration pattern to be checked with check                                                                   // 75
CONFIG_PAT = {                                                                                                      // 76
    // Behaviour                                                                                                    // 77
    confirmPassword: Match.Optional(Boolean),                                                                       // 78
    defaultState: Match.Optional(String),                                                                           // 79
    enablePasswordChange: Match.Optional(Boolean),                                                                  // 80
    enforceEmailVerification: Match.Optional(Boolean),                                                              // 81
    forbidClientAccountCreation: Match.Optional(Boolean),                                                           // 82
    overrideLoginErrors: Match.Optional(Boolean),                                                                   // 83
    sendVerificationEmail: Match.Optional(Boolean),                                                                 // 84
                                                                                                                    // 85
    // Appearance                                                                                                   // 86
    defaultLayout: Match.Optional(String),                                                                          // 87
    showAddRemoveServices: Match.Optional(Boolean),                                                                 // 88
    showForgotPasswordLink: Match.Optional(Boolean),                                                                // 89
    showLabels: Match.Optional(Boolean),                                                                            // 90
    showPlaceholders: Match.Optional(Boolean),                                                                      // 91
    hideSignInLink: Match.Optional(Boolean),                                                                        // 92
    hideSignUpLink: Match.Optional(Boolean),                                                                        // 93
                                                                                                                    // 94
    // Client-side Validation                                                                                       // 95
    continuousValidation: Match.Optional(Boolean),                                                                  // 96
    negativeFeedback: Match.Optional(Boolean),                                                                      // 97
    negativeValidation: Match.Optional(Boolean),                                                                    // 98
    positiveValidation: Match.Optional(Boolean),                                                                    // 99
    positiveFeedback: Match.Optional(Boolean),                                                                      // 100
    showValidating: Match.Optional(Boolean),                                                                        // 101
                                                                                                                    // 102
    // Privacy Policy and Terms of Use                                                                              // 103
    privacyUrl: Match.Optional(String),                                                                             // 104
    termsUrl: Match.Optional(String),                                                                               // 105
                                                                                                                    // 106
    // Redirects                                                                                                    // 107
    homeRoutePath: Match.Optional(String),                                                                          // 108
    redirectTimeout: Match.Optional(Number),                                                                        // 109
                                                                                                                    // 110
    texts: Match.Optional(TEXTS_PAT),                                                                               // 111
};                                                                                                                  // 112
                                                                                                                    // 113
                                                                                                                    // 114
FIELD_SUB_PAT = {                                                                                                   // 115
    default: Match.Optional(String),                                                                                // 116
    changePwd: Match.Optional(String),                                                                              // 117
    enrollAccount: Match.Optional(String),                                                                          // 118
    forgotPwd: Match.Optional(String),                                                                              // 119
    resetPwd: Match.Optional(String),                                                                               // 120
    signIn: Match.Optional(String),                                                                                 // 121
    signUp: Match.Optional(String),                                                                                 // 122
};                                                                                                                  // 123
                                                                                                                    // 124
                                                                                                                    // 125
// Field pattern                                                                                                    // 126
FIELD_PAT = {                                                                                                       // 127
    _id: String,                                                                                                    // 128
    type: String,                                                                                                   // 129
    required: Match.Optional(Boolean),                                                                              // 130
    displayName: Match.Optional(Match.OneOf(String, FIELD_SUB_PAT)),                                                // 131
    placeholder: Match.Optional(Match.OneOf(String, FIELD_SUB_PAT)),                                                // 132
    select: Match.Optional([{text: String, value: Match.Any}]),                                                     // 133
    minLength: Match.Optional(Match.Integer),                                                                       // 134
    maxLength: Match.Optional(Match.Integer),                                                                       // 135
    re: Match.Optional(RegExp),                                                                                     // 136
    func: Match.Optional(Match.Where(_.isFunction)),                                                                // 137
    errStr: Match.Optional(String),                                                                                 // 138
                                                                                                                    // 139
    // Client-side Validation                                                                                       // 140
    continuousValidation: Match.Optional(Boolean),                                                                  // 141
    negativeFeedback: Match.Optional(Boolean),                                                                      // 142
    negativeValidation: Match.Optional(Boolean),                                                                    // 143
    positiveValidation: Match.Optional(Boolean),                                                                    // 144
    positiveFeedback: Match.Optional(Boolean),                                                                      // 145
                                                                                                                    // 146
    // Transforms                                                                                                   // 147
    trim: Match.Optional(Boolean),                                                                                  // 148
    lowercase: Match.Optional(Boolean),                                                                             // 149
    uppercase: Match.Optional(Boolean),                                                                             // 150
};                                                                                                                  // 151
                                                                                                                    // 152
// Route configuration pattern to be checked with check                                                             // 153
var ROUTE_PAT = {                                                                                                   // 154
    name: Match.Optional(String),                                                                                   // 155
    path: Match.Optional(String),                                                                                   // 156
    template: Match.Optional(String),                                                                               // 157
    layoutTemplate: Match.Optional(String),                                                                         // 158
    redirect: Match.Optional(Match.OneOf(String, Match.Where(_.isFunction))),                                       // 159
};                                                                                                                  // 160
                                                                                                                    // 161
                                                                                                                    // 162
// ---------------------------------------------------------------------------------                                // 163
                                                                                                                    // 164
// AccountsTemplates object                                                                                         // 165
                                                                                                                    // 166
// ---------------------------------------------------------------------------------                                // 167
                                                                                                                    // 168
                                                                                                                    // 169
                                                                                                                    // 170
// -------------------                                                                                              // 171
// Client/Server stuff                                                                                              // 172
// -------------------                                                                                              // 173
                                                                                                                    // 174
// Constructor                                                                                                      // 175
AT = function() {                                                                                                   // 176
                                                                                                                    // 177
};                                                                                                                  // 178
                                                                                                                    // 179
                                                                                                                    // 180
                                                                                                                    // 181
                                                                                                                    // 182
/*                                                                                                                  // 183
    Each field object is represented by the following properties:                                                   // 184
        _id:         String   (required)  // A unique field"s id / name                                             // 185
        type:        String   (required)  // Displayed input type                                                   // 186
        required:    Boolean  (optional)  // Specifies Whether to fail or not when field is left empty              // 187
        displayName: String   (optional)  // The field"s name to be displayed as a label above the input element    // 188
        placeholder: String   (optional)  // The placeholder text to be displayed inside the input element          // 189
        minLength:   Integer  (optional)  // Possibly specifies the minimum allowed length                          // 190
        maxLength:   Integer  (optional)  // Possibly specifies the maximum allowed length                          // 191
        re:          RegExp   (optional)  // Regular expression for validation                                      // 192
        func:        Function (optional)  // Custom function for validation                                         // 193
        errStr:      String   (optional)  // Error message to be displayed in case re validation fails              // 194
*/                                                                                                                  // 195
                                                                                                                    // 196
                                                                                                                    // 197
                                                                                                                    // 198
/*                                                                                                                  // 199
    Routes configuration can be done by calling AccountsTemplates.configureRoute with the route name and the        // 200
    following options in a separate object. E.g. AccountsTemplates.configureRoute("gingIn", option);                // 201
        name:           String (optional). A unique route"s name to be passed to iron-router                        // 202
        path:           String (optional). A unique route"s path to be passed to iron-router                        // 203
        template:       String (optional). The name of the template to be rendered                                  // 204
        layoutTemplate: String (optional). The name of the layout to be used                                        // 205
        redirect:       String (optional). The name of the route (or its path) where to redirect after form submit  // 206
*/                                                                                                                  // 207
                                                                                                                    // 208
                                                                                                                    // 209
// Allowed routes along with theirs default configuration values                                                    // 210
AT.prototype.ROUTE_DEFAULT = {                                                                                      // 211
    changePwd:     { name: "atChangePwd",     path: "/change-password"},                                            // 212
    enrollAccount: { name: "atEnrollAccount", path: "/enroll-account"},                                             // 213
    forgotPwd:     { name: "atForgotPwd",     path: "/forgot-password"},                                            // 214
    resetPwd:      { name: "atResetPwd",      path: "/reset-password"},                                             // 215
    signIn:        { name: "atSignIn",        path: "/sign-in"},                                                    // 216
    signUp:        { name: "atSignUp",        path: "/sign-up"},                                                    // 217
    verifyEmail:   { name: "atVerifyEmail",   path: "/verify-email"},                                               // 218
};                                                                                                                  // 219
                                                                                                                    // 220
                                                                                                                    // 221
                                                                                                                    // 222
// Allowed input types                                                                                              // 223
AT.prototype.INPUT_TYPES = [                                                                                        // 224
    "checkbox",                                                                                                     // 225
    "email",                                                                                                        // 226
    "hidden",                                                                                                       // 227
    "password",                                                                                                     // 228
    "radio",                                                                                                        // 229
    "select",                                                                                                       // 230
    "tel",                                                                                                          // 231
    "text",                                                                                                         // 232
    "url",                                                                                                          // 233
];                                                                                                                  // 234
                                                                                                                    // 235
// Current configuration values                                                                                     // 236
AT.prototype.options = {                                                                                            // 237
    // Appearance                                                                                                   // 238
    //defaultLayout: undefined,                                                                                     // 239
    showAddRemoveServices: false,                                                                                   // 240
    showForgotPasswordLink: false,                                                                                  // 241
    showLabels: true,                                                                                               // 242
    showPlaceholders: true,                                                                                         // 243
                                                                                                                    // 244
    // Behaviour                                                                                                    // 245
    confirmPassword: true,                                                                                          // 246
    defaultState: "signIn",                                                                                         // 247
    enablePasswordChange: false,                                                                                    // 248
    forbidClientAccountCreation: false,                                                                             // 249
    overrideLoginErrors: true,                                                                                      // 250
    sendVerificationEmail: false,                                                                                   // 251
                                                                                                                    // 252
    // Client-side Validation                                                                                       // 253
    //continuousValidation: false,                                                                                  // 254
    //negativeFeedback: false,                                                                                      // 255
    //negativeValidation: false,                                                                                    // 256
    //positiveValidation: false,                                                                                    // 257
    //positiveFeedback: false,                                                                                      // 258
    //showValidating: false,                                                                                        // 259
                                                                                                                    // 260
    // Privacy Policy and Terms of Use                                                                              // 261
    privacyUrl: undefined,                                                                                          // 262
    termsUrl: undefined,                                                                                            // 263
                                                                                                                    // 264
    // Redirects                                                                                                    // 265
    homeRoutePath: "/",                                                                                             // 266
    redirectTimeout: 2000, // 2 seconds                                                                             // 267
};                                                                                                                  // 268
                                                                                                                    // 269
AT.prototype.SPECIAL_FIELDS = [                                                                                     // 270
    "password_again",                                                                                               // 271
    "username_and_email",                                                                                           // 272
];                                                                                                                  // 273
                                                                                                                    // 274
// SignIn / SignUp fields                                                                                           // 275
AT.prototype._fields = [                                                                                            // 276
    new Field({                                                                                                     // 277
        _id: "email",                                                                                               // 278
        type: "email",                                                                                              // 279
        required: true,                                                                                             // 280
        lowercase: true,                                                                                            // 281
        trim: true,                                                                                                 // 282
    }),                                                                                                             // 283
    new Field({                                                                                                     // 284
        _id: "password",                                                                                            // 285
        type: "password",                                                                                           // 286
        required: true,                                                                                             // 287
        minLength: 6,                                                                                               // 288
        displayName: {                                                                                              // 289
            default: "password",                                                                                    // 290
            changePwd: "newPassword",                                                                               // 291
            resetPwd: "newPassword",                                                                                // 292
        },                                                                                                          // 293
        placeholder: {                                                                                              // 294
            default: "password",                                                                                    // 295
            changePwd: "newPassword",                                                                               // 296
            resetPwd: "newPassword",                                                                                // 297
        },                                                                                                          // 298
    }),                                                                                                             // 299
];                                                                                                                  // 300
                                                                                                                    // 301
// Configured routes                                                                                                // 302
AT.prototype.routes = {};                                                                                           // 303
                                                                                                                    // 304
AT.prototype._initialized = false;                                                                                  // 305
                                                                                                                    // 306
// Input type validation                                                                                            // 307
AT.prototype._isValidInputType = function(value) {                                                                  // 308
    return _.indexOf(this.INPUT_TYPES, value) !== -1;                                                               // 309
};                                                                                                                  // 310
                                                                                                                    // 311
AT.prototype.addField = function(field) {                                                                           // 312
    // Fields can be added only before initialization                                                               // 313
    if (this._initialized)                                                                                          // 314
        throw new Error("AccountsTemplates.addField should strictly be called before AccountsTemplates.init!");     // 315
    field = _.pick(field, _.keys(FIELD_PAT));                                                                       // 316
    check(field, FIELD_PAT);                                                                                        // 317
    // Checks there"s currently no field called field._id                                                           // 318
    if (_.indexOf(_.pluck(this._fields, "_id"), field._id) !== -1)                                                  // 319
        throw new Error("A field called " + field._id + " already exists!");                                        // 320
    // Validates field.type                                                                                         // 321
    if (!this._isValidInputType(field.type))                                                                        // 322
        throw new Error("field.type is not valid!");                                                                // 323
    // Checks field.minLength is strictly positive                                                                  // 324
    if (typeof field.minLength !== "undefined" && field.minLength <= 0)                                             // 325
        throw new Error("field.minLength should be greater than zero!");                                            // 326
    // Checks field.maxLength is strictly positive                                                                  // 327
    if (typeof field.maxLength !== "undefined" && field.maxLength <= 0)                                             // 328
        throw new Error("field.maxLength should be greater than zero!");                                            // 329
    // Checks field.maxLength is greater than field.minLength                                                       // 330
    if (typeof field.minLength !== "undefined" && typeof field.minLength !== "undefined" && field.maxLength < field.minLength)
        throw new Error("field.maxLength should be greater than field.maxLength!");                                 // 332
                                                                                                                    // 333
    if (!(Meteor.isServer && _.contains(this.SPECIAL_FIELDS, field._id)))                                           // 334
        this._fields.push(new Field(field));                                                                        // 335
    return this._fields;                                                                                            // 336
};                                                                                                                  // 337
                                                                                                                    // 338
AT.prototype.addFields = function(fields) {                                                                         // 339
    var ok;                                                                                                         // 340
    try { // don"t bother with `typeof` - just access `length` and `catch`                                          // 341
        ok = fields.length > 0 && "0" in Object(fields);                                                            // 342
    } catch (e) {                                                                                                   // 343
        throw new Error("field argument should be an array of valid field objects!");                               // 344
    }                                                                                                               // 345
    if (ok) {                                                                                                       // 346
        _.map(fields, function(field){                                                                              // 347
            this.addField(field);                                                                                   // 348
        }, this);                                                                                                   // 349
    } else                                                                                                          // 350
        throw new Error("field argument should be an array of valid field objects!");                               // 351
    return this._fields;                                                                                            // 352
};                                                                                                                  // 353
                                                                                                                    // 354
AT.prototype.configure = function(config) {                                                                         // 355
    // Configuration options can be set only before initialization                                                  // 356
    if (this._initialized)                                                                                          // 357
        throw new Error("Configuration options must be set before AccountsTemplates.init!");                        // 358
                                                                                                                    // 359
    // Updates the current configuration                                                                            // 360
    check(config, CONFIG_PAT);                                                                                      // 361
    var options = _.omit(config, "texts");                                                                          // 362
    this.options = _.defaults(options, this.options);                                                               // 363
                                                                                                                    // 364
    if (Meteor.isClient){                                                                                           // 365
        // Possibly sets up client texts...                                                                         // 366
        if (config.texts){                                                                                          // 367
            var texts = config.texts;                                                                               // 368
            var simpleTexts = _.omit(texts, "button", "errors", "info", "inputIcons", "socialIcons", "title");      // 369
            this.texts = _.defaults(simpleTexts, this.texts);                                                       // 370
                                                                                                                    // 371
            if (texts.button) {                                                                                     // 372
                // Updates the current button object                                                                // 373
                this.texts.button = _.defaults(texts.button, this.texts.button);                                    // 374
            }                                                                                                       // 375
            if (texts.errors) {                                                                                     // 376
                // Updates the current errors object                                                                // 377
                this.texts.errors = _.defaults(texts.errors, this.texts.errors);                                    // 378
            }                                                                                                       // 379
            if (texts.info) {                                                                                       // 380
                // Updates the current info object                                                                  // 381
                this.texts.info = _.defaults(texts.info, this.texts.info);                                          // 382
            }                                                                                                       // 383
            if (texts.inputIcons) {                                                                                 // 384
                // Updates the current inputIcons object                                                            // 385
                this.texts.inputIcons = _.defaults(texts.inputIcons, this.texts.inputIcons);                        // 386
            }                                                                                                       // 387
            if (texts.socialIcons) {                                                                                // 388
                // Updates the current socialIcons object                                                           // 389
                this.texts.socialIcons = _.defaults(texts.socialIcons, this.texts.socialIcons);                     // 390
            }                                                                                                       // 391
            if (texts.title) {                                                                                      // 392
                // Updates the current title object                                                                 // 393
                this.texts.title = _.defaults(texts.title, this.texts.title);                                       // 394
            }                                                                                                       // 395
        }                                                                                                           // 396
    }                                                                                                               // 397
};                                                                                                                  // 398
                                                                                                                    // 399
AT.prototype.configureRoute = function(route, options) {                                                            // 400
    check(route, String);                                                                                           // 401
    check(options, Match.OneOf(undefined, ROUTE_PAT));                                                              // 402
    // Route Configuration can be done only before initialization                                                   // 403
    if (this._initialized)                                                                                          // 404
        throw new Error("Route Configuration can be done only before AccountsTemplates.init!");                     // 405
    // Only allowed routes can be configured                                                                        // 406
    if (!(route in this.ROUTE_DEFAULT))                                                                             // 407
        throw new Error("Unknown Route!");                                                                          // 408
                                                                                                                    // 409
    // Possibly adds a initial / to the provided path                                                               // 410
    if (options && options.path && options.path[0] !== "/"){                                                        // 411
        options = _.clone(options);                                                                                 // 412
        options.path = "/" + options.path;                                                                          // 413
    }                                                                                                               // 414
    // Updates the current configuration                                                                            // 415
    options = _.defaults(options || {}, this.ROUTE_DEFAULT[route]);                                                 // 416
    this.routes[route] = options;                                                                                   // 417
};                                                                                                                  // 418
                                                                                                                    // 419
AT.prototype.hasField = function(fieldId) {                                                                         // 420
    return !!this.getField(fieldId);                                                                                // 421
};                                                                                                                  // 422
                                                                                                                    // 423
AT.prototype.getField = function(fieldId) {                                                                         // 424
    var field = _.filter(this._fields, function(field){                                                             // 425
        return field._id == fieldId;                                                                                // 426
    });                                                                                                             // 427
    return (field.length === 1) ? field[0] : undefined;                                                             // 428
};                                                                                                                  // 429
                                                                                                                    // 430
AT.prototype.getFields = function() {                                                                               // 431
    return this._fields;                                                                                            // 432
};                                                                                                                  // 433
                                                                                                                    // 434
AT.prototype.getFieldIds = function() {                                                                             // 435
    return _.pluck(this._fields, "_id");                                                                            // 436
};                                                                                                                  // 437
                                                                                                                    // 438
AT.prototype.getRouteName = function(route) {                                                                       // 439
    if (route in this.routes)                                                                                       // 440
        return this.routes[route].name;                                                                             // 441
    return null;                                                                                                    // 442
};                                                                                                                  // 443
                                                                                                                    // 444
AT.prototype.getRoutePath = function(route) {                                                                       // 445
    if (route in this.routes)                                                                                       // 446
        return this.routes[route].path;                                                                             // 447
    return "#";                                                                                                     // 448
};                                                                                                                  // 449
                                                                                                                    // 450
AT.prototype.oauthServices = function(){                                                                            // 451
    // Extracts names of available services                                                                         // 452
    var names;                                                                                                      // 453
    if (Meteor.isServer)                                                                                            // 454
        names = (Accounts.oauth && Accounts.oauth.serviceNames()) || [];                                            // 455
    else                                                                                                            // 456
        names = (Accounts.oauth && Accounts.loginServicesConfigured() && Accounts.oauth.serviceNames()) || [];      // 457
    // Extracts names of configured services                                                                        // 458
    var configuredServices = [];                                                                                    // 459
    if (Accounts.loginServiceConfiguration)                                                                         // 460
        configuredServices = _.pluck(Accounts.loginServiceConfiguration.find().fetch(), "service");                 // 461
                                                                                                                    // 462
    // Builds a list of objects containing service name as _id and its configuration status                         // 463
    var services = _.map(names, function(name){                                                                     // 464
        return {                                                                                                    // 465
            _id : name,                                                                                             // 466
            configured: _.contains(configuredServices, name),                                                       // 467
        };                                                                                                          // 468
    });                                                                                                             // 469
                                                                                                                    // 470
    // Checks whether there is a UI to configure services...                                                        // 471
    // XXX: this only works with the accounts-ui package                                                            // 472
    var showUnconfigured = typeof Accounts._loginButtonsSession !== "undefined";                                    // 473
                                                                                                                    // 474
    // Filters out unconfigured services in case they"re not to be displayed                                        // 475
    if (!showUnconfigured){                                                                                         // 476
        services = _.filter(services, function(service){                                                            // 477
            return service.configured;                                                                              // 478
        });                                                                                                         // 479
    }                                                                                                               // 480
                                                                                                                    // 481
    // Sorts services by name                                                                                       // 482
    services = _.sortBy(services, function(service){                                                                // 483
        return service._id;                                                                                         // 484
    });                                                                                                             // 485
                                                                                                                    // 486
    return services;                                                                                                // 487
};                                                                                                                  // 488
                                                                                                                    // 489
AT.prototype.removeField = function(fieldId) {                                                                      // 490
    // Fields can be removed only before initialization                                                             // 491
    if (this._initialized)                                                                                          // 492
        throw new Error("AccountsTemplates.removeField should strictly be called before AccountsTemplates.init!");  // 493
    // Tries to look up the field with given _id                                                                    // 494
    var index = _.indexOf(_.pluck(this._fields, "_id"), fieldId);                                                   // 495
    if (index !== -1)                                                                                               // 496
        return this._fields.splice(index, 1)[0];                                                                    // 497
    else                                                                                                            // 498
        if (!(Meteor.isServer && _.contains(this.SPECIAL_FIELDS, fieldId)))                                         // 499
            throw new Error("A field called " + fieldId + " does not exist!");                                      // 500
};                                                                                                                  // 501
                                                                                                                    // 502
AT.prototype.setupRoutes = function() {                                                                             // 503
    if (Meteor.isServer){                                                                                           // 504
        // Possibly prints a warning in case showForgotPasswordLink is set to true but the route is not configured  // 505
        if (AccountsTemplates.options.showForgotPasswordLink && !("forgotPwd" in  AccountsTemplates.routes))        // 506
            console.warn("[AccountsTemplates] WARNING: showForgotPasswordLink set to true, but forgotPwd route is not configured!");
        // Configures "reset password" email link                                                                   // 508
        if ("resetPwd" in AccountsTemplates.routes){                                                                // 509
            var resetPwdPath = AccountsTemplates.routes["resetPwd"].path.substr(1);                                 // 510
            Accounts.urls.resetPassword = function(token){                                                          // 511
                return Meteor.absoluteUrl(resetPwdPath + "/" + token);                                              // 512
            };                                                                                                      // 513
        }                                                                                                           // 514
        // Configures "enroll account" email link                                                                   // 515
        if ("enrollAccount" in AccountsTemplates.routes){                                                           // 516
            var enrollAccountPath = AccountsTemplates.routes["enrollAccount"].path.substr(1);                       // 517
            Accounts.urls.enrollAccount = function(token){                                                          // 518
                return Meteor.absoluteUrl(enrollAccountPath + "/" + token);                                         // 519
            };                                                                                                      // 520
        }                                                                                                           // 521
        // Configures "verify email" email link                                                                     // 522
        if ("verifyEmail" in AccountsTemplates.routes){                                                             // 523
            var verifyEmailPath = AccountsTemplates.routes["verifyEmail"].path.substr(1);                           // 524
            Accounts.urls.verifyEmail = function(token){                                                            // 525
                return Meteor.absoluteUrl(verifyEmailPath + "/" + token);                                           // 526
            };                                                                                                      // 527
        }                                                                                                           // 528
    }                                                                                                               // 529
                                                                                                                    // 530
    // Determines the default layout to be used in case no specific one is specified for single routes              // 531
    var defaultLayout = AccountsTemplates.options.defaultLayout || Router.options.layoutTemplate;                   // 532
                                                                                                                    // 533
    _.each(AccountsTemplates.routes, function(options, route){                                                      // 534
        if (route === "changePwd" && !AccountsTemplates.options.enablePasswordChange)                               // 535
            throw new Error("changePwd route configured but enablePasswordChange set to false!");                   // 536
        if (route === "forgotPwd" && !AccountsTemplates.options.showForgotPasswordLink)                             // 537
            throw new Error("forgotPwd route configured but showForgotPasswordLink set to false!");                 // 538
        if (route === "signUp" && AccountsTemplates.options.forbidClientAccountCreation)                            // 539
            throw new Error("signUp route configured but forbidClientAccountCreation set to true!");                // 540
        // Possibly prints a warning in case the MAIL_URL environment variable was not set                          // 541
        if (Meteor.isServer && route === "forgotPwd" && (!process.env.MAIL_URL || ! Package["email"])){             // 542
            console.warn("[AccountsTemplates] WARNING: showForgotPasswordLink set to true, but MAIL_URL is not configured!");
        }                                                                                                           // 544
                                                                                                                    // 545
        var name = options.name; // Default provided...                                                             // 546
        var path = options.path; // Default provided...                                                             // 547
        var template = options.template || "fullPageAtForm";                                                        // 548
        var layoutTemplate = options.layoutTemplate || defaultLayout;                                               // 549
                                                                                                                    // 550
        // Possibly adds token parameter                                                                            // 551
        if (_.contains(["enrollAccount", "resetPwd", "verifyEmail"], route)){                                       // 552
            path += "/:paramToken";                                                                                 // 553
            if (route === "verifyEmail")                                                                            // 554
                Router.route(path, {                                                                                // 555
                    name: name,                                                                                     // 556
                    template: template,                                                                             // 557
                    layoutTemplate: layoutTemplate,                                                                 // 558
                    onBeforeAction: function() {                                                                    // 559
                        AccountsTemplates.setState(route);                                                          // 560
                        this.next();                                                                                // 561
                    },                                                                                              // 562
                    onAfterAction: function() {                                                                     // 563
                        AccountsTemplates.setDisabled(true);                                                        // 564
                        var token = this.params.paramToken;                                                         // 565
                        Accounts.verifyEmail(token, function(error){                                                // 566
                            AccountsTemplates.setDisabled(false);                                                   // 567
                            AccountsTemplates.submitCallback(error, route, function(){                              // 568
                                AccountsTemplates.state.form.set("result", AccountsTemplates.texts.info.emailVerified);
                            });                                                                                     // 570
                        });                                                                                         // 571
                    },                                                                                              // 572
                    onStop: function() {                                                                            // 573
                        AccountsTemplates.clearState();                                                             // 574
                    },                                                                                              // 575
                });                                                                                                 // 576
            else                                                                                                    // 577
                Router.route(path, {                                                                                // 578
                    name: name,                                                                                     // 579
                    template: template,                                                                             // 580
                    layoutTemplate: layoutTemplate,                                                                 // 581
                    onRun: function() {                                                                             // 582
                        AccountsTemplates.paramToken = this.params.paramToken;                                      // 583
                        this.next();                                                                                // 584
                    },                                                                                              // 585
                    onBeforeAction: function() {                                                                    // 586
                        AccountsTemplates.setState(route);                                                          // 587
                        this.next();                                                                                // 588
                    },                                                                                              // 589
                    onStop: function() {                                                                            // 590
                        AccountsTemplates.clearState();                                                             // 591
                        AccountsTemplates.paramToken = null;                                                        // 592
                    }                                                                                               // 593
                });                                                                                                 // 594
        }                                                                                                           // 595
        else                                                                                                        // 596
            Router.route(path, {                                                                                    // 597
                name: name,                                                                                         // 598
                template: template,                                                                                 // 599
                layoutTemplate: layoutTemplate,                                                                     // 600
                onBeforeAction: function() {                                                                        // 601
                    if(Meteor.user() && route != 'changePwd')                                                       // 602
                        AccountsTemplates.postSubmitRedirect(route);                                                // 603
                    else                                                                                            // 604
                        AccountsTemplates.setState(route);                                                          // 605
                    this.next();                                                                                    // 606
                },                                                                                                  // 607
                onStop: function() {                                                                                // 608
                    AccountsTemplates.clearState();                                                                 // 609
                }                                                                                                   // 610
            });                                                                                                     // 611
    });                                                                                                             // 612
};                                                                                                                  // 613
                                                                                                                    // 614
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages/useraccounts:core/lib/client.js                                                                         //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
// Allowed Internal (client-side) States                                                                            // 1
AT.prototype.STATES = [                                                                                             // 2
    "changePwd", // Change Password                                                                                 // 3
    "enrollAccount", // Account Enrollment                                                                          // 4
    "forgotPwd", // Forgot Password                                                                                 // 5
    "hide", // Nothing displayed                                                                                    // 6
    "resetPwd", // Reset Password                                                                                   // 7
    "signIn", // Sign In                                                                                            // 8
    "signUp", // Sign Up                                                                                            // 9
    "verifyEmail", // Email verification                                                                            // 10
];                                                                                                                  // 11
                                                                                                                    // 12
AT.prototype._loginType = "";                                                                                       // 13
                                                                                                                    // 14
// Previous path used for redirect after form submit                                                                // 15
AT.prototype._prevPath = null;                                                                                      // 16
                                                                                                                    // 17
// Flag telling whether the whole form should appear disabled                                                       // 18
AT.prototype._disabled = false;                                                                                     // 19
                                                                                                                    // 20
// Flag used to avoid redirecting to previous route when signing in/up                                              // 21
// as a results of a call to ensureSignedIn                                                                         // 22
AT.prototype.avoidRedirect = false;                                                                                 // 23
                                                                                                                    // 24
AT.prototype.texts = {                                                                                              // 25
    button: {                                                                                                       // 26
        changePwd: "updateYourPassword",                                                                            // 27
        enrollAccount: "createAccount",                                                                             // 28
        forgotPwd: "emailResetLink",                                                                                // 29
        resetPwd: "setPassword",                                                                                    // 30
        signIn: "signIn",                                                                                           // 31
        signUp: "signUp",                                                                                           // 32
    },                                                                                                              // 33
    errors: {                                                                                                       // 34
        mustBeLoggedIn: "error.accounts.Must be logged in",                                                         // 35
        pwdMismatch: "error.pwdsDontMatch",                                                                         // 36
    },                                                                                                              // 37
    navSignIn: 'signIn',                                                                                            // 38
    navSignOut: 'signOut',                                                                                          // 39
    info: {                                                                                                         // 40
        emailSent: "info.emailSent",                                                                                // 41
        emailVerified: "info.emailVerified",                                                                        // 42
        pwdChanged: "info.passwordChanged",                                                                         // 43
        pwdReset: "info.passwordReset",                                                                             // 44
        pwdSet: "Password Set",                                                                                     // 45
        singUpVerifyEmail: "Registration Successful! Please check your email and follow the instructions.",         // 46
    },                                                                                                              // 47
    inputIcons: {                                                                                                   // 48
        isValidating: "fa fa-spinner fa-spin",                                                                      // 49
        hasSuccess: "fa fa-check",                                                                                  // 50
        hasError: "fa fa-times",                                                                                    // 51
    },                                                                                                              // 52
    optionalField: "optional",                                                                                      // 53
    pwdLink_pre: "",                                                                                                // 54
    pwdLink_link: "forgotPassword",                                                                                 // 55
    pwdLink_suff: "",                                                                                               // 56
    sep: "OR",                                                                                                      // 57
    signInLink_pre: "ifYouAlreadyHaveAnAccount",                                                                    // 58
    signInLink_link: "signin",                                                                                      // 59
    signInLink_suff: "",                                                                                            // 60
    signUpLink_pre: "dontHaveAnAccount",                                                                            // 61
    signUpLink_link: "signUp",                                                                                      // 62
    signUpLink_suff: "",                                                                                            // 63
    socialAdd: "add",                                                                                               // 64
    socialConfigure: "configure",                                                                                   // 65
    socialIcons: {                                                                                                  // 66
        "meteor-developer": "fa fa-rocket"                                                                          // 67
    },                                                                                                              // 68
    socialRemove: "remove",                                                                                         // 69
    socialSignIn: "signIn",                                                                                         // 70
    socialSignUp: "signUp",                                                                                         // 71
    socialWith: "with",                                                                                             // 72
    termsPreamble: "clickAgree",                                                                                    // 73
    termsPrivacy: "privacyPolicy",                                                                                  // 74
    termsAnd: "and",                                                                                                // 75
    termsTerms: "terms",                                                                                            // 76
    title: {                                                                                                        // 77
        changePwd: "changePassword",                                                                                // 78
        enrollAccount: "createAccount",                                                                             // 79
        forgotPwd: "resetYourPassword",                                                                             // 80
        resetPwd: "resetYourPassword",                                                                              // 81
        signIn: "signIn",                                                                                           // 82
        signUp: "createAccount",                                                                                    // 83
    },                                                                                                              // 84
};                                                                                                                  // 85
                                                                                                                    // 86
// Known routes used to filter out previous path for redirects...                                                   // 87
AT.prototype.knownRoutes = [];                                                                                      // 88
                                                                                                                    // 89
// Token provided for routes like reset-password and enroll-account                                                 // 90
AT.prototype.paramToken = null;                                                                                     // 91
                                                                                                                    // 92
// Current Internal (client-side) State (to be among allowed ones, see STATES)                                      // 93
//AT.prototype.state = "signIn";                                                                                    // 94
                                                                                                                    // 95
// State validation                                                                                                 // 96
AT.prototype._isValidState = function(value) {                                                                      // 97
    return _.contains(this.STATES, value);                                                                          // 98
};                                                                                                                  // 99
                                                                                                                    // 100
AT.prototype.loginType = function () {                                                                              // 101
    return this._loginType;                                                                                         // 102
};                                                                                                                  // 103
                                                                                                                    // 104
// Getter for previous route"s path                                                                                 // 105
AT.prototype.getPrevPath = function() {                                                                             // 106
    return this._prevPath;                                                                                          // 107
};                                                                                                                  // 108
                                                                                                                    // 109
// Setter for previous route"s path                                                                                 // 110
AT.prototype.setPrevPath = function(newPath) {                                                                      // 111
    check(newPath, String);                                                                                         // 112
    this._prevPath = newPath;                                                                                       // 113
};                                                                                                                  // 114
                                                                                                                    // 115
// Getter for current state                                                                                         // 116
AT.prototype.getState = function() {                                                                                // 117
    return this.state.form.get("state");                                                                            // 118
};                                                                                                                  // 119
                                                                                                                    // 120
// Handy function to compute Hash for passwords                                                                     // 121
AT.prototype.hashPassword = function (password) {                                                                   // 122
  return {                                                                                                          // 123
    digest: SHA256(password),                                                                                       // 124
    algorithm: "sha-256"                                                                                            // 125
  };                                                                                                                // 126
};                                                                                                                  // 127
                                                                                                                    // 128
// Getter for disabled state                                                                                        // 129
AT.prototype.disabled = function() {                                                                                // 130
    return this.state.form.equals("disabled", true) ? "disabled" : undefined;                                       // 131
};                                                                                                                  // 132
                                                                                                                    // 133
// Setter for disabled state                                                                                        // 134
AT.prototype.setDisabled = function(value) {                                                                        // 135
    check(value, Boolean);                                                                                          // 136
    return this.state.form.set("disabled", value);                                                                  // 137
};                                                                                                                  // 138
                                                                                                                    // 139
// Setter for current state                                                                                         // 140
AT.prototype.setState = function(state, callback) {                                                                 // 141
    check(state, String);                                                                                           // 142
    if (!this._isValidState(state))                                                                                 // 143
        throw new Meteor.Error(500, "Internal server error", "accounts-templates-core package got an invalid state value!");
    this.state.form.set("state", state);                                                                            // 145
    this.clearState();                                                                                              // 146
    if (_.isFunction(callback))                                                                                     // 147
        callback();                                                                                                 // 148
};                                                                                                                  // 149
                                                                                                                    // 150
AT.prototype.clearState = function() {                                                                              // 151
    _.each(this._fields, function(field){                                                                           // 152
        field.clearStatus();                                                                                        // 153
    });                                                                                                             // 154
    var form = this.state.form;                                                                                     // 155
    form.set("error", null);                                                                                        // 156
    form.set("result", null);                                                                                       // 157
};                                                                                                                  // 158
                                                                                                                    // 159
AT.prototype.clearError = function() {                                                                              // 160
    form.set("error", null);                                                                                        // 161
};                                                                                                                  // 162
                                                                                                                    // 163
AT.prototype.clearResult = function() {                                                                             // 164
    form.set("result", null);                                                                                       // 165
};                                                                                                                  // 166
                                                                                                                    // 167
AT.prototype.ensureSignedIn = function() {                                                                          // 168
    if (!Meteor.user()) {                                                                                           // 169
        AccountsTemplates.setPrevPath(Router.current().url);                                                        // 170
        AccountsTemplates.setState(AccountsTemplates.options.defaultState, function(){                              // 171
            var err = AccountsTemplates.texts.errors.mustBeLoggedIn;                                                // 172
            AccountsTemplates.state.form.set("error", [err]);                                                       // 173
        });                                                                                                         // 174
        AccountsTemplates.avoidRedirect = true;                                                                     // 175
        // render the login template but keep the url in the browser the same                                       // 176
        var signInRouteTemplate = AccountsTemplates.routes.signIn && AccountsTemplates.routes.signIn.template;      // 177
        this.render(signInRouteTemplate || "fullPageAtForm");                                                       // 178
        this.renderRegions();                                                                                       // 179
    } else {                                                                                                        // 180
        this.next();                                                                                                // 181
    }                                                                                                               // 182
};                                                                                                                  // 183
                                                                                                                    // 184
// Initialization                                                                                                   // 185
                                                                                                                    // 186
// Initialization                                                                                                   // 187
AT.prototype.init = function() {                                                                                    // 188
    console.warn("[AccountsTemplates] There is no more need to call AccountsTemplates.init()! Simply remove the call ;-)");
};                                                                                                                  // 190
                                                                                                                    // 191
AT.prototype._init = function() {                                                                                   // 192
    if (this._initialized)                                                                                          // 193
        return;                                                                                                     // 194
                                                                                                                    // 195
    var usernamePresent = this.hasField("username");                                                                // 196
    var emailPresent = this.hasField("email");                                                                      // 197
    if (usernamePresent && emailPresent){                                                                           // 198
        this._loginType = "username_and_email";                                                                     // 199
    }                                                                                                               // 200
    else{                                                                                                           // 201
        if (usernamePresent)                                                                                        // 202
            this._loginType = "username";                                                                           // 203
        else                                                                                                        // 204
            this._loginType = "email";                                                                              // 205
    }                                                                                                               // 206
                                                                                                                    // 207
    if (this._loginType === "username_and_email"){                                                                  // 208
        // Possibly adds the field username_and_email in case                                                       // 209
        // it was not configured                                                                                    // 210
        if (!this.hasField("username_and_email"))                                                                   // 211
            this.addField({                                                                                         // 212
                _id: "username_and_email",                                                                          // 213
                type: "text",                                                                                       // 214
                displayName: "usernameOrEmail",                                                                     // 215
                placeholder: "usernameOrEmail",                                                                     // 216
                required: true,                                                                                     // 217
            });                                                                                                     // 218
    }                                                                                                               // 219
                                                                                                                    // 220
    // Only in case password confirmation is required                                                               // 221
    if (this.options.confirmPassword){                                                                              // 222
        // Possibly adds the field password_again in case                                                           // 223
        // it was not configured                                                                                    // 224
        if (!this.hasField("password_again")){                                                                      // 225
            var pwdAgain = _.clone(this.getField("password"));                                                      // 226
            pwdAgain._id = "password_again";                                                                        // 227
            pwdAgain.displayName = {                                                                                // 228
                default: "passwordAgain",                                                                           // 229
                changePwd: "newPasswordAgain",                                                                      // 230
                resetPwd: "newPasswordAgain",                                                                       // 231
            };                                                                                                      // 232
            pwdAgain.placeholder = {                                                                                // 233
                default: "passwordAgain",                                                                           // 234
                changePwd: "newPasswordAgain",                                                                      // 235
                resetPwd: "newPasswordAgain",                                                                       // 236
            };                                                                                                      // 237
            this.addField(pwdAgain);                                                                                // 238
        }                                                                                                           // 239
    }                                                                                                               // 240
    else{                                                                                                           // 241
        if (this.hasField("password_again"))                                                                        // 242
            throw new Error("AccountsTemplates: a field password_again was added but confirmPassword is set to false!");
    }                                                                                                               // 244
                                                                                                                    // 245
    // Possibly adds the field current_password in case                                                             // 246
    // it was not configured                                                                                        // 247
    if (this.options.enablePasswordChange){                                                                         // 248
        if (!this.hasField("current_password"))                                                                     // 249
            this.addField({                                                                                         // 250
                _id: "current_password",                                                                            // 251
                type: "password",                                                                                   // 252
                displayName: "currentPassword",                                                                     // 253
                placeholder: "currentPassword",                                                                     // 254
                required: true,                                                                                     // 255
            });                                                                                                     // 256
    }                                                                                                               // 257
                                                                                                                    // 258
    // Ensuser the right order of special fields                                                                    // 259
    var moveFieldAfterPwd = function(field_name, reference_field_name) {                                            // 260
        var fieldIds = AccountsTemplates.getFieldIds();                                                             // 261
        var refFieldId = _.indexOf(fieldIds, reference_field_name);                                                 // 262
        // In case the reference field is not present, just return...                                               // 263
        if (refFieldId === -1)                                                                                      // 264
            return;                                                                                                 // 265
        var fieldId = _.indexOf(fieldIds, field_name);                                                              // 266
        // In case the sought field is not present, just return...                                                  // 267
        if (fieldId === -1)                                                                                         // 268
            return;                                                                                                 // 269
        if (fieldId !== -1 && fieldId !== (refFieldId + 1)){                                                        // 270
            // removes the field                                                                                    // 271
            var field = AccountsTemplates._fields.splice(fieldId, 1)[0];                                            // 272
            // push the field right after the reference field position                                              // 273
            var new_fieldIds = AccountsTemplates.getFieldIds();                                                     // 274
            var new_refFieldId = _.indexOf(new_fieldIds, reference_field_name);                                     // 275
            AccountsTemplates._fields.splice(new_refFieldId + 1, 0, field);                                         // 276
        }                                                                                                           // 277
    };                                                                                                              // 278
    // The final order should be something like:                                                                    // 279
    // - username                                                                                                   // 280
    // - email                                                                                                      // 281
    // - username_and_email                                                                                         // 282
    // - password                                                                                                   // 283
    // - password_again                                                                                             // 284
    //                                                                                                              // 285
    // ...so lets do it in reverse order...                                                                         // 286
    moveFieldAfterPwd("username_and_email", "username");                                                            // 287
    moveFieldAfterPwd("username_and_email", "email");                                                               // 288
    moveFieldAfterPwd("password", "current_password");                                                              // 289
    moveFieldAfterPwd("password_again", "password");                                                                // 290
                                                                                                                    // 291
                                                                                                                    // 292
    // Sets visibility condition and validation flags for each field                                                // 293
    var gPositiveValidation = !!AccountsTemplates.options.positiveValidation;                                       // 294
    var gNegativeValidation = !!AccountsTemplates.options.negativeValidation;                                       // 295
    var gShowValidating = !!AccountsTemplates.options.showValidating;                                               // 296
    var gContinuousValidation = !!AccountsTemplates.options.continuousValidation;                                   // 297
    var gNegativeFeedback = !!AccountsTemplates.options.negativeFeedback;                                           // 298
    var gPositiveFeedback = !!AccountsTemplates.options.positiveFeedback;                                           // 299
    _.each(this._fields, function(field){                                                                           // 300
        // Visibility                                                                                               // 301
        switch(field._id) {                                                                                         // 302
            case "current_password":                                                                                // 303
                field.visible = ["changePwd"];                                                                      // 304
                break;                                                                                              // 305
            case "email":                                                                                           // 306
                field.visible = ["forgotPwd", "signUp"];                                                            // 307
                if (AccountsTemplates.loginType() === "email")                                                      // 308
                    field.visible.push("signIn");                                                                   // 309
                break;                                                                                              // 310
            case "password":                                                                                        // 311
                field.visible = ["changePwd", "enrollAccount", "resetPwd", "signIn", "signUp"];                     // 312
                break;                                                                                              // 313
            case "password_again":                                                                                  // 314
                field.visible = ["changePwd", "enrollAccount", "resetPwd", "signUp"];                               // 315
                break;                                                                                              // 316
            case "username":                                                                                        // 317
                field.visible = ["signUp"];                                                                         // 318
                if (AccountsTemplates.loginType() === "username")                                                   // 319
                    field.visible.push("signIn");                                                                   // 320
                break;                                                                                              // 321
            case "username_and_email":                                                                              // 322
                field.visible = [];                                                                                 // 323
                if (AccountsTemplates.loginType() === "username_and_email")                                         // 324
                    field.visible.push("signIn");                                                                   // 325
                break;                                                                                              // 326
            default:                                                                                                // 327
                field.visible = ["signUp"];                                                                         // 328
        }                                                                                                           // 329
                                                                                                                    // 330
        // Validation                                                                                               // 331
        var positiveValidation = field.positiveValidation;                                                          // 332
        if (positiveValidation === undefined)                                                                       // 333
            field.positiveValidation = gPositiveValidation;                                                         // 334
        var negativeValidation = field.negativeValidation;                                                          // 335
        if (negativeValidation === undefined)                                                                       // 336
            field.negativeValidation = gNegativeValidation;                                                         // 337
        field.validation = field.positiveValidation || field.negativeValidation;                                    // 338
        if (field.continuousValidation === undefined)                                                               // 339
            field.continuousValidation = gContinuousValidation;                                                     // 340
        field.continuousValidation = field.validation && field.continuousValidation;                                // 341
        if (field.negativeFeedback === undefined)                                                                   // 342
            field.negativeFeedback = gNegativeFeedback;                                                             // 343
        if (field.positiveFeedback === undefined)                                                                   // 344
            field.positiveFeedback = gPositiveFeedback;                                                             // 345
        field.feedback = field.negativeFeedback || field.positiveFeedback;                                          // 346
        // Validating icon                                                                                          // 347
        var showValidating = field.showValidating;                                                                  // 348
        if (showValidating === undefined)                                                                           // 349
            field.showValidating = gShowValidating;                                                                 // 350
                                                                                                                    // 351
    });                                                                                                             // 352
                                                                                                                    // 353
    // Initializes reactive states                                                                                  // 354
    form = new ReactiveDict();                                                                                      // 355
    form.set("disabled", false);                                                                                    // 356
    form.set("state", "signIn");                                                                                    // 357
    form.set("result", null);                                                                                       // 358
    form.set("error", null);                                                                                        // 359
    this.state = {                                                                                                  // 360
        form: form,                                                                                                 // 361
    };                                                                                                              // 362
                                                                                                                    // 363
    // Possibly subscribes to extended user data (to get the list of registered services...)                        // 364
    if (this.options.showAddRemoveServices){                                                                        // 365
        Meteor.subscribe("userRegisteredServices");                                                                 // 366
    }                                                                                                               // 367
                                                                                                                    // 368
    // ------------                                                                                                 // 369
    // Routing Stuff                                                                                                // 370
    // ------------                                                                                                 // 371
                                                                                                                    // 372
    // Known routes are used to filter out previous path for redirects...                                           // 373
    this.knownRoutes = _.pluck(_.values(this.routes), "path");                                                      // 374
                                                                                                                    // 375
    // Stores previous path on path change...                                                                       // 376
    Router.onStop(function() {                                                                                      // 377
        Tracker.nonreactive(function () {                                                                           // 378
            var currentPath = Router.current().url;                                                                 // 379
            if (!_.contains(AccountsTemplates.knownRoutes, currentPath))                                            // 380
                AccountsTemplates.setPrevPath(currentPath);                                                         // 381
            AccountsTemplates.avoidRedirect = false;                                                                // 382
        });                                                                                                         // 383
    });                                                                                                             // 384
                                                                                                                    // 385
    // Sets up configured routes                                                                                    // 386
    AccountsTemplates.setupRoutes();                                                                                // 387
                                                                                                                    // 388
    // Marks AccountsTemplates as initialized                                                                       // 389
    this._initialized = true;                                                                                       // 390
};                                                                                                                  // 391
                                                                                                                    // 392
AT.prototype.linkClick = function(route){                                                                           // 393
    if (AccountsTemplates.disabled())                                                                               // 394
        return;                                                                                                     // 395
    if (AccountsTemplates.avoidRedirect || AccountsTemplates.getRoutePath(route) === "#")                           // 396
        AccountsTemplates.setState(route);                                                                          // 397
    else                                                                                                            // 398
        Meteor.defer(function(){                                                                                    // 399
            Router.go(AccountsTemplates.getRouteName(route));                                                       // 400
        });                                                                                                         // 401
};                                                                                                                  // 402
                                                                                                                    // 403
AT.prototype.logout = function(){                                                                                   // 404
    Meteor.logout();                                                                                                // 405
    var homeRoutePath = AccountsTemplates.options.homeRoutePath;                                                    // 406
    if (homeRoutePath)                                                                                              // 407
        Router.go(homeRoutePath);                                                                                   // 408
};                                                                                                                  // 409
                                                                                                                    // 410
AT.prototype.postSubmitRedirect = function(route){                                                                  // 411
    if (AccountsTemplates.avoidRedirect)                                                                            // 412
        AccountsTemplates.avoidRedirect = false;                                                                    // 413
    else{                                                                                                           // 414
        var nextPath = AccountsTemplates.routes[route] && AccountsTemplates.routes[route].redirect;                 // 415
        if (nextPath){                                                                                              // 416
            if (_.isFunction(nextPath))                                                                             // 417
                nextPath();                                                                                         // 418
            else                                                                                                    // 419
                Router.go(nextPath);                                                                                // 420
        }else{                                                                                                      // 421
            var previousPath = AccountsTemplates.getPrevPath();                                                     // 422
            if (previousPath)                                                                                       // 423
                Router.go(previousPath);                                                                            // 424
            else{                                                                                                   // 425
                var homeRoutePath = AccountsTemplates.options.homeRoutePath;                                        // 426
                if (homeRoutePath)                                                                                  // 427
                    Router.go(homeRoutePath);                                                                       // 428
            }                                                                                                       // 429
        }                                                                                                           // 430
    }                                                                                                               // 431
};                                                                                                                  // 432
                                                                                                                    // 433
AT.prototype.submitCallback = function(error, state, onSuccess){                                                    // 434
    if (error) {                                                                                                    // 435
        if(_.isObject(error.details))                                                                               // 436
            // If error.details is an object, we may try to set fields errors from it                               // 437
            _.each(error.details, function(error, fieldId){                                                         // 438
                AccountsTemplates.getField(fieldId).setError(error);                                                // 439
            });                                                                                                     // 440
        else{                                                                                                       // 441
            var err = error.reason ? "error.accounts." + error.reason : "error.accounts.Unknown error";             // 442
            AccountsTemplates.state.form.set("error", [err]);                                                       // 443
        }                                                                                                           // 444
        AccountsTemplates.setDisabled(false);                                                                       // 445
    }                                                                                                               // 446
    else{                                                                                                           // 447
        if (onSuccess)                                                                                              // 448
        onSuccess();                                                                                                // 449
        if (_.contains(["enrollAccount", "forgotPwd", "resetPwd", "verifyEmail"], state)){                          // 450
            var redirectTimeout = AccountsTemplates.options.redirectTimeout;                                        // 451
            if (redirectTimeout > 0)                                                                                // 452
                Meteor.setTimeout(function(){                                                                       // 453
                    AccountsTemplates.setDisabled(false);                                                           // 454
                    AccountsTemplates.postSubmitRedirect(state);                                                    // 455
                }, redirectTimeout);                                                                                // 456
        }                                                                                                           // 457
        else if (state){                                                                                            // 458
            AccountsTemplates.setDisabled(false);                                                                   // 459
            AccountsTemplates.postSubmitRedirect(state);                                                            // 460
        }                                                                                                           // 461
    }                                                                                                               // 462
};                                                                                                                  // 463
                                                                                                                    // 464
AccountsTemplates = new AT();                                                                                       // 465
                                                                                                                    // 466
                                                                                                                    // 467
// Initialization                                                                                                   // 468
Meteor.startup(function(){                                                                                          // 469
    AccountsTemplates._init();                                                                                      // 470
});                                                                                                                 // 471
                                                                                                                    // 472
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages/useraccounts:core/lib/templates_helpers/at_error.js                                                     //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
AT.prototype.atErrorHelpers = {                                                                                     // 1
    error: function() {                                                                                             // 2
        return AccountsTemplates.state.form.get("error");                                                           // 3
    },                                                                                                              // 4
    errorText: function(){                                                                                          // 5
        var field, err;                                                                                             // 6
        if (this.field){                                                                                            // 7
            field = T9n.get(this.field, markIfMissing=false);                                                       // 8
            err = T9n.get(this.err, markIfMissing=false);                                                           // 9
        }                                                                                                           // 10
        else                                                                                                        // 11
            err = T9n.get(this.valueOf(), markIfMissing=false);                                                     // 12
                                                                                                                    // 13
        // Possibly removes initial prefix in case the key in not found inside t9n                                  // 14
        if (err.substring(0, 15) === "error.accounts.")                                                             // 15
            err = err.substring(15);                                                                                // 16
                                                                                                                    // 17
        if (field)                                                                                                  // 18
            return field + ": " + err;                                                                              // 19
        return err;                                                                                                 // 20
    },                                                                                                              // 21
};                                                                                                                  // 22
                                                                                                                    // 23
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages/useraccounts:core/lib/templates_helpers/at_form.js                                                      //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
AT.prototype.atFormHelpers = {                                                                                      // 1
    hide: function(){                                                                                               // 2
        var state = this.state || AccountsTemplates.getState();                                                     // 3
        return state === "hide";                                                                                    // 4
    },                                                                                                              // 5
    showTitle: function(next_state){                                                                                // 6
        var state = next_state || this.state || AccountsTemplates.getState();                                       // 7
        if (state === "verifyEmail" || (Meteor.user() && state === "signIn"))                                       // 8
            return false;                                                                                           // 9
        return true;                                                                                                // 10
        //return !(state === "signIn" && AccountsTemplates.oauthServices().length);                                 // 11
    },                                                                                                              // 12
    showOauthServices: function(next_state){                                                                        // 13
        var state = next_state || this.state || AccountsTemplates.getState();                                       // 14
        if (!(state === "signIn" || state === "signUp"))                                                            // 15
            return false;                                                                                           // 16
        var services = AccountsTemplates.oauthServices();                                                           // 17
        if (!services.length)                                                                                       // 18
            return false;                                                                                           // 19
        if (Meteor.user())                                                                                          // 20
            return AccountsTemplates.options.showAddRemoveServices;                                                 // 21
        return true;                                                                                                // 22
    },                                                                                                              // 23
    showServicesSeparator: function(next_state){                                                                    // 24
        var pwdService = Package["accounts-password"] !== undefined;                                                // 25
        var state = next_state || this.state || AccountsTemplates.getState();                                       // 26
        var rightState = (state === "signIn" || state === "signUp");                                                // 27
        return rightState && !Meteor.user() && pwdService && AccountsTemplates.oauthServices().length;              // 28
    },                                                                                                              // 29
    showError: function(next_state) {                                                                               // 30
        return !!AccountsTemplates.state.form.get("error");                                                         // 31
    },                                                                                                              // 32
    showResult: function(next_state) {                                                                              // 33
        return !!AccountsTemplates.state.form.get("result");                                                        // 34
    },                                                                                                              // 35
    showPwdForm: function(next_state) {                                                                             // 36
        if (Package["accounts-password"] === undefined)                                                             // 37
            return false;                                                                                           // 38
        var state = next_state || this.state || AccountsTemplates.getState();                                       // 39
        if ((state === "verifyEmail") || (state === "signIn" && Meteor.user()))                                     // 40
            return false;                                                                                           // 41
        return true;                                                                                                // 42
    },                                                                                                              // 43
    showSignInLink: function(next_state){                                                                           // 44
        if (AccountsTemplates.options.hideSignInLink)                                                               // 45
            return false;                                                                                           // 46
        var state = next_state || this.state || AccountsTemplates.getState();                                       // 47
        //return state === "signUp" || state === "forgotPwd";                                                       // 48
        return state === "signUp";                                                                                  // 49
    },                                                                                                              // 50
    showSignUpLink: function(next_state){                                                                           // 51
        if  (AccountsTemplates.options.hideSignUpLink)                                                              // 52
            return false;                                                                                           // 53
        var state = next_state || this.state || AccountsTemplates.getState();                                       // 54
        return ((state === "signIn" && !Meteor.user()) || state === "forgotPwd") && !AccountsTemplates.options.forbidClientAccountCreation;
    },                                                                                                              // 56
    showTermsLink: function(next_state){                                                                            // 57
        var state = next_state || this.state || AccountsTemplates.getState();                                       // 58
        if (state === "signUp" && (!!AccountsTemplates.options.privacyUrl || !!AccountsTemplates.options.termsUrl)) // 59
            return true;                                                                                            // 60
        /*                                                                                                          // 61
        if (state === "signIn"){                                                                                    // 62
            var pwdService = Package["accounts-password"] !== undefined;                                            // 63
            if (!pwdService)                                                                                        // 64
                return true;                                                                                        // 65
        }                                                                                                           // 66
        */                                                                                                          // 67
        return false;                                                                                               // 68
    },                                                                                                              // 69
};                                                                                                                  // 70
                                                                                                                    // 71
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages/useraccounts:core/lib/templates_helpers/at_input.js                                                     //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
AT.prototype.atInputRendered = function(){                                                                          // 1
    var fieldId = this.data._id;                                                                                    // 2
    var inputQueryVal = Router.current().params.query[fieldId];                                                     // 3
    if (inputQueryVal)                                                                                              // 4
        this.$("input#at-field-" + fieldId).val(inputQueryVal);                                                     // 5
};                                                                                                                  // 6
                                                                                                                    // 7
AT.prototype.atInputHelpers = {                                                                                     // 8
    disabled: function() {                                                                                          // 9
        return AccountsTemplates.disabled();                                                                        // 10
    },                                                                                                              // 11
    showLabels: function() {                                                                                        // 12
        return AccountsTemplates.options.showLabels;                                                                // 13
    },                                                                                                              // 14
    displayName: function() {                                                                                       // 15
        var parentData = Template.parentData(1);                                                                    // 16
        var state = (parentData && parentData.state) || AccountsTemplates.getState();                               // 17
        var displayName = this.getDisplayName(state);                                                               // 18
        return T9n.get(displayName, markIfMissing=false);                                                           // 19
    },                                                                                                              // 20
    optionalText: function(){                                                                                       // 21
        return "(" + T9n.get(AccountsTemplates.texts.optionalField, markIfMissing=false) + ")";                     // 22
    },                                                                                                              // 23
    templateName: function() {                                                                                      // 24
        if (this.type === "checkbox")                                                                               // 25
            return "atCheckboxInput";                                                                               // 26
        if (this.type === "select")                                                                                 // 27
            return "atSelectInput";                                                                                 // 28
        if (this.type === "radio")                                                                                  // 29
            return "atRadioInput";                                                                                  // 30
        if (this.type === "hidden")                                                                                 // 31
            return "atHiddenInput";                                                                                 // 32
        return "atTextInput";                                                                                       // 33
    },                                                                                                              // 34
    values: function(){                                                                                             // 35
        var id = this._id;                                                                                          // 36
        return _.map(this.select, function(select){                                                                 // 37
            var s = _.clone(select);                                                                                // 38
            s._id = id + "-" + select.value;                                                                        // 39
            s.id = id;                                                                                              // 40
            return s;                                                                                               // 41
        });                                                                                                         // 42
    },                                                                                                              // 43
    errorText: function() {                                                                                         // 44
        var err = this.getStatus();                                                                                 // 45
        return T9n.get(err, markIfMissing=false);                                                                   // 46
    },                                                                                                              // 47
    placeholder: function() {                                                                                       // 48
        if (AccountsTemplates.options.showPlaceholders) {                                                           // 49
            var parentData = Template.parentData(1);                                                                // 50
            var state = (parentData && parentData.state) || AccountsTemplates.getState();                           // 51
            var placeholder = this.getPlaceholder(state);                                                           // 52
            return T9n.get(placeholder, markIfMissing=false);                                                       // 53
        }                                                                                                           // 54
    },                                                                                                              // 55
};                                                                                                                  // 56
                                                                                                                    // 57
AT.prototype.atInputEvents = {                                                                                      // 58
    "focusout input": function(event, t){                                                                           // 59
        // Client-side only validation                                                                              // 60
        if (!this.validation)                                                                                       // 61
            return;                                                                                                 // 62
        var parentData = Template.parentData(1);                                                                    // 63
        var state = (parentData && parentData.state) || AccountsTemplates.getState();                               // 64
        // No validation during signIn                                                                              // 65
        if (state === "signIn")                                                                                     // 66
            return;                                                                                                 // 67
        var fieldId = this._id;                                                                                     // 68
        var rawValue = this.getValue(t);                                                                            // 69
        var value = this.fixValue(rawValue);                                                                        // 70
        // Possibly updates the input value                                                                         // 71
        if (value !== rawValue)                                                                                     // 72
            this.setValue(t, value);                                                                                // 73
        // Special case for password confirmation                                                                   // 74
        if (value && fieldId === "password_again"){                                                                 // 75
            if (value !== $("#at-field-password").val())                                                            // 76
                return this.setError(AccountsTemplates.texts.errors.pwdMismatch);                                   // 77
        }                                                                                                           // 78
        this.validate(value);                                                                                       // 79
    },                                                                                                              // 80
    "keyup input": function(event, t){                                                                              // 81
        // Client-side only continuous validation                                                                   // 82
        if (!this.continuousValidation)                                                                             // 83
            return;                                                                                                 // 84
        var parentData = Template.parentData(1);                                                                    // 85
        var state = (parentData && parentData.state) || AccountsTemplates.getState();                               // 86
        // No validation during signIn                                                                              // 87
        if (state === "signIn")                                                                                     // 88
            return;                                                                                                 // 89
        var fieldId = this._id;                                                                                     // 90
        var rawValue = this.getValue(t);                                                                            // 91
        var value = this.fixValue(rawValue);                                                                        // 92
        // Possibly updates the input value                                                                         // 93
        if (value !== rawValue)                                                                                     // 94
            this.setValue(t, value);                                                                                // 95
        // Special case for password confirmation                                                                   // 96
        if (value && fieldId === "password_again"){                                                                 // 97
            if (value !== $("#at-field-password").val())                                                            // 98
                return this.setError(AccountsTemplates.texts.errors.pwdMismatch);                                   // 99
        }                                                                                                           // 100
        this.validate(value);                                                                                       // 101
    },                                                                                                              // 102
};                                                                                                                  // 103
                                                                                                                    // 104
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages/useraccounts:core/lib/templates_helpers/at_nav_button.js                                                //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
AT.prototype.atNavButtonHelpers = {                                                                                 // 1
    text: function(){                                                                                               // 2
        var key = Meteor.user() ? AccountsTemplates.texts.navSignOut : AccountsTemplates.texts.navSignIn;           // 3
        return T9n.get(key, markIfMissing=false);                                                                   // 4
    }                                                                                                               // 5
};                                                                                                                  // 6
                                                                                                                    // 7
AT.prototype.atNavButtonEvents = {                                                                                  // 8
    'click #at-nav-button': function(event){                                                                        // 9
        if (Meteor.user())                                                                                          // 10
            AccountsTemplates.logout();                                                                             // 11
        else                                                                                                        // 12
            Router.go('atSignIn');                                                                                  // 13
    },                                                                                                              // 14
};                                                                                                                  // 15
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages/useraccounts:core/lib/templates_helpers/at_oauth.js                                                     //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
AT.prototype.atOauthHelpers = {                                                                                     // 1
    oauthService: function() {                                                                                      // 2
        return AccountsTemplates.oauthServices();                                                                   // 3
    },                                                                                                              // 4
};                                                                                                                  // 5
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages/useraccounts:core/lib/templates_helpers/at_pwd_form.js                                                  //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
AT.prototype.atPwdFormHelpers = {                                                                                   // 1
    disabled: function() {                                                                                          // 2
        return AccountsTemplates.disabled();                                                                        // 3
    },                                                                                                              // 4
    fields: function() {                                                                                            // 5
        var parentData = Template.parentData();                                                                     // 6
        var state = (parentData && parentData.state) || AccountsTemplates.getState();                               // 7
        return _.filter(AccountsTemplates.getFields(), function(s) {                                                // 8
            return _.contains(s.visible, state);                                                                    // 9
        });                                                                                                         // 10
    },                                                                                                              // 11
    showForgotPasswordLink: function() {                                                                            // 12
        var parentData = Template.parentData();                                                                     // 13
        var state = (parentData && parentData.state) || AccountsTemplates.getState();                               // 14
        return state === "signIn" && AccountsTemplates.options.showForgotPasswordLink;                              // 15
    },                                                                                                              // 16
};                                                                                                                  // 17
                                                                                                                    // 18
AT.prototype.atPwdFormEvents = {                                                                                    // 19
    // Form submit                                                                                                  // 20
    "submit #at-pwd-form": function(event, t) {                                                                     // 21
        event.preventDefault();                                                                                     // 22
        $("#at-btn").blur();                                                                                        // 23
                                                                                                                    // 24
        AccountsTemplates.setDisabled(true);                                                                        // 25
                                                                                                                    // 26
        var parentData = Template.parentData();                                                                     // 27
        var state = (parentData && parentData.state) || AccountsTemplates.getState();                               // 28
        var preValidation = (state !== "signIn");                                                                   // 29
                                                                                                                    // 30
        // Client-side pre-validation                                                                               // 31
        // Validates fields values                                                                                  // 32
        // NOTE: This is the only place where password validation can be enforced!                                  // 33
        var formData = {};                                                                                          // 34
        var someError = false;                                                                                      // 35
        var errList = [];                                                                                           // 36
        _.each(AccountsTemplates.getFields(), function(field){                                                      // 37
            // Considers only visible fields...                                                                     // 38
            if (!_.contains(field.visible, state))                                                                  // 39
                return;                                                                                             // 40
                                                                                                                    // 41
            var fieldId = field._id;                                                                                // 42
            var rawValue = field.getValue(t);                                                                       // 43
            var value = field.fixValue(rawValue);                                                                   // 44
            // Possibly updates the input value                                                                     // 45
            if (value !== rawValue)                                                                                 // 46
                field.setValue(t, value);                                                                           // 47
            if (value !== undefined && value !== "")                                                                // 48
                formData[fieldId] = value;                                                                          // 49
                                                                                                                    // 50
            // Validates the field value only if current state is not "signIn"                                      // 51
            if (preValidation && field.getStatus() !== false){                                                      // 52
                var validationErr = field.validate(value, "strict");                                                // 53
                if (validationErr) {                                                                                // 54
                    if (field.negativeValidation)                                                                   // 55
                        field.setError(validationErr);                                                              // 56
                    else{                                                                                           // 57
                        var fId = T9n.get(field.getDisplayName(), markIfMissing=false);                             // 58
                        //errList.push(fId + ": " + err);                                                           // 59
                        errList.push({                                                                              // 60
                            field: field.getDisplayName(),                                                          // 61
                            err: validationErr                                                                      // 62
                        });                                                                                         // 63
                    }                                                                                               // 64
                    someError = true;                                                                               // 65
                }                                                                                                   // 66
                else                                                                                                // 67
                    field.setSuccess();                                                                             // 68
            }                                                                                                       // 69
        });                                                                                                         // 70
        // Clears error and result                                                                                  // 71
        AccountsTemplates.clearError();                                                                             // 72
        AccountsTemplates.clearResult();                                                                            // 73
        // Possibly sets errors                                                                                     // 74
        if (someError){                                                                                             // 75
            if (errList.length)                                                                                     // 76
                AccountsTemplates.state.form.set("error", errList);                                                 // 77
            AccountsTemplates.setDisabled(false);                                                                   // 78
            return;                                                                                                 // 79
        }                                                                                                           // 80
                                                                                                                    // 81
        // Extracts username, email, and pwds                                                                       // 82
        var current_password = formData.current_password;                                                           // 83
        var email = formData.email;                                                                                 // 84
        var password = formData.password;                                                                           // 85
        var password_again = formData.password_again;                                                               // 86
        var username = formData.username;                                                                           // 87
        var username_and_email = formData.username_and_email;                                                       // 88
        // Clears profile data removing username, email, and pwd                                                    // 89
        delete formData.current_password;                                                                           // 90
        delete formData.email;                                                                                      // 91
        delete formData.password;                                                                                   // 92
        delete formData.password_again;                                                                             // 93
        delete formData.username;                                                                                   // 94
        delete formData.username_and_email;                                                                         // 95
                                                                                                                    // 96
        if (AccountsTemplates.options.confirmPassword){                                                             // 97
            // Checks passwords for correct match                                                                   // 98
            if (password_again && password !== password_again){                                                     // 99
                var pwd_again = AccountsTemplates.getField("password_again");                                       // 100
                if (pwd_again.negativeValidation)                                                                   // 101
                    pwd_again.setError(AccountsTemplates.texts.errors.pwdMismatch);                                 // 102
                else                                                                                                // 103
                    AccountsTemplates.state.form.set("error", [{                                                    // 104
                        field: pwd_again.getDisplayName(),                                                          // 105
                        err: AccountsTemplates.texts.errors.pwdMismatch                                             // 106
                    }]);                                                                                            // 107
                AccountsTemplates.setDisabled(false);                                                               // 108
                return;                                                                                             // 109
            }                                                                                                       // 110
        }                                                                                                           // 111
                                                                                                                    // 112
        // -------                                                                                                  // 113
        // Sign In                                                                                                  // 114
        // -------                                                                                                  // 115
        if (state === "signIn") {                                                                                   // 116
            var pwdOk = !!password;                                                                                 // 117
            var userOk = true;                                                                                      // 118
            var loginSelector;                                                                                      // 119
            if (email)                                                                                              // 120
                loginSelector = {email: email};                                                                     // 121
            else if (username)                                                                                      // 122
                loginSelector = {username: username};                                                               // 123
            else if (username_and_email)                                                                            // 124
                loginSelector = username_and_email;                                                                 // 125
            else                                                                                                    // 126
                userOk = false;                                                                                     // 127
                                                                                                                    // 128
            // Possibly exits if not both 'password' and 'username' are non-empty...                                // 129
            if (!pwdOk || !userOk){                                                                                 // 130
                AccountsTemplates.setDisabled(false);                                                               // 131
                return;                                                                                             // 132
            }                                                                                                       // 133
                                                                                                                    // 134
            return Meteor.loginWithPassword(loginSelector, password, function(error) {                              // 135
                AccountsTemplates.submitCallback(error, state);                                                     // 136
            });                                                                                                     // 137
        }                                                                                                           // 138
                                                                                                                    // 139
        // -------                                                                                                  // 140
        // Sign Up                                                                                                  // 141
        // -------                                                                                                  // 142
        if (state === "signUp") {                                                                                   // 143
            var hash = AccountsTemplates.hashPassword(password);                                                    // 144
            return Meteor.call("ATCreateUserServer", {                                                              // 145
                username: username,                                                                                 // 146
                email: email,                                                                                       // 147
                password: hash,                                                                                     // 148
                profile: formData,                                                                                  // 149
            }, function(error){                                                                                     // 150
                AccountsTemplates.submitCallback(error, undefined, function(){                                      // 151
                    if (AccountsTemplates.options.sendVerificationEmail && AccountsTemplates.options.enforceEmailVerification){
                        AccountsTemplates.state.form.set("result", AccountsTemplates.texts.info.singUpVerifyEmail); // 153
                        // Cleans up input fields' content                                                          // 154
                        _.each(AccountsTemplates.getFields(), function(field){                                      // 155
                            // Considers only visible fields...                                                     // 156
                            if (!_.contains(field.visible, state))                                                  // 157
                                return;                                                                             // 158
                            var fieldId = field._id;                                                                // 159
                            t.$("#at-field-" + fieldId).val("");                                                    // 160
                        });                                                                                         // 161
                        AccountsTemplates.setDisabled(false);                                                       // 162
                        return;                                                                                     // 163
                    }                                                                                               // 164
                    var loginSelector;                                                                              // 165
                    if (email)                                                                                      // 166
                        loginSelector = {email: email};                                                             // 167
                    else if (username)                                                                              // 168
                        loginSelector = {username: username};                                                       // 169
                    else                                                                                            // 170
                        loginSelector = username_and_email;                                                         // 171
                    Meteor.loginWithPassword(loginSelector, password, function(error) {                             // 172
                        AccountsTemplates.submitCallback(error, state, function(){                                  // 173
                            AccountsTemplates.setState("signIn");                                                   // 174
                        });                                                                                         // 175
                    });                                                                                             // 176
                });                                                                                                 // 177
            });                                                                                                     // 178
        }                                                                                                           // 179
                                                                                                                    // 180
        //----------------                                                                                          // 181
        // Forgot Password                                                                                          // 182
        //----------------                                                                                          // 183
        if (state === "forgotPwd"){                                                                                 // 184
            return Accounts.forgotPassword({                                                                        // 185
                email: email                                                                                        // 186
            }, function(error) {                                                                                    // 187
                AccountsTemplates.submitCallback(error, state, function(){                                          // 188
                    AccountsTemplates.state.form.set("result", AccountsTemplates.texts.info.emailSent);             // 189
                    t.$("#at-field-email").val("");                                                                 // 190
                });                                                                                                 // 191
            });                                                                                                     // 192
        }                                                                                                           // 193
                                                                                                                    // 194
        //--------------------------------                                                                          // 195
        // Reset Password / Enroll Account                                                                          // 196
        //--------------------------------                                                                          // 197
        if (state === "resetPwd" || state === "enrollAccount") {                                                    // 198
            return Accounts.resetPassword(AccountsTemplates.paramToken, password, function(error) {                 // 199
                AccountsTemplates.submitCallback(error, state, function(){                                          // 200
                    var pwd_field_id;                                                                               // 201
                    if (state === "resetPwd")                                                                       // 202
                        AccountsTemplates.state.form.set("result", AccountsTemplates.texts.info.pwdReset);          // 203
                    else // Enroll Account                                                                          // 204
                        AccountsTemplates.state.form.set("result", AccountsTemplates.texts.info.pwdSet);            // 205
                    t.$("#at-field-password").val("");                                                              // 206
                    if (AccountsTemplates.options.confirmPassword)                                                  // 207
                        t.$("#at-field-password_again").val("");                                                    // 208
                });                                                                                                 // 209
            });                                                                                                     // 210
        }                                                                                                           // 211
                                                                                                                    // 212
        //----------------                                                                                          // 213
        // Change Password                                                                                          // 214
        //----------------                                                                                          // 215
        if (state === "changePwd"){                                                                                 // 216
            return Accounts.changePassword(current_password, password, function(error) {                            // 217
                AccountsTemplates.submitCallback(error, state, function(){                                          // 218
                    AccountsTemplates.state.form.set("result", AccountsTemplates.texts.info.pwdChanged);            // 219
                    t.$("#at-field-current_password").val("");                                                      // 220
                    t.$("#at-field-password").val("");                                                              // 221
                    if (AccountsTemplates.options.confirmPassword)                                                  // 222
                        t.$("#at-field-password_again").val("");                                                    // 223
                });                                                                                                 // 224
            });                                                                                                     // 225
        }                                                                                                           // 226
    },                                                                                                              // 227
};                                                                                                                  // 228
                                                                                                                    // 229
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages/useraccounts:core/lib/templates_helpers/at_pwd_form_btn.js                                              //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
AT.prototype.atPwdFormBtnHelpers = {                                                                                // 1
    submitDisabled: function(){                                                                                     // 2
        var errors = _.map(AccountsTemplates.getFields(), function(field){                                          // 3
            return field.hasError();                                                                                // 4
        });                                                                                                         // 5
        if (_.some(errors))                                                                                         // 6
            return "disabled";                                                                                      // 7
    },                                                                                                              // 8
    buttonText: function() {                                                                                        // 9
        var parentData = Template.parentData();                                                                     // 10
        var state = (parentData && parentData.state) || AccountsTemplates.getState();                               // 11
        return T9n.get(AccountsTemplates.texts.button[state], markIfMissing=false);                                 // 12
    },                                                                                                              // 13
};                                                                                                                  // 14
                                                                                                                    // 15
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages/useraccounts:core/lib/templates_helpers/at_pwd_link.js                                                  //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
AT.prototype.atPwdLinkHelpers = {                                                                                   // 1
    disabled: function() {                                                                                          // 2
        return AccountsTemplates.disabled();                                                                        // 3
    },                                                                                                              // 4
    forgotPwdLink: function(){                                                                                      // 5
        return AccountsTemplates.getRoutePath("forgotPwd");                                                         // 6
    },                                                                                                              // 7
    preText: function(){                                                                                            // 8
        return T9n.get(AccountsTemplates.texts.pwdLink_pre, markIfMissing=false);                                   // 9
    },                                                                                                              // 10
    linkText: function(){                                                                                           // 11
        return T9n.get(AccountsTemplates.texts.pwdLink_link, markIfMissing=false);                                  // 12
    },                                                                                                              // 13
    suffText: function(){                                                                                           // 14
        return T9n.get(AccountsTemplates.texts.pwdLink_suff, markIfMissing=false);                                  // 15
    },                                                                                                              // 16
};                                                                                                                  // 17
                                                                                                                    // 18
AT.prototype.atPwdLinkEvents = {                                                                                    // 19
    "click #at-forgotPwd": function(event, t) {                                                                     // 20
        event.preventDefault();                                                                                     // 21
        AccountsTemplates.linkClick("forgotPwd");                                                                   // 22
    },                                                                                                              // 23
};                                                                                                                  // 24
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages/useraccounts:core/lib/templates_helpers/at_result.js                                                    //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
AT.prototype.atResultHelpers = {                                                                                    // 1
    result: function() {                                                                                            // 2
        var resultText = AccountsTemplates.state.form.get("result");                                                // 3
        if (resultText)                                                                                             // 4
            return T9n.get(resultText, markIfMissing=false);                                                        // 5
    },                                                                                                              // 6
};                                                                                                                  // 7
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages/useraccounts:core/lib/templates_helpers/at_sep.js                                                       //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
AT.prototype.atSepHelpers = {                                                                                       // 1
    sepText: function(){                                                                                            // 2
        return T9n.get(AccountsTemplates.texts.sep, markIfMissing=false);                                           // 3
    },                                                                                                              // 4
};                                                                                                                  // 5
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages/useraccounts:core/lib/templates_helpers/at_signin_link.js                                               //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
AT.prototype.atSigninLinkHelpers = {                                                                                // 1
    disabled: function() {                                                                                          // 2
        return AccountsTemplates.disabled();                                                                        // 3
    },                                                                                                              // 4
    signInLink: function(){                                                                                         // 5
        return AccountsTemplates.getRoutePath("signIn");                                                            // 6
    },                                                                                                              // 7
    preText: function(){                                                                                            // 8
        return T9n.get(AccountsTemplates.texts.signInLink_pre, markIfMissing=false);                                // 9
    },                                                                                                              // 10
    linkText: function(){                                                                                           // 11
        return T9n.get(AccountsTemplates.texts.signInLink_link, markIfMissing=false);                               // 12
    },                                                                                                              // 13
    suffText: function(){                                                                                           // 14
        return T9n.get(AccountsTemplates.texts.signInLink_suff, markIfMissing=false);                               // 15
    },                                                                                                              // 16
};                                                                                                                  // 17
                                                                                                                    // 18
AT.prototype.atSigninLinkEvents = {                                                                                 // 19
    "click #at-signIn": function(event, t) {                                                                        // 20
        event.preventDefault();                                                                                     // 21
        AccountsTemplates.linkClick("signIn");                                                                      // 22
    },                                                                                                              // 23
};                                                                                                                  // 24
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages/useraccounts:core/lib/templates_helpers/at_signup_link.js                                               //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
AT.prototype.atSignupLinkHelpers = {                                                                                // 1
    disabled: function() {                                                                                          // 2
        return AccountsTemplates.disabled();                                                                        // 3
    },                                                                                                              // 4
    signUpLink: function(){                                                                                         // 5
        return AccountsTemplates.getRoutePath("signUp");                                                            // 6
    },                                                                                                              // 7
    preText: function(){                                                                                            // 8
        return T9n.get(AccountsTemplates.texts.signUpLink_pre, markIfMissing=false);                                // 9
    },                                                                                                              // 10
    linkText: function(){                                                                                           // 11
        return T9n.get(AccountsTemplates.texts.signUpLink_link, markIfMissing=false);                               // 12
    },                                                                                                              // 13
    suffText: function(){                                                                                           // 14
        return T9n.get(AccountsTemplates.texts.signUpLink_suff, markIfMissing=false);                               // 15
    },                                                                                                              // 16
};                                                                                                                  // 17
                                                                                                                    // 18
AT.prototype.atSignupLinkEvents = {                                                                                 // 19
    "click #at-signUp": function(event, t) {                                                                        // 20
        event.preventDefault();                                                                                     // 21
        AccountsTemplates.linkClick('signUp');                                                                      // 22
    },                                                                                                              // 23
};                                                                                                                  // 24
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages/useraccounts:core/lib/templates_helpers/at_social.js                                                    //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
AT.prototype.atSocialHelpers = {                                                                                    // 1
    disabled: function() {                                                                                          // 2
        if (AccountsTemplates.disabled())                                                                           // 3
            return "disabled";                                                                                      // 4
        var user = Meteor.user();                                                                                   // 5
        if (user){                                                                                                  // 6
            var numServices = 0;                                                                                    // 7
            if (user.services)                                                                                      // 8
                numServices = _.keys(user.services).length; // including "resume"                                   // 9
            if (numServices === 2 && user.services[this._id])                                                       // 10
                return "disabled";                                                                                  // 11
        }                                                                                                           // 12
    },                                                                                                              // 13
    name: function(){                                                                                               // 14
        return this._id;                                                                                            // 15
    },                                                                                                              // 16
    iconClass: function() {                                                                                         // 17
        var ic = AccountsTemplates.texts.socialIcons[this._id];                                                     // 18
        if (!ic)                                                                                                    // 19
            ic = "fa fa-" + this._id;                                                                               // 20
        return ic;                                                                                                  // 21
    },                                                                                                              // 22
    buttonText: function() {                                                                                        // 23
        var service = this;                                                                                         // 24
        var serviceName = this._id;                                                                                 // 25
        if (serviceName === "meteor-developer")                                                                     // 26
            serviceName = "meteor";                                                                                 // 27
        serviceName = capitalize(serviceName);                                                                      // 28
        if (!service.configured)                                                                                    // 29
            return T9n.get(AccountsTemplates.texts.socialConfigure, markIfMissing=false) + " " + serviceName;       // 30
        var showAddRemove = AccountsTemplates.options.showAddRemoveServices;                                        // 31
        var user = Meteor.user();                                                                                   // 32
        if (user && showAddRemove){                                                                                 // 33
            if (user.services && user.services[this._id]){                                                          // 34
                var numServices = _.keys(user.services).length; // including "resume"                               // 35
                if (numServices === 2)                                                                              // 36
                    return serviceName;                                                                             // 37
                else                                                                                                // 38
                    return T9n.get(AccountsTemplates.texts.socialRemove, markIfMissing=false) + " " + serviceName;  // 39
            } else                                                                                                  // 40
                    return T9n.get(AccountsTemplates.texts.socialAdd, markIfMissing=false) + " " + serviceName;     // 41
        }                                                                                                           // 42
        var parentData = Template.parentData(1);                                                                    // 43
        var state = (parentData && parentData.state) || AccountsTemplates.getState();                               // 44
        var prefix = state === "signIn" ?                                                                           // 45
            T9n.get(AccountsTemplates.texts.socialSignIn, markIfMissing=false) :                                    // 46
            T9n.get(AccountsTemplates.texts.socialSignUp, markIfMissing=false);                                     // 47
        return prefix + " " + T9n.get(AccountsTemplates.texts.socialWith, markIfMissing=false) + " " + serviceName; // 48
    },                                                                                                              // 49
};                                                                                                                  // 50
                                                                                                                    // 51
AT.prototype.atSocialEvents = {                                                                                     // 52
    "click button": function(event, t) {                                                                            // 53
        event.preventDefault();                                                                                     // 54
        t.find("button").blur();                                                                                    // 55
        if (AccountsTemplates.disabled())                                                                           // 56
            return;                                                                                                 // 57
        var user = Meteor.user();                                                                                   // 58
        if (user && user.services && user.services[this._id]){                                                      // 59
            var numServices = _.keys(user.services).length; // including "resume"                                   // 60
            if (numServices === 2)                                                                                  // 61
                return;                                                                                             // 62
            else{                                                                                                   // 63
                AccountsTemplates.setDisabled(true);                                                                // 64
                Meteor.call("ATRemoveService", this._id, function(error){                                           // 65
                    AccountsTemplates.setDisabled(false);                                                           // 66
                });                                                                                                 // 67
            }                                                                                                       // 68
        } else {                                                                                                    // 69
            AccountsTemplates.setDisabled(true);                                                                    // 70
            var parentData = Template.parentData(1);                                                                // 71
            var state = (parentData && parentData.state) || AccountsTemplates.getState();                           // 72
            var serviceName = this._id;                                                                             // 73
            var methodName;                                                                                         // 74
            if (serviceName === 'meteor-developer')                                                                 // 75
                methodName = "loginWithMeteorDeveloperAccount";                                                     // 76
            else                                                                                                    // 77
                methodName = "loginWith" + capitalize(serviceName);                                                 // 78
            var loginWithService = Meteor[methodName];                                                              // 79
            options = {};                                                                                           // 80
            if (Accounts.ui) {                                                                                      // 81
                if (Accounts.ui._options.requestPermissions[serviceName]) {                                         // 82
                    options.requestPermissions = Accounts.ui._options.requestPermissions[serviceName];              // 83
                }                                                                                                   // 84
                if (Accounts.ui._options.requestOfflineToken[serviceName]) {                                        // 85
                    options.requestOfflineToken = Accounts.ui._options.requestOfflineToken[serviceName];            // 86
                }                                                                                                   // 87
            }                                                                                                       // 88
            loginWithService(options, function(err) {                                                               // 89
                AccountsTemplates.setDisabled(false);                                                               // 90
                if (err && err instanceof Accounts.LoginCancelledError) {                                           // 91
                    // do nothing                                                                                   // 92
                }                                                                                                   // 93
                else if (err && err instanceof ServiceConfiguration.ConfigError) {                                  // 94
                    if (Accounts._loginButtonsSession)                                                              // 95
                        return Accounts._loginButtonsSession.configureService(serviceName);                         // 96
                }                                                                                                   // 97
                else                                                                                                // 98
                    AccountsTemplates.submitCallback(err, state);                                                   // 99
            });                                                                                                     // 100
        }                                                                                                           // 101
    },                                                                                                              // 102
};                                                                                                                  // 103
                                                                                                                    // 104
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages/useraccounts:core/lib/templates_helpers/at_terms_link.js                                                //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
AT.prototype.atTermsLinkHelpers = {                                                                                 // 1
    disabled: function() {                                                                                          // 2
        return AccountsTemplates.disabled();                                                                        // 3
    },                                                                                                              // 4
    text: function(){                                                                                               // 5
        return T9n.get(AccountsTemplates.texts.termsPreamble, markIfMissing=false);                                 // 6
    },                                                                                                              // 7
    privacyUrl: function(){                                                                                         // 8
        return AccountsTemplates.options.privacyUrl;                                                                // 9
    },                                                                                                              // 10
    privacyLinkText: function(){                                                                                    // 11
        return T9n.get(AccountsTemplates.texts.termsPrivacy, markIfMissing=false);                                  // 12
    },                                                                                                              // 13
    showTermsAnd: function(){                                                                                       // 14
        return !!AccountsTemplates.options.privacyUrl && !!AccountsTemplates.options.termsUrl;                      // 15
    },                                                                                                              // 16
    and: function(){                                                                                                // 17
        return T9n.get(AccountsTemplates.texts.termsAnd, markIfMissing=false);                                      // 18
    },                                                                                                              // 19
    termsUrl: function(){                                                                                           // 20
        return AccountsTemplates.options.termsUrl;                                                                  // 21
    },                                                                                                              // 22
    termsLinkText: function(){                                                                                      // 23
        return T9n.get(AccountsTemplates.texts.termsTerms, markIfMissing=false);                                    // 24
    },                                                                                                              // 25
};                                                                                                                  // 26
                                                                                                                    // 27
AT.prototype.atTermsLinkEvents = {                                                                                  // 28
    "click a": function(event) {                                                                                    // 29
        if (AccountsTemplates.disabled())                                                                           // 30
            event.preventDefault();                                                                                 // 31
    },                                                                                                              // 32
};                                                                                                                  // 33
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages/useraccounts:core/lib/templates_helpers/at_title.js                                                     //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
AT.prototype.atTitleHelpers = {                                                                                     // 1
    title: function(){                                                                                              // 2
        var parentData = Template.parentData();                                                                     // 3
        var state = (parentData && parentData.state) || AccountsTemplates.getState();                               // 4
        return T9n.get(AccountsTemplates.texts.title[state], markIfMissing=false);                                  // 5
    },                                                                                                              // 6
};                                                                                                                  // 7
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages/useraccounts:core/lib/methods.js                                                                        //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
                                                                                                                    // 1
Meteor.methods({                                                                                                    // 2
    ATRemoveService: function(service_name){                                                                        // 3
        var userId = this.userId;                                                                                   // 4
        if (userId){                                                                                                // 5
            var user = Meteor.users.findOne(userId);                                                                // 6
            var numServices = _.keys(user.services).length; // including "resume"                                   // 7
            if (numServices === 2)                                                                                  // 8
                throw new Meteor.Error(403, "Cannot remove the only active service!", {});                          // 9
            var unset = {};                                                                                         // 10
            unset["services." + service_name] = "";                                                                 // 11
            Meteor.users.update(userId, {$unset: unset});                                                           // 12
        }                                                                                                           // 13
    },                                                                                                              // 14
});                                                                                                                 // 15
                                                                                                                    // 16
                                                                                                                    // 17
if (Meteor.isServer) {                                                                                              // 18
    Meteor.methods({                                                                                                // 19
        ATCreateUserServer: function(options){                                                                      // 20
            if (AccountsTemplates.options.forbidClientAccountCreation)                                              // 21
                throw new Meteor.Error(403, "Client side accounts creation is disabled!!!");                        // 22
            // createUser() does more checking.                                                                     // 23
            check(options, Object);                                                                                 // 24
            var allFieldIds = AccountsTemplates.getFieldIds();                                                      // 25
            // Picks-up whitelisted fields for profile                                                              // 26
            var profile = options.profile;                                                                          // 27
            profile = _.pick(profile, allFieldIds);                                                                 // 28
            profile = _.omit(profile, "username", "email", "password");                                             // 29
            // Validates fields" value                                                                              // 30
            var signupInfo = _.clone(profile);                                                                      // 31
            if (options.username)                                                                                   // 32
                signupInfo.username = options.username;                                                             // 33
            if (options.email)                                                                                      // 34
                signupInfo.email = options.email;                                                                   // 35
            if (options.password)                                                                                   // 36
                signupInfo.password = options.password;                                                             // 37
            var validationErrors = {};                                                                              // 38
            var someError = false;                                                                                  // 39
                                                                                                                    // 40
            // Validates fields values                                                                              // 41
            _.each(AccountsTemplates.getFields(), function(field){                                                  // 42
                var fieldId = field._id;                                                                            // 43
                var value = signupInfo[fieldId];                                                                    // 44
                if (fieldId === "password"){                                                                        // 45
                    // Can"t Pick-up password here                                                                  // 46
                    // NOTE: at this stage the password is already encripted,                                       // 47
                    //       so there is no way to validate it!!!                                                   // 48
                    check(value, Object);                                                                           // 49
                    return;                                                                                         // 50
                }                                                                                                   // 51
                var validationErr = field.validate(value, "strict");                                                // 52
                if (validationErr) {                                                                                // 53
                    validationErrors[fieldId] = validationErr;                                                      // 54
                    someError = true;                                                                               // 55
                }                                                                                                   // 56
            });                                                                                                     // 57
            if (someError)                                                                                          // 58
                throw new Meteor.Error(403, "Validation Errors", validationErrors);                                 // 59
                                                                                                                    // 60
            // Possibly removes the profile field                                                                   // 61
            if (_.isEmpty(options.profile))                                                                         // 62
                delete options.profile;                                                                             // 63
                                                                                                                    // 64
            // Create user. result contains id and token.                                                           // 65
            var userId = Accounts.createUser(options);                                                              // 66
            // safety belt. createUser is supposed to throw on error. send 500 error                                // 67
            // instead of sending a verification email with empty userid.                                           // 68
            if (! userId)                                                                                           // 69
                throw new Error("createUser failed to insert new user");                                            // 70
                                                                                                                    // 71
            // Send a email address verification email in case the context permits it                               // 72
            // and the specific configuration flag was set to true                                                  // 73
            if (options.email && AccountsTemplates.options.sendVerificationEmail)                                   // 74
                Accounts.sendVerificationEmail(userId, options.email);                                              // 75
        },                                                                                                          // 76
    });                                                                                                             // 77
}                                                                                                                   // 78
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['useraccounts:core'] = {
  AccountsTemplates: AccountsTemplates
};

})();
