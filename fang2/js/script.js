$(function(){
	$('.link .button').hover(function(){
		var title=$(this).attr('data');
		$('.tip em').text(title);
		var pos=$(this).offset().left;
		var dis=($('.tip').outerWidth()-$(this).outerWidth())/2;
	//	alert($('.tip').outerWidth());
		var l=pos-dis;
		$('.tip').css({'left':l+'px'}).animate({'top':180,'opacity':1},300);
	},function(){
    if(!$('.tip').is('animated')){
      $('.tip').animate({'top':160,'opacity':0},300);
    }
	})
})