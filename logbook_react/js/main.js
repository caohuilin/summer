;(function($){
  //我的日志的具体组件
  Note_me = React.createClass({
    render:function(){
      var style = {display:this.props.show?"block":"none"};
      return(
        <div className="note_me"style={style}>
          <div id="mask" onClick={this.props.showNote}></div>
          <div id="popup">
            <div className="title">
              我的日志
            </div>
            <div className="icon"  onClick={this.props.showNote}></div>
            <div className="con">
              <div className="date">
                选择日期<br />
                <input type="text" name="name" />
              </div>
              <div className="mood">
                我的心情
                <ul>
                  <li><img src="../img/mood1.png" style={{}}alt="" /></li>
                  <li><img src="../img/mood2.png" style={{marginTop:"5px"}} alt="" /></li>
                  <li><img src="../img/mood3.png" style={{marginTop:"7px"}} alt="" /></li>
                  <li><img src="../img/mood4.png" style={{marginTop:"5px"}} alt="" /></li>
                </ul>
              </div>
              <div className="note">
                我的日志
                <textarea name="name" className="form-control"></textarea>
              </div>
            </div>
            <button className="certern" type="button" name="button">确定</button>
          </div>
          <div className="add_com_text">
            <div className="title">
              我的评论
            </div>
            <textarea name="name"></textarea>
            <button className="certern" type="button" name="button">确定</button>
          </div>
        </div>
      )
    }
  });
  //Note按钮组件
  var NoteBtn = React.createClass({
    getInitialState:function(){
      return{
        NoteShow:false
      }
    },
    showNote:function(){
      this.setState({NoteShow:!this.state.NoteShow});
    },
    render:function(){
      return (
        <span>
          <button id="note" type="button" name="button" onClick={this.showNote}>我的日志</button>
          <Note_me show={this.state.NoteShow} showNote={this.showNote}/>
        </span>
      );
    }
  });
  //具体的个人信息组件
  var UserInf = React.createClass({
    render:function(){
      return(
        <ul id="user" style={this.props.style}>
          <li id="change_dep">修改部门</li>
          <li>登出</li>
        </ul>
      )
    }
  });
  //个人信息Inf按钮组件
  var Inf = React.createClass({
    getInitialState:function(){
      return{
        InfShow:false
      };
    },
    showInf:function(){
      this.setState({InfShow:!this.state.InfShow});
    },
    render:function(){
      var style = {display:this.state.InfShow?"block":"none"};
      return(
        <span>
          <button id="inf" type="button" name="button" onClick={this.showInf}>个人信息</button>
          <UserInf style={style}/>
        </span>
      )
    }
  });

  //Header组件
  var Header = React.createClass({
    render:function(){
      return (
        <header className="header">
          <div className="icon">
            <img src="img/icon.png" alt="" />
          </div>
          <div className="nav">
            <NoteBtn />
            <Inf />
          </div>
        </header>
      )
    }
  });

  //Content组件
  var Content = React.createClass({
    render:function(){
      return(
        <div className="content">
        </div>
      )
    }
  });
  //加载最终页面 两个组件Header和Content
  ReactDOM.render(
    <div className="main" >
      <Header/>
      <Content />
    </div>,
    document.getElementById('main')
  );







  return
  //部门 以及每个部门中的人
  $.get("http://96a8to7r.apps.qbox.me/departments",function(departments){
    //console.log(departments.data);
    var depart = {};
    var us_ht = {};
    var name_ht = {};
    var user = {};
    var user_id = {}
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
        user_id[us.id] = us;
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
      var all_notes = {};
      $.get("http://96a8to7r.apps.qbox.me/posts?uid=5662ecda489e900001f38001",function(notes){
        $.each(notes.data,function(i,note){
          all_notes[note.id]=note;
          notess[note.user_id]['data'].push(note);
        //  console.log(notess[note.user_id]);
      //  console.log(JSON.stringify(notess[note.user_id]));
        })
        //左边区域点击人的事件
      var gd = $ (".gd >li");
      $.each(gd,function(i,d){
          gd.eq(i).on("click",function(){
            var con = gd.eq(i)[0].innerHTML;
            var id = user[con].id;
            var not = notess[id]['data'];
            //console.log(not);
            var html3 = "<div class='name'>"+user[con].real_name+"</div><div class='de'>--"+user[con].department+"</div><div class='note_nav'>";
            for(var j=0;j<not.length;j++){
              html3+="<li>"+not[j].day+"</li><div class='notess'><div div='mo'>心情："+not[j].mood+"</div><div class='rizhi'>日志：<div class='con'>"+marked(not[j].content)+"</div></div><div class='comment'><a id='see_com"+id+j+"'>查看所有评论</a><div class='all_com' id='com"+id+j+"'>暂无评论</div></div><div class='add_comment'><a id='add_com"+id+j+"'>添加评论</a></div></div>"
           }
           html3+="</div>"
           $(".rightArea").html(html3);
           //var sel = $(".note_nav .notess .rizhi .con");
           //var html5 = sel.innerHTML;
           //sel.innerHTML = marked(html5);
           //获取评论
           $.get("http://96a8to7r.apps.qbox.me/posts/5672d427b999b70001f86ac0/comments",function(coms){
             $.each(coms.data,function(i,con){
             var us_id = all_notes[con.post_id].user_id;
             var com_us_sq = notess[us_id]['data'];
             for(var j=0;j<com_us_sq.length;j++){
               if(com_us_sq[j].id == con.post_id){
                 if(con.content==""){
                   var html4 = "<div class='com_con'>暂无评论</div>";
                 }else{
                   var html4 = "<div class='com_con'>"+con.content+"</div>";
                 }
                 $("#com"+us_id+j).html(html4);
               }
             }
             });
           });
           //点击时间显示日志事件
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
           //点击查看所有评论的事件
           $.each(user_id,function(i,us){
             var u_id = us.id;
             $.each(notess[u_id].data,function(j,no){
               var show4 = 0;
               $("#see_com"+u_id+j).on("click",function(){
                 //console.log("#see_com"+u_id+j);
                 if(show4 == 0){
                   $("#com"+u_id+j).css("display","block");
                   show4 = 1;
                 }else{
                   $("#com"+u_id+j).css("display","none");
                   show4 = 0;
                 }
               });
               $("#add_com"+u_id+j).on("click",function(){
                   $("#mask").show();
                 $(".add_com_text").css("display","block");
                 $(".certern").on("click",function(){
                   $("#mask").hide();
                   $(".add_com_text").css("display","none");
                 });
               });
               $("#mask").on("click",function(){
                 $("#mask").hide();
                 $(".add_com_text").css("display","none");
               });
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
  $(".certern").on("click",function(){
    $("#mask").hide();
    $("#popup").hide();
  });
  $("#mask").on("click",function(){
    $("#mask").hide();
    $("#popup").hide();
  });
//日历
  $('.date div').datepicker({
    format:'yyyy-mm-dd',
    todayHighlight:true
  });
  //两边分开进行鼠标控制
  $(".leftArea").hover(function(){
    if($(".leftArea").hasClass("po_fx"))
      $(".leftArea").removeClass("po_fx");
    $(".rightArea").addClass("po_fx_l");
  });
  $(".rightArea").hover(function(){
    if($(".rightArea").hasClass("po_fx_l"))
      $(".rightArea").removeClass("po_fx_l");
    $(".leftArea").addClass("po_fx");
  });
})(jQuery);
