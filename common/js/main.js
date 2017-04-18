$(document).ready(initPage);
function initPage(){
	swiperGallery1();
	swiperGallery2();
	mobileMenu();
	initSameHeight();
	fadeOnscroll();
}
var allGallery = {}
function swiperGallery1(){
	allGallery.swiperTop = new Swiper('.swiper-top', {
		autoplay: 4000,
		effect: 'fade',
        speed: 2000,
        autoplayDisableOnInteraction: false,
		loop: true
	});
}

function swiperGallery2(){
	allGallery.swiperTop = new Swiper('.gallery-img', {
		autoplay: 1,
		speed: 10000,
		autoplayDisableOnInteraction: false,
		loop: true,
		slidesPerView: 5,
		spaceBetween: 0,
		breakpoints: {
			1000: {
				slidesPerView: 4
			},
			736: {
				slidesPerView: 2
			}
		}
	});
}

/* Mobile Menu */
function mobileMenu(){
	$('a.mobile-opener').click(function(e) {
		e.preventDefault();
		$('body').toggleClass('nav-visible');
		$('.nav').slideToggle(300);
	});
	
	if ($(window).width() <= 736) {
		$('.nav ul a').click(function(e) {
			e.preventDefault();
			$('body').removeClass('nav-visible');
			$('.nav').slideUp(300);
		});
	}
}

// set same column height
function initSameHeight(){
	jQuery('.future-block .blocks').sameHeight({
		elements: '.hold',
		flexible: true,
		multiLine: true
	});

	jQuery('.commitment-block .blocks').sameHeight({
		elements: '.hold',
		flexible: true,
		multiLine: true
	});
}
/*
 * jQuery SameHeight plugin
 */
;(function($){
	$.fn.sameHeight = function(opt) {
		var options = $.extend({
			skipClass: 'same-height-ignore',
			leftEdgeClass: 'same-height-left',
			rightEdgeClass: 'same-height-right',
			elements: '>*',
			flexible: false,
			multiLine: false,
			useMinHeight: false
		},opt);
		return this.each(function(){
			var holder = $(this);
			var elements = holder.find(options.elements).not('.' + options.skipClass);
			if(!elements.length) return;

			// resize handler
			function doResize() {
				elements.css(options.useMinHeight && supportMinHeight ? 'minHeight' : 'height', '');
				if(options.multiLine) {
					// resize elements row by row
					resizeElementsByRows(elements, options);
				} else {
					// resize elements by holder
					resizeElements(elements, holder, options);
				}
			}
			doResize();

			// handle flexible layout / font resize
			if(options.flexible) {
				$(window).bind('resize orientationchange fontresize', function(e){
					doResize();
					setTimeout(doResize, 100);
				});
			}
			// handle complete page load including images and fonts
			$(window).bind('load', function(){
				doResize();
				setTimeout(doResize, 100);
			});
		});
	}

	// detect css min-height support
	var supportMinHeight = typeof document.documentElement.style.maxHeight !== 'undefined';

	// get elements by rows
	function resizeElementsByRows(boxes, options) {
		var currentRow = $(), maxHeight, firstOffset = boxes.eq(0).offset().top;
		boxes.each(function(ind){
			var curItem = $(this);
			if(curItem.offset().top === firstOffset) {
				currentRow = currentRow.add(this);
			} else {
				maxHeight = getMaxHeight(currentRow);
				resizeElements(currentRow, maxHeight, options);
				currentRow = curItem;
				firstOffset = curItem.offset().top;
			}
		});
		if(currentRow.length) {
			maxHeight = getMaxHeight(currentRow);
			resizeElements(currentRow, maxHeight, options);
		}
	}

	// calculate max element height
	function getMaxHeight(boxes) {
		var maxHeight = 0;
		boxes.each(function(){
			maxHeight = Math.max(maxHeight, $(this).outerHeight());
		});
		return maxHeight;
	}

	// resize helper function
	function resizeElements(boxes, parent, options) {
		var parentHeight = typeof parent === 'number' ? parent : parent.height();
		boxes.removeClass(options.leftEdgeClass).removeClass(options.rightEdgeClass).each(function(i){
			var element = $(this);
			var depthDiffHeight = 0;

			if(typeof parent !== 'number') {
				element.parents().each(function(){
					var tmpParent = $(this);
					if(this === parent[0]) {
						return false;
					} else {
						depthDiffHeight += tmpParent.outerHeight() - tmpParent.height();
					}
				});
			}
			var calcHeight = parentHeight - depthDiffHeight - (element.outerHeight() - element.height());
			if(calcHeight > 0) {
				element.css(options.useMinHeight && supportMinHeight ? 'minHeight' : 'height', calcHeight);
			}
		});
		boxes.filter(':first').addClass(options.leftEdgeClass);
		boxes.filter(':last').addClass(options.rightEdgeClass);
	}
}(jQuery));

/*
 * jQuery FontResize Event
 */
jQuery.onFontResize = (function($) {
	$(function() {
		var randomID = 'font-resize-frame-' + Math.floor(Math.random() * 1000);
		var resizeFrame = $('<iframe>').attr('id', randomID).addClass('font-resize-helper');

		// required styles
		resizeFrame.css({
			width: '100em',
			height: '10px',
			position: 'absolute',
			borderWidth: 0,
			top: '-9999px',
			left: '-9999px'
		}).appendTo('body');

		var doc = resizeFrame[0].contentWindow.document;
		doc.open();
		doc.write('<scri' + 'pt>window.onload = function(){var em = parent.jQuery("#' + randomID + '")[0];window.onresize = function(){if(parent.jQuery.onFontResize){parent.jQuery.onFontResize.trigger(em.offsetWidth / 100);}}};</scri' + 'pt>');
		doc.close();

		jQuery.onFontResize.initialSize = resizeFrame[0].offsetWidth / 100;
	});
	return {
		// public method, so it can be called from within the iframe
		trigger: function (em) {
			$(window).trigger("fontresize", [em]);
		}
	};
}(jQuery));


/* Scroll to Element */
(function($) {
	$.fn.scrollToElement = function(options){
		var options = $.extend({
			selectorElement: $(this),
			minusScroll: 0,
			action:''
		}, options);
		this.each(function() {
			var show = true;
			var countbox = options.selectorElement;
			$(window).on("scroll load resize", function(){

				if(!show) return false;

				var w_top = new $(window).scrollTop();
				var e_top = new $(countbox).offset().top-options.minusScroll;

				var w_height = new $(window).height();
				var d_height = new $(document).height();

				var e_height = new $(countbox).outerHeight();

				if(w_top + 300 >= e_top || w_height + w_top == d_height || e_height + e_top < w_height){
					show = false;
					eval('options.action()');
				}
			});
		});
		return this;
	};
})(jQuery);


/* OnScroll Elements */
function fadeOnscroll(){
	$('.onscroll').each(function(){
		var thisAll = $(this)
		thisAll.scrollToElement({
			minusScroll:$(window).height()*0.4,
			action:function(){
				var delays = 0;
				thisAll.each(function(){
					var $this = thisAll;
					setTimeout(function(){
						$this.addClass('scrollOn');
					},delays)
					delays = delays + 200
				});
			}
		});
	});
}