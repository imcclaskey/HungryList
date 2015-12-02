Template.shop.onRendered(function() {

	$('.buy-list').mCustomScrollbar({
		theme:"inset-3-dark",
		scrollInertia: 0,
		scrollButtons: { enable: false }
	});

// item buttons expand
  $(".btn-buy").mouseover(function () {  
    $(this).find('.extend').stop().slideDown(100);
  }).mouseleave(function(){
    $(this).find('.extend').stop().slideUp(100);
  
  })    
});