//侧边的部门组件
var Caption = React.createClass({
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
            <li key={id2} onClick={self.props.setUserNoteId.bind(null,user.id)}>{user.real_name}</li>
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
          <li onClick={self.setShowUsers.bind(null,id)}>{dep}({con}/{con})</li>
          <ul className="gd" style={style}>
            {usersNode}
          </ul>
        </div>
      );
    });
    return(
      <div className="caption">
        <ul className="c_de">
          {departmentNode}
        </ul>
      </div>
    )
  }
});
