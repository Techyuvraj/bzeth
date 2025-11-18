/**
 * Accordion Module
 * Handles accessible accordion functionality with keyboard navigation
 */

define(['jquery'], function($) {
    'use strict';

    function Accordion() {
        this.accordion = null;
        this.headers = null;
        this.panels = null;
    }

    Accordion.prototype.init = function() {
        this.accordion = $('.accordion');
        
        if (!this.accordion.length) {
            return;
        }

        this.headers = this.accordion.find('.accordion__header');
        this.panels = this.accordion.find('.accordion__panel');

        this.bindEvents();
    };

    Accordion.prototype.bindEvents = function() {
        var self = this;

        // Click handler
        this.headers.on('click', function(e) {
            e.preventDefault();
            self.togglePanel($(this));
        });

        // Keyboard navigation
        this.headers.on('keydown', function(e) {
            var $header = $(this);
            var $headers = self.headers;
            var currentIndex = $headers.index($header);
            var key = e.which || e.keyCode;

            switch(key) {
                case 13: // Enter
                case 32: // Space
                    e.preventDefault();
                    self.togglePanel($header);
                    break;
                case 38: // Up arrow
                    e.preventDefault();
                    var prevIndex = currentIndex > 0 ? currentIndex - 1 : $headers.length - 1;
                    $headers.eq(prevIndex).focus();
                    break;
                case 40: // Down arrow
                    e.preventDefault();
                    var nextIndex = currentIndex < $headers.length - 1 ? currentIndex + 1 : 0;
                    $headers.eq(nextIndex).focus();
                    break;
                case 35: // End
                    e.preventDefault();
                    $headers.last().focus();
                    break;
                case 36: // Home
                    e.preventDefault();
                    $headers.first().focus();
                    break;
            }
        });
    };

    Accordion.prototype.togglePanel = function($header) {
        var $panel = $($header.attr('aria-controls'));
        var isExpanded = $header.attr('aria-expanded') === 'true';

        if (isExpanded) {
            this.closePanel($header, $panel);
        } else {
            this.openPanel($header, $panel);
        }
    };

    Accordion.prototype.openPanel = function($header, $panel) {
        // Close other panels if needed (optional - remove if you want multiple open)
        // this.closeAllPanels();

        // Remove hidden attribute first to allow rendering
        $panel.removeAttr('hidden');
        
        // Set attributes
        $header.attr('aria-expanded', 'true');
        $panel.attr('aria-hidden', 'false');
        
        // Temporarily make it visible and remove max-height constraint to measure
        $panel.css({
            'visibility': 'visible',
            'max-height': 'none',
            'display': 'block'
        });
        
        // Get the actual height
        var height = $panel[0].scrollHeight;
        
        // Reset to 0 and then animate to the measured height
        $panel.css('max-height', '0');
        
        // Use requestAnimationFrame to ensure the reset is applied before animating
        var self = this;
        requestAnimationFrame(function() {
            if (height > 0) {
                $panel.css('max-height', height + 'px');
            } else {
                // Fallback
                $panel.css('max-height', '5000px');
            }
        });
    };

    Accordion.prototype.closePanel = function($header, $panel) {
        $header.attr('aria-expanded', 'false');
        $panel.attr('aria-hidden', 'true');
        $panel.css('max-height', '0');
        
        // Add hidden attribute after transition completes for accessibility
        var self = this;
        setTimeout(function() {
            if ($panel.attr('aria-hidden') === 'true') {
                $panel.attr('hidden', 'hidden');
            }
        }, 350); // Match transition duration (300ms + buffer)
    };

    Accordion.prototype.closeAllPanels = function() {
        var self = this;
        this.headers.each(function() {
            var $header = $(this);
            var $panel = $($header.attr('aria-controls'));
            if ($header.attr('aria-expanded') === 'true') {
                self.closePanel($header, $panel);
            }
        });
    };

    return Accordion;
});

