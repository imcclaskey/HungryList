Template.items.onCreated(function(){

	Session.set('itemCategory', "");
	this.insOrUpd = new ReactiveVar( "Added" );
  	this.plusOrCheck = new ReactiveVar( "glyphicon-plus" );

});

Template.items.onRendered(function() {

	height = $('.item-fields').height();
	$('#set-item').css("height", height+20);

	$('#form').validate({
	 	errorPlacement: function(error, element) { 
            //element.val(error[0].outerText);
            return false;
        },

        invalidHandler: function(event, validator) {
        	$('#set-icon').effect("shake");
	  	},
        
	    rules: {
	      	itemName: {
	      		required: true,
	      		string: true
	      	},
	      	itemCategory: {
	      		required: true,
	      		string: true
	      	},
	      	itemPrice: {
	      		required: true,
	      		number: true
	      	}
    	}
  	});

  	$('input').click(function () {
   		$(this).select();
   	});

});

Template.items.helpers({

	items: function() {
		Items.find({userId: Meteor.userId()});
	},

  	categories: function() {
  		let categories = _.uniq(Items.find({userId: Meteor.userId()}, {
		sort: {category: 1}, fields: {category: true}
		}).fetch().map(function(x) {
		return x.category;
		}), true);
		return categories
	},

	plusOrCheck: function() {
	    return Template.instance().plusOrCheck.get();
  	},

  	insOrUpd: function() {
  		return Template.instance().insOrUpd.get();
  	}

});

Template.items.events({

	'change #itemName': function( event, template ) {

		let name = toTitleCase($(event.target).val());
		$(event.target).val(name); 
		var item = Items.findOne({userId: Meteor.userId(), "name": name});

	    if ( item ) {
	    	template.insOrUpd.set( "Updated" );
	      	template.plusOrCheck.set( "glyphicon-ok" );
	    } else {
	    	template.insOrUpd.set( "Added" );
	      	template.plusOrCheck.set( "glyphicon-plus" );
	    }
  	},

  	'change #itemCategory': function( event ) {

		let category = toTitleCase($(event.target).val());
		$(event.target).val(category); 

  	},

	'submit form': function(event, template){

		event.preventDefault();
		let userId = Meteor.userId();

		let name = template.find('#itemName').value;

		let category = template.find('#itemCategory').value;

		let price = template.find('#itemPrice').value;
		price = Number(price).toFixed(2);

		let color = $('input[name=color]:checked').val();

		let suggestion = Math.floor((Math.random() * 100) + 1);

		console.log(suggestion);
  		

		Meteor.call('setItem', userId, name, category, price, color, suggestion);
		$('#set-icon').hide(0).delay(1050).show(0);
		$('#set-popup').show().delay(600).fadeOut(400);

		template.plusOrCheck.set("glyphicon-plus");
		$('#itemName').val("");
		$('#itemCategory').val("");
		$('#itemPrice').val("");

	},

	"click .item-category-filter":function(event, template){

	    if(!(Session.equals('itemCategory', event.currentTarget.id))){
	      	Session.set('itemCategory', event.currentTarget.id);
	      	$('.item-category-filter').removeClass("active");
	      	$(event.currentTarget).addClass("active");
	    } else {
	      	Session.set('itemCategory', '');
	      	$('.item-category-filter').removeClass("active");
	    }
  	}

});