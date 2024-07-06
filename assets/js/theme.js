$(document).ready(function () {
  $(function () {
    $('.preloader').fadeOut();
  });

  $('.landing-categories').owlCarousel({
    loop: true,
    items: 4,
    margin: 0,
    autoplay: true,
    dots: false,
    autoplayTimeout: 8000,
    rewindSpeed: 8000,
    nav: true,
    navText: [
      '<i class="fa fa-angle-left" aria-hidden="true"></i>',
      '<i class="fa fa-angle-right" aria-hidden="true"></i>',
    ],
    responsive: {
      0: {
        items: 1,
      },
      768: {
        items: 2,
      },
      990: {
        items: 4,
      },
      1170: {
        items: 4,
      },
    },
  });

  $('.shop-categories').owlCarousel({
    loop: true,
    items: 4,
    margin: 5,
    autoplay: false,
    dots: false,
    autoplayTimeout: 8000,
    rewindSpeed: 8000,
    nav: true,
    navText: [
      '<i class="fa fa-angle-left" aria-hidden="true"></i>',
      '<i class="fa fa-angle-right" aria-hidden="true"></i>',
    ],
    responsive: {
      0: {
        items: 1,
      },
      768: {
        items: 2,
      },
      990: {
        items: 4,
      },
      1170: {
        items: 4,
      },
    },
  });

  $('.product-carousel').owlCarousel({
    loop: true,
    items: 4,
    margin: 15,
    autoplay: false,
    dots: false,
    autoplayTimeout: 8000,
    rewindSpeed: 8000,
    nav: true,
    navText: [
      '<i class="fa fa-angle-left" aria-hidden="true"></i>',
      '<i class="fa fa-angle-right" aria-hidden="true"></i>',
    ],
    responsive: {
      0: {
        items: 1,
      },
      768: {
        items: 2,
      },
      990: {
        items: 3,
      },
      1170: {
        items: 4,
      },
    },
  });

  $('.vertical-spin').TouchSpin({
    verticalbuttons: true,
    verticalupclass: 'fa fa-plus',
    verticaldownclass: 'fa fa-minus',
    max: 50,
  });
});

$(window).scroll(function () {
  const backtoTop = document.querySelector('.back-to-top');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      backtoTop.classList.add('active');
    } else {
      backtoTop.classList.remove('active');
    }
  });
});
