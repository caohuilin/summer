//增加广告宽度函数
        var w = 0;
        function addw(){
            var x = document.getElementById("ad");
            x.style.height = "120px";
            if(w < 360){
                w += 5;
                x.style.width = w + "px";
            }else{
                return;
            }
            setTimeout("addw()",30);
        }
        function subw(){
            var x = document.getElementById("ad");
            if(w > 0){
                w -= 5;
                x.style.width = w + "px";
            }else{
                 x.style.height = "0";
                return;
            }
            setTimeout("subw()",30);
        }

        window.onload = function(){
          addw();
          setTimeout("subw()",5000);
        }
