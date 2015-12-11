Meteor.startup( function() {

	return Meteor.methods({

		setItem: function (userId, name, category, price, suggestion, style) {

			let item = {
				'userId': userId,
				'name': name,
				'category':category,
				'price':price,
				'suggestion':suggestion,
				'style':style
			};

		Items.insert(item);
		},

		primeItem: function (id, bool) {
			Items.update( {_id:id}, {$set: {"primed.bool": bool}});
		}
	});
});