Items = new Mongo.Collection("items");

ItemSchema = new SimpleSchema({

	"userId": {
	    type: String,
	    label: "Associated user ID."
  	},

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

	"primed.bool": {
		type: Boolean,
		label: "Is in the cart, t/f",
		defaultValue: false
	},

	"primed.date": {
		type: Date,
		label: "Date item primed",
		optional: true,
		autoValue: function() {
	      	var primed = this.field("primed.bool");
      		if (primed.isSet) {
      			return new Date;	
      		} else {
        		this.unset();
      		}
      	}
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