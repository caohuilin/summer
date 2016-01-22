//Note按钮组件
var NoteBtn = React.createClass({
    getInitialState: function () {
        return {
            NoteShow: false
        }
    },
    showNote: function () {
        this.setState({NoteShow: !this.state.NoteShow});
    },
    render: function () {
        return (
            <span>
        <button id="note" type="button" name="button" onClick={this.showNote}>我的日志</button>
        <Note_me show={this.state.NoteShow} showNote={this.showNote}/>
      </span>
        );
    }
});
