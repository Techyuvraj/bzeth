/**
 * RequireJS Configuration
 * Configures paths and shims for jQuery and other dependencies
 */

(function() {
    'use strict';

    require.config({
        baseUrl: 'scripts',
        paths: {
            'jquery': 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min',
            'jquery-local': 'lib/jquery.min' // Fallback local copy
        },
        shim: {
            'jquery': {
                exports: '$'
            }
        },
        // Fallback to local jQuery if CDN fails
        map: {
            '*': {
                'jquery': 'jquery'
            }
        },
        waitSeconds: 10
    });

    // Fallback for jQuery if CDN fails
    window.addEventListener('error', function(e) {
        if (e.target && e.target.tagName === 'SCRIPT' && e.target.src && e.target.src.includes('jquery')) {
            var script = document.createElement('script');
            script.src = 'scripts/lib/jquery.min.js';
            script.async = true;
            document.head.appendChild(script);
        }
    }, true);

})();

