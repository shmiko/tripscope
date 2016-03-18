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
var Blaze = Package.blaze.Blaze;
var UI = Package.blaze.UI;
var Handlebars = Package.blaze.Handlebars;
var HTML = Package.htmljs.HTML;

/* Package-scope variables */
var MailChimp;

(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                 //
// packages/mrt:mailchimp/lib/client/views/subscribe/template.subscribe.js                         //
//                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                   //
                                                                                                   // 1
Template.__define__("MailChimpListSubscribe", (function() {                                        // 2
  var view = this;                                                                                 // 3
  return HTML.DIV("\n	", Blaze.If(function() {                                                     // 4
    return Spacebars.call(view.lookup("message"));                                                 // 5
  }, function() {                                                                                  // 6
    return [ "\n		", HTML.P({                                                                      // 7
      "class": "message"                                                                           // 8
    }, Blaze.View(function() {                                                                     // 9
      return Spacebars.mustache(view.lookup("message"));                                           // 10
    })), "\n	" ];                                                                                  // 11
  }), HTML.Raw('\n		<input class="email" type="email" placeholder="email@example.com">\n		<button class="subscribe" type="button">Subscribe</button>\n	'));
}));                                                                                               // 13
                                                                                                   // 14
/////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                 //
// packages/mrt:mailchimp/lib/client/views/subscribe/subscribe.js                                  //
//                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                   //
var subscribeTitle,                                                                                // 1
	subscribeEmail,                                                                                   // 2
	subscribeButton,                                                                                  // 3
	subscribeMessage			= 'Get on the mailing list:',                                                  // 4
	subscribeInvalidEmail		= 'Invalid email address :(',                                              // 5
	subscribeSubscribing		= 'Subscribing...',                                                         // 6
	subscribeSuccess			= 'Check your inbox! :)',                                                      // 7
	subscribeAlreadySubscribed	= 'Already subscribed! O.o',                                           // 8
                                                                                                   // 9
	showMessage = function ( message ) {                                                              // 10
		if ( subscribeTitle ) {                                                                          // 11
			subscribeTitle.innerHTML = message;                                                             // 12
		}                                                                                                // 13
	},                                                                                                // 14
                                                                                                   // 15
	isValidEmailAddress = function ( emailAddress ) {                                                 // 16
		// http://stackoverflow.com/a/46181/11236                                                        // 17
		var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test( emailAddress );                                                                  // 19
	},                                                                                                // 20
                                                                                                   // 21
	validateEmailAddress = function ( updateMessage ) {                                               // 22
		if ( subscribeEmail.value !== '' && isValidEmailAddress( subscribeEmail.value ) ) {              // 23
			subscribeButton.disabled = false;                                                               // 24
			if ( updateMessage ) {                                                                          // 25
				showMessage( subscribeMessage );                                                               // 26
			}                                                                                               // 27
		} else {                                                                                         // 28
			subscribeButton.disabled = true;                                                                // 29
			if ( subscribeEmail.value !== '' ) {                                                            // 30
				showMessage( subscribeInvalidEmail );                                                          // 31
			} else if ( updateMessage ) {                                                                   // 32
				showMessage( subscribeMessage );                                                               // 33
			}                                                                                               // 34
		}                                                                                                // 35
	},                                                                                                // 36
                                                                                                   // 37
	mailChimpListSubscribe = function ( email, list_id ) {                                            // 38
		var mailChimp = new MailChimp(/* apiKey, options */);                                            // 39
                                                                                                   // 40
		mailChimp.call( 'lists', 'subscribe',                                                            // 41
			{                                                                                               // 42
				id: list_id,		// null -> defined @ server                                                      // 43
				email: {                                                                                       // 44
					email: email                                                                                  // 45
				}                                                                                              // 46
			},                                                                                              // 47
                                                                                                   // 48
			function ( error, result ) {                                                                    // 49
				if ( error ) {                                                                                 // 50
					switch ( error.error ) {                                                                      // 51
						case 232:	// 'Email_NotExists'                                                               // 52
							showMessage( subscribeInvalidEmail );                                                       // 53
							break;                                                                                      // 54
						case 214:	// 'List_AlreadySubscribed'                                                        // 55
							showMessage( subscribeAlreadySubscribed );                                                  // 56
							break;                                                                                      // 57
						case 200:	// 'List_DoesNotExist'                                                             // 58
							// We shouldn't be here!                                                                    // 59
						default:                                                                                     // 60
							showMessage( 'Internal error [' + error.error + ']' );                                      // 61
					}                                                                                             // 62
					console.log( '[MailChimp][Subscribe] Error: ' + error.error + ' - ' + error.reason );         // 63
				} else {                                                                                       // 64
					console.log( '[MailChimp][Subscribe]: ' + subscribeEmail.value + ' ' + subscribeSuccess );    // 65
					console.log( JSON.stringify( result ) );                                                      // 66
					showMessage( subscribeSuccess );                                                              // 67
				}                                                                                              // 68
                                                                                                   // 69
				subscribeEmail.disabled = false;                                                               // 70
				validateEmailAddress( false );                                                                 // 71
			}                                                                                               // 72
		);                                                                                               // 73
	},                                                                                                // 74
                                                                                                   // 75
	subscribeGo = function ( eventBubbling ) {                                                        // 76
		subscribeEmail.disabled		= true;                                                                 // 77
		subscribeButton.disabled	= true;                                                                 // 78
		showMessage( subscribeSubscribing );                                                             // 79
		mailChimpListSubscribe( subscribeEmail.value );                                                  // 80
		// Prevent Event Bubbling                                                                        // 81
		return eventBubbling;                                                                            // 82
	};                                                                                                // 83
                                                                                                   // 84
Template.MailChimpListSubscribe.rendered = function () {                                           // 85
	subscribeTitle	= this.find( '.message' );                                                         // 86
	subscribeEmail	= this.find( '.email' );                                                           // 87
	subscribeButton	= this.find( '.subscribe' );                                                      // 88
	subscribeButton.disabled = ( subscribeEmail.value === '' );                                       // 89
};                                                                                                 // 90
                                                                                                   // 91
Template.MailChimpListSubscribe.helpers({                                                          // 92
	message: function() {                                                                             // 93
		return subscribeMessage;                                                                         // 94
	}                                                                                                 // 95
});                                                                                                // 96
                                                                                                   // 97
Template.MailChimpListSubscribe.events({                                                           // 98
	'focus .email, paste .email, cut .email': function ( e ) {                                        // 99
		setTimeout(function( e ) {                                                                       // 100
			validateEmailAddress( true );                                                                   // 101
		}, 0);                                                                                           // 102
	},                                                                                                // 103
                                                                                                   // 104
	'keyup .email': function ( e ) {                                                                  // 105
		var key = e.which || e.keyCode || e.charCode;                                                    // 106
		if ( key === 8 ||				// [Backspace]                                                              // 107
			 key === 46	) {				// [Delete]                                                                  // 108
			setTimeout(function() {                                                                         // 109
				validateEmailAddress( true );                                                                  // 110
			}, 0);                                                                                          // 111
		}                                                                                                // 112
	},                                                                                                // 113
                                                                                                   // 114
	'keypress .email': function ( e ) {                                                               // 115
		var key = e.which || e.keyCode || e.charCode;                                                    // 116
		setTimeout(function() {                                                                          // 117
			validateEmailAddress( true );                                                                   // 118
			if ( isValidEmailAddress( subscribeEmail.value  ) ) {                                           // 119
				if ( key === 13	) {		// [Return]                                                               // 120
					subscribeGo( true );                                                                          // 121
				}                                                                                              // 122
			}                                                                                               // 123
		}, 0);                                                                                           // 124
	},                                                                                                // 125
                                                                                                   // 126
	'click .subscribe': function ( e ) {                                                              // 127
		validateEmailAddress( true );                                                                    // 128
		if ( isValidEmailAddress( subscribeEmail.value  ) ) {                                            // 129
			subscribeGo( false );                                                                           // 130
		}                                                                                                // 131
	}                                                                                                 // 132
});                                                                                                // 133
                                                                                                   // 134
/////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                 //
// packages/mrt:mailchimp/lib/client/mailchimp.js                                                  //
//                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                   //
MailChimp = function( apiKey, options ) {                                                          // 1
	this._options = function(){                                                                       // 2
		return {                                                                                         // 3
			apiKey: ( apiKey ) ? apiKey : Session.get( 'MailChimpOptions.apiKey' ),                         // 4
			options: options                                                                                // 5
		}                                                                                                // 6
	}                                                                                                 // 7
}                                                                                                  // 8
                                                                                                   // 9
MailChimp.prototype.call = function( section, method, options, callback ) {                        // 10
	Meteor.call( 'MailChimp', this._options(), section, method, options, function ( error, result ) { // 11
		callback( error, result );                                                                       // 12
	});                                                                                               // 13
}                                                                                                  // 14
                                                                                                   // 15
/////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['mrt:mailchimp'] = {
  MailChimp: MailChimp
};

})();
