//加载最终页面 两个组件Header和Content
var App = React.createClass({
  propTypes:{
    params: React.PropTypes.shape({
      user: React.PropTypes.string,
      day: React.PropTypes.string
    })
  },
  render(){
    return (
      <div className="main">
          <Header/>
          <Content params={this.props.params}/>
      </div>
      )
  }
})

ReactDOM.render((
  <Router>
    <Route path="/" component={App}>
      <Route name="user" path="/user/:userNoteId" component={Content}/>
      <Route name="day" path="/day/:day" component={Content}/>
    </Route>
    <Route path="*" component={App}/>
  </Router>
), document.getElementById('main'));
