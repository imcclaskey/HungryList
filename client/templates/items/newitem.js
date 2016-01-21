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

	// tail end of update operation
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

  	categories: function() {
		return uniqCategories();
	},

	plusOrBan: function() {
	    return Template.instance().plusOrBan.get();
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

Template.newItem.events({

	'input .item-name': function( event, template ) {

		let name = $(event.target).val();
		name = trimLeading(name);
		name = toTitleCase(name);
		$(event.target).val(name); 
		trimTailing(name);

		let item = Items.findOne({userId: Meteor.userId(), name});

	    if ( item ) {
	      	template.plusOrBan.set( "glyphicon-ban-circle" );
	      	Session.set("existItem", item);
	      	console.log(item);
	    } else {
	      	template.plusOrBan.set( "glyphicon-plus" );
	      	Session.set("existItem", "");
	    }
  	},

  	'input .item-category': function( event ) {
		let category = toTitleCase($(event.target).val()).replace(/^\s+/g, "");
		$(event.target).val(category); 
  	},

	'submit form': function(event, template){
		event.preventDefault();
		let userId = Meteor.userId();
		let name = event.target.itemName.value;
		let category = event.target.itemCategory.value;
		let price = event.target.itemPrice.value;
		price = Number(price).toFixed(2);
		let color = $('input[name=color]:checked').val();
		let suggestion = Math.floor((Math.random() * 100) + 1);
		console.log(suggestion);
		Meteor.call('addItem', userId, name, category, price, color, suggestion);
		$('#set-icon').hide(0).delay(1050).show(0);
		$('#set-popup').show().delay(600).fadeOut(400);

		template.plusOrBan.set("glyphicon-plus");
		$('.item-name').val("");
		$('.item-category').val("");
		$('.item-price').val("");
	}

});