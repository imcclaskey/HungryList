Template.login.events({
	'click #login-button' : function(event){
		event.preventDefault();
		let email = $('#input-email').val();
		let password = $('#input-password').val();
		Meteor.loginWithPassword(email, password, function(error){
			if(error){
				$('#error-message').text(error.reason);
			} 
			// else {
			// 	Router.go('welcome');
			// }
			if (Meteor.userId) {
		        Router.go('/');
		    }
		});
	},

	'click #register-button' : function(event){
		event.preventDefault();
		let email = $('#input-email').val();
		let password = $('#input-password').val();
		if(password.length<6){
			$('#error-message').text("Password must be at least 6 characters in length");
		}
		else{
			Accounts.createUser({
	            email: email,
	            password: password
	        }, function(error){
	        	if (error) {
	            	$('#error-message').text(error.reason);
	        	}
	        	if (Meteor.userId) {
		        	Router.go('/');
		    	}
	        });
		}
	}
});