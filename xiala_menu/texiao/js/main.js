$(function(){
  $("#menulist").on("click","a",function(){
    if($(this).hasClass("btn-active")){
      $("#expandZone #closeBtn").click();
      return false;
    }
    var curIndex = $(this).index(), mlValue = "-"+curIndex*100+"%";
    if($("#expandZone").hasClass("active")){
      $("#expandZone .expdiv").animate({marginLeft: mlValue});
    }else{
      $("#expandZone .expdiv").css({marginLeft: mlValue});
      $("#expandZone").animate({height:"130px"}).addClass("active");
    }

    $(this).addClass("btn-active").siblings().removeClass("btn-active");
        return false;
  });
  $("#expandZone #closeBtn").on("click",function(){
      $("#expandZone").animate({height:"0px"},function(){
        $(this).removeClass("active");
        $("#menulist .btn-active").removeClass("btn-active");
      });
      return false;
  });
});
