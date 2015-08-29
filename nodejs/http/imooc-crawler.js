// var http = require("http")
// var url = "http://www.imooc.com/learn/348"
//
// http.get(url,function(res){
//   var html="啊啊"
//   res.on("data",function(data){
//     html+=data;
//     console.log('aa')
//   })
//   res.on("end",function(){
//     console.log(html)
//   })
// }).on("error",function(){

//   console.log("出错")
// });


var request = require('request');
var cheerio = require('cheerio');


function filterChapters(body){
  var $ = cheerio.load(body)
  var chapters = $(".item > .hd > .title > a")
  //console.log(chapters);
/*  [{
    chaptersTitle:"",
    videos:[
      title:""
      id:"''"
    ]
  }]
  */
  var courseData = []
  chapters.each(function(item){
  //  console.log($(this).text());
    var chaptersTitle = $(this).text()
  //  var chaptersTitle = chapter.find("").
  //  var videos = chapter.find(".video").children('li')
    var chapterData = {
      chaptersTitle:chaptersTitle,
      //videos:[]
    }
    //console.log(chapterData);
  /*  vedio.each(function(item){
      var video = $(this).find(".studyvideo")
      var videoTitle = video.text()
      var id = video.arrt('href').split('cideo/')[1]

      chapterData.video.push({
        title:videoTitle,
        id:id
      })

    })
*/
    courseData.push(chapterData)
    })
    printCourseInfo(courseData);
}
function printCourseInfo(courseData){
  courseData.forEach(function(item){
    var chaptersTitle = item.chaptersTitle

    console.log(chaptersTitle + "\n")

/*    item.video.forEach(function(video){
      console.log('  ['+video.id +']' + video.title +'\n');
    })
    */
  })
}


request('http://www.cnbeta.com/', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    filterChapters(body)
    //console.log(body) // Show the HTML for the Google homepage.
  }
})
