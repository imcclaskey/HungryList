Template.newItem.onCreated(function(){

  	this.plusOrBan = new ReactiveVar( "glyphicon-plus" );
  	Session.set("existItem", "");

});

Template.newItem.onRendered(function() {

	height = $('.item-fields').height();
	$('#set-item').css("height", height+20);

	$('#form').validate({

	    rules: {
	      	itemName: {
	        	required: true,
	        	uniqueItem: true
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

	if (Session.equals('justUpdated', true)) {
		$('#set-icon').hide(0).delay(1050).show(0);
		$('#set-popup').html("Item Updated!").show().delay(600).fadeOut(400);
		setTimeout(function(){ $('#set-popup').html("Item Added!") }, 1025);

		delete Session.keys['justUpdated'];
	}
    
  	$('input').click(function () {
   		$(this).select();
   	});

});

Template.newItem.helpers({

	itemHeader: function() {
		Template.instance().headerState.get();
	},

  	categories: function() {
		return uniqCategories();
	},

	plusOrBan: function() {
	    return Template.instance().plusOrBan.get();
  	},

  	existItem: function() {
  		return Session.get("existItem");
  	}

});

Template.newItem.events({

	'input #itemName': function( event, template ) {

		let name = toTitleCase($(event.target).val()).replace(/^\s+/g, "");
		$(event.target).val(name); 
		name = name.replace(/\s+$/g, "");
		let item = Items.findOne({userId: Meteor.userId(), name});

	    if ( item ) {
	      	template.plusOrBan.set( "glyphicon-ban-circle" );
	      	Session.set("existItem", name);
	    } else {
	      	template.plusOrBan.set( "glyphicon-plus" );
	      	Session.set("existItem", "");
	    }
  	},

  	'input #itemCategory': function( event ) {
		let category = toTitleCase($(event.target).val()).replace(/^\s+/g, "");
		$(event.target).val(category); 
  	},

	'submit form': function(event, template){

		event.preventDefault();
		let userId = Meteor.userId();

		let name = template.find('#itemName').value.trim();

		let category = template.find('#itemCategory').value.trim();

		let price = template.find('#itemPrice').value;
		price = Number(price).toFixed(2);

		let color = $('input[name=color]:checked').val();

		let suggestion = Math.floor((Math.random() * 100) + 1);

		console.log(suggestion);
  		

		Meteor.call('addItem', userId, name, category, price, color, suggestion);
		$('#set-icon').hide(0).delay(1050).show(0);
		$('#set-popup').show().delay(600).fadeOut(400);

		template.plusOrBan.set("glyphicon-plus");
		$('#itemName').val("");
		$('#itemCategory').val("");
		$('#itemPrice').val("");

	}

});