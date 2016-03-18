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
var Cookie = Package['chuangbo:cookie'].Cookie;
var _ = Package.underscore._;
var Tracker = Package.tracker.Tracker;
var Deps = Package.tracker.Deps;
var EJSON = Package.ejson.EJSON;
var Accounts = Package['accounts-base'].Accounts;

/* Package-scope variables */
var FastRender, __init_fast_render, EncodeEJSON, DecodeEJSON, DeepExtend, deepExtend, Log;

(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                    //
// packages/meteorhacks:fast-render/lib/utils.js                                                      //
//                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                      //
EncodeEJSON = function(ejson) {                                                                       // 1
  var ejsonString = EJSON.stringify(ejson);                                                           // 2
  return encodeURI(ejsonString);                                                                      // 3
};                                                                                                    // 4
                                                                                                      // 5
DecodeEJSON = function(encodedEjson) {                                                                // 6
  var decodedEjsonString = decodeURI(encodedEjson);                                                   // 7
  return EJSON.fromJSONValue(JSON.parse(decodedEjsonString));                                         // 8
};                                                                                                    // 9
                                                                                                      // 10
////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                    //
// packages/meteorhacks:fast-render/lib/vendor/deepExtend.js                                          //
//                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                      //
// stolen from: http://stackoverflow.com/questions/9399365/deep-extend-like-jquerys-for-nodejs        // 1
DeepExtend = deepExtend = function () {                                                               // 2
  var options, name, src, copy, copyIsArray, clone, target = arguments[0] || {},                      // 3
      i = 1,                                                                                          // 4
      length = arguments.length,                                                                      // 5
      deep = false,                                                                                   // 6
      toString = Object.prototype.toString,                                                           // 7
      hasOwn = Object.prototype.hasOwnProperty,                                                       // 8
      push = Array.prototype.push,                                                                    // 9
      slice = Array.prototype.slice,                                                                  // 10
      trim = String.prototype.trim,                                                                   // 11
      indexOf = Array.prototype.indexOf,                                                              // 12
      class2type = {                                                                                  // 13
        "[object Boolean]": "boolean",                                                                // 14
        "[object Number]": "number",                                                                  // 15
        "[object String]": "string",                                                                  // 16
        "[object Function]": "function",                                                              // 17
        "[object Array]": "array",                                                                    // 18
        "[object Date]": "date",                                                                      // 19
        "[object RegExp]": "regexp",                                                                  // 20
        "[object Object]": "object"                                                                   // 21
      },                                                                                              // 22
      jQuery = {                                                                                      // 23
        isFunction: function (obj) {                                                                  // 24
          return jQuery.type(obj) === "function"                                                      // 25
        },                                                                                            // 26
        isArray: Array.isArray ||                                                                     // 27
        function (obj) {                                                                              // 28
          return jQuery.type(obj) === "array"                                                         // 29
        },                                                                                            // 30
        isWindow: function (obj) {                                                                    // 31
          return obj != null && obj == obj.window                                                     // 32
        },                                                                                            // 33
        isNumeric: function (obj) {                                                                   // 34
          return !isNaN(parseFloat(obj)) && isFinite(obj)                                             // 35
        },                                                                                            // 36
        type: function (obj) {                                                                        // 37
          return obj == null ? String(obj) : class2type[toString.call(obj)] || "object"               // 38
        },                                                                                            // 39
        isPlainObject: function (obj) {                                                               // 40
          if (!obj || jQuery.type(obj) !== "object" || obj.nodeType) {                                // 41
            return false                                                                              // 42
          }                                                                                           // 43
          try {                                                                                       // 44
            if (obj.constructor && !hasOwn.call(obj, "constructor") && !hasOwn.call(obj.constructor.prototype, "isPrototypeOf")) {
              return false                                                                            // 46
            }                                                                                         // 47
          } catch (e) {                                                                               // 48
            return false                                                                              // 49
          }                                                                                           // 50
          var key;                                                                                    // 51
          for (key in obj) {}                                                                         // 52
          return key === undefined || hasOwn.call(obj, key)                                           // 53
        }                                                                                             // 54
      };                                                                                              // 55
    if (typeof target === "boolean") {                                                                // 56
      deep = target;                                                                                  // 57
      target = arguments[1] || {};                                                                    // 58
      i = 2;                                                                                          // 59
    }                                                                                                 // 60
    if (typeof target !== "object" && !jQuery.isFunction(target)) {                                   // 61
      target = {}                                                                                     // 62
    }                                                                                                 // 63
    if (length === i) {                                                                               // 64
      target = this;                                                                                  // 65
      --i;                                                                                            // 66
    }                                                                                                 // 67
    for (i; i < length; i++) {                                                                        // 68
      if ((options = arguments[i]) != null) {                                                         // 69
        for (name in options) {                                                                       // 70
          src = target[name];                                                                         // 71
          copy = options[name];                                                                       // 72
          if (target === copy) {                                                                      // 73
            continue                                                                                  // 74
          }                                                                                           // 75
          if (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)))) { // 76
            if (copyIsArray) {                                                                        // 77
              copyIsArray = false;                                                                    // 78
              clone = src && jQuery.isArray(src) ? src : []                                           // 79
            } else {                                                                                  // 80
              clone = src && jQuery.isPlainObject(src) ? src : {};                                    // 81
            }                                                                                         // 82
            // WARNING: RECURSION                                                                     // 83
            target[name] = deepExtend(deep, clone, copy);                                             // 84
          } else if (copy !== undefined) {                                                            // 85
            target[name] = copy;                                                                      // 86
          }                                                                                           // 87
        }                                                                                             // 88
      }                                                                                               // 89
    }                                                                                                 // 90
    return target;                                                                                    // 91
  }                                                                                                   // 92
