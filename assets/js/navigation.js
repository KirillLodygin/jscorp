/*! jQuery navigation.js
  Adds toggle icon for mobile navigation and dropdown animations for widescreen navigation
  Author: Thomas W (themezee.com)
*/

(function($) {
	
	/**--------------------------------------------------------------
	# Responsive Navigation for WordPress menus
	--------------------------------------------------------------*/
	$.fn.responsiveMenu = function( options ) {
	
		if (options === undefined) options = {};
		
		/* Set Defaults */
		var defaults = {
			menuID: "menu",
			toggleClass: "menu-toggle",
			toggleImg: "",
			maxWidth: "991px"
		};
		
		/* Set Variables */
		var vars = $.extend({}, defaults, options),
			menuID = vars.menuID,
			toggleID = (vars.toggleID) ? vars.toggleID : vars.toggleClass,
			toggleClass = vars.toggleClass,
			toggleImg = vars.toggleImg,
			maxWidth = vars.maxWidth,
			$this = $(this),
			$menu = $('#' + menuID);
		

		/*********************
		* Desktop Navigation *
		**********************/				
		
		/* Set and reset dropdown animations based on screen size */
		if(typeof matchMedia == 'function') {
			var mq = window.matchMedia('(max-width: ' + maxWidth + ')');
			mq.addListener(widthChange);
			widthChange(mq);
		}
		function widthChange(mq) {
			
			if (mq.matches) {
		
				/* Reset desktop navigation menu dropdown animation on smaller screens */
				$menu.find('ul').css({display: 'block'});
				$menu.find('li ul').css({visibility: 'visible', display: 'block'});
				$menu.find('li').unbind('mouseenter mouseleave');


				$menu.find('li.menu-item-has-children ul').each( function () {
					$( this ).hide();
					$(this).parent().find('.submenu-dropdown-toggle').removeClass('active');
				} );
				
			} else {
				
				/* Add dropdown animation for desktop navigation menu */
				$menu.find('ul').css({display: 'none'});
				$menu.find('li').hover(function(){
					$(this).find('ul:first').css({visibility: 'visible',display: 'none'}).slideDown(300);
				},function(){
					$(this).find('ul:first').css({visibility: 'hidden'});
				});
				
			}
			
		}
		
		
		/********************
		* Mobile Navigation *
		*********************/	
		
		/* Add Menu Toggle Button for mobile navigation */
		$this.before('<div id=\"mainnav-mobile-menu\"><button id=\"' + toggleID + '\" class=\"' + toggleClass
			+ '\">' + '<img src=\"' + toggleImg + '\" width=\"146px\" height="\40px\">' + '</button></div>');

		/* Add dropdown toggle for submenus on mobile navigation */
		$menu.find('li.menu-item-has-children').prepend('<span class=\"submenu-dropdown-toggle\"></span>');
		
		/* Add dropdown slide animation for mobile devices */
		$('#' + toggleID).on('click', function(){
			$menu.slideToggle();
			$(this).toggleClass('active');
		});
		
		/* Add dropdown animation for submenus on mobile navigation */
		$menu.find('li.menu-item-has-children ul').each( function () {
			$( this ).hide();
		} );
		$menu.find('.submenu-dropdown-toggle').on('click', function(){
			$(this).parent().find('ul:first').slideToggle();
			$(this).toggleClass('active');
		});

	};
	
	
	/**--------------------------------------------------------------
	# Setup Navigation Menus
	--------------------------------------------------------------*/
	$( document ).ready( function() {
		/* Setup Main Navigation */

		$("#mainnav").responsiveMenu({
			menuID: "mainnav",
			toggleID: "mainnav-toggle",
			toggleClass: "nav-toggle",
			toggleImg: themename.templateUrl + "./assets/img/navigation/Logo.png",
			maxWidth: "991px"
		});
		
	} );

}(jQuery));