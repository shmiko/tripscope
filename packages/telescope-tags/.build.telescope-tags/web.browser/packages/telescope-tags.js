(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                //
// packages/telescope-tags/lib/tags.js                                                                            //
//                                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                  //
categorySchema = new SimpleSchema({                                                                               // 1
 _id: {                                                                                                           // 2
    type: String,                                                                                                 // 3
    optional: true                                                                                                // 4
  },                                                                                                              // 5
  order: {                                                                                                        // 6
    type: Number,                                                                                                 // 7
    optional: true                                                                                                // 8
  },                                                                                                              // 9
  slug: {                                                                                                         // 10
    type: String                                                                                                  // 11
  },                                                                                                              // 12
  name: {                                                                                                         // 13
    type: String                                                                                                  // 14
  },                                                                                                              // 15
});                                                                                                               // 16
                                                                                                                  // 17
Categories = new Meteor.Collection("categories", {                                                                // 18
  schema: categorySchema                                                                                          // 19
});                                                                                                               // 20
                                                                                                                  // 21
// category post list parameters                                                                                  // 22
viewParameters.category = function (terms) {                                                                      // 23
  return {                                                                                                        // 24
    find: {'categories.slug': terms.category},                                                                    // 25
    options: {sort: {sticky: -1, score: -1}}                                                                      // 26
  };                                                                                                              // 27
}                                                                                                                 // 28
                                                                                                                  // 29
// push "categories" modules to postHeading                                                                       // 30
postHeading.push({                                                                                                // 31
  template: 'postCategories',                                                                                     // 32
  order: 3                                                                                                        // 33
});                                                                                                               // 34
                                                                                                                  // 35
// push "categoriesMenu" template to primaryNav                                                                   // 36
primaryNav.push('categoriesMenu');                                                                                // 37
                                                                                                                  // 38
// push "categories" property to addToPostSchema, so that it's later added to postSchema                          // 39
addToPostSchema.push(                                                                                             // 40
  {                                                                                                               // 41
    propertyName: 'categories',                                                                                   // 42
    propertySchema: {                                                                                             // 43
      type: [categorySchema],                                                                                     // 44
      optional: true                                                                                              // 45
    }                                                                                                             // 46
  }                                                                                                               // 47
);                                                                                                                // 48
                                                                                                                  // 49
var getCheckedCategories = function (properties) {                                                                // 50
  properties.categories = [];                                                                                     // 51
  $('input[name=category]:checked').each(function() {                                                             // 52
    var categoryId = $(this).val();                                                                               // 53
    properties.categories.push(Categories.findOne(categoryId));                                                   // 54
  });                                                                                                             // 55
  return properties;                                                                                              // 56
}                                                                                                                 // 57
                                                                                                                  // 58
postSubmitClientCallbacks.push(getCheckedCategories);                                                             // 59
postEditClientCallbacks.push(getCheckedCategories);                                                               // 60
                                                                                                                  // 61
Meteor.startup(function () {                                                                                      // 62
  Categories.allow({                                                                                              // 63
    insert: isAdminById                                                                                           // 64
  , update: isAdminById                                                                                           // 65
  , remove: isAdminById                                                                                           // 66
  });                                                                                                             // 67
                                                                                                                  // 68
  Meteor.methods({                                                                                                // 69
    category: function(category){                                                                                 // 70
      console.log(category)                                                                                       // 71
      if (!Meteor.user() || !isAdmin(Meteor.user()))                                                              // 72
        throw new Meteor.Error(i18n.t('You need to login and be an admin to add a new category.'));               // 73
      var categoryId=Categories.insert(category);                                                                 // 74
      return category.name;                                                                                       // 75
    }                                                                                                             // 76
  });                                                                                                             // 77
});                                                                                                               // 78
                                                                                                                  // 79
getCategoryUrl = function(slug){                                                                                  // 80
  return getSiteUrl()+'category/'+slug;                                                                           // 81
};                                                                                                                // 82
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                //
// packages/telescope-tags/lib/client/routes.js                                                                   //
//                                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                  //
preloadSubscriptions.push('categories');                                                                          // 1
                                                                                                                  // 2
adminNav.push({                                                                                                   // 3
  route: 'categories',                                                                                            // 4
  label: 'Categories'                                                                                             // 5
});                                                                                                               // 6
                                                                                                                  // 7
Meteor.startup(function () {                                                                                      // 8
                                                                                                                  // 9
  Router.onBeforeAction(Router._filters.isAdmin, {only: ['categories']});                                         // 10
                                                                                                                  // 11
  PostsCategoryController = PostsListController.extend({                                                          // 12
    view: 'category'                                                                                              // 13
  });                                                                                                             // 14
                                                                                                                  // 15
                                                                                                                  // 16
  // Categories                                                                                                   // 17
                                                                                                                  // 18
  Router.route('/category/:slug/:limit?', {                                                                       // 19
    name: 'posts_category',                                                                                       // 20
    controller: PostsCategoryController,                                                                          // 21
    onAfterAction: function() {                                                                                   // 22
      Session.set('categorySlug', this.params.slug);                                                              // 23
    }                                                                                                             // 24
  });                                                                                                             // 25
                                                                                                                  // 26
  // Categories Admin                                                                                             // 27
                                                                                                                  // 28
  Router.route('/categories', {                                                                                   // 29
    name: 'categories'                                                                                            // 30
  });                                                                                                             // 31
                                                                                                                  // 32
                                                                                                                  // 33
});                                                                                                               // 34
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                //
// packages/telescope-tags/lib/client/views/template.categories.js                                                //
//                                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                  //
                                                                                                                  // 1
Template.__checkName("categories");                                                                               // 2
Template["categories"] = new Template("Template.categories", (function() {                                        // 3
  var view = this;                                                                                                // 4
  return HTML.DIV({                                                                                               // 5
    "class": "grid-small grid-module dialog admin"                                                                // 6
  }, HTML.Raw('\n    <h2>Categories</h2>\n    <form class="form-block">\n      <h3>Add new category</h3>\n      <div class="control-group">\n        <label>Name</label>\n        <div class="controls"><input id="name" type="text" value=""></div>\n      </div>\n      <div class="control-group">\n        <label>Order</label>\n        <div class="controls"><input id="order" type="number" value=""></div>\n      </div>\n      <div class="form-actions">\n        <input type="submit" class="button" value="Submit">\n      </div>\n    </form>\n    '), HTML.UL("\n      ", Blaze.Each(function() {
    return Spacebars.call(view.lookup("categories"));                                                             // 8
  }, function() {                                                                                                 // 9
    return [ "\n        ", Blaze._TemplateWith(function() {                                                       // 10
      return {                                                                                                    // 11
        template: Spacebars.call(view.lookup("categoryItem"))                                                     // 12
      };                                                                                                          // 13
    }, function() {                                                                                               // 14
      return Spacebars.include(function() {                                                                       // 15
        return Spacebars.call(Template.__dynamic);                                                                // 16
      });                                                                                                         // 17
    }), "\n      " ];                                                                                             // 18
  }), "\n    "), "\n  ");                                                                                         // 19
}));                                                                                                              // 20
                                                                                                                  // 21
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                //
// packages/telescope-tags/lib/client/views/categories.js                                                         //
//                                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                  //
Meteor.startup(function () {                                                                                      // 1
  Template[getTemplate('categories')].helpers({                                                                   // 2
    categories: function(){                                                                                       // 3
      return Categories.find({}, {sort: {order: 1, name: 1}});                                                    // 4
    },                                                                                                            // 5
    categoryItem: function () {                                                                                   // 6
      return getTemplate('categoryItem');                                                                         // 7
    }                                                                                                             // 8
  });                                                                                                             // 9
                                                                                                                  // 10
  Template[getTemplate('categories')].events({                                                                    // 11
    'click input[type=submit]': function(e){                                                                      // 12
      e.preventDefault();                                                                                         // 13
                                                                                                                  // 14
      var name = $('#name').val();                                                                                // 15
      var numberOfCategories = Categories.find().count();                                                         // 16
      var order = parseInt($('#order').val()) || (numberOfCategories + 1);                                        // 17
      var slug = slugify(name);                                                                                   // 18
                                                                                                                  // 19
      Meteor.call('category', {                                                                                   // 20
        name: name,                                                                                               // 21
        order: order,                                                                                             // 22
        slug: slug                                                                                                // 23
      }, function(error, categoryName) {                                                                          // 24
        if(error){                                                                                                // 25
          console.log(error);                                                                                     // 26
          throwError(error.reason);                                                                               // 27
          clearSeenErrors();                                                                                      // 28
        }else{                                                                                                    // 29
          $('#name').val('');                                                                                     // 30
          // throwError('New category "'+categoryName+'" created');                                               // 31
        }                                                                                                         // 32
      });                                                                                                         // 33
    }                                                                                                             // 34
  });                                                                                                             // 35
});                                                                                                               // 36
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                //
// packages/telescope-tags/lib/client/views/template.category_item.js                                             //
//                                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                  //
                                                                                                                  // 1
Template.__checkName("categoryItem");                                                                             // 2
Template["categoryItem"] = new Template("Template.categoryItem", (function() {                                    // 3
  var view = this;                                                                                                // 4
  return HTML.LI("      \n		", HTML.FORM("\n        ", HTML.DIV({                                                 // 5
    "class": "control-group inline"                                                                               // 6
  }, "\n          ", HTML.Raw('<a class="button submit edit-link" href="#">Save</a>'), "\n          ", HTML.DIV({ // 7
    "class": "controls"                                                                                           // 8
  }, "\n            ", HTML.INPUT({                                                                               // 9
    "class": "category-name",                                                                                     // 10
    id: function() {                                                                                              // 11
      return [ "name_", Spacebars.mustache(view.lookup("_id")) ];                                                 // 12
    },                                                                                                            // 13
    type: "text",                                                                                                 // 14
    value: function() {                                                                                           // 15
      return Spacebars.mustache(view.lookup("name"));                                                             // 16
    },                                                                                                            // 17
    placeholder: "Name"                                                                                           // 18
  }), "\n            ", HTML.INPUT({                                                                              // 19
    "class": "category-number",                                                                                   // 20
    id: function() {                                                                                              // 21
      return [ "order_", Spacebars.mustache(view.lookup("_id")) ];                                                // 22
    },                                                                                                            // 23
    type: "number",                                                                                               // 24
    value: function() {                                                                                           // 25
      return Spacebars.mustache(view.lookup("order"));                                                            // 26
    },                                                                                                            // 27
    placeholder: "0"                                                                                              // 28
  }), "\n          "), "\n          ", HTML.SPAN({                                                                // 29
    "class": "category-slug small"                                                                                // 30
  }, "Slug: /", Blaze.View(function() {                                                                           // 31
    return Spacebars.mustache(view.lookup("slug"));                                                               // 32
  })), "\n        "), "\n      "), "\n  ");                                                                       // 33
}));                                                                                                              // 34
                                                                                                                  // 35
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                //
// packages/telescope-tags/lib/client/views/category_item.js                                                      //
//                                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                  //
Meteor.startup(function () {                                                                                      // 1
  Template[getTemplate('categoryItem')].events({                                                                  // 2
    'click .edit-link': function(e, instance){                                                                    // 3
      e.preventDefault();                                                                                         // 4
      var categoryId = instance.data._id;                                                                         // 5
      var name = $('#name_'+categoryId).val();                                                                    // 6
      var order = parseInt($('#order_'+categoryId).val());                                                        // 7
      var slug = slugify(name);                                                                                   // 8
      if(name){                                                                                                   // 9
        Categories.update(categoryId,{ $set: {name: name, slug: slug, order: order}});                            // 10
      }else{                                                                                                      // 11
        Categories.remove(categoryId);                                                                            // 12
      }                                                                                                           // 13
      Meteor.call('updateCategoryInPosts', categoryId, function(error) {                                          // 14
        if (error) {                                                                                              // 15
          throwError(error.reason);                                                                               // 16
        }                                                                                                         // 17
      });                                                                                                         // 18
    }                                                                                                             // 19
  });                                                                                                             // 20
});                                                                                                               // 21
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                //
// packages/telescope-tags/lib/client/views/template.categories_menu.js                                           //
//                                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                  //
                                                                                                                  // 1
Template.__checkName("categoriesMenu");                                                                           // 2
Template["categoriesMenu"] = new Template("Template.categoriesMenu", (function() {                                // 3
  var view = this;                                                                                                // 4
  return Blaze.If(function() {                                                                                    // 5
    return Spacebars.call(view.lookup("hasCategories"));                                                          // 6
  }, function() {                                                                                                 // 7
    return [ "\n    ", HTML.DIV({                                                                                 // 8
      "class": "dropdown categories-menu header-submodule"                                                        // 9
    }, "\n      ", HTML.A({                                                                                       // 10
      "class": "categories dropdown-top-level",                                                                   // 11
      href: "/"                                                                                                   // 12
    }, Blaze.View(function() {                                                                                    // 13
      return Spacebars.mustache(view.lookup("i18n"), "Categories");                                               // 14
    })), "\n      ", HTML.DIV({                                                                                   // 15
      "class": "dropdown-menu"                                                                                    // 16
    }, "\n        ", HTML.UL({                                                                                    // 17
      role: "menu",                                                                                               // 18
      "aria-labelledby": "dLabel"                                                                                 // 19
    }, "\n          ", Blaze.Each(function() {                                                                    // 20
      return Spacebars.call(view.lookup("categories"));                                                           // 21
    }, function() {                                                                                               // 22
      return [ "\n            ", HTML.LI(HTML.A({                                                                 // 23
        "class": "dropdown-sub-level",                                                                            // 24
        href: function() {                                                                                        // 25
          return Spacebars.mustache(view.lookup("categoryLink"));                                                 // 26
        }                                                                                                         // 27
      }, Blaze.View(function() {                                                                                  // 28
        return Spacebars.mustache(view.lookup("name"));                                                           // 29
      }))), "\n          " ];                                                                                     // 30
    }), "\n        "), "\n      "), "\n    "), "\n  " ];                                                          // 31
  });                                                                                                             // 32
}));                                                                                                              // 33
                                                                                                                  // 34
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                //
// packages/telescope-tags/lib/client/views/categories_menu.js                                                    //
//                                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                  //
Meteor.startup(function () {                                                                                      // 1
  Template[getTemplate('categoriesMenu')].helpers({                                                               // 2
    hasCategories: function(){                                                                                    // 3
      return typeof Categories !== 'undefined' && Categories.find().count();                                      // 4
    },                                                                                                            // 5
    categories: function(){                                                                                       // 6
      return Categories.find({}, {sort: {order: 1, name: 1}});                                                    // 7
    },                                                                                                            // 8
    categoryLink: function () {                                                                                   // 9
      return getCategoryUrl(this.slug);                                                                           // 10
    }                                                                                                             // 11
  });                                                                                                             // 12
});                                                                                                               // 13
                                                                                                                  // 14
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                //
// packages/telescope-tags/lib/client/views/template.post_categories.js                                           //
//                                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                  //
                                                                                                                  // 1
Template.__checkName("postCategories");                                                                           // 2
Template["postCategories"] = new Template("Template.postCategories", (function() {                                // 3
  var view = this;                                                                                                // 4
  return Blaze.Each(function() {                                                                                  // 5
    return Spacebars.call(view.lookup("categories"));                                                             // 6
  }, function() {                                                                                                 // 7
    return [ "\n    ", HTML.A({                                                                                   // 8
      href: function() {                                                                                          // 9
        return Spacebars.mustache(view.lookup("categoryLink"));                                                   // 10
      },                                                                                                          // 11
      "class": function() {                                                                                       // 12
        return [ "post-category category-", Spacebars.mustache(view.lookup("slug")) ];                            // 13
      }                                                                                                           // 14
    }, Blaze.View(function() {                                                                                    // 15
      return Spacebars.mustache(view.lookup("name"));                                                             // 16
    })), "\n  " ];                                                                                                // 17
  });                                                                                                             // 18
}));                                                                                                              // 19
                                                                                                                  // 20
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                //
// packages/telescope-tags/lib/client/views/post_categories.js                                                    //
//                                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                  //
Meteor.startup(function () {                                                                                      // 1
  Template[getTemplate('postCategories')].helpers({                                                               // 2
    categoryLink: function(){                                                                                     // 3
      return getCategoryUrl(this.slug);                                                                           // 4
    }                                                                                                             // 5
  });                                                                                                             // 6
});                                                                                                               // 7
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);
