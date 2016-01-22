//Departments组件
var Departments = React.createClass({
  getInitialState:function(){
    return {showUser:-1};
  },
  setShowUsers:function(id){
    if(id==this.state.showUser) id=-1;
    this.setState({showUser:id});
  },
  render:function(){
    var self = this;
    var departmentNode = self.props.department.map(function(dep,id){
      var con = 0;
      var usersNode = self.props.users.map(function(user,id2){
        if(user.department == dep){
          con++;
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
      return(
        <div key={id}>
          <li onClick={self.setShowUsers.bind(null,id)}>{dep}<div className="num">共{con}人</div></li>
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
