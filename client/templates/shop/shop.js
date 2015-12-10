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
		advanced:{ updateOnContentResize: true }
	});

  // $('.buy-list').bind("DOMSubtreeModified",function(){
  //   $('.buy-list').mCustomScrollbar("update");
  // });

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

  items: function () {
    return Items.find({}, {sort: {suggestion: -1}});
  }

});
