Items = new Mongo.Collection("items");

ItemSchema = new SimpleSchema({

	"name": {
	    type: String,
	    label: "Item name."
  	},

	"category": {
	    type: String,
	    label: "Item category."
	},

	"price": {
	    type: Number,
	    label: "Item price."
	},

	"suggestion": {
		type: Number,
		label: "Suggestion percentage (test with random number)"
	},

	"style": {
		type: String,
		label: "Style value in percentage format for inline width setting"
	},
	
	});

Items.attachSchema( ItemSchema );