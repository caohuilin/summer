var getId = document.getElementById.bind(document);
var $q = document.querySelector.bind(document);
var $a = document.querySelectorAll.bind(document);


//全局变量
var oAd     = document.getElementById('ad');
var oAdcon  = document.getElementById('adcon');
var oAdcur  = document.getElementById('adcur');
var oClose  = document.getElementById('close');
var maxH =  getId("adcon").height ;//最大高度
var minH =  getId("adcur").height ;//最小高度
var step = 5;//移动的距离
var h    = 0;

/*广告向下展开*/
function adDown(){
	oAd.style.display = "block";
	oAd.style.height  = h+"px";

	if( h<maxH ){
	    h+=step; //向下移动
		setTimeout(adDown,1);
	}else{
		setTimeout(adUp,3000); //停留时间自己适当调整 1000 = 1秒
	}
}

/*广告向上收起*/
function adUp(){
	oAd.style.height =  h+"px" ;

	if( h>minH ) {
		 h-=step ; //向上移动
		setTimeout(adUp,1);
	}else {
		oAdcon.style.display = "none";
		oClose.style.display = "block";
	}
}

oClose.onclick = function(){
	oAd.style.display = "none";
}
setTimeout(adDown, 3000);
