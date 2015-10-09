'use strict';

$(function() {
	// 2. This code loads the IFrame Player API code asynchronously.
    var tag = document.createElement('script');

    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    // 3. This function creates an <iframe> (and YouTube player)
	//    after the API code downloads.
	var player;


    $('#toTop').on('click', function(e) {
        console.log('go to top!');
        $('html, body').animate({
            scrollTop: $('body').offset().top
        }, 500);

        e.preventDefault();
    });

    $('.popup-trial').magnificPopup({
        type: 'inline',

        fixedContentPos: true,
        fixedBgPos: true,

        overflowY: 'auto',

        closeBtnInside: true,
        preloader: false,

        midClick: true,
        removalDelay: 300,
        mainClass: 'my-mfp-zoom-in',
        callbacks: {
            open: function() {
                

                function onYouTubeIframeAPIReady() {
                	console.log('2');
                    player = new YT.Player('playerTrial', {
                        height: '390',
                        width: '640',
                        videoId: 'M7lc1UVf-VE',
                        events: {
                            'onReady': onPlayerReady,
                            'onStateChange': onPlayerStateChange
                        }
                    });
                }

                onYouTubeIframeAPIReady();

                // 4. The API will call this function when the video player is ready.
                function onPlayerReady(event) {
                    event.target.playVideo();
                }

                // 5. The API calls this function when the player's state changes.
                //    The function indicates that when playing a video (state=1),
                //    the player should play for six seconds and then stop.
                var done = false;

                function onPlayerStateChange(event) {
                    if (event.data == YT.PlayerState.PLAYING && !done) {
                        setTimeout(stopVideo, 6000);
                        done = true;
                    }
                    if(event.data === YT.PlayerState.ENDED){
				        // the video is end, do something here.
				        localStorage.setItem('IsVideoEnded', 'true');
				    }
                }

                function stopVideo() {
                    player.stopVideo();
                }


            }
        }
    });

	if ($('body').hasClass('pg-home')) {
		console.log('1')
		$('.btn-is-faq').on('click', function() {
			console.log('2');
			localStorage.setItem('IsFaq', 'true');
		});
	}


	if ($('body').hasClass('pg-proximos-passos')) {
		
		if (localStorage.getItem('IsVideoEnded')) {
			$('.is-video-ended').each(function() { $(this).show(); });
			$('.is-video-not-ended').each(function() { $(this).hide(); });
		} else {
			$('.is-video-ended').each(function() { $(this).hide(); });
			$('.is-video-not-ended').each(function() { $(this).show(); });
		}

		if (localStorage.getItem('IsFaq') == 'true') {
			console.log('3');
			$('html, body').animate({
	            scrollTop: $('.help-faq').offset().top
	        }, 500, function() {
	        	localStorage.setItem('IsFaq', 'false');
	        });

		}

		$('.accordion').accordion({
		    "transitionSpeed": 400
		});
	}
});
