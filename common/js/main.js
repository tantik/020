$(document).ready(initPage);
function initPage(){
	swiperGallery1();
	swiperGallery2();
	mobileMenu();

}
var allGallery = {}
function swiperGallery1(){
	allGallery.swiperTop = new Swiper('.swiper-top', {
		autoplay: 3000,
        autoplayDisableOnInteraction: false,
		loop: true
	});
}

function swiperGallery2(){
	allGallery.swiperTop = new Swiper('.gallery-img', {
		autoplay: 3000,
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