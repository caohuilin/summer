//Header组件
var Header = React.createClass({
    render: function () {
        return (
            <header className="header">
                <div className="icon">
                    <img src="img/icon.png" alt=""/>
                </div>
                <div className="nav">
                    <NoteBtn />
                    <Inf />
                </div>
            </header>
        )
    }
});
