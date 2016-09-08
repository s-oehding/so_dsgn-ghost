;
(function($, window) {
    /**
     * Initialize Foundation
     */
    $(document).foundation();

    /**
     * Main Preloader
     */
    $(document).ready(function() {
        NProgress.configure({
            showSpinner: true
        });
        NProgress.start();

        /**
         * Main Functions
         */
        $(window).ready(function() {

            /**
             * Parallax onload
             */

            $('.parallax-background').each(function(index, el) {
                var image = $(el).data('data-image-src');
                $(el).parallax({ imageSrc: image });

                $('.parallax-slider').on('load', function() {
                    $(el).toggleClass('animated fadeIn');
                });
            });

            /**
             * Scrollspy functions for Header Bg-coloring and reading progress
             */
            var $nav = $('#top-bar-menu');
            var $win = $(window);
            var winH = $win.height(); // Get the window height.
            var $articleHeight = $('#post-content').height();
            var scrollHeight = $articleHeight - winH;

            $win.on("scroll", function() {
                if ($(this).scrollTop() > (winH * 0.9)) {
                    $nav.addClass("scrolled");
                } else {
                    $nav.removeClass("scrolled");
                }
            }).on("resize", function() { // If the user resizes the window
                winH = $(this).height(); // you'll need the new height value
            });

            /**
             * Post reading Progress Bar
             */
            $(window).scroll(function() {
                var percent = 100 * $(window).scrollTop() / ($(document).height() - $(window).height());
                $('.progress-meter').css('width', percent + '%');
            });

            /**
             * Topbar Headroom
             */
            $('.main-nav').headroom({
                "offset": 200,
                "tolerance": 5,
                "classes": {
                    "initial": "animated",
                    "pinned": "slideInDown",
                    "unpinned": "slideOutUp"
                }
            });

            /**
             * Smooth Scroll function
             */
            $('a').click(function() {
                if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
                    var target = $(this.hash);
                    target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                    if (target.length) {
                        $('html,body').animate({
                            scrollTop: (target.offset().top - 150)
                        }, 1000);
                        return false;
                    }
                }
            });

            /**
             * Preloader End
             */
            $('#loader').addClass('animated fadeOut').delay(1000).fadeOut();

            NProgress.done();
        });


    });


    $(document).ready(function() {

        $(".ml-slider").owlCarousel({
            lazyLoad: true,
            loop: true,
            navigation: true,
            responsive: {
                0: {
                    items: 1,
                    nav: true
                },
                640: {
                    items: 2,
                    nav: false
                },
                1024: {
                    items: 3,
                    nav: true,
                    loop: false
                }
            }
        });

        $("#typed").typed({
            stringsElement: $('#strings'),
            typeSpeed: 50,
            backSpeed: 8,
            startDelay: 2000,
            backDelay: 2000,
            loop: true
        });

        $('#video').backgroundVideo({
            pauseVideoOnViewLoss: false
        });

    });

    /**
     * Mobile detection
     */
    (function() {

        jQuery(window).resize(function() {
            mobileDetection();
        });

        function mobileDetection() {
            var isMobile = {
                Android: function() {
                    return navigator.userAgent.match(/Android/i);
                },
                BlackBerry: function() {
                    return navigator.userAgent.match(/BlackBerry/i);
                },
                iOS: function() {
                    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
                },
                Opera: function() {
                    return navigator.userAgent.match(/Opera Mini/i);
                },
                Windows: function() {
                    return navigator.userAgent.match(/IEMobile/i);
                },
                any: function() {
                    return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
                }
            };

            var testMobile = isMobile.any();
            if (testMobile === null) {
                jQuery('body').addClass('body-desktop').removeClass('body-mobile');
            } else {
                jQuery('body').addClass('body-mobile').removeClass('body-desktop');
            }
        }
    })();
})(jQuery, window);
