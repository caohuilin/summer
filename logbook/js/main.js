;(function($){


  //部门
  $.get("http://96a8to7r.apps.qbox.me/departments",function(departments){
    //console.log(departments.data);
    var html="";
    $.each(departments.data,function(i,dep){
    //  console.log(dep);
      html+="<li>"+dep+"</li>";
    });
    $(".departments").html(html);
  });

  //个人信息
   $.get("http://96a8to7r.apps.qbox.me/user/overview",function(user){
    //console.log(user.data);
    var us = user.data;
    var html="<li>"+us.real_name+"</li><li>"+us.department+"</li>";
    $("#change_dep").before(html);
    //  console.log(data);
  });

  //个人信息的点击事件
  var flag = 1;
  $("#inf").on('click',function(){
    //alert(1);
    if(flag){
          $("#user").show();
          flag = 0;
    }else{
      $("#user").hide();
      flag = 1;
    }
  });

  //我的日志的点击事件
 $("#note").on('click',function(){
      $("#mask").show();
      $("#popup").show();
 });
  $(".icon").on('click',function(){
    $("#mask").hide();
    $("#popup").hide();
  });

})(jQuery);
