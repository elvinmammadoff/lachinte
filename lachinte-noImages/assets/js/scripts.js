jQuery(function ($) {

	$(document).ready(function() {
	
		"use strict";
		
		PageLoad();
		FirstLoad();
		if( (typeof ClapatGrenadaThemeOptions != 'undefined') && (ClapatGrenadaThemeOptions.enable_ajax == "1") ){
			AjaxLoad();
		} else {
			PageLoadNoAjax();
		}
		Portfolio();
	
	});


/*--------------------------------------------------
Function Page Load
---------------------------------------------------*/

	function PageLoad() {	
		
		$('body').removeClass('hidden');

	}// End Page Load
		

/*--------------------------------------------------
Function First Load
---------------------------------------------------*/	

	function FirstLoad() {	
		
		$('.slider-img').each(function() {
			var image = $(this).data('src');	
			$(this).css({'background-image': 'url(' + image + ')'});
		});
		
	}// End First Load
	

/*--------------------------------------------------
Function Portfolio
---------------------------------------------------*/
	
	function Portfolio() {
			
		// Split and Full Slider
		if( $('.split-slider').length > 0 ){

		new Swiper(".swiper-container", 
				{
				direction: "vertical",
				loop: false,
				speed:800,
				autoplay: {
					// enabled: false,
					delay: 3000,
					disableOnInteraction: false
				},
				effect: "slide",
				// mousewheel: true,			
        navigation: {
          enabled: true,
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev',
        },	
				on: {					
					init: function () {
						//Load Image Changer
						$('.slider-img:nth-child(1)').addClass('active');
						// $('.swiper-slide-active').addClass('active');

						// });
						const slideCount = $('.swiper-slide-active').data('slide')
						counter = $('#counter-wrap span[data-slide-count="' + slideCount + '"]');	
						// console.log(slideCount);
						
					},
					slideChange: function () {
						if($('.swiper-slide').hasClass('swiper-slide-active')) {
							// $('.swiper-slide-prev').removeClass('active');
							// $('.swiper-slide-active').removeClass('active');
							let slide = $('.swiper-slide-active').data('slide'),
							slideCount = slide + 1,
							preview = $('.slider-img[data-slide="' + slide + '"]').data('slide'),
							img = $('.slider-img[data-slide="' + slide + '"]'),	
							imgActive = $('.slider-img.active');	
							imgActive.removeClass('active');
							if(slide == 3 && preview == 3) {
								// $('.swiper-slide:nth-child(1)').addClass('active');
								slideCount = slide - 2
							}
							if(slide == preview) {
								// $('.swiper-slide-next').addClass('active'); 
								img.addClass('active')
								// console.log('slider', slide, preview, slideCount);
							}
							counter = $('#counter-wrap span[data-slide-count="' + slideCount + '"]');	
							TweenLite.to($('#counter-wrap').find('span'), 0.3, {force3D:true, opacity:0, delay:0, y: 10, ease:Power2.easeIn, onComplete:function(){
								TweenMax.set(counter, {opacity:0, y:-10, delay:0});
								TweenMax.to(counter, 0.3, {force3D:true, opacity:1, y:0, delay:0, ease:Power2.easeOut});
							}});
						} 
					}
				}
			});
		}
			
	}//End Portfolio
	
		
/*--------------------------------------------------
Function Page Load No Ajax
---------------------------------------------------*/

	function PageLoadNoAjax() {
		var e = {
				x: 0,
				y: 0
			},
			t = {
				x: 0,
				y: 0
			},
			a = .25,
			o = !1,
			n = document.getElementById("ball"),
			l = document.getElementById("ball-loader");
		TweenLite.set(n, {
			xPercent: -50,
			yPercent: -50
		}), document.addEventListener("mousemove", function(t) {
			var a = window.pageYOffset || document.documentElement.scrollTop;
			e.x = t.pageX, e.y = t.pageY - a
		}), $(".hide-ball").mouseenter(function(e) {
			TweenMax.to("#ball", .2, {
				borderWidth: "1px",
				scale: 2,
				opacity: 0
			})
		}), $(".hide-ball").mouseleave(function(e) {
			TweenMax.to("#ball", .3, {
				borderWidth: "2px",
				scale: 1,
				opacity: 1
			})
		})
	}// End Page Load No Ajax	

});
	
