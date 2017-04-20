"use strict";
import Headroom from 'headroom.js/dist/headroom.js'
let exports = module.exports = {};

exports.initHeadroom = function() {
	let header = new Headroom(document.querySelector(".main-nav"), {
		tolerance: 25,
		offset: 500,
		classes: {
			initial: "animated",
			pinned: "slideInDown",
			unpinned: "slideOutUp"
		}
	});
	header.init();
};