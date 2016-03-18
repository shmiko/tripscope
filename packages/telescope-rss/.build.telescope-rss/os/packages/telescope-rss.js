(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                //
// packages/telescope-rss/lib/server/rss.js                                                                       //
//                                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                  //
var RSS = Npm.require('rss');                                                                                     // 1
                                                                                                                  // 2
var getMeta = function() {                                                                                        // 3
  return {                                                                                                        // 4
    title: getSetting('title'),                                                                                   // 5
    description: getSetting('tagline'),                                                                           // 6
    feed_url: Meteor.absoluteUrl()+'feed.xml',                                                                    // 7
    site_url: Meteor.absoluteUrl(),                                                                               // 8
    image_url: Meteor.absoluteUrl()+'img/favicon.png',                                                            // 9
  };                                                                                                              // 10
};                                                                                                                // 11
                                                                                                                  // 12
servePostRSS = function() {                                                                                       // 13
  var feed = new RSS(getMeta());                                                                                  // 14
                                                                                                                  // 15
  Posts.find(getPostsParameters({}).find, {sort: {postedAt: -1}, limit: 20}).forEach(function(post) {             // 16
    var description = !!post.body ? post.body+'</br></br>' : '';                                                  // 17
    feed.item({                                                                                                   // 18
     title: post.title,                                                                                           // 19
     description: description+'<a href="'+getPostUrl(post._id)+'">Discuss</a>',                                   // 20
     author: post.author,                                                                                         // 21
     date: post.postedAt,                                                                                         // 22
     url: getPostLink(post),                                                                                      // 23
     guid: post._id                                                                                               // 24
    });                                                                                                           // 25
  });                                                                                                             // 26
                                                                                                                  // 27
  return feed.xml();                                                                                              // 28
};                                                                                                                // 29
                                                                                                                  // 30
serveCommentRSS = function() {                                                                                    // 31
  var feed = new RSS(getMeta());                                                                                  // 32
                                                                                                                  // 33
  Comments.find({isDeleted: {$ne: true}}, {sort: {postedAt: -1}, limit: 20}).forEach(function(comment) {          // 34
    post = Posts.findOne(comment.postId);                                                                         // 35
    feed.item({                                                                                                   // 36
     title: 'Comment on '+post.title,                                                                             // 37
     description: comment.body+'</br></br>'+'<a href="'+getPostCommentUrl(post._id, comment._id)+'">Discuss</a>', // 38
     author: comment.author,                                                                                      // 39
     date: comment.postedAt,                                                                                      // 40
     url: getCommentUrl(comment._id),                                                                             // 41
     guid: comment._id                                                                                            // 42
    });                                                                                                           // 43
  });                                                                                                             // 44
                                                                                                                  // 45
  return feed.xml();                                                                                              // 46
};                                                                                                                // 47
                                                                                                                  // 48
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                //
// packages/telescope-rss/lib/server/routes.js                                                                    //
//                                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                  //
Meteor.startup(function () {                                                                                      // 1
                                                                                                                  // 2
  // Post RSS                                                                                                     // 3
                                                                                                                  // 4
  Router.route('/feed.xml', {                                                                                     // 5
    name: 'feed',                                                                                                 // 6
    where: 'server',                                                                                              // 7
    action: function() {                                                                                          // 8
      this.response.write(servePostRSS());                                                                        // 9
      this.response.end();                                                                                        // 10
    }                                                                                                             // 11
  });                                                                                                             // 12
                                                                                                                  // 13
  // Comment RSS                                                                                                  // 14
                                                                                                                  // 15
  Router.route('/rss/comments.xml', {                                                                             // 16
    name: 'rss_comments',                                                                                         // 17
    where: 'server',                                                                                              // 18
    action: function() {                                                                                          // 19
      this.response.write(serveCommentRSS());                                                                     // 20
      this.response.end();                                                                                        // 21
    }                                                                                                             // 22
  });                                                                                                             // 23
                                                                                                                  // 24
});                                                                                                               // 25
                                                                                                                  // 26
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);
