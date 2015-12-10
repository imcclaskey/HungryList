Router.configure({
    before: function (pause) {
        if(!Meteor.user()) {
            // render the login template but keep the url in the browser the same
            this.render('login');

            // pause the rest of the before hooks and the action function
            pause();
        }else{
            //Here we have to change the layoutTemplate back to the default
            this.next()
        }
    }
});

Router.route('/shop', {name: "shop"});
Router.route('/items', {name: "items"});
Router.route('/login', {name: "login"});