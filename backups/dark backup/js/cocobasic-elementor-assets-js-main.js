(function ($) {

    "use stict";

    var count = 1;
    var portfolioPostsPerPage = $(".grid-item").length;
    var totalNumberOfPortfolioPages = Math.ceil(parseInt(ajax_var_portfolio.total) / portfolioPostsPerPage);

    setPrettyPhoto();
    imageSliderSetUp();
    setHorizontalSkills();
    showHidePortfolioLoadMoreButton();
    loadMorePortfolioOnClick();
    portfolioItemContentLoadOnClick();
    setActiveFirstPortfolioItem();
    setActivePortfolioItem();
    setParallax();
    carouselTestimonialSetUp();

    $(window).on('resize', function () {
        setHorizontalSkills();
    });

    $(window).on('scroll', function () {
        setHorizontalSkills();
    });

//------------------------------------------------------------------------
//Helper Methods -->
//------------------------------------------------------------------------

    function setHorizontalSkills() {
        $(".skill-fill:not(.animation-done").each(function (i) {
            var top_of_object = $(this).offset().top;
            var bottom_of_window = $(window).scrollTop() + $(window).height();
            if ((bottom_of_window - 70) > top_of_object) {
                $(this).width($(this).data("fill") + "%");
                $(this).next('.skill-fill-mask').width($(this).data("fill") + 2 + "%");
                $(this).addClass('animation-done');
            }
        });
    }

    function imageSliderSetUp() {
        $(".owl-carousel.image-slider").each(function () {
            var speed_value = $(this).data('speed');
            var auto_value = $(this).data('auto');
            var hover_pause = $(this).data('hover');
            if (auto_value === true) {
                $(this).owlCarousel({
                    loop: true,
                    autoHeight: true,
                    smartSpeed: 1000,
                    autoplay: auto_value,
                    autoplayHoverPause: hover_pause,
                    autoplayTimeout: speed_value,
                    responsiveClass: true,
                    items: 1
                });
                $(this).on('mouseleave', function () {
                    $(this).trigger('stop.owl.autoplay');
                    $(this).trigger('play.owl.autoplay', [auto_value]);
                });
            } else {
                $(this).owlCarousel({
                    loop: true,
                    autoHeight: true,
                    smartSpeed: 1000,
                    autoplay: false,
                    responsiveClass: true,
                    items: 1
                });
            }
        });
    }

    function setPrettyPhoto() {
        $('a[data-rel]').each(function () {
            $(this).attr('rel', $(this).data('rel'));
        });
        $(".grid-item:visible a[rel^='prettyPhoto']").prettyPhoto({
            slideshow: false,
            overlay_gallery: false,
            default_width: 1280,
            default_height: 720,
            deeplinking: false,
            social_tools: false,
            iframe_markup: '<iframe src ="{path}" width="{width}" height="{height}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>'
        });
    }

    function showHidePortfolioLoadMoreButton() {
        if (portfolioPostsPerPage < parseInt(ajax_var_portfolio.total)) {
            $('.more-posts-portfolio').css('visibility', 'visible');
            $('.more-posts-portfolio').animate({opacity: 1}, 1500);
        } else {
            $('.more-posts-portfolio').css('display', 'none');
        }
    }

    function loadMorePortfolioOnClick() {
        $('.more-posts-portfolio:visible').on('click', function () {
            count++;
            loadPortfolioMoreItems(count, portfolioPostsPerPage);
            $('.more-posts-portfolio').css('display', 'none');
            $('.more-posts-portfolio-loading').css('display', 'inline-block');
        });
    }

    function loadPortfolioMoreItems(pageNumber, portfolioPostsPerPage) {
        $.ajax({
            url: ajax_var_portfolio.url,
            type: 'POST',
            data: "action=portfolio_ajax_load_more&portfolio_page_number=" + pageNumber + "&portfolio_posts_per_page=" + portfolioPostsPerPage + "&security=" + ajax_var_portfolio.nonce,
            success: function (html) {
                var $newItems = $(html);
                $('.grid').append($newItems);
                $('.grid').imagesLoaded(function () {
                    if (count === totalNumberOfPortfolioPages)
                    {
                        $('.more-posts-portfolio').css('display', 'none');
                        $('.more-posts-portfolio-loading').css('display', 'none');
                        $('.no-more-posts-portfolio').css('display', 'inline-block');
                    } else
                    {
                        $('.more-posts-portfolio').css('display', 'inline-block');
                        $('.more-posts-portfolio-loading').css('display', 'none');
                        $(".more-posts-portfolio-holder").removeClass('stop-loading');
                    }
                });
                animateElement();
                setActivePortfolioItem();
                portfolioItemContentLoadOnClick();
                setPrettyPhoto();
            }
        });
        return false;
    }

    function portfolioItemContentLoadOnClick() {
        $('.ajax-portfolio').on('click', function (e) {
            e.preventDefault();
            var portfolioItemID = $(this).data('id');
            $(this).closest('.grid-item').addClass('portfolio-content-loading');
            $('#portfolio-grid').addClass('portfoio-items-mask');
            if ($("#pcw-" + portfolioItemID).length) {
                $('html, body').animate({scrollTop: $('#portfolio-wrapper').offset().top - 150}, 400);
                setTimeout(function () {
                    $('#portfolio-grid, .more-posts-portfolio-holder, .category-filter-list').addClass('hide');
                    setTimeout(function () {
                        $("#pcw-" + portfolioItemID).addClass('show');
                        $('.portfolio-load-content-holder').addClass('show');
                        $('.grid-item').removeClass('portfolio-content-loading');
                        $('#portfolio-grid, .more-posts-portfolio-holder, .category-filter-list').hide().removeClass('portfoio-items-mask');
                    }, 300);
                }, 500);
            } else {
                loadPortfolioItemContent(portfolioItemID);
            }
        });
    }

    function loadPortfolioItemContent(portfolioItemID) {
        $.ajax({
            url: ajax_var_portfolio_content.url,
            type: 'POST',
            data: "action=portfolio_ajax_content_load&portfolio_id=" + portfolioItemID + "&security=" + ajax_var_portfolio_content.nonce,
            success: function (html) {
                var getPortfolioItemHtml = $(html).html();
                $('.portfolio-load-content-holder').append('<div id="pcw-' + portfolioItemID + '" class="portfolio-content-wrapper">' + getPortfolioItemHtml + '</div>');
                if (!$("#pcw-" + portfolioItemID + " .close-icon").length) {
                    $("#pcw-" + portfolioItemID).prepend('<div class="close-icon"></div>');
                }
                $('html, body').animate({scrollTop: $('#portfolio-wrapper').offset().top - 150}, 400);
                setTimeout(function () {
                    $("#pcw-" + portfolioItemID).imagesLoaded(function () {
                        $('#portfolio-grid, .more-posts-portfolio-holder, .category-filter-list').addClass('hide');
                        setTimeout(function () {
                            $("#pcw-" + portfolioItemID).addClass('show');
                            $('.portfolio-load-content-holder').addClass('show');
                            $('.grid-item').removeClass('portfolio-content-loading');
                            $('#portfolio-grid').hide().removeClass('portfoio-items-mask');
                            imageSliderSetUp();
                            setHorizontalSkills();
                            setParallax();
                        }, 300);
                        $('.close-icon').on('click', function (e) {
                            var portfolioReturnItemID = $(this).closest('.portfolio-content-wrapper').attr("id").split("-")[1];
                            $('.portfolio-load-content-holder').addClass("viceversa");
                            $('#portfolio-grid, .more-posts-portfolio-holder, .category-filter-list').css('display', 'block');
                            setTimeout(function () {
                                $('#pcw-' + portfolioReturnItemID).removeClass('show');
                                $('.portfolio-load-content-holder').removeClass('viceversa show');
                                $('#portfolio-grid, .more-posts-portfolio-holder, .category-filter-list').removeClass('hide');
                            }, 300);
                            setTimeout(function () {
                                $('html, body').animate({scrollTop: $('#p-item-' + portfolioReturnItemID).offset().top - 150}, 400);
                            }, 500);
                        });
                    });
                }, 500);
            }
        });
        return false;
    }

    function setActiveFirstPortfolioItem() {
        $(".grid.first-active .grid-item").first().addClass('active-item');
    }

    function setActivePortfolioItem() {
        $('.grid .grid-item').on('mouseover', function () {
            $('.grid .grid-item').removeClass('active-item');
            $(this).addClass('active-item');
        });
    }

    function setParallax() {
        $('*[class*=" parallax_"]').each(function () {
            var className = this.className.match(/(parallax_[^\s]*)/);
            className = className[0].split('_');
            $(this).attr("data-jarallax-element", className[1] + " " + className[2]);
        });

        $('[data-jarallax-element]').jarallax({            
            speed: 0.2
        });
    }

    function carouselTestimonialSetUp() {
        $(".carousel-testimonial-wrapper").each(function () {
            var id = $(this).attr('id');
            var speed_value = $(this).data('speed');
            var auto_value = $(this).data('auto');

            if (auto_value === true) {
                var mySwiper = new Swiper('#' + id, {
                    autoplay: {
                        delay: speed_value
                    },
                    scrollbar: {
                        el: '.swiper-scrollbar-' + id,
                        hide: false,
                        draggable: true,
                        dragSize: '120px'
                    },
                    slidesPerView: 1,
                    spaceBetween: 30,
                    resistance: true,
                    resistanceRatio: 0.5,
                    breakpoints: {
                        767: {
                            slidesPerView: 'auto'
                        }
                    }
                });
                $('#' + id).hover(function () {
                    mySwiper.autoplay.stop();
                }, function () {
                    mySwiper.autoplay.start();
                });
            } else {
                var mySwiper = new Swiper('#' + id, {
                    autoplay: false,
                    scrollbar: {
                        el: '.swiper-scrollbar-' + id,
                        hide: false,
                        draggable: true,
                        dragSize: '120px'
                    },
                    slidesPerView: 1,
                    spaceBetween: 30,
                    resistance: true,
                    resistanceRatio: 0.5,
                    breakpoints: {
                        768: {
                            slidesPerView: 'auto'
                        }
                    }
                });
            }
        });
    }

    function animateElement() {
        $(".animate").each(function (i) {
            var top_of_object = $(this).offset().top;
            var bottom_of_window = $(window).scrollTop() + $(window).height();
            if ((bottom_of_window - 70) > top_of_object) {
                $(this).addClass('show-it');
                setTimeout(function () {
                    $(".animate.show-it").addClass('no-transition');
                }, 500);
            }
        });
    }

})(jQuery);
/*This file was exported by "Export WP Page to Static HTML" plugin which created by ReCorp (https://myrecorp.com) */