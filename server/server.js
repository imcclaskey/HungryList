Meteor.startup( function() {

	return Meteor.methods({

		addItem: function (userId, name, category, price, color, suggestion) {

			toTitleCase(name).trim();
			toTitleCase(category).trim();

			let exist = Items.findOne( {userId, name});


			let item = {
				userId: userId,
				name: name,
				category:category,
				price:price,
				style:{ color: color },
				suggestion:suggestion
			};

			if (!exist) {
				Items.insert(item);
				console.log("adding " + name);
			} else {
				throw ( error ) ;
			}
			
		},

		updateItem: function(item, userId, name, category, price, color) {

			Items.update( item, 
			{ $set: {
		   		name: name,
		   		category: category,
		   		price: price,
		   		'style.color': color,
		   	}});
			console.log("updating " + name);

		},

		primeItem: function (id, bool) {
			Items.update( {_id:id}, {$set: {"primed.bool": bool}});
		}

	});
});