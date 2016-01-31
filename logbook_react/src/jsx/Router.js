ReactDOM.render((
    <Router>
        <Route path="/" component={Main}>
            <Route name="user" path="/user/:userNoteId" component={Content}/>
            <Route name="day" path="/day/:day" component={Content}>
            </Route>
            <Route name="department" path="/day/:day/dep/:depId" component={Content}/>
        </Route>
        <Route path="*" component={Main}/>
    </Router>
), document.getElementById('main'));