////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                    //
// packages/meteorhacks:fast-render/lib/client/log.js                                                 //
//                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                      //
Log = function function_name(message/*, args..*/) {                                                   // 1
  if(                                                                                                 // 2
    typeof console != 'undefined' &&                                                                  // 3
    typeof localStorage != 'undefined' &&                                                             // 4
    localStorage.getItem('__frlog') == "1") {                                                         // 5
    arguments[0] = arguments[0] + ":";                                                                // 6
    console.log.apply(console, arguments);                                                            // 7
  }                                                                                                   // 8
}                                                                                                     // 9
                                                                                                      // 10
Log.enable = function() {                                                                             // 11
  localStorage.setItem('__frlog', "1");                                                               // 12
};                                                                                                    // 13
                                                                                                      // 14
Log.disable = function() {                                                                            // 15
  localStorage.removeItem('__frlog');                                                                 // 16
};                                                                                                    // 17
////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                    //
// packages/meteorhacks:fast-render/lib/client/fast_render.js                                         //
//                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                      //
FastRender = {};                                                                                      // 1
                                                                                                      // 2
FastRender.completeSubscriptions = function(subscriptions) {                                          // 3
  if(typeof subscriptions == 'string') {                                                              // 4
    subscriptions = [subscriptions];                                                                  // 5
  } else if(subscriptions.constructor != Array) {                                                     // 6
    throw new Error('subscriptions params should be either a string or array of strings');            // 7
  }                                                                                                   // 8
                                                                                                      // 9
  subscriptions.forEach(function(subscription) {                                                      // 10
    __fast_render_config.subscriptions[subscription] = true;                                          // 11
  });                                                                                                 // 12
};                                                                                                    // 13
                                                                                                      // 14
FastRender.enabled = typeof __fast_render_config != 'undefined';                                      // 15
FastRender.Log = Log;                                                                                 // 16
////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                    //
// packages/meteorhacks:fast-render/lib/client/ddp_update.js                                          //
//                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                      //
if(typeof __fast_render_config == 'undefined') {                                                      // 1
  Log('NO_FAST_RENDER');                                                                              // 2
  return;                                                                                             // 3
}                                                                                                     // 4
                                                                                                      // 5
