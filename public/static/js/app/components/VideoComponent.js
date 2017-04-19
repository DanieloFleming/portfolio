define([
	'backbone',
	'underscore'
], function(Backbone, _) {

	return Backbone.View.extend({
		template :'<div class="posterframe"><div class="play-button"></div><div class="video-loader"><span class="loadbar"></span></div></div>',
		
		events : {
			'click video' : 'handleClick',
			'ended video' : 'reset'
		},

		initialize : function() {
			_.bindAll(this, 'startPreLoader', 'hideOverlay', 'reset', 'handleClick', 'pauseVideo');

			this.firstTime = true;
			this.isPlaying = false;
			this.isAnimating = false;

			this.$el.append(this.template);

			this.loader = this.el.querySelector('.video-loader');
			this.loadBar = this.el.querySelector('.loadbar');

			this.video = this.el.querySelector('video');
			this.video.style.opacity = 0;
			this.video.volume = 0;

			this.createPoster();

			this.video.addEventListener('ended', this.reset);
			this.video.addEventListener('pause', this.pauseVideo);
		},

		createPoster : function() {
			var posterframe = this.el.querySelector('.posterframe');
			var poster = this.video.getAttribute('poster');

			posterframe.style.backgroundImage = "url('" + poster + "')";
		},

		handleClick : function() {
			if(this.isAnimating) return;

			if(this.isPlaying) {
				this.pauseVideo();
			} else {
				this.startVideo();
			}

			this.isPlaying = !this.isPlaying;
			this.isAnimating = true;
		},

		startVideo : function() {
			this.el.classList.add('clicked');

			if(this.firstTime) {
				this.video.play();
				this.video.pause();
				this.firstTime = false;
				TweenMax.to(this.loader, .2, {
					opacity:1
				});

				TweenMax.delayedCall(.5, this.startPreLoader);
			}

			else {
				this.hideOverlay();
			}
		},

		startPreLoader : function() {
			TweenMax.fromTo(this.loadBar, 1, 
				{x:-100}, 
				{x:0, onComplete: this.hideOverlay}
			);
		},

		hideOverlay : function() {
			this.loadBar.setAttribute('style', '');
			this.loader.setAttribute('style', '');

			this.playVideo();

			TweenMax.to(this.video, .5, {
				opacity:1,
				onComplete: function() {
					this.isAnimating = false;
				}.bind(this)
			});
		},

		playVideo : function() {
			this.video.play();
			
			TweenMax.to(this.video, 1, {
				volume:1
			});
		},

		pauseVideo : function() {
			if(this.isAnimating || this.video == null) return;

			this.el.classList.remove('clicked');
			TweenMax.to(this.video, .5, {
				volume:0,
				opacity:0,
				onComplete:function(){
					this.video.pause();
					this.isAnimating = false;
				}.bind(this)
			});
		},

		reset : function() {
			this.firstTime = true;
			this.isPlaying = false;
			this.pauseVideo();
			this.video.currentTime = 0;
		},

		close : function() {
			this.video.removeEventListener('ended', this.reset);
			this.video.removeEventListener('pause', this.handleClick);
			this.loader = this.loadBar = this.video = null;

            this.unbind();
            this.remove();
		}
	});

});