jQuery(function ($) {

	$('body').on('click', '.kodex_buttons .kodex_button', function (e) {
		e.preventDefault();

		var button = $(this);
		var wrapper = button.parents('.kodex_buttons');
		var post_id = button.attr('data-id');
		var btn_action = button.attr('data-action');
		var nonce = wrapper.find('input[name="nonce"]').val();

		button.addClass('kodex_button_loading');
		var xhr = $.ajax({
			url: kodex_posts_likes.ajaxurl,
			method: 'post',
			dataType: 'json',
			data: {
				action: 'kodex_posts_likes_ajax',
				post_id: post_id,
				nonce: nonce,
				btn_action: btn_action
			},
			success: function (response) {
				button.removeClass('kodex_button_loading');

				if (!response.success || response.data.nonce_error) {
					return;
				}

				var like_button = wrapper.find('.kodex_like_button');
				var dislike_button = wrapper.find('.kodex_dislike_button');
				var active_class = 'kodex_button_active';
				var hide_0_class = 'counter_hide_0';

				like_button.toggleClass(active_class, response.data.liked);
				dislike_button.toggleClass(active_class, response.data.disliked);

				var like_counter = like_button.find('.counter');
				if (like_counter.length) {
					var likes = response.data.likes;
					if (like_counter.hasClass(hide_0_class) && likes == 0) {
						likes = '';
					}
					like_counter.text(likes);
				}

				var dislike_counter = dislike_button.find('.counter');
				if (dislike_counter.length) {
					var dislikes = response.data.dislikes;
					if (dislike_counter.hasClass(hide_0_class) && dislikes == 0) {
						dislikes = '';
					}
					dislike_counter.text(dislikes);
				}
			}
		});
	});

});