var revertedBackToOriginal = false;                                                                   // 6
var reconnecting = false;                                                                             // 7
                                                                                                      // 8
var originalLivedataData = Meteor.default_connection._livedata_data;                                  // 9
Meteor.default_connection._livedata_data = function(msg) {                                            // 10
  Log('DDP_RECIEVE', msg);                                                                            // 11
                                                                                                      // 12
                                                                                                      // 13
  // fast-render adds data manually while initializing                                                // 14
  // But when the server sends actual data via DDP, it also tries to add                              // 15
  // Then we need to detect that and alter                                                            // 16
  //                                                                                                  // 17
  // But we don't need to interfer with Meteor's simulation process                                   // 18
  // That's why we are checking for serverDocs and ignore manual handling                             // 19
  //                                                                                                  // 20
  // We don't need this logic after our special handling reverted back to                             // 21
  // original. But we can't detect when null publications completed or not                            // 22
  // That's why we need keep this logic                                                               // 23
  //                                                                                                  // 24
  // It's okay to ignore this logic after sometime, but not sure when exactly                         // 25
                                                                                                      // 26
  var serverDoc = this._getServerDoc(msg.collection, msg.id);                                         // 27
  if(!reconnecting && !serverDoc && msg.msg == 'added') {                                             // 28
    var localCollection = this._mongo_livedata_collections[msg.collection];                           // 29
    if(localCollection) {                                                                             // 30
      var existingDoc = localCollection.findOne(msg.id);                                              // 31
      if(existingDoc) {                                                                               // 32
        msg.fields = DeepExtend(true, existingDoc, msg.fields);                                       // 33
        delete msg.fields._id;                                                                        // 34
        msg.msg = "changed";                                                                          // 35
      }                                                                                               // 36
    }                                                                                                 // 37
  }                                                                                                   // 38
                                                                                                      // 39
  // if we've completed our tasks, no need of special handling                                        // 40
  if(!revertedBackToOriginal) {                                                                       // 41
                                                                                                      // 42
    // This will take care of cleaning special subscription handling                                  // 43
    // after the actual subscription comes out                                                        // 44
    if(msg.msg == 'ready' && !msg.frGen && __fast_render_config.subscriptions) {                      // 45
      msg.subs.forEach(function(subId) {                                                              // 46
        var subscription = __fast_render_config.subscriptionIdMap[subId];                             // 47
        if(subscription) {                                                                            // 48
          Log('DELETING_SUBSCRIPTION', subscription, subId);                                          // 49
          // we don't need to handle specially after this                                             // 50
          delete __fast_render_config.subscriptions[subscription];                                    // 51
          delete __fast_render_config.subscriptionIdMap[subId];                                       // 52
                                                                                                      // 53
          // need to track the loaded subscription,                                                   // 54
          // specially for handling in the ironRouter                                                 // 55
          __fast_render_config.loadedSubscriptions[subscription] = true;                              // 56
        }                                                                                             // 57
      });                                                                                             // 58
    }                                                                                                 // 59
                                                                                                      // 60
    // if all the subscriptions have been processed,                                                  // 61
    // there is no need to keep hijacking                                                             // 62
    if(EJSON.equals(__fast_render_config.subscriptions, {})) {                                        // 63
      Log('REVERTING_BACK_TO_ORIGINAL_DDP_HANDLING');                                                 // 64
      revertedBackToOriginal = true;                                                                  // 65
    }                                                                                                 // 66
  }                                                                                                   // 67
                                                                                                      // 68
  return originalLivedataData.call(this, msg);                                                        // 69
};                                                                                                    // 70
                                                                                                      // 71
