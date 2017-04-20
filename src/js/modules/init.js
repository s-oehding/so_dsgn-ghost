"use strict";
let exports = module.exports = {};
/**
 * Footer Accordion
 */
exports.footerAccordion = function() {
  if (Foundation.MediaQuery.current == ('small')) {
      $('.accordion').foundation('up', $('.accordion-content'));
  } else {
      $('.accordion').foundation('down', $('.accordion-content'));
  }
}

/**
 * Scrollspy functions for Header-Bg coloring and reading progress
 */
exports.scrollSpy= function() {
  let nav = $('#top-bar-menu');
  let win = $(window);
  let winH = win.height();

  win.on("scroll", function() {
    if ($(this).scrollTop() > (winH * 0.9)) {
        nav.addClass("scrolled");
    } else {
        nav.removeClass("scrolled");
    }
  }).on("resize", function() { // If the user resizes the window
      winH = $(this).height(); // you'll need the new height value
  });
  /**
   * Post reading Progress Bar
   */
  $(window).scroll(function() {
    let percent = 100 * $(window).scrollTop() / ($(document).height() - $(window).height());
    $('.progress-meter').css('width', percent + '%');
  });
};