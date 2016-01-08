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
	    decimal: true,
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
		label: "Item Suggestion (1-100)"
	},

	"style.suggestion": {
		type: String,
		label: "Item Suggestion (style percentage)",
		optional: true,
		autoValue: function() {
			var suggestion = this.field("suggestion");
			console.log(suggestion);
			if (suggestion.isSet && suggestion.operator !== "$unset") {
				return Math.floor(suggestion.value/2+50) + "%";
			}
		}
	},

	"style.color": {
		type: String,
		label: "Item color (style hex)"
	}

});

Items.attachSchema( ItemSchema );