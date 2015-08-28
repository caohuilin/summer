var globalVariable = "This is global variable"

function globalFunction(){
  var localVariable = "This is local variable"
  console.log("visit global/local variable")
  console.log(globalVariable)
  console.log(localVariable)

  globalVariable = "This is changer global variable"
  console.log(globalVariable)

  function localFunction(){
    var innerLocalVariable = "This is inner local variable"

    console.log("visit global/local/innerLocal variable")
    console.log(globalVariable)
    console.log(localVariable)
    console.log(innerLocalVariable)
  }
  localFunction()
}

globalFunction()
