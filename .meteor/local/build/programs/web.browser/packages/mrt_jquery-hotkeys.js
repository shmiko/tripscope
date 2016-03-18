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
var $ = Package.jquery.$;
var jQuery = Package.jquery.jQuery;

(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                        //
// packages/mrt:jquery-hotkeys/lib/jquery.hotkeys.js                                                      //
//                                                                                                        //
////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                          //
/*                                                                                                        // 1
 * jQuery Hotkeys Plugin                                                                                  // 2
 * Copyright 2010, John Resig                                                                             // 3
 * Dual licensed under the MIT or GPL Version 2 licenses.                                                 // 4
 *                                                                                                        // 5
 * Based upon the plugin by Tzury Bar Yochay:                                                             // 6
 * http://github.com/tzuryby/hotkeys                                                                      // 7
 *                                                                                                        // 8
 * Original idea by:                                                                                      // 9
 * Binny V A, http://www.openjs.com/scripts/events/keyboard_shortcuts/                                    // 10
*/                                                                                                        // 11
                                                                                                          // 12
/*                                                                                                        // 13
 * One small change is: now keys are passed by object { keys: '...' }                                     // 14
 * Might be useful, when you want to pass some other data to your handler                                 // 15
 */                                                                                                       // 16
                                                                                                          // 17
(function(jQuery){                                                                                        // 18
	                                                                                                         // 19
	jQuery.hotkeys = {                                                                                       // 20
		version: "0.8",                                                                                         // 21
                                                                                                          // 22
		specialKeys: {                                                                                          // 23
			8: "backspace", 9: "tab", 10: "return", 13: "return", 16: "shift", 17: "ctrl", 18: "alt", 19: "pause", // 24
			20: "capslock", 27: "esc", 32: "space", 33: "pageup", 34: "pagedown", 35: "end", 36: "home",           // 25
			37: "left", 38: "up", 39: "right", 40: "down", 45: "insert", 46: "del",                                // 26
			96: "0", 97: "1", 98: "2", 99: "3", 100: "4", 101: "5", 102: "6", 103: "7",                            // 27
			104: "8", 105: "9", 106: "*", 107: "+", 109: "-", 110: ".", 111 : "/",                                 // 28
			112: "f1", 113: "f2", 114: "f3", 115: "f4", 116: "f5", 117: "f6", 118: "f7", 119: "f8",                // 29
			120: "f9", 121: "f10", 122: "f11", 123: "f12", 144: "numlock", 145: "scroll", 186: ";", 191: "/",      // 30
			220: "\\", 222: "'", 224: "meta"                                                                       // 31
		},                                                                                                      // 32
	                                                                                                         // 33
		shiftNums: {                                                                                            // 34
			"`": "~", "1": "!", "2": "@", "3": "#", "4": "$", "5": "%", "6": "^", "7": "&",                        // 35
			"8": "*", "9": "(", "0": ")", "-": "_", "=": "+", ";": ": ", "'": "\"", ",": "<",                      // 36
			".": ">",  "/": "?",  "\\": "|"                                                                        // 37
		}                                                                                                       // 38
	};                                                                                                       // 39
                                                                                                          // 40
	function keyHandler( handleObj ) {                                                                       // 41
		if ( typeof handleObj.data === "string" ) {                                                             // 42
			handleObj.data = { keys: handleObj.data };                                                             // 43
		}                                                                                                       // 44
                                                                                                          // 45
		// Only care when a possible input has been specified                                                   // 46
		if ( !handleObj.data || !handleObj.data.keys || typeof handleObj.data.keys !== "string" ) {             // 47
			return;                                                                                                // 48
		}                                                                                                       // 49
                                                                                                          // 50
		var origHandler = handleObj.handler,                                                                    // 51
			keys = handleObj.data.keys.toLowerCase().split(" "),                                                   // 52
			textAcceptingInputTypes = ["text", "password", "number", "email", "url", "range", "date", "month", "week", "time", "datetime", "datetime-local", "search", "color", "tel"];
	                                                                                                         // 54
		handleObj.handler = function( event ) {                                                                 // 55
			// Don't fire in text-accepting inputs that we didn't directly bind to                                 // 56
			if ( this !== event.target && (/textarea|select/i.test( event.target.nodeName ) ||                     // 57
				jQuery.inArray(event.target.type, textAcceptingInputTypes) > -1 ) ) {                                 // 58
				return;                                                                                               // 59
			}                                                                                                      // 60
                                                                                                          // 61
			var special = jQuery.hotkeys.specialKeys[ event.keyCode ],                                             // 62
				// character codes are available only in keypress                                                     // 63
				character = event.type === "keypress" && String.fromCharCode( event.which ).toLowerCase(),            // 64
				modif = "", possible = {};                                                                            // 65
                                                                                                          // 66
			// check combinations (alt|ctrl|shift+anything)                                                        // 67
			if ( event.altKey && special !== "alt" ) {                                                             // 68
				modif += "alt+";                                                                                      // 69
			}                                                                                                      // 70
                                                                                                          // 71
			if ( event.ctrlKey && special !== "ctrl" ) {                                                           // 72
				modif += "ctrl+";                                                                                     // 73
			}                                                                                                      // 74
			                                                                                                       // 75
			// TODO: Need to make sure this works consistently across platforms                                    // 76
			if ( event.metaKey && !event.ctrlKey && special !== "meta" ) {                                         // 77
				modif += "meta+";                                                                                     // 78
			}                                                                                                      // 79
                                                                                                          // 80
			if ( event.shiftKey && special !== "shift" ) {                                                         // 81
				modif += "shift+";                                                                                    // 82
			}                                                                                                      // 83
                                                                                                          // 84
			if ( special ) {                                                                                       // 85
				possible[ modif + special ] = true;                                                                   // 86
			}                                                                                                      // 87
                                                                                                          // 88
			if ( character ) {                                                                                     // 89
				possible[ modif + character ] = true;                                                                 // 90
				possible[ modif + jQuery.hotkeys.shiftNums[ character ] ] = true;                                     // 91
                                                                                                          // 92
				// "$" can be triggered as "Shift+4" or "Shift+$" or just "$"                                         // 93
				if ( modif === "shift+" ) {                                                                           // 94
					possible[ jQuery.hotkeys.shiftNums[ character ] ] = true;                                            // 95
				}                                                                                                     // 96
			}                                                                                                      // 97
                                                                                                          // 98
			for ( var i = 0, l = keys.length; i < l; i++ ) {                                                       // 99
				if ( possible[ keys[i] ] ) {                                                                          // 100
					return origHandler.apply( this, arguments );                                                         // 101
				}                                                                                                     // 102
			}                                                                                                      // 103
		};                                                                                                      // 104
	}                                                                                                        // 105
                                                                                                          // 106
	jQuery.each([ "keydown", "keyup", "keypress" ], function() {                                             // 107
		jQuery.event.special[ this ] = { add: keyHandler };                                                     // 108
	});                                                                                                      // 109
                                                                                                          // 110
})( this.jQuery );                                                                                        // 111
                                                                                                          // 112
////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['mrt:jquery-hotkeys'] = {};

})();
