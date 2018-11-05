//change page
var current_page = "1";
var disable_nav = false;
$("nav a").click(function (e) {
    e.preventDefault();




    var id = $(this).attr('id')[2];
    if (current_page === id || disable_nav)
        return;

    // var url = window.location.href;
    // var i = url.indexOf('#');
    // if (i !== -1)
    //     url = url.substring(0,i);


    window.history.pushState("", "",
        window.location.href.indexOf('#') === -1 ? window.location.href :
            window.location.href.substring(0,window.location.href.indexOf('#'))
            + '#'+$(this).attr("href"));

    disable_nav = true;
    animate(id,0);
});
function test() {
    alert(current_page);
}
function animate(element) {
    var h = window.innerHeight
        || document.documentElement.clientHeight
        || document.body.clientHeight;
    // alert($(".pg_" + element).css("position"));
    // alert("#pg_" + element.toString());
    $(".pg_" + element)
        .css("margin-top",h+"px")
        .css("z-index",2)
        .removeClass("hidden")
        .animate({
            marginTop: 0
        }, 900, "linear", function() {
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
            animate(2);
            break;
        case "resume":
            animate(3);
            break;
        case "portfolio":
            animate(4);
            break;
        case "my_music":
            animate(5);
            break;
        case "contact":
            animate(6);
            break;
        default:
            break;
    }
}