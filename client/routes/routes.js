Router.onBeforeAction(function() {
  if (! Meteor.userId()) {
    this.render('login');
    this.layout(null);
  } else {
    this.next();
  }
});

Router.route('/shop', {
  name: "shop",
  template: "shop",
  layoutTemplate: "layout",
  subscriptions: function() {
    return Meteor.subscribe('items', Meteor.userId());
  }
});

Router.route('/items', {
  name: "items",
  template: "items",
  layoutTemplate: "layout",
  yieldTemplates: {
    'newItem': {to: 'itemBox'}
  },
  subscriptions: function() {
    return Meteor.subscribe('items', Meteor.userId());
  }
});

Router.route('itemsEditing', {
  name: 'itemsEditing',
  path: '/items/:slug',
  template: 'items',
  layoutTemplate: "layout",
  yieldTemplates: {
    'editItem': {to: 'itemBox' }
  },
  onBeforeAction: function() {
    Session.set("existItem", "");
    Session.set("checkOrBan", "glyphicon-ok" );
    this.next();
  },
  subscriptions: function() {
    console.log(this.params.slug);
    return Meteor.subscribe('items', Meteor.userId());
  },
  data: function() {
    var task = Items.findOne({"userId": Meteor.userId(), "slug": this.params.slug});
    if (task) {
      return task;
    }
  }
});

//catchall
Router.route('/(.*)', function () {
    this.redirect('/shop');
});