$(document).ready(function(){
    $(function () {
        $(".preloader").fadeOut();
    });

    $(window).scroll(function(){
        var scroll = $(window).scrollTop();
        if (scroll > 200) {
            $('#page-navigation').addClass('bg-white').removeClass('bg-transparent');
            $('#page-navigation').addClass('navbar-light').removeClass('navbar-dark');
        }else{
            $('#page-navigation').addClass('bg-transparent').removeClass('bg-white');
            $('#page-navigation').addClass('navbar-dark').removeClass('navbar-light');
        }
    });

    $('.landing-categories').owlCarousel({
        loop: true,
        items: 4,
        margin: 0,
        autoplay: true,
        dots:false,
        autoplayTimeout: 8000,
        rewindSpeed : 8000,
        nav: true,
        navText : ['<i class="fa fa-angle-left" aria-hidden="true"></i>','<i class="fa fa-angle-right" aria-hidden="true"></i>'],
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 2
            },
            990: {
                items: 4
            },
            1170: {
                items: 4
            }
        }

    });

    $('.shop-categories').owlCarousel({
        loop: true,
        items: 4,
        margin: 5,
        autoplay: false,
        dots:false,
        autoplayTimeout: 8000,
        rewindSpeed : 8000,
        nav: true,
        navText : ['<i class="fa fa-angle-left" aria-hidden="true"></i>','<i class="fa fa-angle-right" aria-hidden="true"></i>'],
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 2
            },
            990: {
                items: 4
            },
            1170: {
                items: 4
            }
        }

    });

    $('.product-carousel').owlCarousel({
        loop: true,
        items: 4,
        margin: 15,
        autoplay: false,
        dots:false,
        autoplayTimeout: 8000,
        rewindSpeed : 8000,
        nav: true,
        navText : ['<i class="fa fa-angle-left" aria-hidden="true"></i>','<i class="fa fa-angle-right" aria-hidden="true"></i>'],
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 2
            },
            990: {
                items: 3
            },
            1170: {
                items: 4
            }
        }

    });

    $(".vertical-spin").TouchSpin({
        verticalbuttons: true,
        verticalupclass: 'fa fa-plus',
        verticaldownclass: 'fa fa-minus',
        max: 50
    });

});