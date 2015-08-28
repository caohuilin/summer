var student = require("./student")
var teacher = require("./student")


function add (teacherName,students){
  teacher.add(teacherName)

  students.forEach(function(item,index){
    student.add(item)
  })
}

exports.add = add
