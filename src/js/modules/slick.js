"use strict";
// import 'imports?jQuery=jquery!owl.carousel';
import 'script!jquery'

import 'script!slick-carousel';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
let exports = module.exports = {};

exports.initSlider = function() {
  $('.ml-slider').slick({
    dots: false,
    infinite: true,
    autoplay: true,
    speed: 750,
    slidesToShow: 4,
    responsive: [
      {
        breakpoint: 1140,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  });
};