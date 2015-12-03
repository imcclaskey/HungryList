Meteor.startup( function() {

	return Meteor.methods({

		setItem: function (name, category, price, suggestion, style) {

			let item = {
				'name': name,
				'category':category,
				'price':price,
				'suggestion':suggestion,
				'style':style
			};

		Items.insert(item);
		}
	});
});