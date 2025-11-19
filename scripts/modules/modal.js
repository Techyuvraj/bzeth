/**
 * Modal Module
 * Handles modal display, focus trap, and accessibility
 */

define(['jquery'], function($) {
    'use strict';

    function Modal() {
        this.modal = null;
        this.overlay = null;
        this.closeBtn = null;
        this.cancelBtn = null;
        this.focusableElements = null;
        this.firstFocusable = null;
        this.lastFocusable = null;
        this.previousActiveElement = null;
    }

    Modal.prototype.init = function() {
        this.modal = $('#contact-modal');
        
        if (!this.modal.length) {
            return;
        }

        this.overlay = $('#modal-overlay');
        this.closeBtn = $('#modal-close');
        this.cancelBtn = $('#modal-cancel');

        this.bindEvents();
    };

    Modal.prototype.bindEvents = function() {
        var self = this;

        // Open modal triggers
        $('#contact-btn, #request-sample-btn, [data-facility]').on('click', function(e) {
            e.preventDefault();
            self.openModal();
        });

        // Download brochure button
        $('#download-brochure-btn').on('click', function(e) {
            e.preventDefault();
            // In production, this would link to actual PDF
            alert('Brochure download functionality - link to PDF in production');
        });

        // Download letter button
        $('#download-letter-btn').on('click', function(e) {
            e.preventDefault();
            // In production, this would link to actual PDF
            alert('CEO letter download functionality - link to PDF in production');
        });

        // Close modal triggers
        this.closeBtn.on('click', function() {
            self.closeModal();
        });

        this.cancelBtn.on('click', function() {
            self.closeModal();
        });

        this.overlay.on('click', function() {
            self.closeModal();
        });

        // Keyboard handlers
        $(document).on('keydown', function(e) {
            if (self.modal.attr('aria-hidden') === 'false') {
                self.handleKeyboard(e);
            }
        });

        // Product spec sheet downloads
        $('[data-product$="-spec"]').on('click', function(e) {
            e.preventDefault();
            var product = $(this).data('product');
            alert('Download spec sheet for ' + product + ' - link to PDF in production');
        });

        // Product sample requests
        $('[data-product$="-sample"]').on('click', function(e) {
            e.preventDefault();
            self.openModal();
        });
    };

    Modal.prototype.openModal = function() {
        this.previousActiveElement = document.activeElement;
        this.modal.attr('aria-hidden', 'false');
        $('body').addClass('modal-open');
        
        // Set up focus trap
        this.setFocusableElements();
        
        // Focus first element after a short delay
        setTimeout(function() {
            if (this.firstFocusable) {
                this.firstFocusable.focus();
            }
        }.bind(this), 100);
    };

    Modal.prototype.closeModal = function() {
        this.modal.attr('aria-hidden', 'true');
        $('body').removeClass('modal-open');
        
        // Return focus to previous element
        if (this.previousActiveElement) {
            this.previousActiveElement.focus();
        }
    };

    Modal.prototype.setFocusableElements = function() {
        var focusableSelectors = [
            'a[href]',
            'button:not([disabled])',
            'textarea:not([disabled])',
            'input:not([disabled])',
            'select:not([disabled])',
            '[tabindex]:not([tabindex="-1"])'
        ].join(', ');

        this.focusableElements = this.modal.find(focusableSelectors).filter(':visible');
        this.firstFocusable = this.focusableElements.first()[0];
        this.lastFocusable = this.focusableElements.last()[0];
    };

    Modal.prototype.handleKeyboard = function(e) {
        var key = e.which || e.keyCode;

        // Escape key closes modal
        if (key === 27) { // ESC
            this.closeModal();
            return;
        }

        // Tab key traps focus
        if (key === 9) { // TAB
            if (e.shiftKey) {
                // Shift + Tab
                if (document.activeElement === this.firstFocusable) {
                    e.preventDefault();
                    this.lastFocusable.focus();
                }
            } else {
                // Tab
                if (document.activeElement === this.lastFocusable) {
                    e.preventDefault();
                    this.firstFocusable.focus();
                }
            }
        }
    };

    return Modal;
});

