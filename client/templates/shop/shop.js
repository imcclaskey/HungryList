Template.shop.onRendered(function() {

  var elements = $(document).find('.btn-buy');
  var index = 0;

  function throwBars() {
    var timer = setInterval(function() {

      elements.eq(index).removeClass('btn-shy');
      index++;

      if (index >= elements.length) {
        clearInterval(timer);
      }
    }, 80);
  };

  setTimeout(throwBars);
  clearInterval(throwBars);  

  //live search
  $('#filter-input').fastLiveFilter('#buy-list');  
  
	// scrollbar 
	$('.buy-list').mCustomScrollbar({
		theme:"inset-3-dark",
		scrollInertia: 0,
		keyboard:{scrollType:"stepped"},
		scrollButtons: { enable: false },
		mouseWheel:{ scrollAmount: 85 },
		snapAmount:85,
		advanced:{ updateOnContentResize: false }
	});

  // set buy-list height
  var htop = $('#buy-top').height();
  var hwrap = $('#shop').height();
  $('.buy-list').height(hwrap-htop-15);


	// item buttons expand
  $('.btn-buy').mouseover(function () {  
    $(this).find('.extend').stop().slideDown(100);
  }).mouseleave(function(){
    $(this).find('.extend').stop().slideUp(100);
  })    

  // buffer close
  $('.btn-buy').mouseover(function () {  
    $(document).find('.buffer').stop().hide();
  }).mouseleave(function(){
    $(document).find('.buffer').stop().show();
  }) 



});

Template.shop.helpers({

  unprimedItems: function () {
    return Items.find( { $and: [ {userId: Meteor.userId() }, { "primed.bool": false }]}, {sort: {suggestion: -1}});
  },

  primedItems: function () {
    return Items.find( { $and: [ {userId: Meteor.userId() }, { "primed.bool" : true }]}, {sort: {"primed.date": 1}});
  }

});


Template.shop.events({

  'click .btn-buy': function(event){
    let id = $(event.target).attr('id');
    Meteor.call('primeItem', id, true);
  }

});