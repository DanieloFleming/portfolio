define([
	'backbone',
	'underscore'
	], function(Backbone){

		return Backbone.View.extend({

			el: '.navigation-menu',

			ui : {
				navList : '.navigation-list',
				navListItem : '.navigation-list-item',
				navLinks : '.navigation-link'
			},

			initialize : function() {
				_.bindAll(this, 'addUiElement', 'handleShowAnimation', 'setupNavigation');

				this.setUI();

				this.addEventListeners();

				this.activate();
			},

			setUI : function() {
				_.each(this.ui, this.addUiElement);
			},

			addUiElement : function(value, key) {
				this.ui[key] = document.querySelectorAll(value);
			},

			addEventListeners : function() {
				$(this.ui.navLinks).on('click', this.handleClick);
			},

			handleClick : function(e) {
				e.preventDefault();
				var slug = e.currentTarget.getAttribute('href');

				app.router.navigate(slug, {trigger: true});
			},

			show : function() {
				TweenMax.delayedCall(1.1, this.handleShowAnimation);

			}, 

			handleShowAnimation : function() {
				TweenMax.to(this.el, 1.4, {
					opacity:1, 
					display: 'block',
					y: '0%',
        			ease:Power4.easeOut,
        			onComplete : function() {
        				TweenMax.to(this.el, .7,  {
        					boxShadow : '0px 0px 10px'
        				});

        				this.clickable = true;
        			}.bind(this)
				});

				TweenMax.staggerTo(this.ui.navLinks, .4, {
					opacity:1,
        			y: '0px'
        		}, .3);
			},

			hide : function() {
				this.clickable = false;

				TweenMax.staggerTo(this.ui.navLinks, .3, {
					opacity:0,
        			y: '-20px'
        		}, .1, function() {
        			TweenMax.to(this.el, .3, {
						y : "-60px",
						opacity:0,
						onComplete : this.setupNavigation
					});
        		}.bind(this));

			},

			setupNavigation : function() {
				TweenMax.set(this.el, {y : '-100%', opacity:0, display:'none'});
				TweenMax.set(this.ui.navLinks, {
					opacity : 0,
					y : '-20px'
				});
			},

			activate: function() {
				this.setupNavigation();
				this.show();
			}
		})
	});