"use strict";
import Parallax from 'parallax-scroll';
// import 'parallax.js/parallax.js'
let exports = module.exports = {};

exports.init = function() {
  const parallax = new Parallax('.parallax-background', {
	  speed: 0.5, // Anything over 0.5 looks silly
	  prefix: true
	});
  const parallaxSlider = new Parallax('.ml-slider', {
	  speed: 0.2, // Anything over 0.5 looks silly
	  prefix: true
	});
    parallax.animate();
    parallaxSlider.animate();
  	$('.parallax').addClass('animated fadeInUp');
};