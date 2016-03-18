(function () {

//////////////////////////////////////////////////////////////////////////////////
//                                                                              //
// packages/telescope-update-prompt/lib/server/phone_home.js                    //
//                                                                              //
//////////////////////////////////////////////////////////////////////////////////
                                                                                //
Meteor.methods({                                                                // 1
  phoneHome: function  () {                                                     // 2
                                                                                // 3
    var url = 'http://version.telescopeapp.org/';                               // 4
                                                                                // 5
    var params = {                                                              // 6
      currentVersion: telescopeVersion,                                         // 7
      siteTitle: getSetting('title'),                                           // 8
      siteUrl: getSiteUrl(),                                                    // 9
      users: Meteor.users.find().count(),                                       // 10
      posts: Posts.find().count(),                                              // 11
      comments: Comments.find().count()                                         // 12
    }                                                                           // 13
                                                                                // 14
    if(Meteor.user() && isAdmin(Meteor.user())){                                // 15
                                                                                // 16
      this.unblock();                                                           // 17
      try {                                                                     // 18
        var result = HTTP.get(url, {                                            // 19
          params: params                                                        // 20
        })                                                                      // 21
        return result;                                                          // 22
      } catch (e) {                                                             // 23
        // Got a network error, time-out or HTTP error in the 400 or 500 range. // 24
        return false;                                                           // 25
      }                                                                         // 26
    }                                                                           // 27
  }                                                                             // 28
})                                                                              // 29
//////////////////////////////////////////////////////////////////////////////////

}).call(this);
