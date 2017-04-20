"use strict";
import 'waypoints/lib/jquery.waypoints.js'
let exports = module.exports = {};


exports.onScrollInit = function( items, trigger ) {

    let $animation_elements = $('.revealer');
    let $window = $(window);

    function check_if_in_view() {
      let window_height = $window.height();
      let window_top_position = $window.scrollTop();
      let window_bottom_position = (window_top_position + window_height);
     
      $.each($animation_elements, function() {
        let $element = $(this);
        let element_height = $element.outerHeight();
        let element_top_position = $element.offset().top;
        let element_bottom_position = (element_top_position + element_height);

        let animateInClass = $element.attr('data-animation-in');
        let animateOutClass = $element.attr('data-animation-out');
        let animationDelay = $element.attr('data-animation-delay');

        $element.css({
            '-webkit-animation-delay':  animationDelay,
            '-moz-animation-delay':     animationDelay,
            'animation-delay':          animationDelay
        });
     
        //check to see if this current container is within viewport
        if ((element_bottom_position >= window_top_position) && (element_top_position <= window_bottom_position)) {
          
          $element.removeClass(animateOutClass);
          $element.addClass(animateInClass);
          $element.addClass('animated');
        } else {
            $element.removeClass(animateInClass);
            $element.addClass(animateOutClass).delay(animationDelay);
            // $element.removeClass('animated');
        }
      });
    }

    $window.on('scroll resize', check_if_in_view);
    $window.trigger('scroll');

};

exports.onScrollSticky = function() {
   $(window).scroll(function() {
        let distanceFromTop = $(document).scrollTop();
        if (distanceFromTop <= 54)
        {
          $('.sticky').addClass('fixed');
        }
        else
        {
          $('.sticky').removeClass('fixed');
        }
    });
}