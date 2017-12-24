define([
    'vendor/SmoothWheel'
], function(VirtualScroll){
    'use strict';

    return (function(){

        var section = '';
        var sectionHeight = 0;
        var ease = .07;
        var disabled = true;
        var elementHeight = 0;
        
        // Store current scroll position
        var targetX = 0, targetY = 0;
        var currentX = 0, currentY = 0;

        var enable = function(element) {
            disable();
            VirtualScroll.on(calculate);
            document.addEventListener('touchmove', function(e) { e.preventDefault(); });

            section = (typeof element === "string") ? document.querySelector(element) : element;
            window.addEventListener('resize', calculateHeight);
            calculateHeight();

            disabled = false;

            scroll();
        };

        var calculateHeight = function(e) {
            console.log('ad');
            elementHeight = section.getBoundingClientRect().height;
            sectionHeight = elementHeight - window.innerHeight;
        };

        var calculate = function(e) {
            if(elementHeight === 0) {
                calculateHeight();
            }
            // Accumulate delta value on each scroll event
            targetY += e.deltaY;

            // Clamp the value so it doesn't go too far up or down
            // The value needs to be between 0 and -sectionHeight
            targetY = Math.max(-sectionHeight, targetY);
            targetY = Math.min(0, targetY);

        };

        var scroll = function() {
            if(disabled) return;
    
            // Make sure this works across different browsers (use the shim or something)
            requestAnimationFrame(scroll);

            // Get closer to the target value at each frame, using ease. 
            // Other easing methods are also ok.
            currentY += (targetY - currentY) * ease;

            // Create the CSS transform string
            // (alternativly: use WebKitCSSMatrix, though it doesn't see any faster (http://jsperf.com/webkitcssmatrix-vs-translate3d)
            var v1 = "translateX(" + currentX + "px) translateY(" + currentY + "px)";// translateZ(0)";
            var v2 = "translateX(" + currentX + "px) translateY(" + currentY + "px)";// translateZ(0)";

            // Apply CSS style
            section.style['webkitTransform'] = v1;
            section.style['msTransform'] = v1;
            section.style.transform = v1;
        }


        var disable = function(element) {
            
            window.removeEventListener('resize', calculateHeight);
            VirtualScroll.off(calculate);
            disabled = true;
            sectionHeight = elementHeight = 0;
        };


                //
        return {
            on: enable,
            off: disable
        };
       
    })();

});