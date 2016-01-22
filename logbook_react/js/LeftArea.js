
//LeftArea组件
var LeftArea = React.createClass({
  render:function(){
      return(
        <div className="leftArea">
          <Calender />
          <Caption department={this.props.department} users={this.props.users} setUserNoteId={this.props.setUserNoteId}/>
        </div>
      );
  }
});
