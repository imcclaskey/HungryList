Template.editItem.onCreated(function(){

  	this.checkOrBan = new ReactiveVar( "glyphicon-ok" );

});

Template.editItem.onRendered(function() {

	height = $('.item-fields').height();
	$('#set-item').css("height", height+20);

	$('#form').validate({

	    rules: {
	      	itemName: {
	        	required: true,
	      	},
	        itemCategory: {
	        	required: true,
	      	},
	      	itemPrice: {
	      		required: true,
	      		number: true
	      	}
	    },

	 	errorPlacement: function(error, element) { 
            //element.val(error[0].outerText);
            return false;
        },

        invalidHandler: function(event, validator) {
        	$('#set-icon').effect("shake");
	  	}
	});
        

  	$('input').click(function () {
   		$(this).select();
   	});

});

Template.editItem.helpers({

	itemHeader: function() {
		Template.instance().headerState.get();
	},

  	categories: function() {
		return uniqCategories();
	},

	checkOrBan: function() {
	    return Template.instance().checkOrBan.get();
  	},

  	existItem: function() {
  		return Session.get("existItem");
  	}

});

Template.editItem.events({

	'input #itemName': function( event, template ) {

		let name = toTitleCase($(event.target).val()).replace(/^\s+/g, "");
		$(event.target).val(name); 
		name = name.replace(/\s+$/g, "");
		let item = Items.findOne({userId: Meteor.userId(), name});

	    if ( item ) {
	      	template.checkOrBan.set( "glyphicon-ban-circle" );
	      	Session.set("existItem", name);
	    } else {
	      	template.checkOrBan.set( "glyphicon-ok" );
	      	Session.set("existItem", "");
	    }
  	},

  	'input #itemCategory': function( event ) {
		let category = toTitleCase($(event.target).val()).replace(/^\s+/g, "");
		$(event.target).val(category); 
  	},

	'submit form': function(event, template){

		event.preventDefault();
		let item = Template.currentData();
		let userId = Meteor.userId();


		let name = template.find('#itemName').value.trim();

		let category = template.find('#itemCategory').value.trim();

		let price = template.find('#itemPrice').value;
		price = Number(price).toFixed(2);

		let color = $('input[name=color]:checked').val();  		

		Meteor.call('updateItem', item, userId, name, category, price, color);
		Session.set('justUpdated', true);
		Router.go('/items/');
	}

});