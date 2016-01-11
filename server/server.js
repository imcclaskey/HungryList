Meteor.startup( function() {

	return Meteor.methods({

		setItem: function (userId, name, category, price, color, suggestion) {

			toTitleCase(name);
			toTitleCase(category);

			let item = {
				userId: userId,
				name: name,
				category:category,
				price:price,
				style:{ color: color },
				suggestion:suggestion
			};

			let exist = Items.findOne({userId: userId, name: name});

			if (exist) {
				
				Items.update(
		   		{ 
		   			userId: userId,
		   			name: name
		   		},
			   	{ $set: {
			   		name: name,
			   		category: category,
			   		price: price,
			   		'style.color': color,
			   		suggestion:suggestion
			   	}});
				console.log("updating" + name);

			} else {

				Items.insert(item);
				console.log("adding" + item);
			
			}

		},

		primeItem: function (id, bool) {
			Items.update( {_id:id}, {$set: {"primed.bool": bool}});
		}

	});
});