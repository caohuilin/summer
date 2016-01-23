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