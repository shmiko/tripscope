(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                     //
// packages/telescope-api/lib/server/api.js                                                            //
//                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                       //
serveAPI = function(limitSegment){                                                                     // 1
  var posts = [];                                                                                      // 2
  var limit = typeof limitSegment === 'undefined' ? 20 : limitSegment // default limit: 20 posts       // 3
                                                                                                       // 4
  Posts.find({status: STATUS_APPROVED}, {sort: {postedAt: -1}, limit: limit}).forEach(function(post) { // 5
    var url = getPostLink(post);                                                                       // 6
    var properties = {                                                                                 // 7
     title: post.title,                                                                                // 8
     headline: post.title, // for backwards compatibility                                              // 9
     author: post.author,                                                                              // 10
     date: post.postedAt,                                                                              // 11
     url: url,                                                                                         // 12
     guid: post._id                                                                                    // 13
    };                                                                                                 // 14
                                                                                                       // 15
    if(post.body)                                                                                      // 16
      properties.body = post.body;                                                                     // 17
                                                                                                       // 18
    if(post.url)                                                                                       // 19
      properties.domain = getDomain(url);                                                              // 20
                                                                                                       // 21
    if(twitterName = getTwitterNameById(post.userId))                                                  // 22
      properties.twitterName = twitterName;                                                            // 23
                                                                                                       // 24
    var comments = [];                                                                                 // 25
                                                                                                       // 26
    Comments.find({postId: post._id}, {sort: {postedAt: -1}, limit: 50}).forEach(function(comment) {   // 27
      var commentProperties = {                                                                        // 28
       body: comment.body,                                                                             // 29
       author: comment.author,                                                                         // 30
       date: comment.postedAt,                                                                         // 31
       guid: comment._id,                                                                              // 32
       parentCommentId: comment.parentCommentId                                                        // 33
      };                                                                                               // 34
      comments.push(commentProperties);                                                                // 35
    });                                                                                                // 36
                                                                                                       // 37
    var commentsToDelete = [];                                                                         // 38
                                                                                                       // 39
    comments.forEach(function(comment, index) {                                                        // 40
      if (comment.parentCommentId) {                                                                   // 41
        var parent = comments.filter(function(obj) {                                                   // 42
          return obj.guid === comment.parentCommentId;                                                 // 43
        })[0];                                                                                         // 44
        if (parent) {                                                                                  // 45
          parent.replies = parent.replies || [];                                                       // 46
          parent.replies.push(JSON.parse(JSON.stringify(comment)));                                    // 47
          commentsToDelete.push(index)                                                                 // 48
        }                                                                                              // 49
      }                                                                                                // 50
    });                                                                                                // 51
                                                                                                       // 52
    commentsToDelete.reverse().forEach(function(index) {                                               // 53
      comments.splice(index,1);                                                                        // 54
    });                                                                                                // 55
                                                                                                       // 56
    properties.comments = comments;                                                                    // 57
                                                                                                       // 58
    posts.push(properties);                                                                            // 59
  });                                                                                                  // 60
                                                                                                       // 61
  return JSON.stringify(posts);                                                                        // 62
};                                                                                                     // 63
                                                                                                       // 64
/////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                     //
// packages/telescope-api/lib/server/routes.js                                                         //
//                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                       //
Meteor.startup(function () {                                                                           // 1
                                                                                                       // 2
  Router.route('api', {                                                                                // 3
    where: 'server',                                                                                   // 4
    path: '/api/:limit?',                                                                              // 5
    action: function() {                                                                               // 6
      var limit = parseInt(this.params.limit);                                                         // 7
      this.response.write(serveAPI(limit));                                                            // 8
      this.response.end();                                                                             // 9
    }                                                                                                  // 10
  });                                                                                                  // 11
                                                                                                       // 12
});                                                                                                    // 13
/////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);
