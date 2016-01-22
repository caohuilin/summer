//Content组件
var Content = React.createClass({
  getInitialState:function(){
    return {department:[],users:[],userNoteId:"5662ecda489e900001f38001"};
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
  setUserNoteId:function(id){
    this.setState({userNoteId:id});
  },
  render:function(){
    return(
      <div className="content">
        <LeftArea department={this.state.department} users={this.state.users} setUserNoteId={this.setUserNoteId}/>
        <RightArea department={this.state.department} users={this.state.users} userNoteId={this.state.userNoteId}/>
      </div>
    )
  }
});
