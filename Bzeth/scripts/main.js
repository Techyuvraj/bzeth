/**
 * Main Entry Point
 * Initializes all modules after RequireJS and jQuery are loaded
 */

require(['require-config'], function() {
    require(['jquery', 'modules/nav', 'modules/accordion', 'modules/modal', 'modules/forms'], 
        function($, Nav, Accordion, Modal, Forms) {
            'use strict';

            // Initialize modules when DOM is ready
            $(document).ready(function() {
                // Initialize navigation
                var nav = new Nav();
                nav.init();

                // Initialize accordion
                var accordion = new Accordion();
                accordion.init();

                // Initialize modal
                var modal = new Modal();
                modal.init();

                // Initialize forms
                var forms = new Forms();
                forms.init();

                // Smooth scroll for anchor links
                $('a[href^="#"]').on('click', function(e) {
                    var target = $(this.getAttribute('href'));
                    if (target.length) {
                        e.preventDefault();
                        $('html, body').animate({
                            scrollTop: target.offset().top - 80
                        }, 600);
                    }
                });

                // Parallax effect for hero image (subtle)
                if (window.innerWidth > 768) {
                    $(window).on('scroll', function() {
                        var scrolled = $(window).scrollTop();
                        var parallax = $('.banner__image');
                        if (parallax.length) {
                            var speed = scrolled * 0.3;
                            parallax.css('transform', 'translateY(' + speed + 'px)');
                        }
                    });
                }

                // Lazy load images (native lazy loading with fallback)
                if ('loading' in HTMLImageElement.prototype) {
                    // Browser supports native lazy loading
                    var images = document.querySelectorAll('img[loading="lazy"]');
                    images.forEach(function(img) {
                        img.src = img.dataset.src || img.src;
                    });
                } else {
                    // Fallback for browsers that don't support lazy loading
                    var script = document.createElement('script');
                    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
                    document.body.appendChild(script);
                }
            });
        }
    );
});

