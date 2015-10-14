$("#search-input").bind('keyup',function(){
  var searchText = $('#search-input').val();
  $.get("http://api.bing.com/qsonhs.aspx?q="+searchText,function(d){
    var d = d.AS.Results[0].suggests;
    for(var i=0;i<d.length;i++){
      html+='<li>'+d[i].Txt+'</li>';
    }
    $('#search-result').html(html);
    $("#search-suggest").show();
  },'json');
});
$(document).bind('click',function(){
  $("#search-suggest").hide();
});
$(document).delegate("li","click",function(){
  var keyword = $(this).text();
  location.href = "http://cn.bing.com/search?q="+keyword;
});
