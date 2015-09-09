window.onload = function(){
  var con = document.getElementById('con');
  con.onmouseover = function(){
    startMove(100);
  }
  con.onmouseout = function(){
    startMove(30);
  }
}
var timer = null;
var alpha = 30;
function startMove(egao){
  var con = document.getElementById('con');
  clearInterval(timer);
  timer = setInterval(function(){
    if(alpha == egao){
      clearInterval(timer);
    }else{
      speed = Math.floor((egao - alpha) / 20);
      alpha += speed;
      con.style.opacity = alpha/100;
    }
  },30);
}
