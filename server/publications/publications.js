Meteor.publish('items', function(id){
 	return Items.find({userId: id});
});