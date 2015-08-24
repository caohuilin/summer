window.onload = function(){
  var TipBox = document.getElementById('tipCon');
  var ClickMe = document.getElementById('clickMe');
  var showPic = document.getElementById('showPic');
  var closeBtn = document.getElementById('closeBtn');
  ClickMe.onmouseover = function(){
    showPic.style.display = "block";
    closeBtn.style.display = "block";
  }
  closeBtn.onclick = function(){
    showPic.style.display = "none";
    closeBtn.style.display = "none";
  }
}
