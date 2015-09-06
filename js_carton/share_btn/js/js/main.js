window.onload = function(){
  var conten = document.getElementById("conten");

  conten.onmouseover = function(){
    change(0);
  }
  conten.onmouseout = function(){
    change(-200);
  }
}
var timer = null;
function change(goal){
  clearInterval(timer);
  var speed;
  if(conten.offsetLeft > goal){
    speed = -10;
  }else{
    speed = 10;
  }
  timer = setInterval(function(){
    if(conten.offsetLeft == goal){
      clearInterval(timer);
    }else{
    conten.style.left = conten.offsetLeft + speed + "px";
  }
  },30);
}
