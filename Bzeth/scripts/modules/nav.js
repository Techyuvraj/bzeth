/**
 * Navigation Module
 * Handles sticky header, mobile menu, and smooth scrolling
 */

define(['jquery'], function($) {
    'use strict';

    function Nav() {
        this.header = null;
        this.mobileToggle = null;
        this.nav = null;
        this.lastScrollTop = 0;
    }

    Nav.prototype.init = function() {
        this.header = $('.header');
        this.mobileToggle = $('#mobile-menu-toggle');
        this.nav = $('.header__nav');

        if (!this.header.length) {
            return;
        }

        this.bindEvents();
        this.handleScroll();
    };

    Nav.prototype.bindEvents = function() {
        var self = this;

        // Mobile menu toggle
        if (this.mobileToggle.length) {
            this.mobileToggle.on('click', function() {
                self.toggleMobileMenu();
            });
        }

        // Close mobile menu when clicking outside
        $(document).on('click', function(e) {
            if (!$(e.target).closest('.header').length && self.nav.hasClass('header__nav--open')) {
                self.closeMobileMenu();
            }
        });

        // Close mobile menu when clicking a nav link
        $('.header__nav-link').on('click', function() {
            if (window.innerWidth <= 991) {
                self.closeMobileMenu();
            }
        });

        // Handle scroll
        $(window).on('scroll', function() {
            self.handleScroll();
        });

        // Handle resize
        $(window).on('resize', function() {
            if (window.innerWidth > 991) {
                self.closeMobileMenu();
            }
        });
    };

    Nav.prototype.handleScroll = function() {
        var scrollTop = $(window).scrollTop();

        // Add scrolled class for styling
        if (scrollTop > 50) {
            this.header.addClass('scrolled');
        } else {
            this.header.removeClass('scrolled');
        }

        this.lastScrollTop = scrollTop;
    };

    Nav.prototype.toggleMobileMenu = function() {
        var isExpanded = this.mobileToggle.attr('aria-expanded') === 'true';
        
        if (isExpanded) {
            this.closeMobileMenu();
        } else {
            this.openMobileMenu();
        }
    };

    Nav.prototype.openMobileMenu = function() {
        this.nav.addClass('header__nav--open');
        this.mobileToggle.attr('aria-expanded', 'true');
        $('body').addClass('menu-open');
    };

    Nav.prototype.closeMobileMenu = function() {
        this.nav.removeClass('header__nav--open');
        this.mobileToggle.attr('aria-expanded', 'false');
        $('body').removeClass('menu-open');
    };

    return Nav;
});

