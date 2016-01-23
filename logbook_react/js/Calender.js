//日历组件
var Calender = React.createClass({
    componentDidMount: function () {
        var self = this;
        var cal = this.cal = $("<div class=\"date\"/>");
        cal.datepicker({
            format: 'yyyy-mm-dd',
            todayHighlight: true
        });
        cal.on("changeDate", function () {
            var date = cal.datepicker('getFormattedDate');
            self.props.setDateNow(date);
        });
        var node = ReactDOM.findDOMNode(this);
        $(node).append(cal);
    },
    render: function () {
        return ( <div/>)
    }
});
