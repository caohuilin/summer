//加载最终页面 两个组件Header和Content
ReactDOM.render(
    <div className="main">
        <Header/>
        <Content />
    </div>,
    document.getElementById('main')
);
/*
$(document.body).bind('aa',function(a,bb){
    debugger
})
$(document.body).trigger('aa','bb');
*/