var originalSend = Meteor.default_connection._send;                                                   // 72
Meteor.default_connection._send = function(msg) {                                                     // 73
  Log("DDP_SEND", msg);                                                                               // 74
                                                                                                      // 75
  // if looking for connect again to the server, we must need to revert back to                       // 76
  // original to prevent some weird DDP issues                                                        // 77
  //  normally it is already reverted, but user may added subscriptions                               // 78
  //  in server, which are not subscribed from the client                                             // 79
  if(msg.msg == 'connect' && msg.session != undefined) {                                              // 80
    revertedBackToOriginal = true;                                                                    // 81
    reconnecting = true;                                                                              // 82
  }                                                                                                   // 83
                                                                                                      // 84
  var self = this;                                                                                    // 85
                                                                                                      // 86
  // if we've completed our tasks, no need of special handling                                        // 87
  if(!revertedBackToOriginal) {                                                                       // 88
    var canSendFakeReady =                                                                            // 89
      msg.msg == 'sub' &&                                                                             // 90
      __fast_render_config.subscriptions &&                                                           // 91
      __fast_render_config.subscriptions[msg.name];                                                   // 92
                                                                                                      // 93
    if(canSendFakeReady) {                                                                            // 94
      Log('FAKE_SUB_READY', msg.name);                                                                // 95
      self._livedata_data({msg:"ready",subs:[msg.id], frGen: true});                                  // 96
      // add the messageId to be handled later                                                        // 97
      __fast_render_config.subscriptionIdMap[msg.id] = msg.name;                                      // 98
    }                                                                                                 // 99
  }                                                                                                   // 100
                                                                                                      // 101
                                                                                                      // 102
  return originalSend.call(this, msg);                                                                // 103
};                                                                                                    // 104
                                                                                                      // 105
////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                    //
// packages/meteorhacks:fast-render/lib/client/data_handler.js                                        //
//                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                      //
__init_fast_render = function(ejsonJson) {                                                            // 1
  // server sends serverRoutePath's encoded to version to prevent XSS                                 // 2
  // see more: http://goo.gl/UNrfXs                                                                   // 3
  var url = __fast_render_config.serverRoutePath;                                                     // 4
  __fast_render_config.serverRoutePath = decodeURI(url);                                              // 5
                                                                                                      // 6
  var initData = DecodeEJSON(ejsonJson);                                                              // 7
                                                                                                      // 8
  //loading data into the collection                                                                  // 9
  for(var collName in initData.collectionData) {                                                      // 10
    var collData = initData.collectionData[collName];                                                 // 11
    collData.forEach(function(itemList) {                                                             // 12
      itemList.forEach(function(item) {                                                               // 13
        var localCollection = Meteor.default_connection._mongo_livedata_collections[collName];        // 14
        if(localCollection) {                                                                         // 15
          var exitingDoc = localCollection.findOne(item._id);                                         // 16
          if(exitingDoc) {                                                                            // 17
            DeepExtend(true, exitingDoc, item);                                                       // 18
            localCollection.update(item._id, exitingDoc);                                             // 19
          } else {                                                                                    // 20
            localCollection.insert(item);                                                             // 21
          }                                                                                           // 22
        } else {                                                                                      // 23
          console.warn('fast-route data found, but no collection exists for: ' + collName);           // 24
        }                                                                                             // 25
      });                                                                                             // 26
    });                                                                                               // 27
  }                                                                                                   // 28
}                                                                                                     // 29
                                                                                                      // 30
////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                    //
// packages/meteorhacks:fast-render/lib/client/iron_router_support.js                                 //
//                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                      //
if(!Package['iron:router']) return;                                                                   // 1
                                                                                                      // 2
//track whether inside the ironRouter or not                                                          // 3
//useful for identifying this inside the Meteor.subscribe                                             // 4
var insideIronRouter = new Meteor.EnvironmentVariable();                                              // 5
var RouteController = FastRender.RouteController = Package['iron:router'].RouteController;            // 6
                                                                                                      // 7
//IR 0.8 comes with method named `_run` instead of `run`                                              // 8
var runMethodName = RouteController.prototype._run? "_run": "run";                                    // 9
var originalRun = RouteController.prototype[runMethodName];                                           // 10
RouteController.prototype[runMethodName] = function() {                                               // 11
  var self = this;                                                                                    // 12
  if(FastRender.enabled) {                                                                            // 13
    insideIronRouter.withValue(true, function() {                                                     // 14
      originalRun.call(self);                                                                         // 15
    });                                                                                               // 16
  } else {                                                                                            // 17
    originalRun.call(this);                                                                           // 18
  }                                                                                                   // 19
};                                                                                                    // 20
                                                                                                      // 21
