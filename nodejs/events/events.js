var eventEmitter = require("events").EventEmitter;

var life = new eventEmitter();
life.setMaxListeners(11);
life.on("data",function(item){
  console.log(item +"    1data");
})
life.on("data",function(item){
  console.log(item +"    2data");
})
life.on("data",function(item){
  console.log(item +"    3data");
})
life.on("data",function(item){
  console.log(item +"    4data");
})
life.on("data",function(item){
  console.log(item +"    5data");
})
life.on("data",function(item){
  console.log(item +"    6data");
})
life.on("data",function(item){
  console.log(item +"    7data");
})
life.on("data",function(item){
  console.log(item +"    8data");
})
life.on("data",function(item){
  console.log(item +"    9data");
})
life.on("data",function(item){
  console.log(item +"    10data");
})
life.on("data",function(item){
  console.log(item +"    11data");
})

//最多监听十个事件  多的话要自己设置最大值

//移除事件
   life.removeListener("事件","函数")
   //函数不能为匿名函数

   //查看事件数
   console.log(life.listeners("事件").length);
   //或
   console.log(EventEmitter.ListenerCount(life,"事件"));

   //移除所有事件
   life.removeAllListeners("事件");

life.emit("data","k");
