
var util = require('util');

!function(global){
  function DetectorBase(configs){
    if(!this instanceof DetectorBase){
      throw new Error("Do not invoke whithout new");
    }
    this.configs = configs;
    this.analyze();
  }
  DetectorBase.prototype.detect = function () {
    throw new Error("Not implemented");
  };

  DetectorBase.prototype.analyze = function () {
    console.log("analyzing...");
    this.data = "###data###";
  };
  function LinkDetector(links){
    if(!this instanceof LinkDetector){
      throw new Error("Do not invoke whithout new");
    }
    this.links = links;
    DetectorBase.apply(this,arguments);
  }

  function ContanierDetector(containers) {
    if(!this instanceof ContanierDetector){
      throw new Error("Do not invoke whithout new");
    }
    this.containers = containers;
    DetectorBase.apply(this,arguments);
  }

  util.inherits(LinkDetector,DetectorBase);
  util.inherits(ContanierDetector,DetectorBase);

  LinkDetector.prototype.detect = function () {
    console.log("Loading data:"+this.data);
    console.log("link detection started");
    console.log("scaning links:"+this.links);
  };

  ContanierDetector.prototype.detect = function(){
    console.log("Loading data:"+this.data);
    console.log("container detection started");
    console.log("scaning containers:" + this.containers);
  }

  // Object.freeze(DetectorBase);
  // Object.freeze(DetectorBase.prototype);
  // Object.freeze(LinkDetector);
  // Object.freeze(LinkDetector.prototype);
  // Object.freeze(ContanierDetector);
  // Object.freeze(ContanierDetector.prototype);
  // Object.defineProperties({},{
  //   LinkDetector:{value:LinkDetector},
  //   ContanierDetector:{value:ContanierDetector},
  //   DetectorBase:{value:DetectorBase}
  // });

  // function inherit(subClass,superClass){
  //   subClass.prototype = Object.create(superClass.prototype);
  //   subClass.prototype.constructor = subClass;
  // }(this);

  var cd = new ContanierDetector("#abc #def #ghi");
  var ld = new LinkDetector("http://www.taobao.com http://www.tmall.com http://baidu.com");

  cd.detect();
  ld.detect();

}();
