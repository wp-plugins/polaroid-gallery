
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

function init() {
	var $ = jQuery.noConflict(),
		zIndex = 1000,
		imagesCount = $('.polaroid-gallery a.polaroid-gallery-item').size(),
		imageStr = (typeof(polaroid_gallery) !== 'undefined' ) ? polaroid_gallery.text2image : 'Image',
		thumbsOption = (typeof(polaroid_gallery) !== 'undefined' ) ? polaroid_gallery.thumbnail : 'none',
		imagesOption = (typeof(polaroid_gallery) !== 'undefined' ) ? polaroid_gallery.image : 'title3';
	
	$(".polaroid-gallery a.polaroid-gallery-item").each(function(currentIndex) {
		zIndex++;
		var width = $(this).width(),
			text = jQuery.trim($("img", this).attr('alt')),
			randNum = $.randomBetween(-12, 12),
			randDeg = 'rotate(' + randNum + 'deg)',
			ieFilter = $.ieRotateFilter(randNum);
		
		switch (thumbsOption) {
			case 'none':
				text = '';
				break;
			case 'image1':
				text = imageStr +'&nbsp; '+ (currentIndex + 1);
				break;
			case 'image2':
				text = imageStr +'&nbsp; '+ (currentIndex + 1) +' / '+ imagesCount;
				break;
			case 'number1':
				text = (currentIndex + 1);
				break;
			case 'number2':
				text = (currentIndex + 1) +' / '+ imagesCount;
				break;
		}
		
		if(text == '') {
			text = 	'&nbsp;';
		}
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
			var text = '';
			switch (imagesOption) {
				case 'title1':
					text = title;
					break;
				case 'title2':
					text = (currentIndex + 1) + ' &nbsp; ' + title
					break;
				case 'title3':
					text = (currentIndex + 1) + ' / ' + currentArray.length + ' &nbsp; ' + title;
					break;
				case 'title4':
					text = imageStr + ' ' + (currentIndex + 1) + ' &nbsp; ' + title
					break;
				case 'title5':
					text = imageStr + ' ' + (currentIndex + 1) + ' / ' + currentArray.length + ' &nbsp; ' + title;
					break;
				case 'image1':
					text = imageStr + ' ' + (currentIndex + 1);
					break;
				case 'image2':
					text = imageStr + ' ' + (currentIndex + 1) + ' / ' + currentArray.length;
					break;
				case 'number1':
					text = (currentIndex + 1);
					break;
				case 'number2':
					text = (currentIndex + 1) + ' / ' + currentArray.length;
					break;
			}
			if(jQuery.trim(text) == '') {
				text = 	'&nbsp;';
			}
			return '<span id="fancybox-title-over">' + text + '</span>';
		}
	});
}

// For Safari due to Safari is unable to get width and height of image/element
if(jQuery.browser.webkit) {
	jQuery(window).load(function() {
		init();
	});
} else {
	jQuery(document).ready(function() {
		init();
	});
}
