function addLoadEvent(func){
  var oldonload = window.onload;//得到上一个onload时间的函数
  if(typeof window.onload!='function'){//判断类型是否为"function"
    window.onload=func;
  }else{
    window.onload=function(){
      oldonload();//调用之前覆盖的onload事件的函数
      func();
    }
  }
}
function getDom(id){
  return document.getElementById(id);
}
function showProvince(){
  //alert("a");
  getDom("selectProvince").onclick = showAllProvince;
}
function showAllProvince(){
  getDom("allProvince").style.display = "block";
  getDom("layer").style.display = "block";
  getDom("selectProvince").style.backsgroundPosition = "190px -17px";
  getDom("selectProvince").style.color="#CCC";
  getDom("layer").onclick = function(){
    hideAllProvince();
  }
  selectProvince();
}
function hideAllProvince(){
  getDom("allProvince").style.display = "none";
  getDom("selectProvince").style.backsgroundPosition = "190px 1px";
  getDom("selectProvince").style.color="#000";
  getDom("layer").style.display = "none";
}
function selectProvince(){
  var pro = getDom("allProvince").getElementsByTagName('li');
  //alert(pro.length);
  var links;
  for(var i=0;i<pro.length;i++){
    links = pro[i].getElementsByTagName('a');
    for(var j=0;j<links.length;j++){
      links[j].onclick=function(){
        getDom("selectProvince").innerHTML = this.innerHTML;
            hideAllProvince();
      }
    }

  }
}

addLoadEvent(showProvince);
