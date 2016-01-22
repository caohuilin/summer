//LeftArea组件
var LeftArea = React.createClass({
  render:function(){
      return(
        <div className="leftArea">
        </div>
      );
  }
});

//Dates组件
var Dates = React.createClass({
  dateToString:function(d,a,b){
    return [
      d.getFullYear(),
      d.getMonth()+1,
      d.getDate()
    ].join('-');
  },
  render:function(){
    return <div className="date">{this.dateToString(new Date())}</div>
  }
});
//Departments组件
var Departments = React.createClass({
  getInitialState:function(){
    return {department:[]};
  },
  componentWillMount:function(){
    var self = this;
    $.get("http://96a8to7r.apps.qbox.me/departments",function(department){
      self.setState({department:department.data});
    });
  },
  render:function(){
    var departmentNode = this.state.department.map(function(dep,id){
      return(
        <li key={id}>{dep}</li>
      );
    });
    return(
      <ul className="departments">
        {departmentNode}
      </ul>
    )
  }
});
//RightArea组件
var RightArea = React.createClass({
  render:function(){
    return(
      <div className="rightArea">
        <Dates />
        <Departments />
      </div>
    )
  }
});


//Content组件
var Content = React.createClass({
  render:function(){
    return(
      <div className="content">
        <LeftArea />
        <RightArea />
      </div>
    )
  }
});
