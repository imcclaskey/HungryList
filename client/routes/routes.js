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
  subscriptions: function() {
    return Meteor.subscribe('items', Meteor.userId());
  }
});

//catchall
Router.route('/(.*)', function () {
    this.redirect('/shop');
});