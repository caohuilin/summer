(function(){
  var Menubar = function(){
    this.el = document.querySelector("#sidebar ul");
    this.state = "allClosed";
    this.el.addEventListener("click",function(e){
      e.stopPropagation();
    });
    var self = this;
    this.currentOpendMenuContent = null;
    this.menuList = document.querySelectorAll("#sidebar ul > li");
    for(var i = 0;i<this.menuList.length;i++){
      this.menuList[i].addEventListener("click",function(e){
        var menuContentEl = document.getElementById(e.currentTarget.id+"-content");
        if(self.state === "allClosed"){
          console.log("打开"+menuContentEl.id);
          self.state = "hasOpened";
          self.currentOpendMenuContent = menuContentEl;
        }
        else{
          console.log("关闭"+self.currentOpendMenuContent.id);
          console.log("打开"+menuContentEl.id);
          self.state = "hasOpened";
          self.currentOpendMenuContent = menuContentEl;
        }
      });
    }
  };
  var Sidebar = function(eId,closeBarId){
    this.state = "opened";
    this.el = document.getElementById(eId||'sidebar');
    this.closeBarEl = document.getElementById(closeBarId||'closeBar');
    var self = this;
    this.menubar = new Menubar();
    this.el.addEventListener("click",function(event){
      if(event.target !==self.el){
        self.triggerSwich();
      }
    });
  };
  Sidebar.prototype.close = function(){
    console.log("关闭");
    this.el.className = "sidebar-move-left";
    this.closeBarEl.className = "closeBar-move-right";
    this.state = "closed";
  };
  Sidebar.prototype.open = function(){
      console.log("打开");
      this.state = "opened";
  };
  Sidebar.prototype.triggerSwich = function(){
    if(this.state === "opened"){
      this.close();
    }
    else{
      this.open();
    }
  };
  var sidebar = new Sidebar();

})();
