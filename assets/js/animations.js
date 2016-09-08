;(function($) {
function onScrollInit( items, trigger ) {
  items.each( function() {
    var osElement = $(this),
        osAnimationClass = osElement.attr('data-os-animation'),
        osAnimationDelay = osElement.attr('data-os-animation-delay');
 
    osElement.css({
        '-webkit-animation-delay':  osAnimationDelay,
        '-moz-animation-delay':     osAnimationDelay,
        'animation-delay':          osAnimationDelay
    });
 
    var osTrigger = ( trigger ) ? trigger : osElement;
 	
    osElement.fadeOut();

    osTrigger.waypoint(function() {
        osElement.fadeIn('slow');
        osElement.addClass('animated').addClass(osAnimationClass);
    },{
        triggerOnce: true,
        offset: '75%'
    });
  });
}

onScrollInit( $('.os-animation') );

onScrollInit( $('.os-animation-stack'), $('.animation-container') );
})(jQuery);