var originalSubscribe = Meteor.subscribe;                                                             // 22
Meteor.subscribe = function(subscription) {                                                           // 23
  var condition =                                                                                     // 24
    FastRender.enabled &&                                                                             // 25
    //need to inside the ironRouter                                                                   // 26
    insideIronRouter.get() &&                                                                         // 27
    //path loaded from the server and the local Router path should be the same                        // 28
    //We can't simply use Router.current().path, it will give some weird deps behaviour               // 29
    //which will result subscriptions stop everytime even they are not meant to                       // 30
    getUri() == __fast_render_config.serverRoutePath &&                                               // 31
    //fast render have been registered to handle this subscription                                    // 32
    __fast_render_config.subscriptions[subscription] &&                                               // 33
    //subscription not yet actually loaded (this may call multiple times)                             // 34
    !__fast_render_config.loadedSubscriptions[subscription]                                           // 35
                                                                                                      // 36
  if(condition) {                                                                                     // 37
    Log('APPLY_IR_SUB_CORRECTIONS', subscription);                                                    // 38
    originalSubscribe.apply(this, arguments);                                                         // 39
                                                                                                      // 40
    //ironRouter call .ready() and and if it's true he think subscription is completed                // 41
    return {                                                                                          // 42
      ready: function() {                                                                             // 43
        return true;                                                                                  // 44
      }                                                                                               // 45
    }                                                                                                 // 46
  } else {                                                                                            // 47
    return originalSubscribe.apply(this, arguments);                                                  // 48
  }                                                                                                   // 49
};                                                                                                    // 50
                                                                                                      // 51
function getUri() {                                                                                   // 52
  var url = document.createElement('a');                                                              // 53
  url.href = location.href;                                                                           // 54
                                                                                                      // 55
  var uri = url.pathname;                                                                             // 56
  uri += (url.search)? url.search: "";                                                                // 57
                                                                                                      // 58
  return uri;                                                                                         // 59
}                                                                                                     // 60
                                                                                                      // 61
////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                    //
// packages/meteorhacks:fast-render/lib/client/auth.js                                                //
//                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                      //
if(typeof Meteor.user == 'function') {                                                                // 1
  Tracker.autorun(function() {                                                                        // 2
    var user = Meteor.user();                                                                         // 3
    var status = Meteor.status();                                                                     // 4
                                                                                                      // 5
    //we don't need to clean cookie if we've not connected yet                                        // 6
    //this is very usefull when testing with connecting a bad ddp connection                          // 7
    if(status.connected) {                                                                            // 8
      if(user) {                                                                                      // 9
        var loginToken = Meteor._localStorage.getItem('Meteor.loginToken');                           // 10
        var loginTokenExpires = new Date(Meteor._localStorage.getItem('Meteor.loginTokenExpires'));   // 11
                                                                                                      // 12
        Cookie.set('meteor_login_token', loginToken, {                                                // 13
          path: '/',                                                                                  // 14
          expires: loginTokenExpires                                                                  // 15
        });                                                                                           // 16
      } else {                                                                                        // 17
        Cookie.set('meteor_login_token', loginToken, {                                                // 18
          path: '/',                                                                                  // 19
          expires: -1                                                                                 // 20
        });                                                                                           // 21
      }                                                                                               // 22
    }                                                                                                 // 23
  });                                                                                                 // 24
} else {                                                                                              // 25
  //make sure cookie is deleted (if previously setted)                                                // 26
  Cookie.set('meteor_login_token', loginToken, {                                                      // 27
    path: '/',                                                                                        // 28
    expires: -1                                                                                       // 29
  });                                                                                                 // 30
}                                                                                                     // 31
                                                                                                      // 32
////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['meteorhacks:fast-render'] = {
  FastRender: FastRender,
  __init_fast_render: __init_fast_render
};

})();
