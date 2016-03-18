(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var Random = Package.random.Random;
var MongoInternals = Package.mongo.MongoInternals;
var Mongo = Package.mongo.Mongo;

/* Package-scope variables */
var MeteorX, exposeLivedata, exposeMongoLivedata;

(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                              //
// packages/meteorhacks:meteorx/lib/livedata.js                                                 //
//                                                                                              //
//////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                //
exposeLivedata = function(namespace) {                                                          // 1
  //instrumenting session                                                                       // 2
  var fakeSocket = {send: function() {}, close: function() {}, headers: []};                    // 3
  var ddpConnectMessage = {msg: 'connect', version: 'pre1', support: ['pre1']};                 // 4
  Meteor.default_server._handleConnect(fakeSocket, ddpConnectMessage);                          // 5
                                                                                                // 6
  if(fakeSocket._meteorSession) { //for newer meteor versions                                   // 7
    namespace.Session = fakeSocket._meteorSession.constructor;                                  // 8
                                                                                                // 9
    exposeSubscription(fakeSocket._meteorSession, namespace);                                   // 10
    exposeSessionCollectionView(fakeSocket._meteorSession, namespace);                          // 11
                                                                                                // 12
    if(Meteor.default_server._closeSession) {                                                   // 13
      //0.7.x +                                                                                 // 14
      Meteor.default_server._closeSession(fakeSocket._meteorSession);                           // 15
    } else if(Meteor.default_server._destroySession) {                                          // 16
      //0.6.6.x                                                                                 // 17
      Meteor.default_server._destroySession(fakeSocket._meteorSession);                         // 18
    }                                                                                           // 19
  } else if(fakeSocket.meteor_session) { //support for 0.6.5.x                                  // 20
    namespace.Session = fakeSocket.meteor_session.constructor;                                  // 21
                                                                                                // 22
    //instrumenting subscription                                                                // 23
    exposeSubscription(fakeSocket.meteor_session, namespace);                                   // 24
    exposeSessionCollectionView(fakeSocket._meteorSession, namespace);                          // 25
                                                                                                // 26
    fakeSocket.meteor_session.detach(fakeSocket);                                               // 27
  } else {                                                                                      // 28
    console.error('expose: session exposing failed');                                           // 29
  }                                                                                             // 30
};                                                                                              // 31
                                                                                                // 32
function exposeSubscription(session, namespace) {                                               // 33
  var subId = Random.id();                                                                      // 34
  var publicationHandler = function() {this.ready()};                                           // 35
  var pubName = '__dummy_pub_' + Random.id();                                                   // 36
                                                                                                // 37
  session._startSubscription(publicationHandler, subId, [], pubName);                           // 38
  var subscription = session._namedSubs[subId];                                                 // 39
  namespace.Subscription = subscription.constructor;                                            // 40
                                                                                                // 41
  //cleaning up                                                                                 // 42
  session._stopSubscription(subId);                                                             // 43
}                                                                                               // 44
                                                                                                // 45
function exposeSessionCollectionView(session, namespace) {                                      // 46
  var documentView = session.getCollectionView();                                               // 47
  namespace.SessionCollectionView = documentView.constructor;                                   // 48
                                                                                                // 49
  var id = 'the-id';                                                                            // 50
  documentView.added('sample-handle', id, {aa: 10});                                            // 51
  namespace.SessionDocumentView = documentView.documents[id].constructor;                       // 52
}                                                                                               // 53
//////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                              //
// packages/meteorhacks:meteorx/lib/mongo-livedata.js                                           //
//                                                                                              //
//////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                //
exposeMongoLivedata = function(namespace) {                                                     // 1
  var coll = new Meteor.Collection('__dummy_coll_' + Random.id());                              // 2
  //we need wait until db get connected with meteor, .findOne() does that                       // 3
  coll.findOne();                                                                               // 4
                                                                                                // 5
  namespace.MongoConnection = MongoInternals.defaultRemoteCollectionDriver().mongo.constructor; // 6
  var cursor = coll.find();                                                                     // 7
  namespace.MongoCursor = cursor.constructor;                                                   // 8
  exposeOplogDriver(namespace, coll);                                                           // 9
  exposePollingDriver(namespace, coll);                                                         // 10
  exposeMultiplexer(namespace, coll);                                                           // 11
}                                                                                               // 12
                                                                                                // 13
function exposeOplogDriver(namespace, coll) {                                                   // 14
  var driver = _getObserverDriver(coll.find({}));                                               // 15
  // verify observer driver is an oplog driver                                                  // 16
  if(driver && typeof driver.constructor.cursorSupported == 'function') {                       // 17
    namespace.MongoOplogDriver = driver.constructor;                                            // 18
  }                                                                                             // 19
}                                                                                               // 20
                                                                                                // 21
function exposePollingDriver(namespace, coll) {                                                 // 22
  var cursor = coll.find({}, {limit: 20, _disableOplog: true});                                 // 23
  var driver = _getObserverDriver(cursor);                                                      // 24
  // verify observer driver is a polling driver                                                 // 25
  if(driver && typeof driver.constructor.cursorSupported == 'undefined') {                      // 26
    namespace.MongoPollingDriver = driver.constructor;                                          // 27
  }                                                                                             // 28
}                                                                                               // 29
                                                                                                // 30
function exposeMultiplexer(namespace, coll) {                                                   // 31
  var multiplexer = _getMultiplexer(coll.find({}));                                             // 32
  if(multiplexer) {                                                                             // 33
    namespace.Multiplexer = multiplexer.constructor;                                            // 34
  }                                                                                             // 35
}                                                                                               // 36
                                                                                                // 37
function _getObserverDriver(cursor) {                                                           // 38
  var multiplexer = _getMultiplexer(cursor);                                                    // 39
  if(multiplexer && multiplexer._observeDriver) {                                               // 40
    return multiplexer._observeDriver;                                                          // 41
  }                                                                                             // 42
}                                                                                               // 43
                                                                                                // 44
function _getMultiplexer(cursor) {                                                              // 45
  var handler = cursor.observeChanges({added: Function.prototype});                             // 46
  handler.stop();                                                                               // 47
  return handler._multiplexer;                                                                  // 48
}                                                                                               // 49
                                                                                                // 50
//////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                              //
// packages/meteorhacks:meteorx/lib/server.js                                                   //
//                                                                                              //
//////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                //
MeteorX = {};                                                                                   // 1
                                                                                                // 2
MeteorX.Server = Meteor.server.constructor;                                                     // 3
                                                                                                // 4
exposeLivedata(MeteorX);                                                                        // 5
exposeMongoLivedata(MeteorX);                                                                   // 6
                                                                                                // 7
//////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['meteorhacks:meteorx'] = {
  MeteorX: MeteorX
};

})();

//# sourceMappingURL=meteorhacks_meteorx.js.map
