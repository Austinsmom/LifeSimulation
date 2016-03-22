/**
 * Created by Mathias on 17/03/2016.
 */

/**
 * Highlights the given slider with a color based on its value.
 * @param slider The slider to modify.
 */
function HighlightColor(slider) {
    var theVal = slider.val();
    var color = "#6FCC43"; //"#28c2fc";
    if (theVal < 20) {
        color = "#D92727";
    } else if (theVal < 40) {
        color = "#FC8F12";
    } else if (theVal < 60) {
        color = "#FFE433";
    } else if (theVal < 80) {
        color = "#6FCC43";
    }else{
        color = "#6FCC43";
    }

    slider.closest(".ui-slider").find("[class*='ui-slider-bg']").css("background", color);
}