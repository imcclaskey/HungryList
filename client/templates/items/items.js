
Template.items.onRendered(function() {

	height = $('.item-fields').height();
	$('#set-item').css("height",height);

});


Template.items.events({

	'click #set-item': function(event, template){
		let userId = Meteor.userId();
		let name = template.find('#item-name').value;
		let category = template.find('#item-category').value;
		let price = template.find('#item-price').value;
		price = Number(price).toFixed(2);
		let suggestion = Math.floor((Math.random() * 100) + 1);
		let style =  Math.floor(suggestion/2+50);
		style += "%";
		console.log(suggestion);
		Meteor.call('setItem', userId, name, category, price, suggestion, style);
	}

});

Template.items.helpers({

  	categories: function() {
  		var categories = _.uniq(Items.find({userId: Meteor.userId()}, {
		sort: {category: 1}, fields: {category: true}
		}).fetch().map(function(x) {
		return x.category;
		}), true);
		return categories
	}

});