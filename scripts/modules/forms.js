/**
 * Forms Module
 * Handles form validation and submission
 */

define(['jquery'], function($) {
    'use strict';

    function Forms() {
        this.contactForm = null;
        this.newsletterForm = null;
    }

    Forms.prototype.init = function() {
        this.contactForm = $('#contact-form');
        this.newsletterForm = $('#newsletter-form');

        if (this.contactForm.length) {
            this.initContactForm();
        }

        if (this.newsletterForm.length) {
            this.initNewsletterForm();
        }
    };

    Forms.prototype.initContactForm = function() {
        var self = this;
        var $form = this.contactForm;
        var $message = $('#contact-form-message');

        $form.on('submit', function(e) {
            e.preventDefault();

            // Clear previous messages
            $message.removeClass('success error').text('');

            // Validate form
            if (!self.validateForm($form)) {
                return;
            }

            // Get form data
            var formData = {
                name: $('#contact-name').val(),
                email: $('#contact-email').val(),
                phone: $('#contact-phone').val(),
                subject: $('#contact-subject').val(),
                message: $('#contact-message').val()
            };

            // Show loading state
            var $submitBtn = $form.find('button[type="submit"]');
            var originalText = $submitBtn.text();
            $submitBtn.prop('disabled', true).text('Sending...');

            // Simulate form submission (replace with actual AJAX call)
            setTimeout(function() {
                // In production, replace this with actual AJAX call:
                /*
                $.ajax({
                    url: '/api/contact', // Replace with your endpoint
                    method: 'POST',
                    data: formData,
                    success: function(response) {
                        self.showFormMessage($message, 'success', 'Thank you! Your message has been sent successfully.');
                        $form[0].reset();
                    },
                    error: function(xhr) {
                        self.showFormMessage($message, 'error', 'Sorry, there was an error sending your message. Please try again.');
                    },
                    complete: function() {
                        $submitBtn.prop('disabled', false).text(originalText);
                    }
                });
                */

                // Demo success message
                self.showFormMessage($message, 'success', 'Thank you! Your message has been sent successfully. (Demo - configure endpoint in production)');
                $form[0].reset();
                $submitBtn.prop('disabled', false).text(originalText);
            }, 1000);
        });

        // Real-time validation
        $form.find('input, textarea, select').on('blur', function() {
            self.validateField($(this));
        });
    };

    Forms.prototype.initNewsletterForm = function() {
        var self = this;
        var $form = this.newsletterForm;
        var $message = $('#newsletter-message');

        $form.on('submit', function(e) {
            e.preventDefault();

            // Clear previous messages
            $message.removeClass('success error').text('');

            var email = $('#newsletter-email').val().trim();

            // Validate email
            if (!self.validateEmail(email)) {
                self.showFormMessage($message, 'error', 'Please enter a valid email address.');
                return;
            }

            // Show loading state
            var $submitBtn = $form.find('button[type="submit"]');
            var originalText = $submitBtn.text();
            $submitBtn.prop('disabled', true).text('Subscribing...');

            // Simulate form submission (replace with actual AJAX call)
            setTimeout(function() {
                // In production, replace this with actual AJAX call:
                /*
                $.ajax({
                    url: '/api/newsletter', // Replace with your endpoint
                    method: 'POST',
                    data: { email: email },
                    success: function(response) {
                        self.showFormMessage($message, 'success', 'Thank you for subscribing!');
                        $form[0].reset();
                    },
                    error: function(xhr) {
                        self.showFormMessage($message, 'error', 'Sorry, there was an error. Please try again.');
                    },
                    complete: function() {
                        $submitBtn.prop('disabled', false).text(originalText);
                    }
                });
                */

                // Demo success message
                self.showFormMessage($message, 'success', 'Thank you for subscribing! (Demo - configure endpoint in production)');
                $form[0].reset();
                $submitBtn.prop('disabled', false).text(originalText);
            }, 1000);
        });
    };

    Forms.prototype.validateForm = function($form) {
        var self = this;
        var isValid = true;
        var $requiredFields = $form.find('[required]');

        $requiredFields.each(function() {
            var $field = $(this);
            if (!self.validateField($field)) {
                isValid = false;
            }
        });

        return isValid;
    };

    Forms.prototype.validateField = function($field) {
        var value = $field.val().trim();
        var type = $field.attr('type');
        var isValid = true;
        var errorMessage = '';

        // Remove previous error styling
        $field.removeClass('error');

        // Check required fields
        if ($field.prop('required') && !value) {
            isValid = false;
            errorMessage = 'This field is required.';
        }

        // Validate email
        if (type === 'email' && value && !this.validateEmail(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address.';
        }

        // Validate phone (basic)
        if (type === 'tel' && value && !this.validatePhone(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid phone number.';
        }

        if (!isValid) {
            $field.addClass('error');
            if (errorMessage) {
                $field.attr('aria-invalid', 'true');
                $field.attr('aria-describedby', $field.attr('id') + '-error');
            }
        } else {
            $field.removeAttr('aria-invalid');
            $field.removeAttr('aria-describedby');
        }

        return isValid;
    };

    Forms.prototype.validateEmail = function(email) {
        var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    Forms.prototype.validatePhone = function(phone) {
        // Basic phone validation - accepts various formats
        var re = /^[\d\s\-\+\(\)]+$/;
        return re.test(phone) && phone.replace(/\D/g, '').length >= 10;
    };

    Forms.prototype.showFormMessage = function($message, type, text) {
        $message.removeClass('success error')
                .addClass(type)
                .text(text)
                .attr('role', 'status')
                .attr('aria-live', 'polite');
    };

    return Forms;
});

