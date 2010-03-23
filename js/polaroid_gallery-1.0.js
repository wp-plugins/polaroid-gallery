
jQuery.extend({
	// find a random number between 0 and int
	random: function(X) {
		return Math.floor(X * (Math.random() % 1));
	},
	// find a random number between minValue and maxValue
	randomBetween: function(MinV, MaxV) {
		return MinV + jQuery.random(MaxV - MinV + 1);
	},
	// rotate filter for IE
	ieRotateFilter: function(deg) {
		deg = (deg < 0) ? 360 + deg : deg;
		var deg2radians = Math.PI * 2 / 360,
			nAngle = deg * deg2radians,
			nCos = Math.cos(nAngle).toFixed(3),
			nSin = Math.sin(nAngle).toFixed(3);
		
		return "progid:DXImageTransform.Microsoft.Matrix(sizingMethod='auto expand', M11=" + nCos + ", M12=" + (-nSin) + ", M21=" + nSin + ", M22=" + nCos + ")";
	}
});

function init(name) {
	var $ = name,
		zIndex = 1000,
		imageCount = 0,
		imageStr = (typeof(polaroid_gallery_image_str) !== 'undefined' ) ? polaroid_gallery_image_str : 'Image';
		
	$(".polaroid-gallery a.polaroid-gallery-item").each(function() {
		zIndex++;
		imageCount++;
		var width = $(this).width(),
			text = jQuery.trim($("img", this).attr('alt')),
			randNum = $.randomBetween(-12, 12),
			randDeg = 'rotate(' + randNum + 'deg)',
			ieFilter = $.ieRotateFilter(randNum);
		
		text = (text == '') ? 'Image ' + imageCount : text;	
		
		var cssObj = {
			'z-index' : zIndex,
			'box-shadow' : '0px 2px 15px #333',
			'-webkit-box-shadow' : '0px 2px 15px #333',
			'-moz-box-shadow' : '0px 2px 15px #333',
			'-webkit-transform' : randDeg,
			'-moz-transform' : randDeg,
			'-o-transform' : randDeg,
			'filter' : ieFilter,
			'-ms-filter' : '"'+ ieFilter +'"'
		};
		var cssHoverObj = {
			'z-index' : '1098',
			'box-shadow' : '3px 5px 15px #333',
			'-webkit-box-shadow' : '3px 5px 15px #333',
			'-moz-box-shadow' : '3px 5px 15px #333',
			'-webkit-transform' : 'scale(1.1) '+randDeg,
			'-moz-transform' : 'scale(1.1) '+randDeg,
			'-o-transform' : 'scale(1.1) '+randDeg,
			'filter' : ieFilter,
			'-ms-filter' : '"'+ ieFilter +'"'
		};
		$("img", this).after('<span>'+text+'</span>');
		$("span", this).width(width);
		$(this).css(cssObj);
		$(this).hover(function () {
			$(this).css(cssHoverObj);
		}, function () {
			$(this).css(cssObj);
		});			
	});
	
	$(".polaroid-gallery").css('visibility', 'visible');
	
	$(".polaroid-gallery a.polaroid-gallery-item").fancybox({
		'padding'			: 20,
		'margin'			: 40,
		'transitionIn'		: 'elastic',
		'transitionOut'		: 'elastic',
		'titlePosition'		: 'inside',
		'titleFormat'		: function(title, currentArray, currentIndex, currentOpts) {
			return '<span id="fancybox-title-over">' + imageStr + ' ' + (currentIndex + 1) + ' / ' + currentArray.length + (title.length ? ' &nbsp; ' + title : '') + '</span>';
		}
	});
}

// For Safari due to Safari is unable to get width and height of image/element
if(jQuery.browser.webkit) {
	jQuery(window).load(function($) {
		init($);
	});
} else {
	jQuery(document).ready(function($) {
		init($);
	});
}
