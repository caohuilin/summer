function showdiv(){
  document.getElementById('hpn').style.display = "block";
  document.getElementById('strHref').innerHTML = "收起";
  document.getElementById('strHref').href = "javascript:hidediv();";
}
function hidediv(){
  document.getElementById('hpn').style.display = "none";
  document.getElementById('strHref').innerHTML = "展开";
  document.getElementById('strHref').href = "javascript:showdiv();";
}
