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

  	"slug": {
		type: String,
		label: "Item slug",
		optional: true,
		autoValue: function() {
		  	var name = this.field("name");
			if (name.isSet && name.operator !== "$unset") {
		    	return name.value.toLowerCase()
								.replace(/ /g,'-')
    							.replace(/[-]+/g, '-')
    							.replace(/[^\w\x80-\xFF-]+/g,'');
		  	}
		}
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
			if (suggestion.isSet && suggestion.operator !== "$unset") {
				return Math.floor(suggestion.value/2+50) + "%";
			}
		}
	},

	"style.color": {
		type: String,
		label: "Item color (style hex)"
	},

	"created": {
	  	type: Date,
	  	label: "Date Task Added to System",
	  	denyUpdate: true,
	  	autoValue: function() {
	    	if ( this.isInsert ) {
	      		return new Date;
      		}
		}
  	},

	"updated": {
	    type: Date,
	    label: "Date Task Updated in System",
	    autoValue: function() {
	    	if ( this.isUpdate || this.isInsert ) {
		      	return new Date;
		    }
	    }
	}

});

Items.attachSchema( ItemSchema );