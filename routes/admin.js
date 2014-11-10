Router.map(function() {

	this.route('admin', {
		layoutTemplate: 'adminLayout',
		loadingTemplate: 'adminLoading',
		path: '/admin',
		onBeforeAction: AccountsTemplates.ensureSignedIn,
		waitOn: function () {
			return cms.subs.subscribe('dictionary');
		},
		action: function() {
			this.redirect('adminDictionaryUpdate');
		}
	});

	this.route('adminDictionaryUpdate', {
		layoutTemplate: 'adminLayout',
		loadingTemplate: 'adminLoading',
		path: '/admin/dictionary/:category?',
		onBeforeAction: AccountsTemplates.ensureSignedIn,
		waitOn: function () {
			return cms.subs.subscribe('dictionary');
		},
		data: function() {
			if (this.params.category) {
				return {
					category: this.params.category,
					fields: cms.dictionary.categories[this.params.category]
				}
			} else {
				return {
					category: cms.dictionary.getDefaultCategory(),
					fields: cms.dictionary.categories[cms.dictionary.getDefaultCategory()]
				}
			}
		}
	});


	this.route('adminEntitiesIndex', {
		layoutTemplate: 'adminLayout',
		loadingTemplate: 'adminLoading',
		path: '/admin/e/:entity/',
		onBeforeAction: AccountsTemplates.ensureSignedIn,
		waitOn: function () {
			return [cms.subs.subscribe('dictionary'), cms.subs.subscribe('entity', this.params.entity)];
		},
		data: function() {
			var entity = _.findWhere(cms.entities, {name: this.params.entity});
			return {
				entity: entity,
				items: entity.collection.find()
			}
		}
	})

	this.route('adminEntitiesCreate', {
		layoutTemplate: 'adminLayout',
		loadingTemplate: 'adminLoading',
		path: '/admin/e/:entity/create',
		onBeforeAction: AccountsTemplates.ensureSignedIn,
		data: function() {
			return {
				entity: cms.entities[this.params.entity]
			}
		}
	})

	this.route('adminEntitiesUpdate', {
		layoutTemplate: 'adminLayout',
		loadingTemplate: 'adminLoading',
		path: '/admin/e/:entity/:_id/update',
		onBeforeAction: AccountsTemplates.ensureSignedIn,
		waitOn: function () {
			return [cms.subs.subscribe('dictionary'), cms.subs.subscribe('entity', this.params.entity)];
		},
		data: function() {
			var entity = _.findWhere(cms.entities, {name: this.params.entity});
			return {
				entity: entity,
				item: entity.collection.findOne(this.params._id)
			}
		}
	})

	this.route('adminEntitiesDelete', {
		layoutTemplate: 'adminLayout',
		loadingTemplate: 'adminLoading',
		path: '/admin/e/:entity/:_id/delete',
		onBeforeAction: AccountsTemplates.ensureSignedIn,
		waitOn: function () {
			return [cms.subs.subscribe('dictionary'), cms.subs.subscribe('entity', this.params.entity)];
		},
		data: function() {
			var entity = _.findWhere(cms.entities, {name: this.params.entity});
			return {
				entity: entity,
				item: entity.collection.findOne(this.params._id)
			}
		}
	})

});