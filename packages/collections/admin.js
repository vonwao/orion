orion.collections.onCreated(function() {
  var self = this;

  /**
   * Request a template for the collection
   */
  orion.templates.request('collectionIndex.' + this.name, orion.options.get('collectionsDefaultIndexTemplate'));

  /**
   * Register the index route
   */
  Router.route('/admin/' + this.routePath, function () {
    this.layout(orion.templates.get('layout'));
    this.render(orion.templates.get('collectionIndex.' + self.name), {
      data: function() {
        return {
          collection: self,
        }; 
      }
    });
  }, { name: ('collections.' + this.name + '.index') });
  this.indexPath = function() {
    return Router.path('collections.' + self.name + '.index');
  }

  /**
   * Request a template for the collection create
   */
  orion.templates.request('collectionCreate.' + this.name, orion.options.get('collectionsDefaultCreateTemplate'));

  /**
   * Register the create route
   */
  Router.route('/admin/' + this.routePath + '/create', function () {
    this.layout(orion.templates.get('layout'));
    this.render(orion.templates.get('collectionCreate.' + self.name), {
      data: function() {
        return {
          collection: self,
        }; 
      }
    });
  }, { name: ('collections.' + this.name + '.create') });
  this.createPath = function() {
    return Router.path('collections.' + self.name + '.create');
  }

  /**
   * Request a template for the collection update
   */
  orion.templates.request('collectionUpdate.' + this.name, orion.options.get('collectionsDefaultUpdateTemplate'));
  
  /**
   * Register the update route
   */
  Router.route('/admin/' + this.routePath + '/:_id', function () {
    // should subscribe here
    this.layout(orion.templates.get('layout'));
    var subs = Meteor.subscribe('adminGetOne.' + self.name, this.params._id);
    var item = self.findOne(this.params._id);
    this.render(orion.templates.get('collectionUpdate.' + self.name), {
      data: function() {
        return {
          collection: self,
          item: item,
        }; 
      }
    });
  }, { name: ('collections.' + this.name + '.update') });
  this.updatePath = function(item) {
    var options = item;
    if (_.isString(item)) {
      options = { _id: item };
    }
    return Router.path('collections.' + self.name + '.update', options);
  }

  /**
   * Request a template for the collection delete
   */
  orion.templates.request('collectionDelete.' + this.name, orion.options.get('collectionsDefaultDeleteTemplate'));
  if (Meteor.isClient) {
    orion.templates.setEvents('collectionDelete.' + this.name, {
      'click .confirm-delete': function() {
        self.remove(this.item._id, function() {
          Router.go(self.indexPath());
        });
      }
    })
  }

  /**
   * Register the delete route
   */
  Router.route('/admin/' + this.routePath + '/:_id/delete', function () {
    // should subscribe here
    this.layout(orion.templates.get('layout'));
    var subs = Meteor.subscribe('adminGetOne.' + self.name, this.params._id);
    var item = self.findOne(this.params._id);
    this.render(orion.templates.get('collectionDelete.' + self.name), {
      data: function() {
        return {
          collection: self,
          item: item,
        }; 
      }
    });
  }, { name: ('collections.' + this.name + '.delete') });
  this.deletePath = function(item) {
    var options = item;
    if (_.isString(item)) {
      options = { _id: item };
    }
    return Router.path('collections.' + self.name + '.delete', options);
  }

  /**
   * Register the link
   */
  var linkOptions = _.extend({
    routeName: 'collections.' + this.name + '.index',
    activeRouteRegex: 'collections.' + this.name,
  }, this.link);
  orion.addLink(linkOptions);
})