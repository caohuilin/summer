//RightArea组件
var RightArea = React.createClass({
  render:function(){
    return(
      <div className="rightArea">
        <Dates />
        <Departments department={this.props.department} users={this.props.users}/>
      </div>
    )
  }
});
