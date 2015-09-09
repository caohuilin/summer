function startMove(obj,json,fn) {
  var flag = true;
  clearInterval(obj.timer);
  obj.timer = setInterval(function() {
    for (var attr in json) {
      var current = 0;
      if (attr == "opacity") {
        current = Math.round(parseFloat(getStyle(obj,attr))*100);
      } else {
        current = parseInt(getStyle(obj,attr));
      }
      var speed = (json[attr] - current)/8;
      speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
      if (current != json[attr]) {
        flag = false;
      } else {
        flag = true; //这里需要判断
      }
      if (attr == "opacity") {
        obj.style.filter = "alpha(opacity:" + (current + speed) +")";
        obj.style.opacity = (current + speed)/100;
      } else {
        obj.style[attr] = current + speed + "px";
      }
    }
    if (flag) {
      clearInterval(obj.timer);
      if (fn) {
          fn();
        }
    }
  },30);
}
