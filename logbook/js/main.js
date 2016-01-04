;(function($){


  //部门 以及每个部门中的人
  $.get("http://96a8to7r.apps.qbox.me/departments",function(departments){
    //console.log(departments.data);
    var depart = {};
    var us_ht = {};
    var name_ht = {};
    var user={};
    var notess = {};
    $.get("http://96a8to7r.apps.qbox.me/users",function(users){
    //  console.log(users);
      $.each(users.data,function(i,us){
        if(depart[us.department]){
          depart[us.department]++;
          us_ht[us.department] += "<li><div class='name'>姓名："+us.real_name+"</div><div class='mood'>心情：</div><div class='note'>日志:</div></li>";
          name_ht[us.department] += "<li>"+us.real_name+"</li>";
        }else{
          depart[us.department] = 1;
          us_ht[us.department] = "<li><div class='name'>姓名："+us.real_name+"</div><div class='mood'>心情：</div><div class='note'>日志:</div></li>";
          name_ht[us.department] = "<li>"+us.real_name+"</li>";
        }
        user[us.real_name] = us;
        notess[us.id]={
          'data':[]
        }
      });

      var html = "";
      var html2 = "";
      $.each(departments.data,function(i,dep){
       if(!depart[dep]){
         depart[dep]=0;
           html += '<li>'+dep+'<div class="num">共'+depart[dep]+'人</div></li><ul class="gs"></ul>';
            html2 += '<li>'+dep+'('+depart[dep]+'/'+depart[dep]+'人)</div></li><ul class="gd"></ul>';
       }else{
        html += '<li>'+dep+'<div class="num">共'+depart[dep]+'人</div></li><ul class="gs">'+us_ht[dep]+'</ul>';
         html2 += '<li>'+dep+'('+depart[dep]+'/'+depart[dep]+'人)</div></li><ul class="gd">'+name_ht[dep]+'</ul>';
      }
      });
      $(".departments").html(html);
      $(".c_de").html(html2);
      //每个部门条目的点击事件
      var show = -1;
      var flag = 1;
      var de = $(".departments >li");
      var us = $(".gs");
      $.each(de,function(i,d){
        de.eq(i).on("click", function(){
        if(show != -1){
           us.eq(show).css("display","none");
         }
        if(show == i){
          if(flag){
            us.eq(show).css("display","none");
            flag = 0;
          }
          else{
            us.eq(show).css("display","block");
            flag = 1;
          }
        }else{
           show = i;
            us.eq(i).css("display","block");
            flag = 1;
          }
        });

      });

      //左边区域的点击事件
      var show2 = -1;
      var flag2 = 1;
      var de2 = $(".c_de >li");
      var us2 = $(".gd");
      $.each(de2,function(i,d){
        de2.eq(i).on("click", function(){
        if(show2 != -1){
           us2.eq(show2).css("display","none");
         }
        if(show2 == i){
          if(flag2){
            us2.eq(show2).css("display","none");
            flag2 = 0;
          }
          else{
            us2.eq(show2).css("display","block");
            flag2 = 1;
          }
        }else{
           show2= i;
            us2.eq(i).css("display","block");
            flag2 = 1;
          }
        });
      });
      //获取日志
      $.get("http://96a8to7r.apps.qbox.me/posts?uid=5662ecda489e900001f38001",function(notes){
        $.each(notes.data,function(i,note){
          notess[note.user_id]['data'].push(note);
        //  console.log(notess[note.user_id]);
      //  console.log(JSON.stringify(notess[note.user_id]));
        });
        //左边区域点击人的事件
      var gd = $ (".gd >li");
      var html3="";
      $.each(gd,function(i,d){
          gd.eq(i).on("click",function(){
            var con = gd.eq(i)[0].innerHTML;
            var id = user[con].id;
            var not = notess[id]['data'];
            //console.log(not);
            html3 += "<div class='name'>"+user[con].real_name+"</div><div class='de'>--"+user[con].department+"</div><div class='note_nav'>";
            for(var j=0;j<not.length;j++){
              html3+="<li>"+not[j].day+"</li><div class='notess'><div div='mo'>心情："+not[j].mood+"</div><div class='rizhi'>日志：<div class='con'>"+not[j].content+"</div></div></div>"
           }
           html3+="</div>"
           $(".rightArea").html(html3);
           //点击事件
           var show3 = -1;
           var flag3 = 1;
           var gd2 = $(".note_nav >li");
           //console.log(gd2);
           var no2 = $(".notess");
           //console.log(no2);
           $.each(gd2,function(k,d){
             gd2.eq(k).on("click", function(){
             if(show3 != -1){
                no2.eq(show3).css("display","none");
              }
             if(show3 == k){
               if(flag3){
                 no2.eq(show3).css("display","none");
                 flag3 = 0;
               }
               else{
                 no2.eq(show3).css("display","block");
                 flag3 = 1;
               }
             }else{
                show3= k;
                 no2.eq(k).css("display","block");
                 flag3 = 1;
               }
             });
           });
          });
        });
        });
    });
  });



  //日期
  var now = new Date();
  var year = now.getFullYear();
  var month = now.getMonth()+1;
  var date = now.getDate();
  if(month<10){
    month = "0" + month;
  }
  if(date<10){
    date = "0" + date;
  }
  $(".rightArea .date").html(year+"-"+month+"-"+date);
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
//日历
  $('.date div').datepicker({
    format:'yyyy-mm-dd',
    todayHighlight:true
  });
})(jQuery);
