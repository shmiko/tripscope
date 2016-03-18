(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                  //
// packages/telescope-tags/lib/tags.js                                                              //
//                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                    //
categorySchema = new SimpleSchema({                                                                 // 1
 _id: {                                                                                             // 2
    type: String,                                                                                   // 3
    optional: true                                                                                  // 4
  },                                                                                                // 5
  order: {                                                                                          // 6
    type: Number,                                                                                   // 7
    optional: true                                                                                  // 8
  },                                                                                                // 9
  slug: {                                                                                           // 10
    type: String                                                                                    // 11
  },                                                                                                // 12
  name: {                                                                                           // 13
    type: String                                                                                    // 14
  },                                                                                                // 15
});                                                                                                 // 16
                                                                                                    // 17
Categories = new Meteor.Collection("categories", {                                                  // 18
  schema: categorySchema                                                                            // 19
});                                                                                                 // 20
                                                                                                    // 21
// category post list parameters                                                                    // 22
viewParameters.category = function (terms) {                                                        // 23
  return {                                                                                          // 24
    find: {'categories.slug': terms.category},                                                      // 25
    options: {sort: {sticky: -1, score: -1}}                                                        // 26
  };                                                                                                // 27
}                                                                                                   // 28
                                                                                                    // 29
// push "categories" modules to postHeading                                                         // 30
postHeading.push({                                                                                  // 31
  template: 'postCategories',                                                                       // 32
  order: 3                                                                                          // 33
});                                                                                                 // 34
                                                                                                    // 35
// push "categoriesMenu" template to primaryNav                                                     // 36
primaryNav.push('categoriesMenu');                                                                  // 37
                                                                                                    // 38
// push "categories" property to addToPostSchema, so that it's later added to postSchema            // 39
addToPostSchema.push(                                                                               // 40
  {                                                                                                 // 41
    propertyName: 'categories',                                                                     // 42
    propertySchema: {                                                                               // 43
      type: [categorySchema],                                                                       // 44
      optional: true                                                                                // 45
    }                                                                                               // 46
  }                                                                                                 // 47
);                                                                                                  // 48
                                                                                                    // 49
var getCheckedCategories = function (properties) {                                                  // 50
  properties.categories = [];                                                                       // 51
  $('input[name=category]:checked').each(function() {                                               // 52
    var categoryId = $(this).val();                                                                 // 53
    properties.categories.push(Categories.findOne(categoryId));                                     // 54
  });                                                                                               // 55
  return properties;                                                                                // 56
}                                                                                                   // 57
                                                                                                    // 58
postSubmitClientCallbacks.push(getCheckedCategories);                                               // 59
postEditClientCallbacks.push(getCheckedCategories);                                                 // 60
                                                                                                    // 61
Meteor.startup(function () {                                                                        // 62
  Categories.allow({                                                                                // 63
    insert: isAdminById                                                                             // 64
  , update: isAdminById                                                                             // 65
  , remove: isAdminById                                                                             // 66
  });                                                                                               // 67
                                                                                                    // 68
  Meteor.methods({                                                                                  // 69
    category: function(category){                                                                   // 70
      console.log(category)                                                                         // 71
      if (!Meteor.user() || !isAdmin(Meteor.user()))                                                // 72
        throw new Meteor.Error(i18n.t('You need to login and be an admin to add a new category.')); // 73
      var categoryId=Categories.insert(category);                                                   // 74
      return category.name;                                                                         // 75
    }                                                                                               // 76
  });                                                                                               // 77
});                                                                                                 // 78
                                                                                                    // 79
getCategoryUrl = function(slug){                                                                    // 80
  return getSiteUrl()+'category/'+slug;                                                             // 81
};                                                                                                  // 82
//////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                  //
// packages/telescope-tags/lib/server/publications.js                                               //
//                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                    //
Meteor.publish('categories', function() {                                                           // 1
  if(canViewById(this.userId)){                                                                     // 2
    return Categories.find();                                                                       // 3
  }                                                                                                 // 4
  return [];                                                                                        // 5
});                                                                                                 // 6
//////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);
