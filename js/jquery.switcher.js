$.fn.switcher = function(options) {
	var settings = $.extend({
		delay: 300
	}, options);

	return this.each(function() {
		var prefix = settings.prefix,
			delay = settings.delay,
			block = $(this),
			button = block.find('.' + prefix + '_expand'),
			content = block.find('.' + prefix + '_content');


		button.on("click", function() {
			if (!block.hasClass(prefix + '_saved') ) {
				block.addClass(prefix + '_saved');
				return false;
			}
			if ( content.filter(':visible').length > 0) {

				content.slideUp(delay, function() {
					block.addClass(prefix + '_closed').removeClass(prefix + '_opened');
					$(this).css('display','');

				});

			} else {

				content.slideDown(delay, function() {
					block.removeClass(prefix + '_closed').addClass(prefix + '_opened');
					$(this).css('display','');

				});
 			}

			return false;
		});

	});
};
