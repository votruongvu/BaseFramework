requirejs.config({
    baseUrl: "js",
    paths: {
        "modernizr": "vendor/modernizr-2.6.2-respond-1.1.0.min",
        "jquery": "vendor/jquery-1.10.1.min",
        "jquery.bootstrap": "vendor/bootstrap.min",
        "jquery.bootstrap.datepicker": "vendor/bootstrap-datepicker",
        "date.format" : "vendor/date.format",
        "domReady": "vendor/requiresjs/plugins/domReady",
        "underscore": "vendor/underscore-min",
        "backbone": "vendor/backbone-min",
        "knockout": "vendor/knockout-3.0.0",
        "knockback": "vendor/knockback.min"
    },
    //Remember: only use shim config for non-AMD scripts,
    //scripts that do not already call define(). The shim
    //config will not work correctly if used on AMD scripts,
    //in particular, the exports and init config will not
    //be triggered, and the deps config will be confusing
    //for those cases.
    shim: {
        'jquery.bootstrap.datepicker' : {
            deps: ["jquery", "jquery.bootstrap"]
        },
        'jquery.bootstrap': {
            deps: ["jquery"]
        },
        'underscore': {
            exports: '_'
        },
        "knockout": {
            exports: "ko"
        },
        'backbone': {
            //These script dependencies should be loaded before loading
            //backbone.js
            deps: ['underscore', 'jquery'],
            //Once loaded, use the global 'Backbone' as the
            //module value.
            exports: 'Backbone'
        },
        "knockback": {
            deps: ["backbone", "knockout"],
            exports: "kb"
        }
    }
});

require(["app"], function (App) {
    App.initialize();
});