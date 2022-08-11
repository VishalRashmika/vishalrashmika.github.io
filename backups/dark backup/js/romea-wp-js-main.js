(function ($) {
    "use strict";

    var count = 1;

    animateElement();
    stopAnimateOnScroll();
    placeholderToggle();
    setMenu();
    setSlowScroll();
    setMenuSlowScroll();
    setActiveMenuItem();
    logoLinkFix();
    horizontalMenuTextFix();
    $(".site-content").fitVids();
    loadMoreArticleIndex();
    inputFieldsTextAnimation();
    if (is_touch_device()) {
        $('body').addClass('is-touch');
    }

    $(window).on('load', function () {
        $('#toggle').on("click", multiClickFunctionStop);
        togglePositionFix();
        setHash();
        $('.doc-loader').fadeOut();
    });

    $(window).on('resize', function () {
        setActiveMenuItem();
        togglePositionFix();
        $(".header-right-part-holder").sticky('update');
    });

    $(window).on('scroll', function () {
        animateElement();
        setActiveMenuItem();
        if ($('.alignfull').length) {
            detectOverlapping();
        }
    });


//------------------------------------------------------------------------
//Helper Methods -->
//------------------------------------------------------------------------


    function stopAnimateOnScroll() {
        $("html, body").on("scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove", function () {
            $("html, body").stop();
        });
    }

    function placeholderToggle() {
        $('input, textarea').on('focus', function () {
            $(this).data('placeholder', $(this).attr('placeholder'));
            $(this).attr('placeholder', '');
        });
        $('input, textarea').on('blur', function () {
            $(this).attr('placeholder', $(this).data('placeholder'));
        });
    }

    function horizontalMenuTextFix() {
        $(".site-title").css('top', $(".site-title").innerWidth());
        $(".menu-social").css('top', $(".menu-social").innerWidth() + $(".site-title").innerWidth());
    }

    function setMenuSlowScroll() {
        $('#header-main-menu ul li a.one-page-link').on("click", function (e) {
            if ($(this).attr('href') === '#') {
                e.preventDefault();
            } else {
                if ($('body').hasClass('page-template-onepage')) {
                    var $goLink = $(this).attr('href').split('#')[1];
                    if ($goLink !== undefined) {
                        if (!$(e.target).is('.sub-arrow')) {
                            $('body').toggleClass("cocobasic-open-menu").delay(600).queue(function (next) {
                                $('body').toggleClass("cocobasic-open-menu-done");
                                next();
                                setTimeout(function () {
                                    if ($('body').hasClass('small-menu')) {
                                        $('html, body').animate({scrollTop: $('#' + $goLink).offset().top - 77}, 1500);
                                    } else {
                                        $('html, body').animate({scrollTop: $('#' + $goLink).offset().top}, 1500);
                                    }
                                }, 300);
                            });
                            return false;
                        }
                    }
                }
            }
        });
    }

    function setSlowScroll() {
        $('a.button, .slow-scroll, .num-comments a, .elementor-button').on("click", function (e) {
            if ($(this).attr('href') === '#') {
                e.preventDefault();
            } else {
                if ($('body').hasClass('small-menu')) {
                    $('html, body').animate({scrollTop: $('#' + $goLink).offset().top - 77}, 1500);
                } else {
                    $('html, body').animate({scrollTop: $('#' + $goLink).offset().top}, 1500);
                }
                return false;
            }
        });
    }

    function multiClickFunctionStop(e) {
        $('#toggle').off("click");
        $('body').toggleClass("cocobasic-open-menu").delay(600).queue(function (next) {
            $(this).toggleClass("cocobasic-open-menu-done");
            next();
        });
        $('#toggle').on("click", multiClickFunctionStop);
    }

    function setMenu() {
        $(".default-menu ul:first").addClass('sm sm-clean main-menu');
        $(".header-right-part-holder").sticky({topSpacing: 0});

        $('.one-page-section').each(function () {
            $(this).find('a:first').attr('href', ajax_var.webUrl + $(this).find('a:first').attr('href')).addClass('one-page-link');
        });

        $('.main-menu').smartmenus({
            subMenusSubOffsetX: 1,
            subMenusSubOffsetY: -8,
            markCurrentItem: true,
            hideOnClick: false
        });

        var $mainMenu = $('.main-menu').on('click', 'span.sub-arrow', function (e) {
            var obj = $mainMenu.data('smartmenus');
            if (obj.isCollapsible()) {
                var $item = $(this).parent(),
                        $sub = $item.parent().dataSM('sub');
                $sub.dataSM('arrowClicked', true);
            }
        }).bind({
            'beforeshow.smapi': function (e, menu) {
                var obj = $mainMenu.data('smartmenus');
                if (obj.isCollapsible()) {
                    var $menu = $(menu);
                    if (!$menu.dataSM('arrowClicked')) {
                        return false;
                    }
                    $menu.removeDataSM('arrowClicked');
                }
            }
        });
    }

    function setActiveMenuItem() {
        var currentSection = null;
        $('.op-section').each(function () {
            var element = $(this).attr('id');
            if ($('#' + element).is('*')) {
                if ($(window).scrollTop() >= $('#' + element).offset().top - 115) {
                    currentSection = element;
                }
            }
        });

        $('#header-main-menu ul li').removeClass('active').find('a[href*="#' + currentSection + '"]').parent().addClass('active');
        if (window.innerWidth < 1366) {
            $("body").addClass("small-menu");
        } else {
            $("body").removeClass("small-menu");
        }
    }

    function setHash() {
        var hash = location.hash;
        if ((hash !== '') && ($(hash).length)) {
            $('html, body').animate({scrollTop: $(hash).offset().top}, 1);
            $('html, body').animate({scrollTop: $(hash).offset().top}, 1);
        } else {
            $(window).scrollTop(1);
            $(window).scrollTop(0);
        }
    }

    function logoLinkFix() {
        $('.header-logo').on("click", function (e) {
            if ($('body').hasClass('page-template-onepage')) {
                e.preventDefault();
                $('html, body').animate({scrollTop: 0}, 1500);
            }
        });
    }

    function animateElement() {
        $(".animate").each(function (i) {
            var top_of_object = $(this).offset().top;
            var bottom_of_window = $(window).scrollTop() + $(window).height();
            if ((bottom_of_window - 70) > top_of_object) {
                $(this).addClass('show-it');
            }
        });
    }

    function loadMoreArticleIndex() {
        if (parseInt(ajax_var.posts_per_page_index) < parseInt(ajax_var.total_index)) {
            $('.more-posts').css('visibility', 'visible');
            $('.more-posts').animate({opacity: 1}, 1500);
        } else {
            $('.more-posts, .more-posts-index-holder').css('display', 'none');
        }

        $('.more-posts:visible').on('click', function () {
            $('.more-posts').css('display', 'none');
            $('.more-posts-loading').css('display', 'inline-block');
            count++;
            loadArticleIndex(count);
        });
    }

    function loadArticleIndex(pageNumber) {
        $.ajax({
            url: ajax_var.url,
            type: 'POST',
            data: "action=infinite_scroll_index&page_no_index=" + pageNumber + '&loop_file_index=loop-index&security=' + ajax_var.nonce,
            success: function (html) {
                $('.blog-holder').imagesLoaded(function () {
                    $(".blog-holder").append(html);
                    setTimeout(function () {
                        animateElement();
                        if (count == ajax_var.num_pages_index) {
                            $('.more-posts').css('display', 'none');
                            $('.more-posts-loading').css('display', 'none');
                            $('.no-more-posts').css('display', 'inline-block');
                        } else {
                            $('.more-posts').css('display', 'inline-block');
                            $('.more-posts-loading').css('display', 'none');
                            $(".more-posts-index-holder").removeClass('stop-loading');
                        }
                    }, 100);
                });
            }
        });
        return false;
    }

    function inputFieldsTextAnimation() {
        $(".wpcf7 textarea, .wpcf7 input").on("focus", function () {
            $(this).parent().next(".input-default-text").addClass('has-content');
        });

        $(".wpcf7 textarea, .wpcf7 input").on("focusout", function () {
            if (!$(this).val()) {
                $(this).parent().next(".input-default-text").removeClass('has-content');
            }
        });

        $("#commentform textarea, #commentform input").on("focus", function () {
            $(this).siblings(".input-default-text").addClass('has-content');
        });

        $("#commentform textarea, #commentform input").on("focusout", function () {
            if (!$(this).val()) {
                $(this).siblings(".input-default-text").removeClass('has-content');
            }
        });
    }

    function togglePositionFix() {
        $(".toggle-holder").css({top: $(".header-logo img").height() + 56, right: (0 - $(".header-logo img").width() / 2) - 15});
    }

    function is_touch_device() {
        return !!('ontouchstart' in window);
    }

    function detectOverlapping() {
        if ($(".toggle-holder").offset().top > ($(".alignfull").offset().top - 30)) {
            $('.header-logo').addClass('add-background');
        } else {
            $('.header-logo').removeClass('add-background');
        }
    }

})(jQuery);
/*This file was exported by "Export WP Page to Static HTML" plugin which created by ReCorp (https://myrecorp.com) */