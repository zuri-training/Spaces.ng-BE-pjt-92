// PEOPLE ALSO VIEWED SECTION

$(function () {
    $(".spaces-wrap").slick({
      dots: false,
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: true,
      pauseOnHover: false,
      autoplaySpeed: 4000,
      prevArrow:
        '<span class="f-prev f-act-btn"><i class="fas fa-chevron-left"></i></span>',
      nextArrow:
        '<span class="f-next f-act-btn"><i class="fas fa-chevron-right"></i></span>',
      responsive: [
        {
          breakpoint: 1150,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            infinite: true,
            dots: false,
          },
        },
        {
          breakpoint: 760,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    });
  });