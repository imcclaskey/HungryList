Template.items.onCreated(function(){

});

Template.items.onRendered(function() {

	$('.well-scroll').mCustomScrollbar({
		theme:"inset-3-dark",
		scrollInertia: 0,
		keyboard:{scrollType:"stepped"},
		scrollButtons: { enable: false },
		mouseWheel:{ scrollAmount: 75 },
		snapAmount:85,
		advanced:{ updateOnContentResize: true }
	});

	startResize();
	$(document).ready(resizer());


});

Template.items.onDestroyed(function() {

	endResize();

});

function startResize() {
  $(window).resize(resizer);
};

function endResize() {
  $(window).off("resize", resizer);
};

function resizer() {
  var wh = $(window).height();
  var eo = $('.well-scroll').offset().top;
  $('.well-scroll').height(wh-eo-60);
};

Template.items.helpers({

	itemFilter: function() {
		
		categories = uniqCategories();

		test = Items.find({$and:[
	      	{ category: Session.get('itemCategory')||{ $in : categories }},
	      	{ userId:Meteor.userId() }
	      	]},  {sort: {createdAt: -1}
      	});

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