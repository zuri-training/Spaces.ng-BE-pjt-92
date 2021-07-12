// function lockScroll() {
//   document.body.classList.toggle("lock-scroll");
// }

// SLIDERS

$(function () {
  $(".testimonies__details").slick({
    dots: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 10000,
    prevArrow:
      '<span class="prev act-btn"><i class="fas fa-chevron-left"></i></span>',
    nextArrow:
      '<span class="next act-btn"><i class="fas fa-chevron-right"></i></span>',
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

$(function () {
  $(".featured__spaces__wrap").slick({
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

// END


