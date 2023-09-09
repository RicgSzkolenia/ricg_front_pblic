const customOpinionCarouselSettings = {
    arrows: false,
    autoplay: true,
    slidesToShow: 3,
    infinite: false,
    rows: 1,
    responsive: [
      {
        breakpoint: 1250,
        settings: {
          rows: 1,
          slidesToShow: 3,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
          rows: 1,
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
    slidesToShow: 2,
    arrows: false,
    // autoplay: true,
    // autoplaySpeed: 4800,
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
        breakpoint: 800,
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