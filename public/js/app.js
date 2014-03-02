/**
 * Created with JetBrains WebStorm.
 * User: jamesvo
 * Date: 18/01/14
 * Time: 12:50
 * To change this template use File | Settings | File Templates.
 */
define([
    'jquery',
    'jquery.bootstrap',
    'knockout',
    "date.format",
    'underscore',
    'backbone',
    'router' // Request router.js
], function ($,BootStrap ,ko, DateFormat,  _, Backbone, Router) {

    var initialize = function () {
        // Pass in our Router module and call it's initialize function
        Router.initialize();

        //custom binding
        ko.bindingHandlers.datepicker = {
            init: function(element, valueAccessor, allBindingsAccessor) {
                console.log("init");
                //initialize datepicker with some optional options
                var options = allBindingsAccessor().datepickerOptions || {};
                $(element).datepicker(options);

                //when a user changes the date, update the view model
                ko.utils.registerEventHandler(element, "changeDate", function(event) {
                    var value = valueAccessor();
                    if (ko.isObservable(value)) {
                        value(event.date);
                    }
                });
            },
            update: function(element, valueAccessor)   {
                var widget = $(element).data("datepicker");
                //when the view model is updated, update the widget
                if (widget) {
                    value = ko.utils.unwrapObservable(valueAccessor());

                    if (!value) {
                        $(element).val("").change();
                        return;
                    }

                    widget.setValue(_.isString(value) ? new Date(value) : value);
                }
            }
        };
        Backbone.old_sync = Backbone.sync
        Backbone.sync = function(method, model, options) {
            /*console.log("I've been passed " + method + " with " + JSON.stringify(model));*/
            //add token to url
            ///
            Backbone.old_sync(method, model, options);
        };

    }
    return {
        initialize: initialize
    };
});