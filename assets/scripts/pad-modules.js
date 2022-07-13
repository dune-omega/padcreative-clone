(function($) {
	
	//Module elements
	var moduleHeaderFixed = $('.header__fixed');
	var moduleSlideshowBanner = $('.slideshow-banner');
	var moduleSlideshowBannerFull = $('.slideshow-banner--full-screen');
	var moduleSlideshowBannerSlide = $('.slideshow-banner .slideshow-banner__slide');
	
	//Toggle display-none class ON/OFF | flag is add or remove
	var toggleDisplayNone = function(elem, flag) {
		elem[flag + 'Class']('display-none');
	}

	
    $(function(){
        
    
    // -----------------------------------------------------------------------------
    // module-fixed-header + module-fixed-header-overlay
    // -----------------------------------------------------------------------------
    
    function headerHeightScroll() {
        var headerOffset = moduleHeaderFixed.offset().top; //console.log(headerOffset);
        
        var wpAdminBar = $('#wpadminbar').height();
        
        if( headerOffset - wpAdminBar > 0 ) {
            moduleHeaderFixed.addClass('scrolling');
        } else {
            moduleHeaderFixed.removeClass('scrolling');
        }
    }
    
    $(document).scroll(headerHeightScroll);
    
    
    
    // -----------------------------------------------------------------------------
    // module-slideshow-banner
    // -----------------------------------------------------------------------------
    
	toggleDisplayNone(moduleSlideshowBannerSlide, 'remove');
	
	moduleSlideshowBanner.cycle({
		slides: '> div',
	    speed: 1500,
	    timeout: 3000,
	    fx: 'fade'
	});
	
	// -----------------------------------------------------------------------------
    // module-slideshow-banner-full-screen
    // -----------------------------------------------------------------------------

    				
/*
    function changeHeight() {
        var winHeight = $(window).height();
        var minusHeight = moduleSlideshowBannerFull.offset().top;
                
        moduleSlideshowBannerFull.height(winHeight - minusHeight);
    }
    
    changeHeight();
    $(window).resize(changeHeight);
*/
    
    // Smooth scrolling button
    $("#module-slideshow-banner-full-screen-scroller a").on('click', function(event) {

        event.preventDefault();

        // Store hash
        var hash = this.hash;

        // Using jQuery's animate() method to add smooth page scroll
        // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
        $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 800, function(){
       
            // Add hash (#) to URL when done scrolling (default click behavior)
            window.location.hash = hash;
        });
      
    });
    
    // Offset for scroll to anchor tag
        
    function anchorOffsetHeight() {
        
        var wpAdminBar = $('#wpadminbar').height();
        var headerScrollingHeight = 90;
        var anchorOffset = wpAdminBar + headerScrollingHeight;
        
        $('#module-slideshow-banner-full-screen-scroll-down-anchor').css('bottom',anchorOffset);
                
    }
    anchorOffsetHeight();
    $(document).scroll(anchorOffsetHeight);
    
    
    
    });
})(jQuery);