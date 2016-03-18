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
var _ = Package.underscore._;
var Blaze = Package.blaze.Blaze;
var UI = Package.blaze.UI;
var Handlebars = Package.blaze.Handlebars;
var HTML = Package.htmljs.HTML;

(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                          //
// packages/sacha:spin/.npm/package/node_modules/spin.js/spin.js                                            //
//                                                                                                          //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                            //
/**                                                                                                         // 1
 * Copyright (c) 2011-2014 Felix Gnass                                                                      // 2
 * Licensed under the MIT license                                                                           // 3
 */                                                                                                         // 4
(function(root, factory) {                                                                                  // 5
                                                                                                            // 6
  /* CommonJS */                                                                                            // 7
  if (typeof exports == 'object')  module.exports = factory()                                               // 8
                                                                                                            // 9
  /* AMD module */                                                                                          // 10
  else if (typeof define == 'function' && define.amd) define(factory)                                       // 11
                                                                                                            // 12
  /* Browser global */                                                                                      // 13
  else root.Spinner = factory()                                                                             // 14
}                                                                                                           // 15
(this, function() {                                                                                         // 16
  "use strict";                                                                                             // 17
                                                                                                            // 18
  var prefixes = ['webkit', 'Moz', 'ms', 'O'] /* Vendor prefixes */                                         // 19
    , animations = {} /* Animation rules keyed by their name */                                             // 20
    , useCssAnimations /* Whether to use CSS animations or setTimeout */                                    // 21
                                                                                                            // 22
  /**                                                                                                       // 23
   * Utility function to create elements. If no tag name is given,                                          // 24
   * a DIV is created. Optionally properties can be passed.                                                 // 25
   */                                                                                                       // 26
  function createEl(tag, prop) {                                                                            // 27
    var el = document.createElement(tag || 'div')                                                           // 28
      , n                                                                                                   // 29
                                                                                                            // 30
    for(n in prop) el[n] = prop[n]                                                                          // 31
    return el                                                                                               // 32
  }                                                                                                         // 33
                                                                                                            // 34
  /**                                                                                                       // 35
   * Appends children and returns the parent.                                                               // 36
   */                                                                                                       // 37
  function ins(parent /* child1, child2, ...*/) {                                                           // 38
    for (var i=1, n=arguments.length; i<n; i++)                                                             // 39
      parent.appendChild(arguments[i])                                                                      // 40
                                                                                                            // 41
    return parent                                                                                           // 42
  }                                                                                                         // 43
                                                                                                            // 44
  /**                                                                                                       // 45
   * Insert a new stylesheet to hold the @keyframe or VML rules.                                            // 46
   */                                                                                                       // 47
  var sheet = (function() {                                                                                 // 48
    var el = createEl('style', {type : 'text/css'})                                                         // 49
    ins(document.getElementsByTagName('head')[0], el)                                                       // 50
    return el.sheet || el.styleSheet                                                                        // 51
  }())                                                                                                      // 52
                                                                                                            // 53
  /**                                                                                                       // 54
   * Creates an opacity keyframe animation rule and returns its name.                                       // 55
   * Since most mobile Webkits have timing issues with animation-delay,                                     // 56
   * we create separate rules for each line/segment.                                                        // 57
   */                                                                                                       // 58
  function addAnimation(alpha, trail, i, lines) {                                                           // 59
    var name = ['opacity', trail, ~~(alpha*100), i, lines].join('-')                                        // 60
      , start = 0.01 + i/lines * 100                                                                        // 61
      , z = Math.max(1 - (1-alpha) / trail * (100-start), alpha)                                            // 62
      , prefix = useCssAnimations.substring(0, useCssAnimations.indexOf('Animation')).toLowerCase()         // 63
      , pre = prefix && '-' + prefix + '-' || ''                                                            // 64
                                                                                                            // 65
    if (!animations[name]) {                                                                                // 66
      sheet.insertRule(                                                                                     // 67
        '@' + pre + 'keyframes ' + name + '{' +                                                             // 68
        '0%{opacity:' + z + '}' +                                                                           // 69
        start + '%{opacity:' + alpha + '}' +                                                                // 70
        (start+0.01) + '%{opacity:1}' +                                                                     // 71
        (start+trail) % 100 + '%{opacity:' + alpha + '}' +                                                  // 72
        '100%{opacity:' + z + '}' +                                                                         // 73
        '}', sheet.cssRules.length)                                                                         // 74
                                                                                                            // 75
      animations[name] = 1                                                                                  // 76
    }                                                                                                       // 77
                                                                                                            // 78
    return name                                                                                             // 79
  }                                                                                                         // 80
                                                                                                            // 81
  /**                                                                                                       // 82
   * Tries various vendor prefixes and returns the first supported property.                                // 83
   */                                                                                                       // 84
  function vendor(el, prop) {                                                                               // 85
    var s = el.style                                                                                        // 86
      , pp                                                                                                  // 87
      , i                                                                                                   // 88
                                                                                                            // 89
    prop = prop.charAt(0).toUpperCase() + prop.slice(1)                                                     // 90
    for(i=0; i<prefixes.length; i++) {                                                                      // 91
      pp = prefixes[i]+prop                                                                                 // 92
      if(s[pp] !== undefined) return pp                                                                     // 93
    }                                                                                                       // 94
    if(s[prop] !== undefined) return prop                                                                   // 95
  }                                                                                                         // 96
                                                                                                            // 97
  /**                                                                                                       // 98
   * Sets multiple style properties at once.                                                                // 99
   */                                                                                                       // 100
  function css(el, prop) {                                                                                  // 101
    for (var n in prop)                                                                                     // 102
      el.style[vendor(el, n)||n] = prop[n]                                                                  // 103
                                                                                                            // 104
    return el                                                                                               // 105
  }                                                                                                         // 106
                                                                                                            // 107
  /**                                                                                                       // 108
   * Fills in default values.                                                                               // 109
   */                                                                                                       // 110
  function merge(obj) {                                                                                     // 111
    for (var i=1; i < arguments.length; i++) {                                                              // 112
      var def = arguments[i]                                                                                // 113
      for (var n in def)                                                                                    // 114
        if (obj[n] === undefined) obj[n] = def[n]                                                           // 115
    }                                                                                                       // 116
    return obj                                                                                              // 117
  }                                                                                                         // 118
                                                                                                            // 119
  /**                                                                                                       // 120
   * Returns the absolute page-offset of the given element.                                                 // 121
   */                                                                                                       // 122
  function pos(el) {                                                                                        // 123
    var o = { x:el.offsetLeft, y:el.offsetTop }                                                             // 124
    while((el = el.offsetParent))                                                                           // 125
      o.x+=el.offsetLeft, o.y+=el.offsetTop                                                                 // 126
                                                                                                            // 127
    return o                                                                                                // 128
  }                                                                                                         // 129
                                                                                                            // 130
  /**                                                                                                       // 131
   * Returns the line color from the given string or array.                                                 // 132
   */                                                                                                       // 133
  function getColor(color, idx) {                                                                           // 134
    return typeof color == 'string' ? color : color[idx % color.length]                                     // 135
  }                                                                                                         // 136
                                                                                                            // 137
  // Built-in defaults                                                                                      // 138
                                                                                                            // 139
  var defaults = {                                                                                          // 140
    lines: 12,            // The number of lines to draw                                                    // 141
    length: 7,            // The length of each line                                                        // 142
    width: 5,             // The line thickness                                                             // 143
    radius: 10,           // The radius of the inner circle                                                 // 144
    rotate: 0,            // Rotation offset                                                                // 145
    corners: 1,           // Roundness (0..1)                                                               // 146
    color: '#000',        // #rgb or #rrggbb                                                                // 147
    direction: 1,         // 1: clockwise, -1: counterclockwise                                             // 148
    speed: 1,             // Rounds per second                                                              // 149
    trail: 100,           // Afterglow percentage                                                           // 150
    opacity: 1/4,         // Opacity of the lines                                                           // 151
    fps: 20,              // Frames per second when using setTimeout()                                      // 152
    zIndex: 2e9,          // Use a high z-index by default                                                  // 153
    className: 'spinner', // CSS class to assign to the element                                             // 154
    top: '50%',           // center vertically                                                              // 155
    left: '50%',          // center horizontally                                                            // 156
    position: 'absolute'  // element position                                                               // 157
  }                                                                                                         // 158
                                                                                                            // 159
  /** The constructor */                                                                                    // 160
  function Spinner(o) {                                                                                     // 161
    this.opts = merge(o || {}, Spinner.defaults, defaults)                                                  // 162
  }                                                                                                         // 163
                                                                                                            // 164
  // Global defaults that override the built-ins:                                                           // 165
  Spinner.defaults = {}                                                                                     // 166
                                                                                                            // 167
  merge(Spinner.prototype, {                                                                                // 168
                                                                                                            // 169
    /**                                                                                                     // 170
     * Adds the spinner to the given target element. If this instance is already                            // 171
     * spinning, it is automatically removed from its previous target b calling                             // 172
     * stop() internally.                                                                                   // 173
     */                                                                                                     // 174
    spin: function(target) {                                                                                // 175
      this.stop()                                                                                           // 176
                                                                                                            // 177
      var self = this                                                                                       // 178
        , o = self.opts                                                                                     // 179
        , el = self.el = css(createEl(0, {className: o.className}), {position: o.position, width: 0, zIndex: o.zIndex})
        , mid = o.radius+o.length+o.width                                                                   // 181
                                                                                                            // 182
      css(el, {                                                                                             // 183
        left: o.left,                                                                                       // 184
        top: o.top                                                                                          // 185
      })                                                                                                    // 186
                                                                                                            // 187
      if (target) {                                                                                         // 188
        target.insertBefore(el, target.firstChild||null)                                                    // 189
      }                                                                                                     // 190
                                                                                                            // 191
      el.setAttribute('role', 'progressbar')                                                                // 192
      self.lines(el, self.opts)                                                                             // 193
                                                                                                            // 194
      if (!useCssAnimations) {                                                                              // 195
        // No CSS animation support, use setTimeout() instead                                               // 196
        var i = 0                                                                                           // 197
          , start = (o.lines - 1) * (1 - o.direction) / 2                                                   // 198
          , alpha                                                                                           // 199
          , fps = o.fps                                                                                     // 200
          , f = fps/o.speed                                                                                 // 201
          , ostep = (1-o.opacity) / (f*o.trail / 100)                                                       // 202
          , astep = f/o.lines                                                                               // 203
                                                                                                            // 204
        ;(function anim() {                                                                                 // 205
          i++;                                                                                              // 206
          for (var j = 0; j < o.lines; j++) {                                                               // 207
            alpha = Math.max(1 - (i + (o.lines - j) * astep) % f * ostep, o.opacity)                        // 208
                                                                                                            // 209
            self.opacity(el, j * o.direction + start, alpha, o)                                             // 210
          }                                                                                                 // 211
          self.timeout = self.el && setTimeout(anim, ~~(1000/fps))                                          // 212
        })()                                                                                                // 213
      }                                                                                                     // 214
      return self                                                                                           // 215
    },                                                                                                      // 216
                                                                                                            // 217
    /**                                                                                                     // 218
     * Stops and removes the Spinner.                                                                       // 219
     */                                                                                                     // 220
    stop: function() {                                                                                      // 221
      var el = this.el                                                                                      // 222
      if (el) {                                                                                             // 223
        clearTimeout(this.timeout)                                                                          // 224
        if (el.parentNode) el.parentNode.removeChild(el)                                                    // 225
        this.el = undefined                                                                                 // 226
      }                                                                                                     // 227
      return this                                                                                           // 228
    },                                                                                                      // 229
                                                                                                            // 230
    /**                                                                                                     // 231
     * Internal method that draws the individual lines. Will be overwritten                                 // 232
     * in VML fallback mode below.                                                                          // 233
     */                                                                                                     // 234
    lines: function(el, o) {                                                                                // 235
      var i = 0                                                                                             // 236
        , start = (o.lines - 1) * (1 - o.direction) / 2                                                     // 237
        , seg                                                                                               // 238
                                                                                                            // 239
      function fill(color, shadow) {                                                                        // 240
        return css(createEl(), {                                                                            // 241
          position: 'absolute',                                                                             // 242
          width: (o.length+o.width) + 'px',                                                                 // 243
          height: o.width + 'px',                                                                           // 244
          background: color,                                                                                // 245
          boxShadow: shadow,                                                                                // 246
          transformOrigin: 'left',                                                                          // 247
          transform: 'rotate(' + ~~(360/o.lines*i+o.rotate) + 'deg) translate(' + o.radius+'px' +',0)',     // 248
          borderRadius: (o.corners * o.width>>1) + 'px'                                                     // 249
        })                                                                                                  // 250
      }                                                                                                     // 251
                                                                                                            // 252
      for (; i < o.lines; i++) {                                                                            // 253
        seg = css(createEl(), {                                                                             // 254
          position: 'absolute',                                                                             // 255
          top: 1+~(o.width/2) + 'px',                                                                       // 256
          transform: o.hwaccel ? 'translate3d(0,0,0)' : '',                                                 // 257
          opacity: o.opacity,                                                                               // 258
          animation: useCssAnimations && addAnimation(o.opacity, o.trail, start + i * o.direction, o.lines) + ' ' + 1/o.speed + 's linear infinite'
        })                                                                                                  // 260
                                                                                                            // 261
        if (o.shadow) ins(seg, css(fill('#000', '0 0 4px ' + '#000'), {top: 2+'px'}))                       // 262
        ins(el, ins(seg, fill(getColor(o.color, i), '0 0 1px rgba(0,0,0,.1)')))                             // 263
      }                                                                                                     // 264
      return el                                                                                             // 265
    },                                                                                                      // 266
                                                                                                            // 267
    /**                                                                                                     // 268
     * Internal method that adjusts the opacity of a single line.                                           // 269
     * Will be overwritten in VML fallback mode below.                                                      // 270
     */                                                                                                     // 271
    opacity: function(el, i, val) {                                                                         // 272
      if (i < el.childNodes.length) el.childNodes[i].style.opacity = val                                    // 273
    }                                                                                                       // 274
                                                                                                            // 275
  })                                                                                                        // 276
                                                                                                            // 277
                                                                                                            // 278
  function initVML() {                                                                                      // 279
                                                                                                            // 280
    /* Utility function to create a VML tag */                                                              // 281
    function vml(tag, attr) {                                                                               // 282
      return createEl('<' + tag + ' xmlns="urn:schemas-microsoft.com:vml" class="spin-vml">', attr)         // 283
    }                                                                                                       // 284
                                                                                                            // 285
    // No CSS transforms but VML support, add a CSS rule for VML elements:                                  // 286
    sheet.addRule('.spin-vml', 'behavior:url(#default#VML)')                                                // 287
                                                                                                            // 288
    Spinner.prototype.lines = function(el, o) {                                                             // 289
      var r = o.length+o.width                                                                              // 290
        , s = 2*r                                                                                           // 291
                                                                                                            // 292
      function grp() {                                                                                      // 293
        return css(                                                                                         // 294
          vml('group', {                                                                                    // 295
            coordsize: s + ' ' + s,                                                                         // 296
            coordorigin: -r + ' ' + -r                                                                      // 297
          }),                                                                                               // 298
          { width: s, height: s }                                                                           // 299
        )                                                                                                   // 300
      }                                                                                                     // 301
                                                                                                            // 302
      var margin = -(o.width+o.length)*2 + 'px'                                                             // 303
        , g = css(grp(), {position: 'absolute', top: margin, left: margin})                                 // 304
        , i                                                                                                 // 305
                                                                                                            // 306
      function seg(i, dx, filter) {                                                                         // 307
        ins(g,                                                                                              // 308
          ins(css(grp(), {rotation: 360 / o.lines * i + 'deg', left: ~~dx}),                                // 309
            ins(css(vml('roundrect', {arcsize: o.corners}), {                                               // 310
                width: r,                                                                                   // 311
                height: o.width,                                                                            // 312
                left: o.radius,                                                                             // 313
                top: -o.width>>1,                                                                           // 314
                filter: filter                                                                              // 315
              }),                                                                                           // 316
              vml('fill', {color: getColor(o.color, i), opacity: o.opacity}),                               // 317
              vml('stroke', {opacity: 0}) // transparent stroke to fix color bleeding upon opacity change   // 318
            )                                                                                               // 319
          )                                                                                                 // 320
        )                                                                                                   // 321
      }                                                                                                     // 322
                                                                                                            // 323
      if (o.shadow)                                                                                         // 324
        for (i = 1; i <= o.lines; i++)                                                                      // 325
          seg(i, -2, 'progid:DXImageTransform.Microsoft.Blur(pixelradius=2,makeshadow=1,shadowopacity=.3)') // 326
                                                                                                            // 327
      for (i = 1; i <= o.lines; i++) seg(i)                                                                 // 328
      return ins(el, g)                                                                                     // 329
    }                                                                                                       // 330
                                                                                                            // 331
    Spinner.prototype.opacity = function(el, i, val, o) {                                                   // 332
      var c = el.firstChild                                                                                 // 333
      o = o.shadow && o.lines || 0                                                                          // 334
      if (c && i+o < c.childNodes.length) {                                                                 // 335
        c = c.childNodes[i+o]; c = c && c.firstChild; c = c && c.firstChild                                 // 336
        if (c) c.opacity = val                                                                              // 337
      }                                                                                                     // 338
    }                                                                                                       // 339
  }                                                                                                         // 340
                                                                                                            // 341
  var probe = css(createEl('group'), {behavior: 'url(#default#VML)'})                                       // 342
                                                                                                            // 343
  if (!vendor(probe, 'transform') && probe.adj) initVML()                                                   // 344
  else useCssAnimations = vendor(probe, 'animation')                                                        // 345
                                                                                                            // 346
  return Spinner                                                                                            // 347
                                                                                                            // 348
}));                                                                                                        // 349
                                                                                                            // 350
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                          //
// packages/sacha:spin/lib/template.spinner.js                                                              //
//                                                                                                          //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                            //
                                                                                                            // 1
Template.__define__("spinner", (function() {                                                                // 2
  var view = this;                                                                                          // 3
  return HTML.Raw('<div class="spinner-container"></div>');                                                 // 4
}));                                                                                                        // 5
                                                                                                            // 6
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                          //
// packages/sacha:spin/lib/spinner.js                                                                       //
//                                                                                                          //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                            //
Template.spinner.rendered = function() {                                                                    // 1
  var options = _.extend({}, Meteor.Spinner.options, this.data);                                            // 2
                                                                                                            // 3
  this.spinner = new Spinner(options);                                                                      // 4
  this.spinner.spin(this.firstNode);                                                                        // 5
};                                                                                                          // 6
                                                                                                            // 7
Template.spinner.destroyed = function() {                                                                   // 8
  this.spinner && this.spinner.stop();                                                                      // 9
};                                                                                                          // 10
                                                                                                            // 11
Meteor.Spinner = {                                                                                          // 12
    options: {                                                                                              // 13
        lines: 13, // The number of lines to draw                                                           // 14
        length: 8, // The length of each line                                                               // 15
        width: 3, // The line thickness                                                                     // 16
        radius: 12, // The radius of the inner circle                                                       // 17
        corners: 1, // Corner roundness (0..1)                                                              // 18
        rotate: 0, // The rotation offset                                                                   // 19
        direction: 1, // 1: clockwise, -1: counterclockwise                                                 // 20
        color: '#000', // #rgb or #rrggbb                                                                   // 21
        speed: 1.2, // Rounds per second                                                                    // 22
        trail: 60, // Afterglow percentage                                                                  // 23
        shadow: false, // Whether to render a shadow                                                        // 24
        hwaccel: false, // Whether to use hardware acceleration                                             // 25
        className: 'spinner', // The CSS class to assign to the spinner                                     // 26
        zIndex: 2e9, // The z-index (defaults to 2000000000)                                                // 27
        top: '50%', // Top position relative to parent in px                                                // 28
        left: '50%' // Left position relative to parent in px                                               // 29
    }                                                                                                       // 30
};                                                                                                          // 31
                                                                                                            // 32
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['sacha:spin'] = {};

})();
