
Template.items.onRendered(function() {

	height = $('.item-fields').height();
	$('#set-item').css("height", height+20);

	$('#form').validate({
	 	errorPlacement: function(error, element) { 
            //element.val(error[0].outerText);
            return false;
        },
        
	    rules: {
	      	itemName: {
	      		required: true,
	      		string: true
	      	},
	      	itemCategory: {
	      		required: true,
	      		string: true
	      	},
	      	itemPrice: {
	      		required: true,
	      		number: true
	      	}
    	}
  	});

  	$('input').click(function () {
   		$(this).select();
   	});

   	// $("#itemPrice").change(function() {
   	// 	let val = $(this).value;
   	// 	val = "$" + val;
   	// });

});

Template.items.events({

	'submit form': function(event, template){
		event.preventDefault();
		let userId = Meteor.userId();

		let name = template.find('#itemName').value;

		let category = template.find('#itemCategory').value;

		let price = template.find('#itemPrice').value;
		price = Number(price).toFixed(2);

		let color = $('input[name=color]:checked').val();

		let suggestion = Math.floor((Math.random() * 100) + 1);

		console.log(suggestion);
		Meteor.call('setItem', userId, name, category, price, color, suggestion);

		$('#itemName').val("");
		$('#itemCategory').val("");
		$('#itemPrice').val("");
	}

});

Template.items.helpers({

  	categories: function() {
  		var categories = _.uniq(Items.find({userId: Meteor.userId()}, {
		sort: {category: 1}, fields: {category: true}
		}).fetch().map(function(x) {
		return x.category;
		}), true);
		return categories
	}

});