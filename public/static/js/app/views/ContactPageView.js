define([
    'underscore',
    'app/views/BaseView',
    'app/components/FadeInComponent',
    'app/modules/ScrollToModule'
], function(_, BaseView, FadeInComponent, ScrollToModule) {

    return  BaseView.extend({
        id : 'contactpage',

        templateName: '#contactpage',

        events : {
            'click .button-submit' : 'handleSubmitButtonClick',
            'click .section-header' : 'interact',
            'focus .form-field' : 'handleFormInteraction',
            'blur .form-field' : 'handleFormInteraction'
        },

        ui : {
            formFields : '.form-field'
        },

        components : {
            fader : {
                module : FadeInComponent,
                el: 'this'
            },
            scrollTo : {
                module : ScrollToModule,
                el : '.scroll-to'
            }
        },

        types : {
            'email' : 'mail',
            'textarea' : 'message'
        },

        handleFormInteraction : function(e) {
            var target = e.currentTarget;
            var container = target.parentNode;

            if(e.type == 'focusin') {
                container.classList.remove('error');
                container.classList.add('focus');
            } else if (e.type == 'focusout') {
                container.classList.remove('focus');
            }
        },

        handleSubmitButtonClick : function(e) {
            e.preventDefault();

            if(this.validateForm()) {
                console.log("send form");
            }
        },

        submitForm : function() {

        },

        validateForm : function() {
            var isValid = true, input = {}, inputField, type, container, value;

            for (var i = 0; i < this.ui.formFields.length; i++) {
                inputField = this.ui.formFields[i];
                type = inputField.type;
                value = inputField.value.trim();
                container = inputField.parentNode;

                if(value == "" || (type == 'email' && !this.isValidEmail(value))) {
                    container.classList.add('error');
                    isValid = false;
                } else {
                    input[this.types[type]] = value;
                    container.classList.remove('error');
                }
            }

            if(isValid) {
                this.input = input;
            }

            return isValid;
        },

        isValidEmail : function(address) {
            var regEx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            return regEx.test(address);
        },
        interact : function(){
            if(this.isInteracting) return;

            this.isInteracting = true;

            this.components.scrollTo.interact(function(){
                this.isInteracting = false;
            }.bind(this));
        }

    });

});