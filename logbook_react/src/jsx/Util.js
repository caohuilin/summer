var Route = ReactRouter.Route;
var Router = ReactRouter.Router;
var Redirect = ReactRouter.Redirect;
var Link = ReactRouter.Link;


function css_display(value) {
    if (value) {
        return {display: 'block'};
    } else {
        return {display: 'none'};
    }
}

function mood_img_src(mood) {
    if (!mood) {
        return '';
    }
    return {
        grinning: "/public/img/mood1.png",
        smile: "/public/img/mood2.png",
        neutral_face: "/public/img/mood3.png",
        disappointed: "/public/img/mood4.png"
    }[mood];
}

var propTypesUser = React.PropTypes.arrayOf(React.PropTypes.shape({
          created_at: React.PropTypes.string.isRequired,
          department: React.PropTypes.string.isRequired,
          name: React.PropTypes.string.isRequired,
          real_name: React.PropTypes.string.isRequired,
          updated_at: React.PropTypes.string.isRequired
        }));

var propTypeDepartment = React.PropTypes.arrayOf(React.PropTypes.string.isRequired);