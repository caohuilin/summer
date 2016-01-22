//Dates组件
var Dates = React.createClass({
    dateToString: function (d, a, b) {
        return [
            d.getFullYear(),
            d.getMonth() + 1,
            d.getDate()
        ].join('-');
    },
    render: function () {
        return <div className="date">{this.dateToString(new Date())}</div>
    }
});
