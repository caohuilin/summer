//Content组件
var Content = React.createClass({
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
    return(
      <div className="content">
        <LeftArea department={this.state.department} users={this.state.users}/>
        <RightArea department={this.state.department} users={this.state.users}/>
      </div>
    )
  }
});
