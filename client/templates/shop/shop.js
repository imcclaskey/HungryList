Template.shop.onRendered(function() {

  $(".btn-buy").mouseover(function () {  

    $(this).find('.extend').stop().slideDown(100);

  }).mouseleave(function(){

    $(this).find('.extend').stop().slideUp(100);
  
  })    
});