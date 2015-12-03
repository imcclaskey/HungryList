Template.shop.onRendered(function() {

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




	// item buttons expand
  $('.btn-buy').mouseover(function () {  
    $(this).find('.extend').stop().slideDown(100);
  }).mouseleave(function(){
    $(this).find('.extend').stop().slideUp(100);
  })    

  // buffer close
  $('.btn-buy').mouseover(function () {  
    $(this).parent().find('.buffer').stop().slideUp(100);
  }).mouseleave(function(){
    $(this).parent().find('.buffer').stop().slideDown(100);
  })   

});