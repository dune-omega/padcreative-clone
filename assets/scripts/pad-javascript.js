(function($) {

	//Main elements
	var html = $('html');
	var body = $('body');
	var responsiveBar = $('#responsive-bar');
	var responsiveMenu = $('#responsive-menu');
	var responsiveMenuButton = $('#responsive-menu-button,#responsive-menu-button div');
	var topMenu = $('#top-menu');
	var header = $('header');
	var scrollingLogosInner = $('#scrolling-logos-inner');
	var formRequiredFields = $('.gravity-form .gfield_contains_required').find('input, textarea, select');

	//Classes
	var activateClass = 'activate';

	//Toggle display-none class ON/OFF | flag = add or remove
	var toggleDisplayNone = function(elem, flag) {
		elem[flag + 'Class']('display-none');
	}

	// Get the current browser and version | output: Chrome 68
	var browserVersion = (function() {
		var ua = navigator.userAgent, tem,
		M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
		if(/trident/i.test(M[1])){
			tem =  /\brv[ :]+(\d+)/g.exec(ua) || [];
			return 'IE '+(tem[1] || '');
		}
		if(M[1] === 'Chrome'){
			tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
			if(tem != null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
		}
		M = M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, ' ?'];
		if((tem = ua.match(/version\/(\d+)/i))!= null) M.splice(1, 1, tem[1]);
		return M.join(' ');
	})();


	// Round up image heights on IE9 & IE10
	function roundUpImageHeightInIE(browser) {
		if ( (browser == 'MSIE9') || (browser == 'MSIE10') ) {
			$('.row img').each(function() {
				$this = $(this);
				$this.css('height', 'auto');
				var currentHeight = $this.height();
				//alert(currentHeight);
				$this.height(Math.ceil(currentHeight));
			});
		}
	}



// slick on mobile
  function slick_on_mobile(slider, settings, breakpoint = 767){
    $(window).on('load resize', function() {
      if ($(window).width() > breakpoint) {
        if (slider.hasClass('slick-initialized')) {
          slider.slick('unslick');
        }
        return
      }
      if (!slider.hasClass('slick-initialized')) {
        return slider.slick(settings);
      }
    });
  };


	/* Home */

	$(function(){

	   	// Adds browser name and version as classes to body
		browserVersion = browserVersion.split(' ');
		browserNameVersion = browserVersion[0] + browserVersion[1]; // Used elsewhere!
		body.addClass(browserVersion[0] + ' ' + browserNameVersion);

		function home_showcase_sizing() {
			
			var header_height = $('.header').height();
			var height_of_window = $(window).height();
			
			// If mobile size and portrait showcase is helf window height, otherwise full screen
			if( ($(window).width() < 600) && (window.innerHeight > window.innerWidth) ) {
				$('.home .home-showcase__slide').css({minHeight : 0}).height(height_of_window / 2);
			}
			else {
				$('.home .home-showcase__slide').css({minHeight : 0}).height(height_of_window - header_height);
			}
		}
		
		home_showcase_sizing();
		$(window).on('resize', function(){

			home_showcase_sizing();
		});


		/* Lightbox */
		$('.page a[href$=".jpg"],a.lightbox').magnificPopup({
			type: 'image',
			gallery: {
			  enabled: true
			},
			zoom: {
				enabled: false, // By default it's false, so don't forget to enable it

				duration: 300, // duration of the effect, in milliseconds
				easing: 'ease-in-out', // CSS transition easing function

				// The "opener" function should return the element from which popup will be zoomed in
				// and to which popup will be scaled down
				// By defailt it looks for an image tag:
				opener: function(openerElement) {
				  // openerElement is the element on which popup was initialized, in this case its <a> tag
				  // you don't need to add "opener" option if this code matches your needs, it's defailt one.
				  return openerElement.is('img') ? openerElement : openerElement.find('img');
				}
			}
			// other options
		});

		//var headerHeight = $(header).height();
		//$('.header__fixed-spacer').height(headerHeight);

		/* Scrolling logos */

/*
		toggleDisplayNone(scrollingLogos, 'remove');

		scrollingLogosInner.not('.slick-initialized').slick({
			infinite: true,
			slidesToShow: 4,
			slidesToScroll: 1,
			autoplay: true,
			autoplaySpeed: 2000,
			pauseOnHover: false,
			appendArrows: scrollingLogos,
			prevArrow: '<a class="prev-next" id="prev"></a>',
			nextArrow: '<a class="prev-next" id="next"></a>',
			responsive: [
				{
				  breakpoint: 930,
				  settings: {
					slidesToShow: 3,
				  }
				},
				{
				  breakpoint: 738,
				  settings: {
					slidesToShow: 2,
				  }
				},
				{
				  breakpoint: 486,
				  settings: {
					slidesToShow: 1,
				  }
				}
			]
		});
*/

//	 	Slick Slideshows

		var nextButton = '<button type="button" class="slick-next"><span></span></button>';
		var prevButton = '<button type="button" class="slick-prev"><span></span></button>';

		$('.service-examples__slideshow').slick({
			infinite: true,
			slidesToShow: 1,
			slidesToScroll: 1,
			autoplay: false,
			autoplaySpeed: 2000,
			pauseOnHover: false,
			prevArrow: prevButton,
			nextArrow: nextButton,

		});
		$('.home-clients__logos').slick({
			infinite: true,
			slidesToShow: 5,
			slidesToScroll: 1,
			autoplay: true,
			autoplaySpeed: 2000,
			pauseOnHover: true,
			arrows: false,
			prevArrow: nextButton,
			nextArrow: prevButton,
			responsive: [

				{
				  breakpoint: 1000,
				  settings: {
					slidesToShow: 4,
				  }
				},
				{
				  breakpoint: 800,
				  settings: {
					slidesToShow: 3,
				  }
				},
				{
				  breakpoint: 600,
				  settings: {
					slidesToShow: 2,
				  }
				}
			]
		});



		$('.home-showcase__slideshow').slick({
			infinite: true,
			slidesToShow: 1,
			slidesToScroll: 1,
			fade: true,
			autoplay: true,
			autoplaySpeed: 3000,
			pauseOnHover: false,
			prevArrow: nextButton,
			nextArrow: prevButton,
		});



		$('.case-studies__slideshow').slick({
			infinite: true,
			slidesToShow: 1,
			slidesToScroll: 1,
			fade: true,
			autoplay: true,
			autoplaySpeed: 3000,
			pauseOnHover: false,
			prevArrow: prevButton,
			nextArrow: nextButton,
		});


		var counter = 0;
		$('.services-list__images').each(function(){
			var number = 575 + Math.floor(Math.random() * 2766);
			counter = counter + 950;
			$(this).slick({
				infinite: true,
				slidesToShow: 1,
				slidesToScroll: 1,
				fade: true,
				autoplay: true,
				autoplaySpeed: counter + number,
				speed: 2000,
				pauseOnHover: false,
				prevArrow: nextButton,
				nextArrow: prevButton,
			});

		});




		// Mobile only Slick slideshows

		// Services - Testimonials
		$slick_slider = $('.service-testimonials .row .row');
		$settings_slider = {
			infinite: true,
			slidesToShow: 1,
			slidesToScroll: 1,

			//fade: true,
			autoplay: true,
			autoplaySpeed: 3000,
			pauseOnHover: false,
			prevArrow: nextButton,
			nextArrow: prevButton,
		}
		$breakpoint = 900;
		slick_on_mobile( $slick_slider, $settings_slider, $breakpoint);

		// Services - What Success panels
		$slick_slider = $('.service-what-success__holder');
		$settings_slider = {
			infinite: true,
			slidesToShow: 1,
			slidesToScroll: 1,

			//fade: true,
			autoplay: true,
			autoplaySpeed: 2500,
			pauseOnHover: false,
			prevArrow: nextButton,
			nextArrow: prevButton,
		}
		$breakpoint = 600;
		slick_on_mobile( $slick_slider, $settings_slider, $breakpoint);



		$(document).ready(function() {

			// Portfolio Lazy Loading
			$('.portfolio-item img.unloaded').removeClass('unloaded');

			var bLazy = new Blazy({
				successClass: 'b-loaded'
			});

		});


		$(window).load(function (){

			roundUpImageHeightInIE(browserNameVersion);


			/*$('.slick-slide').eq(0).width();*/

			/*scrollingLogosInner.children('img').each(function(){

				var logoHeight = $(this).height();
				var logoWidth = $(this).width();

				if(logoWidth == 216 ) {

					var paddingTop = (65 - logoHeight)/2;

					$(this).css('padding-top', paddingTop);

				} else if (logoHeight == 65 ) {

					var paddingLeft = (216 - logoWidth)/2;

					$(this).css('padding-left', paddingLeft);

				} else if ((logoWidth < 216) && (logoHeight < 65)) {

					var paddingLeft = (216 - logoWidth)/2;
					var paddingTop = (65 - logoHeight)/2;
					$(this).css({
						'padding-left': paddingLeft,
						'padding-top': paddingTop
					});

				}

			});*/

		});

		/*$(window).load(function (){

			toggleDisplayNone(scrollingLogos, 'remove');

			scrollingLogosInner.cycle({
				speed: 500,
				timeout: 2000,
				slides: '> div',
				fx: 'carousel',
				swipe: true,
				carouselVisible: 4,
				carouselFluid: true,
				next: '#next',
				prev: '#prev'
			});


			scrollingLogosInner.children('img').each(function(){

				var logoHeight = $(this).height();
				var logoWidth = $(this).width();

				if(logoWidth == 216 ) {

					var paddingTop = (162 - logoHeight)/2;

					$(this).css('padding-top', paddingTop);

				} else if (logoHeight == 162 ) {

					var paddingLeft = (216 - logoWidth)/2;

					$(this).css('padding-left', paddingLeft);

				}

			});

		});*/


		// Add required attr to required form fields
		formRequiredFields.attr('required', true);


		/* Responsive */

		toggleDisplayNone(responsiveBar, 'remove');

/*
		responsiveMenuButton.click(function(event){

			//responsiveMenu.toggleClass(activateClass);
			if ((responsiveMenu).hasClass("active")) {
				responsiveMenu.removeClass("active").fadeOut();
			}
			else {
				responsiveMenu.addClass("active").fadeIn();
			}

			responsiveMenuButton.toggleClass(activateClass);

			html.add(body).toggleClass('scroll');
			event.stopPropagation();
		});
*/
		responsiveMenuButton.click(function(event){


			if ((responsiveMenuButton).hasClass(activateClass)) {

				responsiveMenuButton.removeClass(activateClass);
				responsiveMenu.removeClass("active").fadeOut();
				html.add(body).removeClass('scroll');

			}
			else {

				responsiveMenuButton.addClass(activateClass);
				responsiveMenu.addClass("active").fadeIn();
				html.add(body).addClass('scroll');
			}

			event.stopPropagation();

		});

		//Show menu panel
		function showMenu(){
			$("responsiveMenu").addClass("active").fadeIn();
			$("#toggle_menu_button").addClass("open");
			$("#logo_container").finish().animate({"opacity" : "1"}, 500);
			$("#minified_logo").finish().animate({"opacity" : "0"}, 500);
			$("#header_background").finish().animate({"opacity" : "0"}, 500);
			$("#login_button_green").show().css({"opacity" : "0"}).animate({"opacity" : "1"}, 500);
			$("#login_button_white").animate({"opacity" : "0"}, 500);
			$("#menu_vertical_container").css({"-ms-transform" : "scale(1)", "-webkit-transform" : "scale(1)", "transform" : "scale(1)", "opacity" : "1"});
		}

		//Hide menu panel
		function hideMenu(){
			$("#menu_panel").removeClass("menu_panel_out").fadeOut();
			$("#toggle_menu_button").removeClass("open");
			$("#login_button_green").animate({"opacity" : "0"}, 500, function () {
				$(this).hide();
			});
			$("#login_button_white").show().animate({"opacity" : "1"}, 500);
			$("#menu_vertical_container").css({"-ms-transform" : "scale(1.4)", "-webkit-transform" : "scale(1.4)", "transform" : "scale(1.4)", "opacity" : "0"});
			//Return to minified header
			if($(window).scrollTop() >= 88)
			{
				$("#logo_container").finish().animate({"opacity" : "0"}, 500);
				$("#minified_logo").finish().animate({"opacity" : "1"}, 500);
				$("#header_background").finish().animate({"opacity" : "0.8"}, 500);
			}
		}



		// Close menu on click outside
		html.mouseup(function(e) {
			var target = $(e.target);
			var targetParent = $(e.target.parentElement);

			if ( !responsiveMenu.is(targetParent) && !responsiveMenu.is(target) && !responsiveMenuButton.is(targetParent) && !responsiveMenuButton.is(target)) {
				responsiveMenu.removeClass(activateClass);
				responsiveMenuButton.removeClass(activateClass);

				html.add(body).removeClass('scroll');
			}
		});

		// Set the responsive bar and menu breakpoint in ems | 1em = 16px => 1000px/16px = 62.5em
		browserVersion.join('') === 'MSIE9' ? mediaQueryList = window.innerWidth : mediaQueryList = window.matchMedia("(max-width: 56.25em)");

		function widthchecker() {

			responsiveMenu.removeClass(activateClass);

			if ( mediaQueryList.matches || mediaQueryList <= 900 ) {

				toggleDisplayNone(responsiveBar.add(responsiveMenu).add(responsiveMenuButton), 'remove');

				topMenu.children('.menu-top-menu-container').appendTo(responsiveMenu);

				// Disable lightbox on slideshows when under 900px
				$('a.slick-slide').off('click');
				$('a.slick-slide').on("click", function (e) { e.preventDefault(); });

				//$('a.slick-slide').removeData('magnificPopup');
				//$('a.slick-slide').on("click", function (e) { e.preventDefault(); });


			} else {


				toggleDisplayNone(responsiveBar.add(responsiveMenu).add(responsiveMenuButton), 'add');

				responsiveMenu.children('.menu-top-menu-container').appendTo(topMenu);

				responsiveBar.children('#user-menu').appendTo(topMenu);

			}
			//alert('brow' + browserNameVersion);
			roundUpImageHeightInIE(browserNameVersion);


		}

		$(widthchecker);

		$(window).resize(widthchecker);



	});

})(jQuery);
