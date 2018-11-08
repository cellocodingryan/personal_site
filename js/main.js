//change page
var current_page = "1";
var disable_nav = false;
var is_showing_nav = false;
$("nav a").click(function (e) {
    e.preventDefault();


    var id = $(this).attr('id')[2];
    // noinspection EqualityComparisonWithCoercionJS
    if (current_page == id || disable_nav) { //== makes the string = to an int COOL
        show_hide_nav("hide");
        console.log("nav hidden");
        return;
    } else {
        console.log(id);
    }


    var url = window.location.href;
    var i = url.indexOf('#');
    if (i !== -1)
        url = url.substring(0,i);

    //window.location.href.indexOf('#') === -1 ? window.location.href :
    //             window.location.href.substring(0,window.location.href.indexOf('#'))

    window.history.pushState("", "",
        url
            + '#'+$(this).attr("href"));

    disable_nav = true;
    show_hide_nav("hide");
    animate(id);
});
function animate(element,speed) {
    if (speed == null)
        speed = 600;
    var h = window.innerHeight
        || document.documentElement.clientHeight
        || document.body.clientHeight;
    if (element < current_page) {
        h *= -1;
    }
    $(".pg_" + element)
        .css("margin-top",h+"px")
        .css("z-index",2)
        .removeClass("hidden")
        .animate({
            marginTop: 0
        }, speed, "linear", function() {
            $(".pg_" + current_page).css("margin-top",(h)+"px").addClass("hidden");
            current_page = element;
            disable_nav = false;
        });
    $(".pg_" + current_page)
        .css("margin-top","0px")
        .css("z-index","1")
}

if (window.location.href.indexOf('#') !== -1) {
    var i = window.location.href.indexOf('#') + 1;
    switch(window.location.href.substring(i,window.location.href.length)) {
        case "about_me":
            animate(2,0);
            break;
        case "resume":
            animate(3,0);
            break;
        case "portfolio":
            animate(4,0);
            break;
        case "my_music":
            animate(5,0);
            break;
        case "contact":
            animate(6,0);
            break;
        default:
            break;
    }
}
function show_hide_nav(show) {

    if (show === "show" || (show == null && is_showing_nav === false)) {
        is_showing_nav = true;
        $(".grid").css("grid-template-columns", "7fr 1fr");
        // $("#nav_button").css("display","none");
        $(".pg_" + current_page).animate({
            width: "12.5%",
            minWidth: "12.5%",
            left: "87.5%"
        },200,"linear");
        $(".panel-1").animate({
            marginLeft: "0%"
        },200,"linear");


        return;
    }
    var w = window.innerWidth
        || document.documentElement.clientWidth
        || document.body.clientWidth;
    if (is_showing_nav === true && (show == null || show === "hide")) {
        is_showing_nav = false;
        // $("#nav_button").css("display","block");
        $(".pg_" + current_page).animate({
            width: "100%",
            minWidth: "100%",
            left: "0%"
        },200,"linear",function() {
            $(this).removeAttr("style");
        });
        $(".panel-1").animate({
            marginLeft: "-100%"
        },200,"linear",function() {
            $(".grid").css("grid-template-columns", "1fr 7fr");
            $(this).removeAttr("style");
        });


    }

}

//if the browser is resized beyond break points, refresh page
