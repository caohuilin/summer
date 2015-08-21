$(function(){
  $("#rList").on("click",function(){
    if($("ul li").hasClass("active")){
      $("ul li").css("visibility","hidden").removeClass("active");
    }
    else{
      $("ul li").css("visibility","visible").addClass("active");
    }
  })
})
