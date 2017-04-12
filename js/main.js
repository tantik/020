$(document).ready(initPage);
function initPage(){
	swiperGallery1();
	swiperGallery2();
	mobileMenu();
	fixedNav();
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
			// when window width is <= 320px
			736: {
				slidesPerView: 2
			}
		}
	});
}




function isMobile(){
	
	return (window.innerWidth <= 736 )? true : false;
	
}
function fixedNav(){
	
	if(!$('body').hasClass('index') || isMobile())return;
	
	
	headMenu = document.querySelector('.nav'),  
	needToScroll = headMenu.offsetTop;
	
	$(window).scroll(function(e){
		
		console.log(isMobile());
		if(isMobile()){
			$('body').removeClass('fixed-nav');
			return;
		}
		
		var scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
		
		if(scrollPosition >= needToScroll){
			$('body').addClass('fixed-nav');
		}
		else{
			$('body').removeClass('fixed-nav');
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
		$('.nav a').click(function(e) {
			e.preventDefault();
			$('body').removeClass('nav-visible');
			$('.nav').slideUp(300);
		});
	}
	
	
}