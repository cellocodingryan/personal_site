//change page
var current_page = "1";
var disable_nav = false;
var is_showing_nav = false;
var has_temp_nav = false;
$("nav a").click(function (e) {
    e.preventDefault();

    var id = $(this).attr('id')[2];
    if (id === "-")
        return;
    // noinspection EqualityComparisonWithCoercionJS
    if (current_page == id || disable_nav) { //== makes the string = to an int COOL
        show_hide_nav("hide");
        return;
    }


    var url = window.location.href;
    var i = url.indexOf('#');
    if (i !== -1)
        url = url.substring(0,i);

    //window.location.href.indexOf('#') === -1 ? window.location.href :
    //             window.location.href.substring(0,window.location.href.indexOf('#'))

    window.history.pushState("", "",
        url
        + ''+$(this).attr("href"));

    disable_nav = true;
    if (has_temp_nav) {
        $(".temp_nav").animate({
            opacity: 0
        },500,function() {
            $(this).remove();
        });
    }
    show_hide_nav("hide");
    animate(id);
});
function temp_create_nav(where,id) {
    has_temp_nav = true;
    $("nav").append('<a id=pg'+id+' class="nav-link temp_nav" style="background: rgba(0,0,0,.2);border-radius:15px" onclick="event.preventDefault()" href="">'+where+'</a>');
    $("#pg" + current_page).removeClass("active");

}
function animate(element,speed) {
    if (current_page == element) {
        return;
    }
    if (speed == null)
        speed = 600;
    var h = window.innerHeight
        || document.documentElement.clientHeight
        || document.body.clientHeight;
    if (element < current_page) {
        h *= -1;
    }
    $("#pg"+current_page).removeClass("active");

    //move up and down over prev page
    switch (Math.ceil(Math.random() * 3)) {
        case (1):
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
                    $("#pg"+element).addClass("active");
                    $(this).removeAttr("style");
                });
            break;
        case(2):
            $(".pg_" + element)
                .css("opacity",0)
                .css("z-index",2)
                .removeClass("hidden")
                .animate({
                    opacity: 1
                }, speed, "linear", function() {
                    $(this).removeAttr("style");
                    $("#pg"+element).addClass("active");
                });
            $(".pg_" + current_page)
                .css("opacity",1)
                .css("z-index",1)
                .animate({
                    opacity: 0
                }, speed, "linear", function() {
                    $(this).removeAttr("style").addClass("hidden");
                    current_page = element;
                    disable_nav = false;
                });
            break;
        case(3):
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
                    $("#pg"+element).addClass("active");
                    $(this).removeAttr("style");
                });
            $(".pg_" + current_page)
                .animate({
                    marginTop: (-1 * h + "px")
                }, speed, "linear", function() {
                    $(this).removeAttr("style");
                });
            break;
        case(4):
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
                    $("#pg"+element).addClass("active");
                    $(this).removeAttr("style");
                });
            $(".pg_" + current_page)
                .animate({
                    marginTop: (-1 * h + "px")
                }, speed, "linear", function() {
                    $(this).removeAttr("style");
                });
            break;
    }


    //fade out some magic stuff here


}

function move_to_page_from_url(delay) {
    if (delay === undefined) {
        delay = 0;
    }
    if (window.location.href.indexOf('#') !== -1) {
        var i = window.location.href.indexOf('#') + 1;
        switch(window.location.href.substring(i,window.location.href.length)) {
            case "resume":
                animate(2,delay);
                break;
            case "contact":
                animate(3,delay);
                break;

            case "contact_successful":
                temp_create_nav("message successful page",-1);
                animate(-1,delay);
                break;
            case "contact_failed":
                temp_create_nav("message failed page",-2);
                animate(-2,delay);
                break;
            case "home":
                animate(1,delay);
                break;
            case "":
                animate(1,delay);
                break;
            default:
                if (current_page == 404)
                    break;
                temp_create_nav("404 page not found",404);
                animate(404,delay);
                break;
        }
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



$(window).on('hashchange', function(e){
    move_to_page_from_url(null);
});
move_to_page_from_url();
