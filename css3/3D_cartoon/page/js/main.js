var curIndex=1;

function next(){

  if(curIndex == 6)
       return;
  var curPage = document.getElementById("page"+curIndex);
  curPage.style.webkitTransform = "rotateX(-90deg)";

  curIndex++;

  var nextPage = document.getElementById("page"+curIndex);
  nextPage.style.webkitTransform= "rotateX(0deg)";
}
function prev(){
  if(curIndex == 1)
       return;
  var curPage = document.getElementById("page"+curIndex);
  curPage.style.webkitTransform= "rotateX(90deg)";

  curIndex--;

  var prevPage = document.getElementById("page"+curIndex);
  prevPage.style.webkitTransform= "rotateX(0deg)";
}
