
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

	$('#itemPrice').keydown(function (e) {
        // Allow: backspace, delete, tab, escape, enter and .
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
             // Allow: Ctrl+A
            (e.keyCode == 65 && e.ctrlKey === true) ||
             // Allow: Ctrl+C
            (e.keyCode == 67 && e.ctrlKey === true) ||
             // Allow: Ctrl+X
            (e.keyCode == 88 && e.ctrlKey === true) ||
             // Allow: home, end, left, right
            (e.keyCode >= 35 && e.keyCode <= 39)) {
                 // let it happen, don't do anything
                 return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    });

  	$("input[type='text']").click(function () {
   		$(this).select();
   	});

});



Template.items.events({

	'submit form': function(event, template){
		event.preventDefault();
		let userId = Meteor.userId();
		let name = template.find('#itemName').value;
		let category = template.find('#itemCategory').value;
		let price = template.find('#itemPrice').value;
		price = Number(price).toFixed(2);
		let suggestion = Math.floor((Math.random() * 100) + 1);
		let style =  Math.floor(suggestion/2+50);
		style += "%";
		console.log(suggestion);
		Meteor.call('setItem', userId, name, category, price, suggestion, style);
	},

	'click #color-1': function(event, template){
		Session.set('color', )
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