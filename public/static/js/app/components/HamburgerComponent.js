define([
	'backbone',
	'underscore'
	], function(Backbone){

		return Backbone.View.extend({

			el: '.navigation',

			ui : {
				panel : '.navigation-panel'
			},

			events : {
				'click .navigation-burger' : 'handleClick',
				'click .nav-listitem' : 'goToPage',
				//'click .nav-link' : 'preventDefault'
			},

			initialize : function() {
				TweenMax.to(this.el, .4, {
					display:'block',
					opacity:1
				});
				_.bindAll(this, 'addUiElement');
				this.setUI();
			},

			handleClick : function(e) {
				if(this.clicked) return;

				this.clicked = true;
				this.togglePanel();
			},

			togglePanel : function() {
				if(this.isOpen) {
					TweenMax.to($('#application'), .7, {
						x : "0%"
					});
					TweenMax.to(this.ui.panel, .7, {
						display:'none',
						x:'100%',
						onComplete:function() {
							this.isOpen = false;
							this.clicked = false;
						}.bind(this)
					})
				} else {
					TweenMax.to($('#application'), .7, {
						x : "-40%"
					});
					TweenMax.to(this.ui.panel, .7, {
						x:'0%',
						display : 'block',
						onComplete:function() {
							this.isOpen = true;
							this.clicked = false;
						}.bind(this)
					})
				}
			},

			goToPage : function(e) {
				e.preventDefault();
				var target = e.currentTarget;
				slug = $(target).find('.nav-link')[0].dataset.href;

				if(slug == location.pathname) {
					this.togglePanel();
					return;
				}

				TweenMax.set($('#application'), {
					x : "0%"
				});

				app.router.navigate(slug, {trigger: true});

				TweenMax.set(this.ui.panel, {
					x:'100%',
					display:'none'
				});


				this.currentSlug = slug;
				this.isOpen = false;
				this.clicked = false;
			},

			preventDefault : function(e) {
				console.log('ali');
				e.preventDefault();
			},

			setUI : function() {
				_.each(this.ui, this.addUiElement);
			},

			addUiElement : function(value, key) {
				this.ui[key] = document.querySelectorAll(value);
			},

			hide : function() {
				//return;
				this.clicked = true;

				TweenMax.set(this.el, {
					opacity:0, display: 'none'
				})
			},

			show : function() {
				//return;
				this.clicked = false;

				TweenMax.to(this.el, .4, {
					opacity:1, 
					display: 'block'
				});
			}
		});
	});