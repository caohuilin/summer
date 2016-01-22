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
    return {department:[],users:[],showUser:-1};
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
  setShowUsers:function(id){
    if(id==this.state.showUser) id=-1;
    this.setState({showUser:id});
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
      var style={};

      if(self.state.showUser==-1){
        style={display:"none"};
      }else if (self.state.showUser==id){
        style={display:"block"};
      }else{
        style={display:"none"};
      }
      console.log(self.state,id, style)
      return(
        <div key={id}>
          <li onClick={self.setShowUsers.bind(null,id)}>{dep}</li>
          <ul className="gs" style={style}>
            {usersNode}
          </ul>
        </div>
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
