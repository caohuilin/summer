var User = React.createClass({
  getInitialState:function(){
    return {note:[]};
  },
  componentWillMount:function(){
    var self = this;
    $.get("http://96a8to7r.apps.qbox.me/posts?uid=5662ecda489e900001f38001",function(notes){
      self.setState({note:notes.data});
      console.log(self.state.note);
    });
  },
  render:function(){
    var self = this;
    var userName = '';
    var userDep = '';
    var noteDate = this.props.users.map(function(user,id){
      if(user.id == self.props.userNoteId){
        userName = user.real_name;
        userDep = user.department;
        return self.state.note.filter(function(note){return note.user_id==user.id}).map(function(note,id2){
            return(
              <li key={id2} >
                {note.day}
              </li>
            );
        });
      }
    });
    return(
    <div className="rightArea">
      <div className="name">{userName}</div>
      <div className="de">--{userDep}</div>
      <ul className="note_nav">
        {noteDate}
      </ul>
    </div>
  );
 }
});

//RightArea组件
var RightArea = React.createClass({
  render:function(){
    if(this.props.userNoteId==-1){
      return(
        <div className="rightArea">
          <Dates />
          <Departments department={this.props.department} users={this.props.users}/>
        </div>
      )
    }else{
      return(
        <User users={this.props.users} userNoteId={this.props.userNoteId} />
      );
    }
  }
});
