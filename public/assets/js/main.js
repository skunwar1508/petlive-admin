$(document).ready(function(){

    // $(window).on("load resize scroll", function() {
    //     if($(this).scrollTop() > 100) {
    //         // $(".home__Header header").removeClass("bg-transparent");
    //         $(".header_wrap").addClass("sticky_header");
    //         // $(".home-wrapper header .header_logo img").attr('src','assets/images/logo.svg');
    //         // $('.home-wrapper header .link_withImg img').attr('src','assets/images/Union.svg');
    //     } else {
    //         //remove the background property so it comes transparent again (defined in your css)
    //     //    $(".home-wrapper header").addClass("bg-transparent");
    //        $(".header_wrap").removeClass("sticky_header");
    //     //    $(".home-wrapper header .header_logo img").attr('src','assets/images/logo-white.svg');
    //     //    $('.home-wrapper header .link_withImg img').attr('src','assets/images/white-union.svg');
    //     }
    // });

    

    $('.menu-hamburger').click(function(){
        $('.page-wrapper').toggleClass('mini-sidebar');
        })

        $('.slideUp_header').click(function(){
        $('.navbar.header-navbar').hide();
        })

    

})