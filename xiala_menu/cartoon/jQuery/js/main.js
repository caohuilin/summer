$(document).ready(function(){
   $(".top-nav li").mousemove(function(){
    $(this).find("ul").slideDown("1000");
  });

  $(".top-nav li").mouseleave(function(){
    $(this).find("ul").slideUp("slow");
  });
})
