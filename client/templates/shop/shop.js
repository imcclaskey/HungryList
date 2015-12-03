Template.shop.onRendered(function() {


	// scrollbar 
	var listHeight = $('.buy-list')[0].scrollHeight;
	console.log(listHeight);
	var offset = listHeight % 85;
	console.log(offset);

	//$('.buy-list').height(function (index, height) {
	//	
  //  return (height + 32);
	//});

	$('.buy-list').mCustomScrollbar({
		theme:"inset-3-dark",
		scrollInertia: 0,
		scrollButtons: { enable: false },
		mouseWheel:{ scrollAmount: 85 },
		callbacks:{
      onTotalScroll: function(offset){
      }
		}
	});




// item buttons expand
  $(".btn-buy").mouseover(function () {  
    $(this).find('.extend').stop().slideDown(100);
  }).mouseleave(function(){
    $(this).find('.extend').stop().slideUp(100);
  
  })    
});