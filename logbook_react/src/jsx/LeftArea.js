//LeftArea组件
var LeftArea = React.createClass({
    render() {
        return (
            <div className="leftArea">
                <Calender {...this.props} />
                <Caption {...this.props} />
            </div>
        );
    }
});
