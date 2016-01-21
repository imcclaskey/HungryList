jQuery.validator.addMethod(
    'uniqueItem',
    function(value, element) {
        let name = toTitleCase(value).trim();
    	let item = Items.findOne({userId: Meteor.userId(), name});
    	return item ? false : true;
    },
    'That item already exists.'
);

jQuery.validator.addMethod(
    'uniqueEdit',
    function(value, element) {
    	edit = element.id;
        let name = toTitleCase(value).trim();
    	let item = Items.findOne({userId: Meteor.userId(), name});
    	return (!item || edit == item.name) ? true : false;
    },
    'That item already exists.'
);