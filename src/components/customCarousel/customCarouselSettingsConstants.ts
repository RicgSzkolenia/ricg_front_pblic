const customOpinionCarouselSettings = {
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2800,
    responsive: [
      {
        breakpoint: 1250,
        settings: {
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 620,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 481,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          rows: 1,
        },
      },
    ],
  }

const customCourseCarouselSettings = {
    slidesToShow: 3,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 4800,
    dots: true,
    responsive: [
      {
        breakpoint: 1150,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 620,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 481,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          rows: 1,
        },
      },
    ],
}
  export default {
    customOpinionCarouselSettings,
    customCourseCarouselSettings
}