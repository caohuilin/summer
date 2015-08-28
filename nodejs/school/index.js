var klass = require("./klass")

exports.add = function(klasses) {
  klass.forEach(function(item,index){
    var _klass = item;
    var teacherName = item.teacherName
    var students = item.sthdents

     klass.add(teacherName,students)
  })
}
