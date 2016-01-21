toTitleCase = function toTitleCase(str) {
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

trimLeading = function trimLeading(str) {
	return str.replace(/^\s+/g, "");
}

trimTailing = function trimTailing(str) {
	return str.replace(/\s+$/g, "");
}

uniqCategories = function uniqCategories() {
	let categories = _.uniq(Items.find({userId: Meteor.userId()}, {
		sort: {category: 1}, fields: {category: true}
		}).fetch().map(function(x) {
		return x.category;
		}), true);
	return categories;
}