if(!localStorage.curIndex){
  localStorage.curIndex=1;
}


function next(){

  if(localStorage.curIndex == 6)
       return;
  var curPage = document.getElementById("page"+localStorage.curIndex);
  curPage.style.webkitTransform = "rotateX(-87.1deg)";
  curPage.style.mozTransform = "rotateX(-87.1deg)";

  localStorage.curIndex++;

  var nextPage = document.getElementById("page"+localStorage.curIndex);
  nextPage.style.webkitTransform= "rotateX(0deg)";
  nextPage.style.mozTransform= "rotateX(0deg)";
}
function prev(){
  if(localStorage.curIndex == 1)
       return;
  var curPage = document.getElementById("page"+localStorage.curIndex);
  curPage.style.webkitTransform= "rotateX(87.1deg)";
  curPage.style.mozTransform= "rotateX(87.1deg)";

  localStorage.curIndex--;

  var prevPage = document.getElementById("page"+localStorage.curIndex);
  prevPage.style.webkitTransform= "rotateX(0deg)";
  prevPage.style.mozTransform= "rotateX(0deg)";
}
