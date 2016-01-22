//日历组件
var Calender = React.createClass({
  componentDidMount:function(){
    var cal = this.cal = $("<div/>")
    cal.datepicker({
      format:'yyyy-mm-dd',
      todayHighlight:true
    });
    var node = ReactDOM.findDOMNode(this);
    $(node).append(cal);
  },
  render:function(){
    return(
        <div className="date">
        </div>
    );
  }
});
//LeftArea组件
var LeftArea = React.createClass({
  render:function(){
      return(
        <div className="leftArea">
          <Calender />
        </div>
      );
  }
});
