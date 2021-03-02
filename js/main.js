(function ($) {
	"use strict"

	// Fixed Nav
	var lastScrollTop = 0;
	$(window).on('scroll', function () {
		var wScroll = $(this).scrollTop();
		if (wScroll > $('#nav').height()) {
			if (wScroll < lastScrollTop) {
				$('#nav-fixed').removeClass('slide-up').addClass('slide-down');
				$('#nav')
			} else {
				$('#nav-fixed').removeClass('slide-down').addClass('slide-up');
			}
		}
		lastScrollTop = wScroll
	});

	// Search Nav
	$('.search-btn').on('click', function () {
		$('.search-form').addClass('active');
	});

	$('.search-close').on('click', function () {
		$('.search-form').removeClass('active');
	});

	// Aside Nav
	$(document).click(function (event) {
		if (!$(event.target).closest($('#nav-aside')).length) {
			if ($('#nav-aside').hasClass('active')) {
				$('#nav-aside').removeClass('active');
				$('#nav').removeClass('shadow-active');
			} else {
				if ($(event.target).closest('.aside-btn').length) {
					$('#nav-aside').addClass('active');
					$('#nav').addClass('shadow-active');
				}
			}
		}
	});

	$('.nav-aside-close').on('click', function () {
		$('#nav-aside').removeClass('active');
		$('#nav').removeClass('shadow-active');
	});

	// Sticky Shares
	var $shares = $('.sticky-container .sticky-shares'),
		$sharesHeight = $shares.height(),
		$sharesTop,
		$sharesCon = $('.sticky-container'),
		$sharesConTop,
		$sharesConleft,
		$sharesConHeight,
		$sharesConBottom,
		$offsetTop = 80;

	function setStickyPos() {
		if ($shares.length > 0) {
			$sharesTop = $shares.offset().top
			$sharesConTop = $sharesCon.offset().top;
			$sharesConleft = $sharesCon.offset().left;
			$sharesConHeight = $sharesCon.height();
			$sharesConBottom = $sharesConHeight + $sharesConTop;
		}
	}

	function stickyShares(wScroll) {
		if ($shares.length > 0) {
			if ($sharesConBottom - $sharesHeight - $offsetTop < wScroll) {
				$shares.css({
					position: 'absolute',
					top: $sharesConHeight - $sharesHeight,
					left: 0
				});
			} else if ($sharesTop < wScroll + $offsetTop) {
				$shares.css({
					position: 'fixed',
					top: $offsetTop,
					left: $sharesConleft
				});
			} else {
				$shares.css({
					position: 'absolute',
					top: 0,
					left: 0
				});
			}
		}
	}

	$(window).on('scroll', function () {
		stickyShares($(this).scrollTop());
	});

	$(window).resize(function () {
		setStickyPos();
		stickyShares($(this).scrollTop());
	});

	setStickyPos();
	$("#pageTop a").addClass('active');
	$("#pageTop").on("click", function (e) {
		e.preventDefault();
		$("html, body").animate({
			scrollTop: 0
		}, 1000);
	})
	$(window).on("load scroll resize", function () {
		var wHeight = $(this).height();
		var pFootter = $("footer").offset().top;
		var scrollTop = $(this).scrollTop();
		var hWin = wHeight + scrollTop;
		if ($(window).width() < 767) {
			pFootter = pFootter;
		}
		if (scrollTop <= 0) {
			$("#pageTop").css({
				"opacity": "0",
				"pointer-events": "none"
			});
		} else {
			$("#pageTop").css({
				"opacity": "1",
				"pointer-events": "all"
			});
		}
		if (hWin <= pFootter) {
			$("#pageTop").addClass('active');
		} else {
			$("#pageTop").removeClass('active');
		}
	});
})(jQuery);