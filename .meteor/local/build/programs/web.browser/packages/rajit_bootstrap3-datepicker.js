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

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                            //
// packages/rajit:bootstrap3-datepicker/lib/bootstrap-datepicker/js/bootstrap-datepicker.js                   //
//                                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                              //
/* =========================================================                                                  // 1
 * bootstrap-datepicker.js                                                                                    // 2
 * Repo: https://github.com/eternicode/bootstrap-datepicker/                                                  // 3
 * Demo: http://eternicode.github.io/bootstrap-datepicker/                                                    // 4
 * Docs: http://bootstrap-datepicker.readthedocs.org/                                                         // 5
 * Forked from http://www.eyecon.ro/bootstrap-datepicker                                                      // 6
 * =========================================================                                                  // 7
 * Started by Stefan Petre; improvements by Andrew Rowls + contributors                                       // 8
 *                                                                                                            // 9
 * Licensed under the Apache License, Version 2.0 (the "License");                                            // 10
 * you may not use this file except in compliance with the License.                                           // 11
 * You may obtain a copy of the License at                                                                    // 12
 *                                                                                                            // 13
 * http://www.apache.org/licenses/LICENSE-2.0                                                                 // 14
 *                                                                                                            // 15
 * Unless required by applicable law or agreed to in writing, software                                        // 16
 * distributed under the License is distributed on an "AS IS" BASIS,                                          // 17
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.                                   // 18
 * See the License for the specific language governing permissions and                                        // 19
 * limitations under the License.                                                                             // 20
 * ========================================================= */                                               // 21
                                                                                                              // 22
