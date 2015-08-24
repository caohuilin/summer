window.onload = function(){
  var TipBox = document.getElementById('tipCon');
  var CloseBtn = document.getElementById('closeBtn');

  CloseBtn.onclick = function(){
    TipBox.className = "hide";
  }
}
