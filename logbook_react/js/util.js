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
        grinning: "../img/mood1.png",
        smile: "../img/mood2.png",
        neutral_face: "../img/mood3.png",
        disappointed: "../img/mood4.png"
    }[mood];
}