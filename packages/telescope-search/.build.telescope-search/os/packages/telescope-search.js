(function () {

/////////////////////////////////////////////////////////////////////////////////////////
//                                                                                     //
// packages/telescope-search/lib/search.js                                             //
//                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////
                                                                                       //
// push "search" template to primaryNav                                                // 1
primaryNav.push('search');                                                             // 2
                                                                                       // 3
Searches = new Meteor.Collection("searches", {                                         // 4
  schema: new SimpleSchema({                                                           // 5
    _id: {                                                                             // 6
      type: String,                                                                    // 7
      optional: true                                                                   // 8
    },                                                                                 // 9
    timestamp: {                                                                       // 10
      type: Date                                                                       // 11
    },                                                                                 // 12
    keyword: {                                                                         // 13
      type: String                                                                     // 14
    }                                                                                  // 15
  })                                                                                   // 16
});                                                                                    // 17
                                                                                       // 18
Meteor.startup(function() {                                                            // 19
  Searches.allow({                                                                     // 20
    update: isAdminById                                                                // 21
  , remove: isAdminById                                                                // 22
  });                                                                                  // 23
});                                                                                    // 24
                                                                                       // 25
// search post list parameters                                                         // 26
viewParameters.search = function (terms, baseParameters) {                             // 27
  // if query is empty, just return parameters that will result in an empty collection // 28
  if(typeof terms.query == 'undefined' || !terms.query)                                // 29
    return {find:{_id: 0}}                                                             // 30
                                                                                       // 31
  // log current search in the db                                                      // 32
  if(Meteor.isServer)                                                                  // 33
    logSearch(terms.query);                                                            // 34
                                                                                       // 35
  var parameters = deepExtend(true, baseParameters, {                                  // 36
    find: {                                                                            // 37
      $or: [                                                                           // 38
        {title: {$regex: terms.query, $options: 'i'}},                                 // 39
        {url: {$regex: terms.query, $options: 'i'}},                                   // 40
        {body: {$regex: terms.query, $options: 'i'}}                                   // 41
      ]                                                                                // 42
    }                                                                                  // 43
  });                                                                                  // 44
  return parameters;                                                                   // 45
}                                                                                      // 46
                                                                                       // 47
/////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////
//                                                                                     //
// packages/telescope-search/lib/server/log_search.js                                  //
//                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////
                                                                                       //
logSearch = function (keyword) {                                                       // 1
  Searches.insert({                                                                    // 2
    timestamp: new Date(),                                                             // 3
    keyword: keyword                                                                   // 4
  });                                                                                  // 5
};                                                                                     // 6
/////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////
//                                                                                     //
// packages/telescope-search/lib/server/publications.js                                //
//                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////
                                                                                       //
Meteor.publish('searches', function(limit) {                                           // 1
  var limit = typeof limit === undefined ? 20 : limit;                                 // 2
  if(isAdminById(this.userId)){                                                        // 3
   return Searches.find({}, {limit: limit, sort: {timestamp: -1}});                    // 4
  }                                                                                    // 5
  return [];                                                                           // 6
});                                                                                    // 7
/////////////////////////////////////////////////////////////////////////////////////////

}).call(this);
