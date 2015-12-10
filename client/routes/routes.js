Router.onBeforeAction(function() {
  if (! Meteor.userId()) {
    this.render('login');
  } else {
    this.next();
  }
});

Router.route('/shop', function () {
  this.render('shop');
  this.layout('layout');
});

Router.route('/items', function () {
  this.render('items');
  this.layout('layout');
});

//catchall
Router.route('/(.*)', function () {
    this.redirect('/notfound');
});