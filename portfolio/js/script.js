$(window).on("load", function() {
    $(".loader .inner").fadeOut(500, function(){
        $(".loader").fadeOut(750);
    });
    
    $(".items").isotope({
        filter:"*",
        animationOptions: {
            duration: 1500,
            easing: 'linear',
            queue: false
        }
    });
});


$(document).ready(function(){
    $('#slides').superslides({
        animation: 'fade',
        play: 5000,
        pagination: false
    });

    var typed = new Typed(".typed", {
        strings: ["Front-End Developer", "Web Designer", "Artist"],
        typeSpeed: 70,
        loop: true,
        startDelay: 1000,
        showCursor: false,
    });

    $('.owl-carousel').owlCarousel({
        loop:true,
        items: 4,
        responsive:{
            0:{
                items:1
            },
            480:{
                items:2
            },
            768:{
                items:3
            },
            938:{
                items:4
            }
        }
    });

    var skillsTopOffset = $(".skillsSection").offset().top;
    // console.log(skillsTopOffset);

    $(window).scroll(function(){
        if(window.pageYOffset > skillsTopOffset - $(window).height() + 200) {
            $('.chart').easyPieChart({
                easing: "easeInOut",
                barColor: '#fff',
                trackColor: false,
                scaleColor: false,
                lineWidth: 4,
                size: 152,
                onStep: function(form, to, percent) {
                    $(this.el).find('.percent').text(Math.round(percent));
                    
                }
            });
        }
    });
    
    $("[data-fancybox]").fancybox();

   

    $("#filters a").click(function() {
        $("#filters .current").removeClass("current");
        $(this).addClass("current");

        var selector = $(this).attr("data-filter");
        $(".items").isotope({
            filter: selector,
            animationOptions: {
                duration: 1500,
                easing: 'linear',
                queue: false
            }
        });

        return false;
    });

    $("#navigation li a").click(function(e){
        e.preventDefault();

        var targetElement = $(this).attr("href");
        var targetPosition = $(targetElement).offset().top;
        $("html, body").animate({scrollTop: targetPosition - 50}, "slow")
    });

    // const nav = $("#navigation");
    // const navTop = nav.offset().top;
    // $(window).on("scroll", stickyNavigation);
    // function stickyNavigation() {
    //     var body = $("body");
    //     if($(window).scrollTop() >= navTop){
    //         body.addClass("fixedNav");
    //     }
    //     else{
    //         body.removeClass("fixedNav");
    //     }
    // }
});