(function($, undefined){                                                                                      // 23
                                                                                                              // 24
	var $window = $(window);                                                                                     // 25
                                                                                                              // 26
	function UTCDate(){                                                                                          // 27
		return new Date(Date.UTC.apply(Date, arguments));                                                           // 28
	}                                                                                                            // 29
	function UTCToday(){                                                                                         // 30
		var today = new Date();                                                                                     // 31
		return UTCDate(today.getFullYear(), today.getMonth(), today.getDate());                                     // 32
	}                                                                                                            // 33
	function alias(method){                                                                                      // 34
		return function(){                                                                                          // 35
			return this[method].apply(this, arguments);                                                                // 36
		};                                                                                                          // 37
	}                                                                                                            // 38
                                                                                                              // 39
	var DateArray = (function(){                                                                                 // 40
		var extras = {                                                                                              // 41
			get: function(i){                                                                                          // 42
				return this.slice(i)[0];                                                                                  // 43
			},                                                                                                         // 44
			contains: function(d){                                                                                     // 45
				// Array.indexOf is not cross-browser;                                                                    // 46
				// $.inArray doesn't work with Dates                                                                      // 47
				var val = d && d.valueOf();                                                                               // 48
				for (var i=0, l=this.length; i < l; i++)                                                                  // 49
					if (this[i].valueOf() === val)                                                                           // 50
						return i;                                                                                               // 51
				return -1;                                                                                                // 52
			},                                                                                                         // 53
			remove: function(i){                                                                                       // 54
				this.splice(i,1);                                                                                         // 55
			},                                                                                                         // 56
			replace: function(new_array){                                                                              // 57
				if (!new_array)                                                                                           // 58
					return;                                                                                                  // 59
				if (!$.isArray(new_array))                                                                                // 60
					new_array = [new_array];                                                                                 // 61
				this.clear();                                                                                             // 62
				this.push.apply(this, new_array);                                                                         // 63
			},                                                                                                         // 64
			clear: function(){                                                                                         // 65
				this.splice(0);                                                                                           // 66
			},                                                                                                         // 67
			copy: function(){                                                                                          // 68
				var a = new DateArray();                                                                                  // 69
				a.replace(this);                                                                                          // 70
				return a;                                                                                                 // 71
			}                                                                                                          // 72
		};                                                                                                          // 73
                                                                                                              // 74
		return function(){                                                                                          // 75
			var a = [];                                                                                                // 76
			a.push.apply(a, arguments);                                                                                // 77
			$.extend(a, extras);                                                                                       // 78
			return a;                                                                                                  // 79
		};                                                                                                          // 80
	})();                                                                                                        // 81
                                                                                                              // 82
                                                                                                              // 83
	// Picker object                                                                                             // 84
                                                                                                              // 85
	var Datepicker = function(element, options){                                                                 // 86
		this.dates = new DateArray();                                                                               // 87
		this.viewDate = UTCToday();                                                                                 // 88
		this.focusDate = null;                                                                                      // 89
                                                                                                              // 90
		this._process_options(options);                                                                             // 91
                                                                                                              // 92
		this.element = $(element);                                                                                  // 93
		this.isInline = false;                                                                                      // 94
		this.isInput = this.element.is('input');                                                                    // 95
		this.component = this.element.is('.date') ? this.element.find('.add-on, .input-group-addon, .btn') : false; // 96
		this.hasInput = this.component && this.element.find('input').length;                                        // 97
		if (this.component && this.component.length === 0)                                                          // 98
			this.component = false;                                                                                    // 99
                                                                                                              // 100
		this.picker = $(DPGlobal.template);                                                                         // 101
		this._buildEvents();                                                                                        // 102
		this._attachEvents();                                                                                       // 103
                                                                                                              // 104
		if (this.isInline){                                                                                         // 105
			this.picker.addClass('datepicker-inline').appendTo(this.element);                                          // 106
		}                                                                                                           // 107
		else {                                                                                                      // 108
			this.picker.addClass('datepicker-dropdown dropdown-menu');                                                 // 109
		}                                                                                                           // 110
                                                                                                              // 111
		if (this.o.rtl){                                                                                            // 112
			this.picker.addClass('datepicker-rtl');                                                                    // 113
		}                                                                                                           // 114
                                                                                                              // 115
		this.viewMode = this.o.startView;                                                                           // 116
                                                                                                              // 117
		if (this.o.calendarWeeks)                                                                                   // 118
			this.picker.find('tfoot th.today')                                                                         // 119
						.attr('colspan', function(i, val){                                                                      // 120
							return parseInt(val) + 1;                                                                              // 121
						});                                                                                                     // 122
                                                                                                              // 123
		this._allow_update = false;                                                                                 // 124
                                                                                                              // 125
		this.setStartDate(this._o.startDate);                                                                       // 126
		this.setEndDate(this._o.endDate);                                                                           // 127
		this.setDaysOfWeekDisabled(this.o.daysOfWeekDisabled);                                                      // 128
                                                                                                              // 129
		this.fillDow();                                                                                             // 130
		this.fillMonths();                                                                                          // 131
                                                                                                              // 132
		this._allow_update = true;                                                                                  // 133
                                                                                                              // 134
		this.update();                                                                                              // 135
		this.showMode();                                                                                            // 136
                                                                                                              // 137
		if (this.isInline){                                                                                         // 138
			this.show();                                                                                               // 139
		}                                                                                                           // 140
	};                                                                                                           // 141
                                                                                                              // 142
	Datepicker.prototype = {                                                                                     // 143
		constructor: Datepicker,                                                                                    // 144
                                                                                                              // 145
		_process_options: function(opts){                                                                           // 146
			// Store raw options for reference                                                                         // 147
			this._o = $.extend({}, this._o, opts);                                                                     // 148
			// Processed options                                                                                       // 149
			var o = this.o = $.extend({}, this._o);                                                                    // 150
                                                                                                              // 151
			// Check if "de-DE" style date is available, if not language should                                        // 152
			// fallback to 2 letter code eg "de"                                                                       // 153
			var lang = o.language;                                                                                     // 154
			if (!dates[lang]){                                                                                         // 155
				lang = lang.split('-')[0];                                                                                // 156
				if (!dates[lang])                                                                                         // 157
					lang = defaults.language;                                                                                // 158
			}                                                                                                          // 159
			o.language = lang;                                                                                         // 160
                                                                                                              // 161
			switch (o.startView){                                                                                      // 162
				case 2:                                                                                                   // 163
				case 'decade':                                                                                            // 164
					o.startView = 2;                                                                                         // 165
					break;                                                                                                   // 166
				case 1:                                                                                                   // 167
				case 'year':                                                                                              // 168
					o.startView = 1;                                                                                         // 169
					break;                                                                                                   // 170
				default:                                                                                                  // 171
					o.startView = 0;                                                                                         // 172
			}                                                                                                          // 173
                                                                                                              // 174
			switch (o.minViewMode){                                                                                    // 175
				case 1:                                                                                                   // 176
				case 'months':                                                                                            // 177
					o.minViewMode = 1;                                                                                       // 178
					break;                                                                                                   // 179
				case 2:                                                                                                   // 180
				case 'years':                                                                                             // 181
					o.minViewMode = 2;                                                                                       // 182
					break;                                                                                                   // 183
				default:                                                                                                  // 184
					o.minViewMode = 0;                                                                                       // 185
			}                                                                                                          // 186
                                                                                                              // 187
			o.startView = Math.max(o.startView, o.minViewMode);                                                        // 188
                                                                                                              // 189
			// true, false, or Number > 0                                                                              // 190
			if (o.multidate !== true){                                                                                 // 191
				o.multidate = Number(o.multidate) || false;                                                               // 192
				if (o.multidate !== false)                                                                                // 193
					o.multidate = Math.max(0, o.multidate);                                                                  // 194
				else                                                                                                      // 195
					o.multidate = 1;                                                                                         // 196
			}                                                                                                          // 197
			o.multidateSeparator = String(o.multidateSeparator);                                                       // 198
                                                                                                              // 199
			o.weekStart %= 7;                                                                                          // 200
			o.weekEnd = ((o.weekStart + 6) % 7);                                                                       // 201
                                                                                                              // 202
			var format = DPGlobal.parseFormat(o.format);                                                               // 203
			if (o.startDate !== -Infinity){                                                                            // 204
				if (!!o.startDate){                                                                                       // 205
					if (o.startDate instanceof Date)                                                                         // 206
						o.startDate = this._local_to_utc(this._zero_time(o.startDate));                                         // 207
					else                                                                                                     // 208
						o.startDate = DPGlobal.parseDate(o.startDate, format, o.language);                                      // 209
				}                                                                                                         // 210
				else {                                                                                                    // 211
					o.startDate = -Infinity;                                                                                 // 212
				}                                                                                                         // 213
			}                                                                                                          // 214
			if (o.endDate !== Infinity){                                                                               // 215
				if (!!o.endDate){                                                                                         // 216
					if (o.endDate instanceof Date)                                                                           // 217
						o.endDate = this._local_to_utc(this._zero_time(o.endDate));                                             // 218
					else                                                                                                     // 219
						o.endDate = DPGlobal.parseDate(o.endDate, format, o.language);                                          // 220
				}                                                                                                         // 221
				else {                                                                                                    // 222
					o.endDate = Infinity;                                                                                    // 223
				}                                                                                                         // 224
			}                                                                                                          // 225
                                                                                                              // 226
			o.daysOfWeekDisabled = o.daysOfWeekDisabled||[];                                                           // 227
			if (!$.isArray(o.daysOfWeekDisabled))                                                                      // 228
				o.daysOfWeekDisabled = o.daysOfWeekDisabled.split(/[,\s]*/);                                              // 229
			o.daysOfWeekDisabled = $.map(o.daysOfWeekDisabled, function(d){                                            // 230
				return parseInt(d, 10);                                                                                   // 231
			});                                                                                                        // 232
                                                                                                              // 233
			var plc = String(o.orientation).toLowerCase().split(/\s+/g),                                               // 234
				_plc = o.orientation.toLowerCase();                                                                       // 235
			plc = $.grep(plc, function(word){                                                                          // 236
				return (/^auto|left|right|top|bottom$/).test(word);                                                       // 237
			});                                                                                                        // 238
			o.orientation = {x: 'auto', y: 'auto'};                                                                    // 239
			if (!_plc || _plc === 'auto')                                                                              // 240
				; // no action                                                                                            // 241
			else if (plc.length === 1){                                                                                // 242
				switch (plc[0]){                                                                                          // 243
					case 'top':                                                                                              // 244
					case 'bottom':                                                                                           // 245
						o.orientation.y = plc[0];                                                                               // 246
						break;                                                                                                  // 247
					case 'left':                                                                                             // 248
					case 'right':                                                                                            // 249
						o.orientation.x = plc[0];                                                                               // 250
						break;                                                                                                  // 251
				}                                                                                                         // 252
			}                                                                                                          // 253
			else {                                                                                                     // 254
				_plc = $.grep(plc, function(word){                                                                        // 255
					return (/^left|right$/).test(word);                                                                      // 256
				});                                                                                                       // 257
				o.orientation.x = _plc[0] || 'auto';                                                                      // 258
                                                                                                              // 259
				_plc = $.grep(plc, function(word){                                                                        // 260
					return (/^top|bottom$/).test(word);                                                                      // 261
				});                                                                                                       // 262
				o.orientation.y = _plc[0] || 'auto';                                                                      // 263
			}                                                                                                          // 264
		},                                                                                                          // 265
		_events: [],                                                                                                // 266
		_secondaryEvents: [],                                                                                       // 267
		_applyEvents: function(evs){                                                                                // 268
			for (var i=0, el, ch, ev; i < evs.length; i++){                                                            // 269
				el = evs[i][0];                                                                                           // 270
				if (evs[i].length === 2){                                                                                 // 271
					ch = undefined;                                                                                          // 272
					ev = evs[i][1];                                                                                          // 273
				}                                                                                                         // 274
				else if (evs[i].length === 3){                                                                            // 275
					ch = evs[i][1];                                                                                          // 276
					ev = evs[i][2];                                                                                          // 277
				}                                                                                                         // 278
				el.on(ev, ch);                                                                                            // 279
			}                                                                                                          // 280
		},                                                                                                          // 281
		_unapplyEvents: function(evs){                                                                              // 282
			for (var i=0, el, ev, ch; i < evs.length; i++){                                                            // 283
				el = evs[i][0];                                                                                           // 284
				if (evs[i].length === 2){                                                                                 // 285
					ch = undefined;                                                                                          // 286
					ev = evs[i][1];                                                                                          // 287
				}                                                                                                         // 288
				else if (evs[i].length === 3){                                                                            // 289
					ch = evs[i][1];                                                                                          // 290
					ev = evs[i][2];                                                                                          // 291
				}                                                                                                         // 292
				el.off(ev, ch);                                                                                           // 293
			}                                                                                                          // 294
		},                                                                                                          // 295
		_buildEvents: function(){                                                                                   // 296
			if (this.isInput){ // single input                                                                         // 297
				this._events = [                                                                                          // 298
					[this.element, {                                                                                         // 299
						focus: $.proxy(this.show, this),                                                                        // 300
						keyup: $.proxy(function(e){                                                                             // 301
							if ($.inArray(e.keyCode, [27,37,39,38,40,32,13,9]) === -1)                                             // 302
								this.update();                                                                                        // 303
						}, this),                                                                                               // 304
						keydown: $.proxy(this.keydown, this)                                                                    // 305
					}]                                                                                                       // 306
				];                                                                                                        // 307
			}                                                                                                          // 308
			else if (this.component && this.hasInput){ // component: input + button                                    // 309
				this._events = [                                                                                          // 310
					// For components that are not readonly, allow keyboard nav                                              // 311
					[this.element.find('input'), {                                                                           // 312
						focus: $.proxy(this.show, this),                                                                        // 313
						keyup: $.proxy(function(e){                                                                             // 314
							if ($.inArray(e.keyCode, [27,37,39,38,40,32,13,9]) === -1)                                             // 315
								this.update();                                                                                        // 316
						}, this),                                                                                               // 317
						keydown: $.proxy(this.keydown, this)                                                                    // 318
					}],                                                                                                      // 319
					[this.component, {                                                                                       // 320
						click: $.proxy(this.show, this)                                                                         // 321
					}]                                                                                                       // 322
				];                                                                                                        // 323
			}                                                                                                          // 324
			else if (this.element.is('div')){  // inline datepicker                                                    // 325
				this.isInline = true;                                                                                     // 326
			}                                                                                                          // 327
			else {                                                                                                     // 328
				this._events = [                                                                                          // 329
					[this.element, {                                                                                         // 330
						click: $.proxy(this.show, this)                                                                         // 331
					}]                                                                                                       // 332
				];                                                                                                        // 333
			}                                                                                                          // 334
			this._events.push(                                                                                         // 335
				// Component: listen for blur on element descendants                                                      // 336
				[this.element, '*', {                                                                                     // 337
					blur: $.proxy(function(e){                                                                               // 338
						this._focused_from = e.target;                                                                          // 339
					}, this)                                                                                                 // 340
				}],                                                                                                       // 341
				// Input: listen for blur on element                                                                      // 342
				[this.element, {                                                                                          // 343
					blur: $.proxy(function(e){                                                                               // 344
						this._focused_from = e.target;                                                                          // 345
					}, this)                                                                                                 // 346
				}]                                                                                                        // 347
			);                                                                                                         // 348
                                                                                                              // 349
			this._secondaryEvents = [                                                                                  // 350
				[this.picker, {                                                                                           // 351
					click: $.proxy(this.click, this)                                                                         // 352
				}],                                                                                                       // 353
				[$(window), {                                                                                             // 354
					resize: $.proxy(this.place, this)                                                                        // 355
				}],                                                                                                       // 356
				[$(document), {                                                                                           // 357
					'mousedown touchstart': $.proxy(function(e){                                                             // 358
						// Clicked outside the datepicker, hide it                                                              // 359
						if (!(                                                                                                  // 360
							this.element.is(e.target) ||                                                                           // 361
							this.element.find(e.target).length ||                                                                  // 362
							this.picker.is(e.target) ||                                                                            // 363
							this.picker.find(e.target).length                                                                      // 364
						)){                                                                                                     // 365
							this.hide();                                                                                           // 366
						}                                                                                                       // 367
					}, this)                                                                                                 // 368
				}]                                                                                                        // 369
			];                                                                                                         // 370
		},                                                                                                          // 371
		_attachEvents: function(){                                                                                  // 372
			this._detachEvents();                                                                                      // 373
			this._applyEvents(this._events);                                                                           // 374
		},                                                                                                          // 375
		_detachEvents: function(){                                                                                  // 376
			this._unapplyEvents(this._events);                                                                         // 377
		},                                                                                                          // 378
		_attachSecondaryEvents: function(){                                                                         // 379
			this._detachSecondaryEvents();                                                                             // 380
			this._applyEvents(this._secondaryEvents);                                                                  // 381
		},                                                                                                          // 382
		_detachSecondaryEvents: function(){                                                                         // 383
			this._unapplyEvents(this._secondaryEvents);                                                                // 384
		},                                                                                                          // 385
		_trigger: function(event, altdate){                                                                         // 386
			var date = altdate || this.dates.get(-1),                                                                  // 387
				local_date = this._utc_to_local(date);                                                                    // 388
                                                                                                              // 389
			this.element.trigger({                                                                                     // 390
				type: event,                                                                                              // 391
				date: local_date,                                                                                         // 392
				dates: $.map(this.dates, this._utc_to_local),                                                             // 393
				format: $.proxy(function(ix, format){                                                                     // 394
					if (arguments.length === 0){                                                                             // 395
						ix = this.dates.length - 1;                                                                             // 396
						format = this.o.format;                                                                                 // 397
					}                                                                                                        // 398
					else if (typeof ix === 'string'){                                                                        // 399
						format = ix;                                                                                            // 400
						ix = this.dates.length - 1;                                                                             // 401
					}                                                                                                        // 402
					format = format || this.o.format;                                                                        // 403
					var date = this.dates.get(ix);                                                                           // 404
					return DPGlobal.formatDate(date, format, this.o.language);                                               // 405
				}, this)                                                                                                  // 406
			});                                                                                                        // 407
		},                                                                                                          // 408
                                                                                                              // 409
		show: function(){                                                                                           // 410
			if (!this.isInline)                                                                                        // 411
				this.picker.appendTo('body');                                                                             // 412
			this.picker.show();                                                                                        // 413
			this.place();                                                                                              // 414
			this._attachSecondaryEvents();                                                                             // 415
			this._trigger('show');                                                                                     // 416
		},                                                                                                          // 417
                                                                                                              // 418
		hide: function(){                                                                                           // 419
			if (this.isInline)                                                                                         // 420
				return;                                                                                                   // 421
			if (!this.picker.is(':visible'))                                                                           // 422
				return;                                                                                                   // 423
			this.focusDate = null;                                                                                     // 424
			this.picker.hide().detach();                                                                               // 425
			this._detachSecondaryEvents();                                                                             // 426
			this.viewMode = this.o.startView;                                                                          // 427
			this.showMode();                                                                                           // 428
                                                                                                              // 429
			if (                                                                                                       // 430
				this.o.forceParse &&                                                                                      // 431
				(                                                                                                         // 432
					this.isInput && this.element.val() ||                                                                    // 433
					this.hasInput && this.element.find('input').val()                                                        // 434
				)                                                                                                         // 435
			)                                                                                                          // 436
				this.setValue();                                                                                          // 437
			this._trigger('hide');                                                                                     // 438
		},                                                                                                          // 439
                                                                                                              // 440
		remove: function(){                                                                                         // 441
			this.hide();                                                                                               // 442
			this._detachEvents();                                                                                      // 443
			this._detachSecondaryEvents();                                                                             // 444
			this.picker.remove();                                                                                      // 445
			delete this.element.data().datepicker;                                                                     // 446
			if (!this.isInput){                                                                                        // 447
				delete this.element.data().date;                                                                          // 448
			}                                                                                                          // 449
		},                                                                                                          // 450
                                                                                                              // 451
		_utc_to_local: function(utc){                                                                               // 452
			return utc && new Date(utc.getTime() + (utc.getTimezoneOffset()*60000));                                   // 453
		},                                                                                                          // 454
		_local_to_utc: function(local){                                                                             // 455
			return local && new Date(local.getTime() - (local.getTimezoneOffset()*60000));                             // 456
		},                                                                                                          // 457
		_zero_time: function(local){                                                                                // 458
			return local && new Date(local.getFullYear(), local.getMonth(), local.getDate());                          // 459
		},                                                                                                          // 460
		_zero_utc_time: function(utc){                                                                              // 461
			return utc && new Date(Date.UTC(utc.getUTCFullYear(), utc.getUTCMonth(), utc.getUTCDate()));               // 462
		},                                                                                                          // 463
                                                                                                              // 464
		getDates: function(){                                                                                       // 465
			return $.map(this.dates, this._utc_to_local);                                                              // 466
		},                                                                                                          // 467
                                                                                                              // 468
		getUTCDates: function(){                                                                                    // 469
			return $.map(this.dates, function(d){                                                                      // 470
				return new Date(d);                                                                                       // 471
			});                                                                                                        // 472
		},                                                                                                          // 473
                                                                                                              // 474
		getDate: function(){                                                                                        // 475
			return this._utc_to_local(this.getUTCDate());                                                              // 476
		},                                                                                                          // 477
                                                                                                              // 478
		getUTCDate: function(){                                                                                     // 479
			return new Date(this.dates.get(-1));                                                                       // 480
		},                                                                                                          // 481
                                                                                                              // 482
		setDates: function(){                                                                                       // 483
			var args = $.isArray(arguments[0]) ? arguments[0] : arguments;                                             // 484
			this.update.apply(this, args);                                                                             // 485
			this._trigger('changeDate');                                                                               // 486
			this.setValue();                                                                                           // 487
		},                                                                                                          // 488
                                                                                                              // 489
		setUTCDates: function(){                                                                                    // 490
			var args = $.isArray(arguments[0]) ? arguments[0] : arguments;                                             // 491
			this.update.apply(this, $.map(args, this._utc_to_local));                                                  // 492
			this._trigger('changeDate');                                                                               // 493
			this.setValue();                                                                                           // 494
		},                                                                                                          // 495
                                                                                                              // 496
		setDate: alias('setDates'),                                                                                 // 497
		setUTCDate: alias('setUTCDates'),                                                                           // 498
                                                                                                              // 499
		setValue: function(){                                                                                       // 500
			var formatted = this.getFormattedDate();                                                                   // 501
			if (!this.isInput){                                                                                        // 502
				if (this.component){                                                                                      // 503
					this.element.find('input').val(formatted).change();                                                      // 504
				}                                                                                                         // 505
			}                                                                                                          // 506
			else {                                                                                                     // 507
				this.element.val(formatted).change();                                                                     // 508
			}                                                                                                          // 509
		},                                                                                                          // 510
                                                                                                              // 511
		getFormattedDate: function(format){                                                                         // 512
			if (format === undefined)                                                                                  // 513
				format = this.o.format;                                                                                   // 514
                                                                                                              // 515
			var lang = this.o.language;                                                                                // 516
			return $.map(this.dates, function(d){                                                                      // 517
				return DPGlobal.formatDate(d, format, lang);                                                              // 518
			}).join(this.o.multidateSeparator);                                                                        // 519
		},                                                                                                          // 520
                                                                                                              // 521
		setStartDate: function(startDate){                                                                          // 522
			this._process_options({startDate: startDate});                                                             // 523
			this.update();                                                                                             // 524
			this.updateNavArrows();                                                                                    // 525
		},                                                                                                          // 526
                                                                                                              // 527
		setEndDate: function(endDate){                                                                              // 528
			this._process_options({endDate: endDate});                                                                 // 529
			this.update();                                                                                             // 530
			this.updateNavArrows();                                                                                    // 531
		},                                                                                                          // 532
                                                                                                              // 533
		setDaysOfWeekDisabled: function(daysOfWeekDisabled){                                                        // 534
			this._process_options({daysOfWeekDisabled: daysOfWeekDisabled});                                           // 535
			this.update();                                                                                             // 536
			this.updateNavArrows();                                                                                    // 537
		},                                                                                                          // 538
                                                                                                              // 539
		place: function(){                                                                                          // 540
			if (this.isInline)                                                                                         // 541
				return;                                                                                                   // 542
			var calendarWidth = this.picker.outerWidth(),                                                              // 543
				calendarHeight = this.picker.outerHeight(),                                                               // 544
				visualPadding = 10,                                                                                       // 545
				windowWidth = $window.width(),                                                                            // 546
				windowHeight = $window.height(),                                                                          // 547
				scrollTop = $window.scrollTop();                                                                          // 548
                                                                                                              // 549
			var zIndex = parseInt(this.element.parents().filter(function(){                                            // 550
					return $(this).css('z-index') !== 'auto';                                                                // 551
				}).first().css('z-index'))+10;                                                                            // 552
			var offset = this.component ? this.component.parent().offset() : this.element.offset();                    // 553
			var height = this.component ? this.component.outerHeight(true) : this.element.outerHeight(false);          // 554
			var width = this.component ? this.component.outerWidth(true) : this.element.outerWidth(false);             // 555
			var left = offset.left,                                                                                    // 556
				top = offset.top;                                                                                         // 557
                                                                                                              // 558
			this.picker.removeClass(                                                                                   // 559
				'datepicker-orient-top datepicker-orient-bottom '+                                                        // 560
				'datepicker-orient-right datepicker-orient-left'                                                          // 561
			);                                                                                                         // 562
                                                                                                              // 563
			if (this.o.orientation.x !== 'auto'){                                                                      // 564
				this.picker.addClass('datepicker-orient-' + this.o.orientation.x);                                        // 565
				if (this.o.orientation.x === 'right')                                                                     // 566
					left -= calendarWidth - width;                                                                           // 567
			}                                                                                                          // 568
			// auto x orientation is best-placement: if it crosses a window                                            // 569
			// edge, fudge it sideways                                                                                 // 570
			else {                                                                                                     // 571
				// Default to left                                                                                        // 572
				this.picker.addClass('datepicker-orient-left');                                                           // 573
				if (offset.left < 0)                                                                                      // 574
					left -= offset.left - visualPadding;                                                                     // 575
				else if (offset.left + calendarWidth > windowWidth)                                                       // 576
					left = windowWidth - calendarWidth - visualPadding;                                                      // 577
			}                                                                                                          // 578
                                                                                                              // 579
			// auto y orientation is best-situation: top or bottom, no fudging,                                        // 580
			// decision based on which shows more of the calendar                                                      // 581
			var yorient = this.o.orientation.y,                                                                        // 582
				top_overflow, bottom_overflow;                                                                            // 583
			if (yorient === 'auto'){                                                                                   // 584
				top_overflow = -scrollTop + offset.top - calendarHeight;                                                  // 585
				bottom_overflow = scrollTop + windowHeight - (offset.top + height + calendarHeight);                      // 586
				if (Math.max(top_overflow, bottom_overflow) === bottom_overflow)                                          // 587
					yorient = 'top';                                                                                         // 588
				else                                                                                                      // 589
					yorient = 'bottom';                                                                                      // 590
			}                                                                                                          // 591
			this.picker.addClass('datepicker-orient-' + yorient);                                                      // 592
			if (yorient === 'top')                                                                                     // 593
				top += height;                                                                                            // 594
			else                                                                                                       // 595
				top -= calendarHeight + parseInt(this.picker.css('padding-top'));                                         // 596
                                                                                                              // 597
			this.picker.css({                                                                                          // 598
				top: top,                                                                                                 // 599
				left: left,                                                                                               // 600
				zIndex: zIndex                                                                                            // 601
			});                                                                                                        // 602
		},                                                                                                          // 603
                                                                                                              // 604
		_allow_update: true,                                                                                        // 605
		update: function(){                                                                                         // 606
			if (!this._allow_update)                                                                                   // 607
				return;                                                                                                   // 608
                                                                                                              // 609
			var oldDates = this.dates.copy(),                                                                          // 610
				dates = [],                                                                                               // 611
				fromArgs = false;                                                                                         // 612
			if (arguments.length){                                                                                     // 613
				$.each(arguments, $.proxy(function(i, date){                                                              // 614
					if (date instanceof Date)                                                                                // 615
						date = this._local_to_utc(date);                                                                        // 616
					dates.push(date);                                                                                        // 617
				}, this));                                                                                                // 618
				fromArgs = true;                                                                                          // 619
			}                                                                                                          // 620
			else {                                                                                                     // 621
				dates = this.isInput                                                                                      // 622
						? this.element.val()                                                                                    // 623
						: this.element.data('date') || this.element.find('input').val();                                        // 624
				if (dates && this.o.multidate)                                                                            // 625
					dates = dates.split(this.o.multidateSeparator);                                                          // 626
				else                                                                                                      // 627
					dates = [dates];                                                                                         // 628
				delete this.element.data().date;                                                                          // 629
			}                                                                                                          // 630
                                                                                                              // 631
			dates = $.map(dates, $.proxy(function(date){                                                               // 632
				return DPGlobal.parseDate(date, this.o.format, this.o.language);                                          // 633
			}, this));                                                                                                 // 634
			dates = $.grep(dates, $.proxy(function(date){                                                              // 635
				return (                                                                                                  // 636
					date < this.o.startDate ||                                                                               // 637
					date > this.o.endDate ||                                                                                 // 638
					!date                                                                                                    // 639
				);                                                                                                        // 640
			}, this), true);                                                                                           // 641
			this.dates.replace(dates);                                                                                 // 642
                                                                                                              // 643
			if (this.dates.length)                                                                                     // 644
				this.viewDate = new Date(this.dates.get(-1));                                                             // 645
			else if (this.viewDate < this.o.startDate)                                                                 // 646
				this.viewDate = new Date(this.o.startDate);                                                               // 647
			else if (this.viewDate > this.o.endDate)                                                                   // 648
				this.viewDate = new Date(this.o.endDate);                                                                 // 649
                                                                                                              // 650
			if (fromArgs){                                                                                             // 651
				// setting date by clicking                                                                               // 652
				this.setValue();                                                                                          // 653
			}                                                                                                          // 654
			else if (dates.length){                                                                                    // 655
				// setting date by typing                                                                                 // 656
				if (String(oldDates) !== String(this.dates))                                                              // 657
					this._trigger('changeDate');                                                                             // 658
			}                                                                                                          // 659
			if (!this.dates.length && oldDates.length)                                                                 // 660
				this._trigger('clearDate');                                                                               // 661
                                                                                                              // 662
			this.fill();                                                                                               // 663
		},                                                                                                          // 664
                                                                                                              // 665
		fillDow: function(){                                                                                        // 666
			var dowCnt = this.o.weekStart,                                                                             // 667
				html = '<tr>';                                                                                            // 668
			if (this.o.calendarWeeks){                                                                                 // 669
				var cell = '<th class="cw">&nbsp;</th>';                                                                  // 670
				html += cell;                                                                                             // 671
				this.picker.find('.datepicker-days thead tr:first-child').prepend(cell);                                  // 672
			}                                                                                                          // 673
			while (dowCnt < this.o.weekStart + 7){                                                                     // 674
				html += '<th class="dow">'+dates[this.o.language].daysMin[(dowCnt++)%7]+'</th>';                          // 675
			}                                                                                                          // 676
			html += '</tr>';                                                                                           // 677
			this.picker.find('.datepicker-days thead').append(html);                                                   // 678
		},                                                                                                          // 679
                                                                                                              // 680
		fillMonths: function(){                                                                                     // 681
			var html = '',                                                                                             // 682
			i = 0;                                                                                                     // 683
			while (i < 12){                                                                                            // 684
				html += '<span class="month">'+dates[this.o.language].monthsShort[i++]+'</span>';                         // 685
			}                                                                                                          // 686
			this.picker.find('.datepicker-months td').html(html);                                                      // 687
		},                                                                                                          // 688
                                                                                                              // 689
		setRange: function(range){                                                                                  // 690
			if (!range || !range.length)                                                                               // 691
				delete this.range;                                                                                        // 692
			else                                                                                                       // 693
				this.range = $.map(range, function(d){                                                                    // 694
					return d.valueOf();                                                                                      // 695
				});                                                                                                       // 696
			this.fill();                                                                                               // 697
		},                                                                                                          // 698
                                                                                                              // 699
		getClassNames: function(date){                                                                              // 700
			var cls = [],                                                                                              // 701
				year = this.viewDate.getUTCFullYear(),                                                                    // 702
				month = this.viewDate.getUTCMonth(),                                                                      // 703
				today = new Date();                                                                                       // 704
			if (date.getUTCFullYear() < year || (date.getUTCFullYear() === year && date.getUTCMonth() < month)){       // 705
				cls.push('old');                                                                                          // 706
			}                                                                                                          // 707
			else if (date.getUTCFullYear() > year || (date.getUTCFullYear() === year && date.getUTCMonth() > month)){  // 708
				cls.push('new');                                                                                          // 709
			}                                                                                                          // 710
			if (this.focusDate && date.valueOf() === this.focusDate.valueOf())                                         // 711
				cls.push('focused');                                                                                      // 712
			// Compare internal UTC date with local today, not UTC today                                               // 713
			if (this.o.todayHighlight &&                                                                               // 714
				date.getUTCFullYear() === today.getFullYear() &&                                                          // 715
				date.getUTCMonth() === today.getMonth() &&                                                                // 716
				date.getUTCDate() === today.getDate()){                                                                   // 717
				cls.push('today');                                                                                        // 718
			}                                                                                                          // 719
			if (this.dates.contains(date) !== -1)                                                                      // 720
				cls.push('active');                                                                                       // 721
			if (date.valueOf() < this.o.startDate || date.valueOf() > this.o.endDate ||                                // 722
				$.inArray(date.getUTCDay(), this.o.daysOfWeekDisabled) !== -1){                                           // 723
				cls.push('disabled');                                                                                     // 724
			}                                                                                                          // 725
			if (this.range){                                                                                           // 726
				if (date > this.range[0] && date < this.range[this.range.length-1]){                                      // 727
					cls.push('range');                                                                                       // 728
				}                                                                                                         // 729
				if ($.inArray(date.valueOf(), this.range) !== -1){                                                        // 730
					cls.push('selected');                                                                                    // 731
				}                                                                                                         // 732
			}                                                                                                          // 733
			return cls;                                                                                                // 734
		},                                                                                                          // 735
                                                                                                              // 736
		fill: function(){                                                                                           // 737
			var d = new Date(this.viewDate),                                                                           // 738
				year = d.getUTCFullYear(),                                                                                // 739
				month = d.getUTCMonth(),                                                                                  // 740
				startYear = this.o.startDate !== -Infinity ? this.o.startDate.getUTCFullYear() : -Infinity,               // 741
				startMonth = this.o.startDate !== -Infinity ? this.o.startDate.getUTCMonth() : -Infinity,                 // 742
				endYear = this.o.endDate !== Infinity ? this.o.endDate.getUTCFullYear() : Infinity,                       // 743
				endMonth = this.o.endDate !== Infinity ? this.o.endDate.getUTCMonth() : Infinity,                         // 744
				todaytxt = dates[this.o.language].today || dates['en'].today || '',                                       // 745
				cleartxt = dates[this.o.language].clear || dates['en'].clear || '',                                       // 746
				tooltip;                                                                                                  // 747
			this.picker.find('.datepicker-days thead th.datepicker-switch')                                            // 748
						.text(dates[this.o.language].months[month]+' '+year);                                                   // 749
			this.picker.find('tfoot th.today')                                                                         // 750
						.text(todaytxt)                                                                                         // 751
						.toggle(this.o.todayBtn !== false);                                                                     // 752
			this.picker.find('tfoot th.clear')                                                                         // 753
						.text(cleartxt)                                                                                         // 754
						.toggle(this.o.clearBtn !== false);                                                                     // 755
			this.updateNavArrows();                                                                                    // 756
			this.fillMonths();                                                                                         // 757
			var prevMonth = UTCDate(year, month-1, 28),                                                                // 758
				day = DPGlobal.getDaysInMonth(prevMonth.getUTCFullYear(), prevMonth.getUTCMonth());                       // 759
			prevMonth.setUTCDate(day);                                                                                 // 760
			prevMonth.setUTCDate(day - (prevMonth.getUTCDay() - this.o.weekStart + 7)%7);                              // 761
			var nextMonth = new Date(prevMonth);                                                                       // 762
			nextMonth.setUTCDate(nextMonth.getUTCDate() + 42);                                                         // 763
			nextMonth = nextMonth.valueOf();                                                                           // 764
			var html = [];                                                                                             // 765
			var clsName;                                                                                               // 766
			while (prevMonth.valueOf() < nextMonth){                                                                   // 767
				if (prevMonth.getUTCDay() === this.o.weekStart){                                                          // 768
					html.push('<tr>');                                                                                       // 769
					if (this.o.calendarWeeks){                                                                               // 770
						// ISO 8601: First week contains first thursday.                                                        // 771
						// ISO also states week starts on Monday, but we can be more abstract here.                             // 772
						var                                                                                                     // 773
							// Start of current week: based on weekstart/current date                                              // 774
							ws = new Date(+prevMonth + (this.o.weekStart - prevMonth.getUTCDay() - 7) % 7 * 864e5),                // 775
							// Thursday of this week                                                                               // 776
							th = new Date(Number(ws) + (7 + 4 - ws.getUTCDay()) % 7 * 864e5),                                      // 777
							// First Thursday of year, year from thursday                                                          // 778
							yth = new Date(Number(yth = UTCDate(th.getUTCFullYear(), 0, 1)) + (7 + 4 - yth.getUTCDay())%7*864e5),  // 779
							// Calendar week: ms between thursdays, div ms per day, div 7 days                                     // 780
							calWeek =  (th - yth) / 864e5 / 7 + 1;                                                                 // 781
						html.push('<td class="cw">'+ calWeek +'</td>');                                                         // 782
                                                                                                              // 783
					}                                                                                                        // 784
				}                                                                                                         // 785
				clsName = this.getClassNames(prevMonth);                                                                  // 786
				clsName.push('day');                                                                                      // 787
                                                                                                              // 788
				if (this.o.beforeShowDay !== $.noop){                                                                     // 789
					var before = this.o.beforeShowDay(this._utc_to_local(prevMonth));                                        // 790
					if (before === undefined)                                                                                // 791
						before = {};                                                                                            // 792
					else if (typeof(before) === 'boolean')                                                                   // 793
						before = {enabled: before};                                                                             // 794
					else if (typeof(before) === 'string')                                                                    // 795
						before = {classes: before};                                                                             // 796
					if (before.enabled === false)                                                                            // 797
						clsName.push('disabled');                                                                               // 798
					if (before.classes)                                                                                      // 799
						clsName = clsName.concat(before.classes.split(/\s+/));                                                  // 800
					if (before.tooltip)                                                                                      // 801
						tooltip = before.tooltip;                                                                               // 802
				}                                                                                                         // 803
                                                                                                              // 804
				clsName = $.unique(clsName);                                                                              // 805
				html.push('<td class="'+clsName.join(' ')+'"' + (tooltip ? ' title="'+tooltip+'"' : '') + '>'+prevMonth.getUTCDate() + '</td>');
				if (prevMonth.getUTCDay() === this.o.weekEnd){                                                            // 807
					html.push('</tr>');                                                                                      // 808
				}                                                                                                         // 809
				prevMonth.setUTCDate(prevMonth.getUTCDate()+1);                                                           // 810
			}                                                                                                          // 811
			this.picker.find('.datepicker-days tbody').empty().append(html.join(''));                                  // 812
                                                                                                              // 813
			var months = this.picker.find('.datepicker-months')                                                        // 814
						.find('th:eq(1)')                                                                                       // 815
							.text(year)                                                                                            // 816
							.end()                                                                                                 // 817
						.find('span').removeClass('active');                                                                    // 818
                                                                                                              // 819
			$.each(this.dates, function(i, d){                                                                         // 820
				if (d.getUTCFullYear() === year)                                                                          // 821
					months.eq(d.getUTCMonth()).addClass('active');                                                           // 822
			});                                                                                                        // 823
                                                                                                              // 824
			if (year < startYear || year > endYear){                                                                   // 825
				months.addClass('disabled');                                                                              // 826
			}                                                                                                          // 827
			if (year === startYear){                                                                                   // 828
				months.slice(0, startMonth).addClass('disabled');                                                         // 829
			}                                                                                                          // 830
			if (year === endYear){                                                                                     // 831
				months.slice(endMonth+1).addClass('disabled');                                                            // 832
			}                                                                                                          // 833
                                                                                                              // 834
			html = '';                                                                                                 // 835
			year = parseInt(year/10, 10) * 10;                                                                         // 836
			var yearCont = this.picker.find('.datepicker-years')                                                       // 837
								.find('th:eq(1)')                                                                                     // 838
									.text(year + '-' + (year + 9))                                                                       // 839
									.end()                                                                                               // 840
								.find('td');                                                                                          // 841
			year -= 1;                                                                                                 // 842
			var years = $.map(this.dates, function(d){                                                                 // 843
					return d.getUTCFullYear();                                                                               // 844
				}),                                                                                                       // 845
				classes;                                                                                                  // 846
			for (var i = -1; i < 11; i++){                                                                             // 847
				classes = ['year'];                                                                                       // 848
				if (i === -1)                                                                                             // 849
					classes.push('old');                                                                                     // 850
				else if (i === 10)                                                                                        // 851
					classes.push('new');                                                                                     // 852
				if ($.inArray(year, years) !== -1)                                                                        // 853
					classes.push('active');                                                                                  // 854
				if (year < startYear || year > endYear)                                                                   // 855
					classes.push('disabled');                                                                                // 856
				html += '<span class="' + classes.join(' ') + '">'+year+'</span>';                                        // 857
				year += 1;                                                                                                // 858
			}                                                                                                          // 859
			yearCont.html(html);                                                                                       // 860
		},                                                                                                          // 861
                                                                                                              // 862
		updateNavArrows: function(){                                                                                // 863
			if (!this._allow_update)                                                                                   // 864
				return;                                                                                                   // 865
                                                                                                              // 866
			var d = new Date(this.viewDate),                                                                           // 867
				year = d.getUTCFullYear(),                                                                                // 868
				month = d.getUTCMonth();                                                                                  // 869
			switch (this.viewMode){                                                                                    // 870
				case 0:                                                                                                   // 871
					if (this.o.startDate !== -Infinity && year <= this.o.startDate.getUTCFullYear() && month <= this.o.startDate.getUTCMonth()){
						this.picker.find('.prev').css({visibility: 'hidden'});                                                  // 873
					}                                                                                                        // 874
					else {                                                                                                   // 875
						this.picker.find('.prev').css({visibility: 'visible'});                                                 // 876
					}                                                                                                        // 877
					if (this.o.endDate !== Infinity && year >= this.o.endDate.getUTCFullYear() && month >= this.o.endDate.getUTCMonth()){
						this.picker.find('.next').css({visibility: 'hidden'});                                                  // 879
					}                                                                                                        // 880
					else {                                                                                                   // 881
						this.picker.find('.next').css({visibility: 'visible'});                                                 // 882
					}                                                                                                        // 883
					break;                                                                                                   // 884
				case 1:                                                                                                   // 885
				case 2:                                                                                                   // 886
					if (this.o.startDate !== -Infinity && year <= this.o.startDate.getUTCFullYear()){                        // 887
						this.picker.find('.prev').css({visibility: 'hidden'});                                                  // 888
					}                                                                                                        // 889
					else {                                                                                                   // 890
						this.picker.find('.prev').css({visibility: 'visible'});                                                 // 891
					}                                                                                                        // 892
					if (this.o.endDate !== Infinity && year >= this.o.endDate.getUTCFullYear()){                             // 893
						this.picker.find('.next').css({visibility: 'hidden'});                                                  // 894
					}                                                                                                        // 895
					else {                                                                                                   // 896
						this.picker.find('.next').css({visibility: 'visible'});                                                 // 897
					}                                                                                                        // 898
					break;                                                                                                   // 899
			}                                                                                                          // 900
		},                                                                                                          // 901
                                                                                                              // 902
		click: function(e){                                                                                         // 903
			e.preventDefault();                                                                                        // 904
			var target = $(e.target).closest('span, td, th'),                                                          // 905
				year, month, day;                                                                                         // 906
			if (target.length === 1){                                                                                  // 907
				switch (target[0].nodeName.toLowerCase()){                                                                // 908
					case 'th':                                                                                               // 909
						switch (target[0].className){                                                                           // 910
							case 'datepicker-switch':                                                                              // 911
								this.showMode(1);                                                                                     // 912
								break;                                                                                                // 913
							case 'prev':                                                                                           // 914
							case 'next':                                                                                           // 915
								var dir = DPGlobal.modes[this.viewMode].navStep * (target[0].className === 'prev' ? -1 : 1);          // 916
								switch (this.viewMode){                                                                               // 917
									case 0:                                                                                              // 918
										this.viewDate = this.moveMonth(this.viewDate, dir);                                                 // 919
										this._trigger('changeMonth', this.viewDate);                                                        // 920
										break;                                                                                              // 921
									case 1:                                                                                              // 922
									case 2:                                                                                              // 923
										this.viewDate = this.moveYear(this.viewDate, dir);                                                  // 924
										if (this.viewMode === 1)                                                                            // 925
											this._trigger('changeYear', this.viewDate);                                                        // 926
										break;                                                                                              // 927
								}                                                                                                     // 928
								this.fill();                                                                                          // 929
								break;                                                                                                // 930
							case 'today':                                                                                          // 931
								var date = new Date();                                                                                // 932
								date = UTCDate(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);                         // 933
                                                                                                              // 934
								this.showMode(-2);                                                                                    // 935
								var which = this.o.todayBtn === 'linked' ? null : 'view';                                             // 936
								this._setDate(date, which);                                                                           // 937
								break;                                                                                                // 938
							case 'clear':                                                                                          // 939
								var element;                                                                                          // 940
								if (this.isInput)                                                                                     // 941
									element = this.element;                                                                              // 942
								else if (this.component)                                                                              // 943
									element = this.element.find('input');                                                                // 944
								if (element)                                                                                          // 945
									element.val("").change();                                                                            // 946
								this.update();                                                                                        // 947
								this._trigger('changeDate');                                                                          // 948
								if (this.o.autoclose)                                                                                 // 949
									this.hide();                                                                                         // 950
								break;                                                                                                // 951
						}                                                                                                       // 952
						break;                                                                                                  // 953
					case 'span':                                                                                             // 954
						if (!target.is('.disabled')){                                                                           // 955
							this.viewDate.setUTCDate(1);                                                                           // 956
							if (target.is('.month')){                                                                              // 957
								day = 1;                                                                                              // 958
								month = target.parent().find('span').index(target);                                                   // 959
								year = this.viewDate.getUTCFullYear();                                                                // 960
								this.viewDate.setUTCMonth(month);                                                                     // 961
								this._trigger('changeMonth', this.viewDate);                                                          // 962
								if (this.o.minViewMode === 1){                                                                        // 963
									this._setDate(UTCDate(year, month, day));                                                            // 964
								}                                                                                                     // 965
							}                                                                                                      // 966
							else {                                                                                                 // 967
								day = 1;                                                                                              // 968
								month = 0;                                                                                            // 969
								year = parseInt(target.text(), 10)||0;                                                                // 970
								this.viewDate.setUTCFullYear(year);                                                                   // 971
								this._trigger('changeYear', this.viewDate);                                                           // 972
								if (this.o.minViewMode === 2){                                                                        // 973
									this._setDate(UTCDate(year, month, day));                                                            // 974
								}                                                                                                     // 975
							}                                                                                                      // 976
							this.showMode(-1);                                                                                     // 977
							this.fill();                                                                                           // 978
						}                                                                                                       // 979
						break;                                                                                                  // 980
					case 'td':                                                                                               // 981
						if (target.is('.day') && !target.is('.disabled')){                                                      // 982
							day = parseInt(target.text(), 10)||1;                                                                  // 983
							year = this.viewDate.getUTCFullYear();                                                                 // 984
							month = this.viewDate.getUTCMonth();                                                                   // 985
							if (target.is('.old')){                                                                                // 986
								if (month === 0){                                                                                     // 987
									month = 11;                                                                                          // 988
									year -= 1;                                                                                           // 989
								}                                                                                                     // 990
								else {                                                                                                // 991
									month -= 1;                                                                                          // 992
								}                                                                                                     // 993
							}                                                                                                      // 994
							else if (target.is('.new')){                                                                           // 995
								if (month === 11){                                                                                    // 996
									month = 0;                                                                                           // 997
									year += 1;                                                                                           // 998
								}                                                                                                     // 999
								else {                                                                                                // 1000
									month += 1;                                                                                          // 1001
								}                                                                                                     // 1002
							}                                                                                                      // 1003
							this._setDate(UTCDate(year, month, day));                                                              // 1004
						}                                                                                                       // 1005
						break;                                                                                                  // 1006
				}                                                                                                         // 1007
			}                                                                                                          // 1008
			if (this.picker.is(':visible') && this._focused_from){                                                     // 1009
				$(this._focused_from).focus();                                                                            // 1010
			}                                                                                                          // 1011
			delete this._focused_from;                                                                                 // 1012
		},                                                                                                          // 1013
                                                                                                              // 1014
		_toggle_multidate: function(date){                                                                          // 1015
			var ix = this.dates.contains(date);                                                                        // 1016
			if (!date){                                                                                                // 1017
				this.dates.clear();                                                                                       // 1018
			}                                                                                                          // 1019
			else if (ix !== -1){                                                                                       // 1020
				this.dates.remove(ix);                                                                                    // 1021
			}                                                                                                          // 1022
			else {                                                                                                     // 1023
				this.dates.push(date);                                                                                    // 1024
			}                                                                                                          // 1025
			if (typeof this.o.multidate === 'number')                                                                  // 1026
				while (this.dates.length > this.o.multidate)                                                              // 1027
					this.dates.remove(0);                                                                                    // 1028
		},                                                                                                          // 1029
                                                                                                              // 1030
		_setDate: function(date, which){                                                                            // 1031
			if (!which || which === 'date')                                                                            // 1032
				this._toggle_multidate(date && new Date(date));                                                           // 1033
			if (!which || which  === 'view')                                                                           // 1034
				this.viewDate = date && new Date(date);                                                                   // 1035
                                                                                                              // 1036
			this.fill();                                                                                               // 1037
			this.setValue();                                                                                           // 1038
			this._trigger('changeDate');                                                                               // 1039
			var element;                                                                                               // 1040
			if (this.isInput){                                                                                         // 1041
				element = this.element;                                                                                   // 1042
			}                                                                                                          // 1043
			else if (this.component){                                                                                  // 1044
				element = this.element.find('input');                                                                     // 1045
			}                                                                                                          // 1046
			if (element){                                                                                              // 1047
				element.change();                                                                                         // 1048
			}                                                                                                          // 1049
			if (this.o.autoclose && (!which || which === 'date')){                                                     // 1050
				this.hide();                                                                                              // 1051
			}                                                                                                          // 1052
		},                                                                                                          // 1053
                                                                                                              // 1054
		moveMonth: function(date, dir){                                                                             // 1055
			if (!date)                                                                                                 // 1056
				return undefined;                                                                                         // 1057
			if (!dir)                                                                                                  // 1058
				return date;                                                                                              // 1059
			var new_date = new Date(date.valueOf()),                                                                   // 1060
				day = new_date.getUTCDate(),                                                                              // 1061
				month = new_date.getUTCMonth(),                                                                           // 1062
				mag = Math.abs(dir),                                                                                      // 1063
				new_month, test;                                                                                          // 1064
			dir = dir > 0 ? 1 : -1;                                                                                    // 1065
			if (mag === 1){                                                                                            // 1066
				test = dir === -1                                                                                         // 1067
					// If going back one month, make sure month is not current month                                         // 1068
					// (eg, Mar 31 -> Feb 31 == Feb 28, not Mar 02)                                                          // 1069
					? function(){                                                                                            // 1070
						return new_date.getUTCMonth() === month;                                                                // 1071
					}                                                                                                        // 1072
					// If going forward one month, make sure month is as expected                                            // 1073
					// (eg, Jan 31 -> Feb 31 == Feb 28, not Mar 02)                                                          // 1074
					: function(){                                                                                            // 1075
						return new_date.getUTCMonth() !== new_month;                                                            // 1076
					};                                                                                                       // 1077
				new_month = month + dir;                                                                                  // 1078
				new_date.setUTCMonth(new_month);                                                                          // 1079
				// Dec -> Jan (12) or Jan -> Dec (-1) -- limit expected date to 0-11                                      // 1080
				if (new_month < 0 || new_month > 11)                                                                      // 1081
					new_month = (new_month + 12) % 12;                                                                       // 1082
			}                                                                                                          // 1083
			else {                                                                                                     // 1084
				// For magnitudes >1, move one month at a time...                                                         // 1085
				for (var i=0; i < mag; i++)                                                                               // 1086
					// ...which might decrease the day (eg, Jan 31 to Feb 28, etc)...                                        // 1087
					new_date = this.moveMonth(new_date, dir);                                                                // 1088
				// ...then reset the day, keeping it in the new month                                                     // 1089
				new_month = new_date.getUTCMonth();                                                                       // 1090
				new_date.setUTCDate(day);                                                                                 // 1091
				test = function(){                                                                                        // 1092
					return new_month !== new_date.getUTCMonth();                                                             // 1093
				};                                                                                                        // 1094
			}                                                                                                          // 1095
			// Common date-resetting loop -- if date is beyond end of month, make it                                   // 1096
			// end of month                                                                                            // 1097
			while (test()){                                                                                            // 1098
				new_date.setUTCDate(--day);                                                                               // 1099
				new_date.setUTCMonth(new_month);                                                                          // 1100
			}                                                                                                          // 1101
			return new_date;                                                                                           // 1102
		},                                                                                                          // 1103
                                                                                                              // 1104
		moveYear: function(date, dir){                                                                              // 1105
			return this.moveMonth(date, dir*12);                                                                       // 1106
		},                                                                                                          // 1107
                                                                                                              // 1108
		dateWithinRange: function(date){                                                                            // 1109
			return date >= this.o.startDate && date <= this.o.endDate;                                                 // 1110
		},                                                                                                          // 1111
                                                                                                              // 1112
		keydown: function(e){                                                                                       // 1113
			if (this.picker.is(':not(:visible)')){                                                                     // 1114
				if (e.keyCode === 27) // allow escape to hide and re-show picker                                          // 1115
					this.show();                                                                                             // 1116
				return;                                                                                                   // 1117
			}                                                                                                          // 1118
			var dateChanged = false,                                                                                   // 1119
				dir, newDate, newViewDate,                                                                                // 1120
				focusDate = this.focusDate || this.viewDate;                                                              // 1121
			switch (e.keyCode){                                                                                        // 1122
				case 27: // escape                                                                                        // 1123
					if (this.focusDate){                                                                                     // 1124
						this.focusDate = null;                                                                                  // 1125
						this.viewDate = this.dates.get(-1) || this.viewDate;                                                    // 1126
						this.fill();                                                                                            // 1127
					}                                                                                                        // 1128
					else                                                                                                     // 1129
						this.hide();                                                                                            // 1130
					e.preventDefault();                                                                                      // 1131
					break;                                                                                                   // 1132
				case 37: // left                                                                                          // 1133
				case 39: // right                                                                                         // 1134
					if (!this.o.keyboardNavigation)                                                                          // 1135
						break;                                                                                                  // 1136
					dir = e.keyCode === 37 ? -1 : 1;                                                                         // 1137
					if (e.ctrlKey){                                                                                          // 1138
						newDate = this.moveYear(this.dates.get(-1) || UTCToday(), dir);                                         // 1139
						newViewDate = this.moveYear(focusDate, dir);                                                            // 1140
						this._trigger('changeYear', this.viewDate);                                                             // 1141
					}                                                                                                        // 1142
					else if (e.shiftKey){                                                                                    // 1143
						newDate = this.moveMonth(this.dates.get(-1) || UTCToday(), dir);                                        // 1144
						newViewDate = this.moveMonth(focusDate, dir);                                                           // 1145
						this._trigger('changeMonth', this.viewDate);                                                            // 1146
					}                                                                                                        // 1147
					else {                                                                                                   // 1148
						newDate = new Date(this.dates.get(-1) || UTCToday());                                                   // 1149
						newDate.setUTCDate(newDate.getUTCDate() + dir);                                                         // 1150
						newViewDate = new Date(focusDate);                                                                      // 1151
						newViewDate.setUTCDate(focusDate.getUTCDate() + dir);                                                   // 1152
					}                                                                                                        // 1153
					if (this.dateWithinRange(newDate)){                                                                      // 1154
						this.focusDate = this.viewDate = newViewDate;                                                           // 1155
						this.setValue();                                                                                        // 1156
						this.fill();                                                                                            // 1157
						e.preventDefault();                                                                                     // 1158
					}                                                                                                        // 1159
					break;                                                                                                   // 1160
				case 38: // up                                                                                            // 1161
				case 40: // down                                                                                          // 1162
					if (!this.o.keyboardNavigation)                                                                          // 1163
						break;                                                                                                  // 1164
					dir = e.keyCode === 38 ? -1 : 1;                                                                         // 1165
					if (e.ctrlKey){                                                                                          // 1166
						newDate = this.moveYear(this.dates.get(-1) || UTCToday(), dir);                                         // 1167
						newViewDate = this.moveYear(focusDate, dir);                                                            // 1168
						this._trigger('changeYear', this.viewDate);                                                             // 1169
					}                                                                                                        // 1170
					else if (e.shiftKey){                                                                                    // 1171
						newDate = this.moveMonth(this.dates.get(-1) || UTCToday(), dir);                                        // 1172
						newViewDate = this.moveMonth(focusDate, dir);                                                           // 1173
						this._trigger('changeMonth', this.viewDate);                                                            // 1174
					}                                                                                                        // 1175
					else {                                                                                                   // 1176
						newDate = new Date(this.dates.get(-1) || UTCToday());                                                   // 1177
						newDate.setUTCDate(newDate.getUTCDate() + dir * 7);                                                     // 1178
						newViewDate = new Date(focusDate);                                                                      // 1179
						newViewDate.setUTCDate(focusDate.getUTCDate() + dir * 7);                                               // 1180
					}                                                                                                        // 1181
					if (this.dateWithinRange(newDate)){                                                                      // 1182
						this.focusDate = this.viewDate = newViewDate;                                                           // 1183
						this.setValue();                                                                                        // 1184
						this.fill();                                                                                            // 1185
						e.preventDefault();                                                                                     // 1186
					}                                                                                                        // 1187
					break;                                                                                                   // 1188
				case 32: // spacebar                                                                                      // 1189
					// Spacebar is used in manually typing dates in some formats.                                            // 1190
					// As such, its behavior should not be hijacked.                                                         // 1191
					break;                                                                                                   // 1192
				case 13: // enter                                                                                         // 1193
					focusDate = this.focusDate || this.dates.get(-1) || this.viewDate;                                       // 1194
					this._toggle_multidate(focusDate);                                                                       // 1195
					dateChanged = true;                                                                                      // 1196
					this.focusDate = null;                                                                                   // 1197
					this.viewDate = this.dates.get(-1) || this.viewDate;                                                     // 1198
					this.setValue();                                                                                         // 1199
					this.fill();                                                                                             // 1200
					if (this.picker.is(':visible')){                                                                         // 1201
						e.preventDefault();                                                                                     // 1202
						if (this.o.autoclose)                                                                                   // 1203
							this.hide();                                                                                           // 1204
					}                                                                                                        // 1205
					break;                                                                                                   // 1206
				case 9: // tab                                                                                            // 1207
					this.focusDate = null;                                                                                   // 1208
					this.viewDate = this.dates.get(-1) || this.viewDate;                                                     // 1209
					this.fill();                                                                                             // 1210
					this.hide();                                                                                             // 1211
					break;                                                                                                   // 1212
			}                                                                                                          // 1213
			if (dateChanged){                                                                                          // 1214
				if (this.dates.length)                                                                                    // 1215
					this._trigger('changeDate');                                                                             // 1216
				else                                                                                                      // 1217
					this._trigger('clearDate');                                                                              // 1218
				var element;                                                                                              // 1219
				if (this.isInput){                                                                                        // 1220
					element = this.element;                                                                                  // 1221
				}                                                                                                         // 1222
				else if (this.component){                                                                                 // 1223
					element = this.element.find('input');                                                                    // 1224
				}                                                                                                         // 1225
				if (element){                                                                                             // 1226
					element.change();                                                                                        // 1227
				}                                                                                                         // 1228
			}                                                                                                          // 1229
		},                                                                                                          // 1230
                                                                                                              // 1231
		showMode: function(dir){                                                                                    // 1232
			if (dir){                                                                                                  // 1233
				this.viewMode = Math.max(this.o.minViewMode, Math.min(2, this.viewMode + dir));                           // 1234
			}                                                                                                          // 1235
			this.picker                                                                                                // 1236
				.find('>div')                                                                                             // 1237
				.hide()                                                                                                   // 1238
				.filter('.datepicker-'+DPGlobal.modes[this.viewMode].clsName)                                             // 1239
					.css('display', 'block');                                                                                // 1240
			this.updateNavArrows();                                                                                    // 1241
		}                                                                                                           // 1242
	};                                                                                                           // 1243
                                                                                                              // 1244
	var DateRangePicker = function(element, options){                                                            // 1245
		this.element = $(element);                                                                                  // 1246
		this.inputs = $.map(options.inputs, function(i){                                                            // 1247
			return i.jquery ? i[0] : i;                                                                                // 1248
		});                                                                                                         // 1249
		delete options.inputs;                                                                                      // 1250
                                                                                                              // 1251
		$(this.inputs)                                                                                              // 1252
			.datepicker(options)                                                                                       // 1253
			.bind('changeDate', $.proxy(this.dateUpdated, this));                                                      // 1254
                                                                                                              // 1255
		this.pickers = $.map(this.inputs, function(i){                                                              // 1256
			return $(i).data('datepicker');                                                                            // 1257
		});                                                                                                         // 1258
		this.updateDates();                                                                                         // 1259
	};                                                                                                           // 1260
	DateRangePicker.prototype = {                                                                                // 1261
		updateDates: function(){                                                                                    // 1262
			this.dates = $.map(this.pickers, function(i){                                                              // 1263
				return i.getUTCDate();                                                                                    // 1264
			});                                                                                                        // 1265
			this.updateRanges();                                                                                       // 1266
		},                                                                                                          // 1267
		updateRanges: function(){                                                                                   // 1268
			var range = $.map(this.dates, function(d){                                                                 // 1269
				return d.valueOf();                                                                                       // 1270
			});                                                                                                        // 1271
			$.each(this.pickers, function(i, p){                                                                       // 1272
				p.setRange(range);                                                                                        // 1273
			});                                                                                                        // 1274
		},                                                                                                          // 1275
		dateUpdated: function(e){                                                                                   // 1276
			// `this.updating` is a workaround for preventing infinite recursion                                       // 1277
			// between `changeDate` triggering and `setUTCDate` calling.  Until                                        // 1278
			// there is a better mechanism.                                                                            // 1279
			if (this.updating)                                                                                         // 1280
				return;                                                                                                   // 1281
			this.updating = true;                                                                                      // 1282
                                                                                                              // 1283
			var dp = $(e.target).data('datepicker'),                                                                   // 1284
				new_date = dp.getUTCDate(),                                                                               // 1285
				i = $.inArray(e.target, this.inputs),                                                                     // 1286
				l = this.inputs.length;                                                                                   // 1287
			if (i === -1)                                                                                              // 1288
				return;                                                                                                   // 1289
                                                                                                              // 1290
			$.each(this.pickers, function(i, p){                                                                       // 1291
				if (!p.getUTCDate())                                                                                      // 1292
					p.setUTCDate(new_date);                                                                                  // 1293
			});                                                                                                        // 1294
                                                                                                              // 1295
			if (new_date < this.dates[i]){                                                                             // 1296
				// Date being moved earlier/left                                                                          // 1297
				while (i >= 0 && new_date < this.dates[i]){                                                               // 1298
					this.pickers[i--].setUTCDate(new_date);                                                                  // 1299
				}                                                                                                         // 1300
			}                                                                                                          // 1301
			else if (new_date > this.dates[i]){                                                                        // 1302
				// Date being moved later/right                                                                           // 1303
				while (i < l && new_date > this.dates[i]){                                                                // 1304
					this.pickers[i++].setUTCDate(new_date);                                                                  // 1305
				}                                                                                                         // 1306
			}                                                                                                          // 1307
			this.updateDates();                                                                                        // 1308
                                                                                                              // 1309
			delete this.updating;                                                                                      // 1310
		},                                                                                                          // 1311
		remove: function(){                                                                                         // 1312
			$.map(this.pickers, function(p){ p.remove(); });                                                           // 1313
			delete this.element.data().datepicker;                                                                     // 1314
		}                                                                                                           // 1315
	};                                                                                                           // 1316
                                                                                                              // 1317
	function opts_from_el(el, prefix){                                                                           // 1318
		// Derive options from element data-attrs                                                                   // 1319
		var data = $(el).data(),                                                                                    // 1320
			out = {}, inkey,                                                                                           // 1321
			replace = new RegExp('^' + prefix.toLowerCase() + '([A-Z])');                                              // 1322
		prefix = new RegExp('^' + prefix.toLowerCase());                                                            // 1323
		function re_lower(_,a){                                                                                     // 1324
			return a.toLowerCase();                                                                                    // 1325
		}                                                                                                           // 1326
		for (var key in data)                                                                                       // 1327
			if (prefix.test(key)){                                                                                     // 1328
				inkey = key.replace(replace, re_lower);                                                                   // 1329
				out[inkey] = data[key];                                                                                   // 1330
			}                                                                                                          // 1331
		return out;                                                                                                 // 1332
	}                                                                                                            // 1333
                                                                                                              // 1334
	function opts_from_locale(lang){                                                                             // 1335
		// Derive options from locale plugins                                                                       // 1336
		var out = {};                                                                                               // 1337
		// Check if "de-DE" style date is available, if not language should                                         // 1338
		// fallback to 2 letter code eg "de"                                                                        // 1339
		if (!dates[lang]){                                                                                          // 1340
			lang = lang.split('-')[0];                                                                                 // 1341
			if (!dates[lang])                                                                                          // 1342
				return;                                                                                                   // 1343
		}                                                                                                           // 1344
		var d = dates[lang];                                                                                        // 1345
		$.each(locale_opts, function(i,k){                                                                          // 1346
			if (k in d)                                                                                                // 1347
				out[k] = d[k];                                                                                            // 1348
		});                                                                                                         // 1349
		return out;                                                                                                 // 1350
	}                                                                                                            // 1351
                                                                                                              // 1352
	var old = $.fn.datepicker;                                                                                   // 1353
	$.fn.datepicker = function(option){                                                                          // 1354
		var args = Array.apply(null, arguments);                                                                    // 1355
		args.shift();                                                                                               // 1356
		var internal_return;                                                                                        // 1357
		this.each(function(){                                                                                       // 1358
			var $this = $(this),                                                                                       // 1359
				data = $this.data('datepicker'),                                                                          // 1360
				options = typeof option === 'object' && option;                                                           // 1361
			if (!data){                                                                                                // 1362
				var elopts = opts_from_el(this, 'date'),                                                                  // 1363
					// Preliminary otions                                                                                    // 1364
					xopts = $.extend({}, defaults, elopts, options),                                                         // 1365
					locopts = opts_from_locale(xopts.language),                                                              // 1366
					// Options priority: js args, data-attrs, locales, defaults                                              // 1367
					opts = $.extend({}, defaults, locopts, elopts, options);                                                 // 1368
				if ($this.is('.input-daterange') || opts.inputs){                                                         // 1369
					var ropts = {                                                                                            // 1370
						inputs: opts.inputs || $this.find('input').toArray()                                                    // 1371
					};                                                                                                       // 1372
					$this.data('datepicker', (data = new DateRangePicker(this, $.extend(opts, ropts))));                     // 1373
				}                                                                                                         // 1374
				else {                                                                                                    // 1375
					$this.data('datepicker', (data = new Datepicker(this, opts)));                                           // 1376
				}                                                                                                         // 1377
			}                                                                                                          // 1378
			if (typeof option === 'string' && typeof data[option] === 'function'){                                     // 1379
				internal_return = data[option].apply(data, args);                                                         // 1380
				if (internal_return !== undefined)                                                                        // 1381
					return false;                                                                                            // 1382
			}                                                                                                          // 1383
		});                                                                                                         // 1384
		if (internal_return !== undefined)                                                                          // 1385
			return internal_return;                                                                                    // 1386
		else                                                                                                        // 1387
			return this;                                                                                               // 1388
	};                                                                                                           // 1389
                                                                                                              // 1390
	var defaults = $.fn.datepicker.defaults = {                                                                  // 1391
		autoclose: false,                                                                                           // 1392
		beforeShowDay: $.noop,                                                                                      // 1393
		calendarWeeks: false,                                                                                       // 1394
		clearBtn: false,                                                                                            // 1395
		daysOfWeekDisabled: [],                                                                                     // 1396
		endDate: Infinity,                                                                                          // 1397
		forceParse: true,                                                                                           // 1398
		format: 'mm/dd/yyyy',                                                                                       // 1399
		keyboardNavigation: true,                                                                                   // 1400
		language: 'en',                                                                                             // 1401
		minViewMode: 0,                                                                                             // 1402
		multidate: false,                                                                                           // 1403
		multidateSeparator: ',',                                                                                    // 1404
		orientation: "auto",                                                                                        // 1405
		rtl: false,                                                                                                 // 1406
		startDate: -Infinity,                                                                                       // 1407
		startView: 0,                                                                                               // 1408
		todayBtn: false,                                                                                            // 1409
		todayHighlight: false,                                                                                      // 1410
		weekStart: 0                                                                                                // 1411
	};                                                                                                           // 1412
	var locale_opts = $.fn.datepicker.locale_opts = [                                                            // 1413
		'format',                                                                                                   // 1414
		'rtl',                                                                                                      // 1415
		'weekStart'                                                                                                 // 1416
	];                                                                                                           // 1417
	$.fn.datepicker.Constructor = Datepicker;                                                                    // 1418
	var dates = $.fn.datepicker.dates = {                                                                        // 1419
		en: {                                                                                                       // 1420
			days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],            // 1421
			daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],                                       // 1422
			daysMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],                                                 // 1423
			months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
			monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],         // 1425
			today: "Today",                                                                                            // 1426
			clear: "Clear"                                                                                             // 1427
		}                                                                                                           // 1428
	};                                                                                                           // 1429
                                                                                                              // 1430
	var DPGlobal = {                                                                                             // 1431
		modes: [                                                                                                    // 1432
			{                                                                                                          // 1433
				clsName: 'days',                                                                                          // 1434
				navFnc: 'Month',                                                                                          // 1435
				navStep: 1                                                                                                // 1436
			},                                                                                                         // 1437
			{                                                                                                          // 1438
				clsName: 'months',                                                                                        // 1439
				navFnc: 'FullYear',                                                                                       // 1440
				navStep: 1                                                                                                // 1441
			},                                                                                                         // 1442
			{                                                                                                          // 1443
				clsName: 'years',                                                                                         // 1444
				navFnc: 'FullYear',                                                                                       // 1445
				navStep: 10                                                                                               // 1446
		}],                                                                                                         // 1447
		isLeapYear: function(year){                                                                                 // 1448
			return (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0));                                   // 1449
		},                                                                                                          // 1450
		getDaysInMonth: function(year, month){                                                                      // 1451
			return [31, (DPGlobal.isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];         // 1452
		},                                                                                                          // 1453
		validParts: /dd?|DD?|mm?|MM?|yy(?:yy)?/g,                                                                   // 1454
		nonpunctuation: /[^ -\/:-@\[\u3400-\u9fff-`{-~\t\n\r]+/g,                                                   // 1455
		parseFormat: function(format){                                                                              // 1456
			// IE treats \0 as a string end in inputs (truncating the value),                                          // 1457
			// so it's a bad format delimiter, anyway                                                                  // 1458
			var separators = format.replace(this.validParts, '\0').split('\0'),                                        // 1459
				parts = format.match(this.validParts);                                                                    // 1460
			if (!separators || !separators.length || !parts || parts.length === 0){                                    // 1461
				throw new Error("Invalid date format.");                                                                  // 1462
			}                                                                                                          // 1463
			return {separators: separators, parts: parts};                                                             // 1464
		},                                                                                                          // 1465
		parseDate: function(date, format, language){                                                                // 1466
			if (!date)                                                                                                 // 1467
				return undefined;                                                                                         // 1468
			if (date instanceof Date)                                                                                  // 1469
				return date;                                                                                              // 1470
			if (typeof format === 'string')                                                                            // 1471
				format = DPGlobal.parseFormat(format);                                                                    // 1472
			var part_re = /([\-+]\d+)([dmwy])/,                                                                        // 1473
				parts = date.match(/([\-+]\d+)([dmwy])/g),                                                                // 1474
				part, dir, i;                                                                                             // 1475
			if (/^[\-+]\d+[dmwy]([\s,]+[\-+]\d+[dmwy])*$/.test(date)){                                                 // 1476
				date = new Date();                                                                                        // 1477
				for (i=0; i < parts.length; i++){                                                                         // 1478
					part = part_re.exec(parts[i]);                                                                           // 1479
					dir = parseInt(part[1]);                                                                                 // 1480
					switch (part[2]){                                                                                        // 1481
						case 'd':                                                                                               // 1482
							date.setUTCDate(date.getUTCDate() + dir);                                                              // 1483
							break;                                                                                                 // 1484
						case 'm':                                                                                               // 1485
							date = Datepicker.prototype.moveMonth.call(Datepicker.prototype, date, dir);                           // 1486
							break;                                                                                                 // 1487
						case 'w':                                                                                               // 1488
							date.setUTCDate(date.getUTCDate() + dir * 7);                                                          // 1489
							break;                                                                                                 // 1490
						case 'y':                                                                                               // 1491
							date = Datepicker.prototype.moveYear.call(Datepicker.prototype, date, dir);                            // 1492
							break;                                                                                                 // 1493
					}                                                                                                        // 1494
				}                                                                                                         // 1495
				return UTCDate(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), 0, 0, 0);                    // 1496
			}                                                                                                          // 1497
			parts = date && date.match(this.nonpunctuation) || [];                                                     // 1498
			date = new Date();                                                                                         // 1499
			var parsed = {},                                                                                           // 1500
				setters_order = ['yyyy', 'yy', 'M', 'MM', 'm', 'mm', 'd', 'dd'],                                          // 1501
				setters_map = {                                                                                           // 1502
					yyyy: function(d,v){                                                                                     // 1503
						return d.setUTCFullYear(v);                                                                             // 1504
					},                                                                                                       // 1505
					yy: function(d,v){                                                                                       // 1506
						return d.setUTCFullYear(2000+v);                                                                        // 1507
					},                                                                                                       // 1508
					m: function(d,v){                                                                                        // 1509
						if (isNaN(d))                                                                                           // 1510
							return d;                                                                                              // 1511
						v -= 1;                                                                                                 // 1512
						while (v < 0) v += 12;                                                                                  // 1513
						v %= 12;                                                                                                // 1514
						d.setUTCMonth(v);                                                                                       // 1515
						while (d.getUTCMonth() !== v)                                                                           // 1516
							d.setUTCDate(d.getUTCDate()-1);                                                                        // 1517
						return d;                                                                                               // 1518
					},                                                                                                       // 1519
					d: function(d,v){                                                                                        // 1520
						return d.setUTCDate(v);                                                                                 // 1521
					}                                                                                                        // 1522
				},                                                                                                        // 1523
				val, filtered;                                                                                            // 1524
			setters_map['M'] = setters_map['MM'] = setters_map['mm'] = setters_map['m'];                               // 1525
			setters_map['dd'] = setters_map['d'];                                                                      // 1526
			date = UTCDate(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);                              // 1527
			var fparts = format.parts.slice();                                                                         // 1528
			// Remove noop parts                                                                                       // 1529
			if (parts.length !== fparts.length){                                                                       // 1530
				fparts = $(fparts).filter(function(i,p){                                                                  // 1531
					return $.inArray(p, setters_order) !== -1;                                                               // 1532
				}).toArray();                                                                                             // 1533
			}                                                                                                          // 1534
			// Process remainder                                                                                       // 1535
			function match_part(){                                                                                     // 1536
				var m = this.slice(0, parts[i].length),                                                                   // 1537
					p = parts[i].slice(0, m.length);                                                                         // 1538
				return m === p;                                                                                           // 1539
			}                                                                                                          // 1540
			if (parts.length === fparts.length){                                                                       // 1541
				var cnt;                                                                                                  // 1542
				for (i=0, cnt = fparts.length; i < cnt; i++){                                                             // 1543
					val = parseInt(parts[i], 10);                                                                            // 1544
					part = fparts[i];                                                                                        // 1545
					if (isNaN(val)){                                                                                         // 1546
						switch (part){                                                                                          // 1547
							case 'MM':                                                                                             // 1548
								filtered = $(dates[language].months).filter(match_part);                                              // 1549
								val = $.inArray(filtered[0], dates[language].months) + 1;                                             // 1550
								break;                                                                                                // 1551
							case 'M':                                                                                              // 1552
								filtered = $(dates[language].monthsShort).filter(match_part);                                         // 1553
								val = $.inArray(filtered[0], dates[language].monthsShort) + 1;                                        // 1554
								break;                                                                                                // 1555
						}                                                                                                       // 1556
					}                                                                                                        // 1557
					parsed[part] = val;                                                                                      // 1558
				}                                                                                                         // 1559
				var _date, s;                                                                                             // 1560
				for (i=0; i < setters_order.length; i++){                                                                 // 1561
					s = setters_order[i];                                                                                    // 1562
					if (s in parsed && !isNaN(parsed[s])){                                                                   // 1563
						_date = new Date(date);                                                                                 // 1564
						setters_map[s](_date, parsed[s]);                                                                       // 1565
						if (!isNaN(_date))                                                                                      // 1566
							date = _date;                                                                                          // 1567
					}                                                                                                        // 1568
				}                                                                                                         // 1569
			}                                                                                                          // 1570
			return date;                                                                                               // 1571
		},                                                                                                          // 1572
		formatDate: function(date, format, language){                                                               // 1573
			if (!date)                                                                                                 // 1574
				return '';                                                                                                // 1575
			if (typeof format === 'string')                                                                            // 1576
				format = DPGlobal.parseFormat(format);                                                                    // 1577
			var val = {                                                                                                // 1578
				d: date.getUTCDate(),                                                                                     // 1579
				D: dates[language].daysShort[date.getUTCDay()],                                                           // 1580
				DD: dates[language].days[date.getUTCDay()],                                                               // 1581
				m: date.getUTCMonth() + 1,                                                                                // 1582
				M: dates[language].monthsShort[date.getUTCMonth()],                                                       // 1583
				MM: dates[language].months[date.getUTCMonth()],                                                           // 1584
				yy: date.getUTCFullYear().toString().substring(2),                                                        // 1585
				yyyy: date.getUTCFullYear()                                                                               // 1586
			};                                                                                                         // 1587
			val.dd = (val.d < 10 ? '0' : '') + val.d;                                                                  // 1588
			val.mm = (val.m < 10 ? '0' : '') + val.m;                                                                  // 1589
			date = [];                                                                                                 // 1590
			var seps = $.extend([], format.separators);                                                                // 1591
			for (var i=0, cnt = format.parts.length; i <= cnt; i++){                                                   // 1592
				if (seps.length)                                                                                          // 1593
					date.push(seps.shift());                                                                                 // 1594
				date.push(val[format.parts[i]]);                                                                          // 1595
			}                                                                                                          // 1596
			return date.join('');                                                                                      // 1597
		},                                                                                                          // 1598
		headTemplate: '<thead>'+                                                                                    // 1599
							'<tr>'+                                                                                                // 1600
								'<th class="prev">&laquo;</th>'+                                                                      // 1601
								'<th colspan="5" class="datepicker-switch"></th>'+                                                    // 1602
								'<th class="next">&raquo;</th>'+                                                                      // 1603
							'</tr>'+                                                                                               // 1604
						'</thead>',                                                                                             // 1605
		contTemplate: '<tbody><tr><td colspan="7"></td></tr></tbody>',                                              // 1606
		footTemplate: '<tfoot>'+                                                                                    // 1607
							'<tr>'+                                                                                                // 1608
								'<th colspan="7" class="today"></th>'+                                                                // 1609
							'</tr>'+                                                                                               // 1610
							'<tr>'+                                                                                                // 1611
								'<th colspan="7" class="clear"></th>'+                                                                // 1612
							'</tr>'+                                                                                               // 1613
						'</tfoot>'                                                                                              // 1614
	};                                                                                                           // 1615
	DPGlobal.template = '<div class="datepicker">'+                                                              // 1616
							'<div class="datepicker-days">'+                                                                       // 1617
								'<table class=" table-condensed">'+                                                                   // 1618
									DPGlobal.headTemplate+                                                                               // 1619
									'<tbody></tbody>'+                                                                                   // 1620
									DPGlobal.footTemplate+                                                                               // 1621
								'</table>'+                                                                                           // 1622
							'</div>'+                                                                                              // 1623
							'<div class="datepicker-months">'+                                                                     // 1624
								'<table class="table-condensed">'+                                                                    // 1625
									DPGlobal.headTemplate+                                                                               // 1626
									DPGlobal.contTemplate+                                                                               // 1627
									DPGlobal.footTemplate+                                                                               // 1628
								'</table>'+                                                                                           // 1629
							'</div>'+                                                                                              // 1630
							'<div class="datepicker-years">'+                                                                      // 1631
								'<table class="table-condensed">'+                                                                    // 1632
									DPGlobal.headTemplate+                                                                               // 1633
									DPGlobal.contTemplate+                                                                               // 1634
									DPGlobal.footTemplate+                                                                               // 1635
								'</table>'+                                                                                           // 1636
							'</div>'+                                                                                              // 1637
						'</div>';                                                                                               // 1638
                                                                                                              // 1639
	$.fn.datepicker.DPGlobal = DPGlobal;                                                                         // 1640
                                                                                                              // 1641
                                                                                                              // 1642
	/* DATEPICKER NO CONFLICT                                                                                    // 1643
	* =================== */                                                                                     // 1644
                                                                                                              // 1645
	$.fn.datepicker.noConflict = function(){                                                                     // 1646
		$.fn.datepicker = old;                                                                                      // 1647
		return this;                                                                                                // 1648
	};                                                                                                           // 1649
                                                                                                              // 1650
                                                                                                              // 1651
	/* DATEPICKER DATA-API                                                                                       // 1652
	* ================== */                                                                                      // 1653
                                                                                                              // 1654
	$(document).on(                                                                                              // 1655
		'focus.datepicker.data-api click.datepicker.data-api',                                                      // 1656
		'[data-provide="datepicker"]',                                                                              // 1657
		function(e){                                                                                                // 1658
			var $this = $(this);                                                                                       // 1659
			if ($this.data('datepicker'))                                                                              // 1660
				return;                                                                                                   // 1661
			e.preventDefault();                                                                                        // 1662
			// component click requires us to explicitly show it                                                       // 1663
			$this.datepicker('show');                                                                                  // 1664
		}                                                                                                           // 1665
	);                                                                                                           // 1666
	$(function(){                                                                                                // 1667
		$('[data-provide="datepicker-inline"]').datepicker();                                                       // 1668
	});                                                                                                          // 1669
                                                                                                              // 1670
}(window.jQuery));                                                                                            // 1671
                                                                                                              // 1672
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['rajit:bootstrap3-datepicker'] = {};

})();
