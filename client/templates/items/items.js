Template.items.onCreated(function(){

});

Template.items.onRendered(function() {

});

Template.items.helpers({

	itemFilter: function() {
		categories = uniqCategories();
		console.log(categories);

		test = Items.find({$and:[
	      	{ category: Session.get('itemCategory')||{ $in : categories }},
	      	{ userId:Meteor.userId() }
	      	]},  {sort: {createdAt: -1}
      	});

      	console.log(test);
      	return test;
	},

  	categories: function() {
		return uniqCategories();
	}

});

Template.items.events({

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