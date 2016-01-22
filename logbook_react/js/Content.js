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
    return {department:[],users:[]};
  },
  componentWillMount:function(){
    var self = this;
    $.get("http://96a8to7r.apps.qbox.me/departments",function(department){
      self.setState({department:department.data});
    });
    $.get("http://96a8to7r.apps.qbox.me/users",function(users){
      self.setState({users:users.data});
    });
  },
  render:function(){
    var self = this;
    var departmentNode = self.state.department.map(function(dep,id){
      var usersNode = self.state.users.map(function(user,id2){
        if(user.department == dep){
          return (
            <li key={id2}>
              <div className="name">姓名：{user.real_name}</div>
              <div className="mood">心情：</div>
              <div className="note">日志：</div>
            </li>
          );
        }else{
          return null;
        };
      });
      return(
        <li key={id}>
          {dep}
          <ul className="gs">
            {usersNode}
          </ul>
        </li>
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
