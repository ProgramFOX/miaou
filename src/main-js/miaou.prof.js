// functions related to user profile displaying on hover

miaou(function(prof){
	prof.shownow = function(){
		if ($('.dialog').length) return;
		// code in this function is a little messy, partly because it's used in many contexts
		var $user = $(this).closest('.user'),
			$message = $user.closest('.message,.notification,.userLine,.access_request'),
			up = ($message.length ? $message : $user).position(),
			uh = $user.height(), uw = $user.width(),
			$scroller = $user.closest('#message-scroller,#auths-page,#left'), ss = $scroller.scrollTop(), sh = $scroller.height(),
			$container = $user.closest('#messages,#auths-page,body').first(), ch = $container.height();
		var $p = $('<div>').addClass('profile').text('loading profile...'), css={};
		if (up.top-ss<sh/2) css.top = up.top+1;
		else css.bottom = ch-up.top-uh-3;
		css.left = up.left + uw + 5;
		if ($message.hasClass('access_request')) {
			css.left += 3; css.bottom -= 6;
		} else if ($message.hasClass('notification')) {
			css.left += 5; css.bottom -= 10;
		} else if (!$message.hasClass('message')) {
			css.left += 5; css.bottom -= 7;
		}
		var userId, data;
		if ( (data = $user.data('user')) || (data = $message.data('user')) || (data = $user.closest('.notification').data('user')) ) userId = data.id;
		else userId = $message.data('message').author;
		$p.load('publicProfile?user='+userId+'&room='+room.id);		
		$p.css(css).appendTo($container);
		$user.addClass('profiled');
	};
	
	// used in chat.jade, chat.mob.jade and auths.jade
	prof.show = function(){
		prof.hide();
		miaou.profileTimer = setTimeout(prof.shownow.bind(this), miaou.chat.DELAY_BEFORE_PROFILE_POPUP);
	};
	
	prof.hide = function(){
		clearTimeout(miaou.profileTimer);
		$('.profile').remove();
		$('.user').removeClass('profiled');
	};
	
	prof.toggle = function(){
		prof[$('.profile').length ? 'hide' : 'show'].call(this);
	};
});
