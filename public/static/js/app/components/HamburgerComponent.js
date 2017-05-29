define([
	'app/components/BaseComponent',
	//'underscore'
	], function(BaseComponent){

		return BaseComponent.extend({

			el: '.navigation',

			ui : {
				panel : '.navigation-panel',
                strokes : '.burger-line',
				links : '.nav-listitem a',

			},

			events : {
				'click .menu-button' : 'handleClick',
				'click .nav-listitem' : 'goToPage'
			},

			onInitialize : function(props) {
				_.bindAll(this, "handleRouteChange");

				props.router.on("route", this.handleRouteChange);
			},


			initialized : function() {
				this.el.style.display = "block";
				TweenMax.staggerFrom(this.ui.strokes, .4, {
				    x : 25,
                    clearProps:"all"
                }, .2);
			},

			handleRouteChange : function(route) {

				var slug = route == 'case' ? '/cases' : route == 'home' ? '/' : '/' + route;

				_.each(this.ui.links, function(value, index){
					if(value.getAttribute('data-href') == slug) {
						value.classList.add('selected');
					} else {
						value.classList.remove('selected');
					}
				}.bind(this));


				/**
				 * get the url
				 * find link assosiated with
				 * add strikeTrough
				 */
			},


			handleClick : function() {
				if(!this.clicked) {
					this.clicked = true;
					this.togglePanel();
                }
			},

			togglePanel : function() {
				if(this.isOpen) {

					TweenMax.to($('#application'), .7, {
						x : "0%"
					});

					TweenMax.to(this.ui.panel, .7, {
						x:'100%',
						onComplete:function() {
							this.isOpen = false;
							this.clicked = false;
						}.bind(this)
					});

                    TweenMax.staggerTo([].slice.call(this.ui.strokes).reverse(), .2, {
                        x : 0
                    }, .1);


				} else {
                    TweenMax.staggerTo(this.ui.strokes, .2, {
                        x : -25
                    }, .1);

					TweenMax.to($('#application'), .7, {
						x : "-40%"
					});

					TweenMax.to(this.ui.panel, .7, {
						x:'0%',
						ease:Power1.easeOut,
						onComplete:function() {
							this.isOpen = true;
							this.clicked = false;
						}.bind(this)
					});
				}
			},

			goToPage : function(e) {
				e.preventDefault();
				var target = e.currentTarget;
				slug = $(target).find('.nav-link')[0].getAttribute('data-href');

				if(slug == location.pathname) {
					this.togglePanel();
					return;
				}

				TweenMax.set($('#application'), {
					x : "0%"
				});

				app.router.navigate(slug, {trigger: true});

				TweenMax.set(this.ui.panel, {
					x:'100%'
				});

                TweenMax.staggerTo([].slice.call(this.ui.strokes).reverse(), .2, {
                    x : 0
                }, .1);

				this.currentSlug = slug;
				this.isOpen = false;
				this.clicked = false;
			},

			hide : function() {
				this.clicked = true;

				TweenMax.set(this.ui.strokes, {
                    x : 25
                });
			},

			show : function() {
				this.clicked = false;

				TweenMax.staggerTo(this.ui.strokes, .4, {
                    x : 0,
                    clearProps:"all"
                }, .2);
			}
		});
	});