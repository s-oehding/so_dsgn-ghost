"use strict";
import 'typed.js/dist/typed.min.js'
let exports = module.exports = {};

exports.init = function () {
	$("#typed").typed({
	    stringsElement: $('#strings'),
	    typeSpeed: 50,
	    backSpeed: 8,
	    startDelay: 2000,
	    backDelay: 2000,
	    loop: true
	});
};