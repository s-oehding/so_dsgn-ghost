"use strict";
import NProgress from 'nprogress'
import Init from './init.js'
// Headroom.js
import Headroom from './headroom.js'
// Slick Slider
import Slick from './slick.js'
// Highlight.js Codehighlighting
import Highlight from './highlight'
// Parallax
import Parallax from './parallax'
// Typed.js Lib
import Typed from './typed'
// Scroll Animations
import Animations from './animations'


import 'historyjs/scripts/bundled/html5/jquery.history.js'

let exports = module.exports = {};
function reload() {
    let body = $('body');
    $('html,body').foundation();
    Slick.initSlider();
    Headroom.initHeadroom();
    Parallax.init();
    ajaxAddLinkClass();
    Animations.onScrollInit();
    Animations.onScrollSticky();
    Init.scrollSpy();
    Highlight.init();
    Typed.init();
    Init.footerAccordion();
}

// Ajax Loading
History.Adapter.bind(window, 'statechange', function() {
    if (!History.enabled) {
        return false;
    }
    exports.loadContent();
});

let loading = false;

exports.loadContent = function() {
    let html = $('html');
    let body = $('body');
    let History = window.History;
    
    let ajaxContainer = $('#ajax-container');
    let State = History.getState();
    html.addClass('loading');

    $.get(State.url, function(result) {
        let html = $(result);
        let newContent = html.filter('#ajax-container').contents();
        let title = result.match(/<title>(.*?)<\/title>/)[1];

        loading = true;
        html.addClass('loading');
        NProgress.start();
        
        ajaxContainer.fadeOut(500,function() {
            NProgress.set(0.25);
            if(html.hasClass('push-next')) {
                html.removeClass('push-next');
                html.addClass('pushed-next');
            }
            if(html.hasClass('push-prev')) {
                html.removeClass('push-prev');
                html.addClass('pushed-prev');
            }
            NProgress.set(0.5);
            document.title = $('<textarea/>').html(title).text();
            ajaxContainer.html(newContent);
            NProgress.set(0.75);
            body.removeClass();
            body.addClass($('#body-class').attr('class'));
            NProgress.done();
            ajaxContainer.fadeIn(250);
            $(document).scrollTop(0);
            reload();
            setTimeout(function() {
                html.removeClass('loading');
            }, 250);
            loading = false;
        });
    }).fail(function() {
        // Request fail
        NProgress.done();
        location.reload();
    });
};

$('body').on('click', '.js-ajax-link', function(e) {
    e.preventDefault();
    console.log('ajax link triggered', $(this));
    let link = $(this);
    let html = $('html');
    NProgress.start();
    if(link.hasClass('post-nav-item') || link.hasClass('pagination-item')) {
        if(link.hasClass('post-nav-next') || link.hasClass('pagination-next')) {
            html.removeClass('pushed-prev');
            html.addClass('push-next');
        }
        if(link.hasClass('post-nav-prev') || link.hasClass('pagination-prev')) {
            html.removeClass('pushed-next');
            html.addClass('push-prev');
        }
    } else {
        html.removeClass('pushed-next');
        html.removeClass('pushed-prev');
    }

    if (loading === false) {
        let currentState = History.getState();
        let url = $(this).prop('href');
        let title = $(this).attr('title') || null;

        if (url.replace(/\/$/, "") !== currentState.url.replace(/\/$/, "")) {
            History.pushState({}, title, url);
        }
    }
});

// Add Ajax trigger class to Links
function ajaxAddLinkClass () {

    $('a[href^="' + window.location.origin + '"], a.post-image, .post-link, a.post-nav-item, .nav-blog a, .post-more a, .post-meta a, .post-tags a, #pagination a').each(function() {
        let link = $(this);

        if(!link.hasClass('rss')) {
            link.addClass('js-ajax-link');
            if (link.attr('href').indexOf('page') > -1) {
                link.addClass('js-archive-index');
            }

            if (link.attr('href') == window.location.origin) {
                link.addClass('js-show-index');
            }

            if (link.attr('href').indexOf('tag') > -1) {
                link.addClass('js-tag-index');
            }

            if (link.attr('href').indexOf('author') > -1) {
                link.addClass('js-author-index');
            }
        }
        // console.log('added ajax links', link);
    });
}
