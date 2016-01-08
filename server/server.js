Meteor.startup( function() {

	return Meteor.methods({

		setItem: function (userId, name, category, price, color, suggestion) {

			let item = {
				userId: userId,
				name: name,
				category:category,
				price:price,
				style:{ color: color },
				suggestion:suggestion
			};
			console.log(item);
			Items.insert(item);
		},

		primeItem: function (id, bool) {
			Items.update( {_id:id}, {$set: {"primed.bool": bool}});
		}
	});
});