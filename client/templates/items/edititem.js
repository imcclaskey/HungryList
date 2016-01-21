Template.editItem.onCreated(function(){

  	Session.set("checkOrBan", "glyphicon-ok" );
	Session.set("existItem", "");

});

Template.editItem.onRendered(function() {

	height = $('.item-fields').height();
	$('#set-item').css("height", height+20);

	$('#form').validate({

	    rules: {
	      	itemName: {
	        	required: true,
	        	uniqueEdit: true
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

  	categories: function() {
		return uniqCategories();
	},

	checkOrBan: function() {
	    return Session.get("checkOrBan");
  	},

  	existItem: function() {
  		let item = Session.get("existItem")
  		if (!item) {
  			return false
  		} else {
	  		return {
	  			name: item.name,
	  			url: "/items/" + item.slug,
	  			color: item.style.color
	  		}
	  	}
  	}

});

Template.editItem.events({

	'input .item-name': function( event, template ) {

		let item = Template.currentData();
		let name = $(event.target).val();
		name = trimLeading(name);
		name = toTitleCase(name);
		$(event.target).val(name); 
		name = trimTailing(name);
		let edit = Items.findOne({userId: Meteor.userId(), name});

		if (!edit || item.name === edit.name) {
			Session.set("checkOrBan", "glyphicon-ok" );
			Session.set("existItem", "")
		} else {
			Session.set("checkOrBan", "glyphicon-ban-circle" );
	      	Session.set("existItem", edit);
		}
  	},

  	'input .item-category': function( event ) {
		let category = toTitleCase($(event.target).val()).replace(/^\s+/g, "");
		$(event.target).val(category); 
  	},

	'submit form': function(event, template){
		event.preventDefault();
		let item = Template.currentData();
		let userId = Meteor.userId();
		let name = event.target.itemName.value;
		let category = event.target.itemCategory.value;
		let price = event.target.itemPrice.value;
		price = Number(price).toFixed(2);
		let color = $('input[name=color]:checked').val();  		
		Meteor.call('updateItem', item, userId, name, category, price, color);
		Session.set('justUpdated', true);
		Router.go('/items/');
	}

});