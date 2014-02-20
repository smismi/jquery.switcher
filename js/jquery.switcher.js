$.fn.switcher = function(options) {
	var settings = $.extend({
		delay: 300,
		autoswitch:     false,
		saveposition:   false,
		buttonTitle:   { toOpen: "+", toClose: "-"},
		beforeOpen:     false,
		afterOpen:      false,
		beforeClose:    false,
		afterClose:     false,
		onSuccess:      false,
		onComplete:     false
	}, options);

	return this.each(function() {
		var prefix = settings.prefix,
			delay = settings.delay,
			autoswitch = settings.autoswitch,
			saveposition = settings.saveposition,
			buttonTitle = settings.buttonTitle,
			beforeOpen = settings.beforeOpen,
			afterOpen = settings.afterOpen,
			beforeClose = settings.beforeClose,
			afterClose = settings.afterClose,
			onSuccess = settings.onSuccess,
			onComplete = settings.onComplete,
			block = $(this),
			button = block.find('.' + prefix + '_expand'),
			header = block.find('.' + prefix + '_header'),
			content = block.find('.' + prefix + '_content');


		button.on("click", function() {
			if (saveposition && !block.hasClass(prefix + '_saved') ) {
				block.addClass(prefix + '_saved');
				saveState(prefix, "opened");
				return false;
			}
			if ( content.filter(':visible').length > 0) {

				if (beforeClose) {
					beforeClose();
				}

				content.slideUp(delay, function() {
					block.addClass(prefix + '_closed').removeClass(prefix + '_opened');
					$(this).css('display','');

					if (afterClose) {
						afterClose();
					}
					if (onComplete) {
						onComplete();
					}
				});

				if (saveposition) saveState(prefix, "");

				button.html(buttonTitle.toOpen);

			} else {

				if (beforeOpen) {
					beforeOpen();
				}


				content.slideDown(delay, function() {
					block.removeClass(prefix + '_closed').addClass(prefix + '_opened');
					$(this).css('display','');

					if (afterOpen) {
						afterOpen();
					}

					if (onComplete) {
						onComplete();
					}
				});

				if (saveposition) saveState(prefix, "opened");

				button.html(buttonTitle.toClose);

			}

			// if state change by user autoswitch off

			if (autoswitch) {
				header.off("mouseenter");
			}
			if (onSuccess) {
				onSuccess();
			}
			return false;
		});


//		if option mouseenter switch
		if (autoswitch) {
			header.on("mouseenter", function() {
				if( block.hasClass(prefix + '_closed') && !block.hasClass(prefix + '_saved') ) {

					if (beforeOpen) {
						beforeOpen();
					}

					content.slideDown(delay, function() {
						block.removeClass(prefix + '_closed').addClass(prefix + '_opened');
						$(this).css('display','');


						if (afterOpen) {
							afterOpen();
						}

					});
				}
			});
		}




	});

	//		save state in   js-store

	function saveState (block, state){
		console.log('saveState');
//		$.post('/services/js_store', {
//			action:"save",
//			"data":'{"switch":{"'+ block +'":"'+ state +'"}}'
//		});
	}

};
