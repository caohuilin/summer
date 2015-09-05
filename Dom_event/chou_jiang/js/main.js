var data = ["phone5","Ipad","谢谢参与","50元充值卡"],
    timer = null,
    flag = 0;


window.onload = function(){
  var play = document.getElementById('play'),
      stop = document.getElementById('stop');
      play.onclick = playFun;
      stop.onclick = stopFun;

      document.addEventListener('keyup',function(event){
        event = event || window.event;
        console.log(event.keyCode);
        if(event.keyCode == 13){
          if(flag == 0){
            playFun();
            flag = 1;
          }else{
            stopFun();
            flag = 0;
          }
        }
      });
}

function playFun(){
  var titles = document.getElementById('title');
  var play = document.getElementById('play');
  clearInterval(timer);
  timer = setInterval(function(){
  var random = Math.floor(data.length * Math.random());
  title.innerHTML = data[random];
  },50);
  play.style.background = "#999";
}

function stopFun(){
  clearInterval(timer);
  var play = document.getElementById('play');
  play.style.background = "#036";
}
