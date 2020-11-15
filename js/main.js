//change page
var current_page = "1";
var disable_nav = false;
var is_showing_nav = false;
var has_temp_nav = false;
$("nav a").click(function (e) {
    e.preventDefault();

    let page = $(this).attr("href");



    var url = window.location.href;
    var i = url.indexOf('#');
    if (i !== -1)
        url = url.substring(0,i);

    //window.location.href.indexOf('#') === -1 ? window.location.href :
    //             window.location.href.substring(0,window.location.href.indexOf('#'))

    window.history.pushState("", "",
        url
        + '#'+$(this).attr("href"));
    console.log(url)
    console.log(url+'#'+$(this).attr("href"))
    animate(page);
});
function temp_create_nav(where,id) {
    has_temp_nav = true;
    $("nav").append('<a id=pg'+id+' class="nav-link temp_nav" style="background: rgba(0,0,0,.2);border-radius:15px" onclick="event.preventDefault()" href="">'+where+'</a>');
    $("#pg" + current_page).removeClass("active");

}
function animate(element,speed) {
    if (current_page == element || disable_nav) {
        return;
    }
    disable_nav = true;
    if (speed == null)
        speed = 600;
    var h = window.innerHeight
        || document.documentElement.clientHeight
        || document.body.clientHeight;
    if (element < current_page) {
        h *= -1;
    }
    
    //move up and down over prev page
    $("body").addClass("overflow-hidden");
    $("nav").addClass("top-0");
    $(`.pg_${element},.pg_${current_page}`).addClass("absolute");
    
    let oldpage = current_page;
    current_page = element;
    console.log(oldpage + " " + element)

    let afterfun = () => {
        console.log("afterfun")
        $("nav").removeClass("top-0");
        $("body").removeClass("overflow-hidden");
        $(`.pg_${oldpage}`).addClass("hidden");
        $(`.pg_${element},.pg_${oldpage}`).removeAttr("style").removeClass("absolute");
        disable_nav = false;
    }

    switch (Math.ceil(Math.random() * 3)) {
        case (1):
            //slide one over the other
            $(".pg_" + element)
                .css("margin-top",h+"px")
                .css("z-index",2)
                .removeClass("hidden")
                .animate({
                    marginTop: 0
                }, speed, "linear", function() {
                    afterfun();
                });
            break;
        case(2):
            //fade
            $(".pg_" + element)
                .css("opacity",0)
                .css("z-index",2)
                .removeClass("hidden")
                .animate({
                    opacity: 1
                }, speed, "linear", function() {
                });
            $(".pg_" + oldpage)
                .css("opacity",1)
                .css("z-index",1)
                .animate({
                    opacity: 0
                }, speed, "linear", function() {
                    afterfun();
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
                    afterfun()
                });
            $(".pg_" + oldpage)
                .animate({
                    marginTop: (-1 * h + "px")
                }, speed, "linear", function() {
                });
            break;

    }



}

function move_to_page_from_url(delay) {
    if (delay === undefined) {
        delay = 0;
    }
    if (window.location.href.indexOf('#') !== -1) {
        var i = window.location.href.indexOf('#') + 1;
        animate(window.location.href.substring(i,window.location.href.length),delay)
    }
}




$(window).on('hashchange', function(e){
    move_to_page_from_url(null);
});
move_to_page_from_url();
