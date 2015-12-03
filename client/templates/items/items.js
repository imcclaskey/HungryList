Template.items.events({

	'click #set-item': function(event, template){
		let name = template.find('#item-name').value;
		let category = template.find('#item-category').value;
		let price = template.find('#item-price').value;
		let suggestion = Math.floor((Math.random() * 100) + 1);
		let style =  Math.floor(suggestion/2+50);
		style += "%";
		console.log(suggestion);
		Meteor.call('setItem', name, category, price, suggestion, style);
	}

});