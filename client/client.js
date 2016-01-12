jQuery.validator.addMethod(
    'uniqueItem',
    function(value, element) {
        let name = toTitleCase(value).trim();
    	let unique = Items.findOne({userId: Meteor.userId(), "name": name});
    	return unique ? false : true;
    },
    'That item already exists.'
);