function $(id){
    return typeof id ==='string'?document.getElementById(id):id;
}

window.onload=function(){
  //标签的索引
  var index=0;
  var timer=null

  var lis=$("notice-tit").getElementsByTagName("li"),
  divs=$("notice-con").getElementsByTagName('div');

  if(lis.length!=divs.length) return;

  for(var i=0;i<lis.length;i++){
    lis[i].id=i;
    lis[i].onmouseover=function(){
      var that=this;
      if(timer){
        clearTimeout(timer);
        timer=null;
      }

      timer=setTimeout(function(){
        for(var j=0;j<lis.length;j++){
          lis[j].className="";
          divs[j].style.display="none";
        }
        lis[that.id].className="select";
        divs[that.id].style.display="block";
      },500)
    }
  }
}
