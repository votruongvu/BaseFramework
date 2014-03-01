/**
 * Created with JetBrains WebStorm.
 * User: jamesvo
 * Date: 18/01/14
 * Time: 12:51
 * To change this template use File | Settings | File Templates.
 */
define([
    'jquery',
    'underscore',
    'backbone',
    "knockout",
    "knockback"
], function ($, _, Backbone, ko, kb) {
    var AppRouter = Backbone.Router.extend({
        routes: {
            // Define some URL routes
            'expense/:id': 'showExpenseDetail',
            '' : "showExpenseList",
            'aboutMe' : 'showAboutMe',
            // Default
            'signIn' : 'showSignIn',
            '*actions': 'defaultAction'
        },
        loadPage: function(el) {
            if (this.active_el) {
                var viewModelData = ko.dataFor(this.active_el[0]);

                if (viewModelData && typeof viewModelData.removeBindings === 'function') {
                    viewModelData.removeBindings();
                }
                ko.removeNode(this.active_el);
            }
            $("#main-container").html(el);
            this.active_el = el;
            //LoadingSpinner.hide();
        },
        showExpenseList : function(){
            var me = this;
            requirejs(["viewmodels/expenseListViewModel"],function(ExpenseListViewModel){
                var expenseDetailViewModel = new ExpenseListViewModel();
                me.loadPage(expenseDetailViewModel.render());
            })
        },
        showExpenseDetail : function(id){
             var me = this;
             requirejs(["viewmodels/expenseDetailViewModel"],function(ExpenseDetailViewModel){
                 var expenseDetailViewModel = new ExpenseDetailViewModel();
                 me.loadPage(expenseDetailViewModel.render());
             })
        },
        showAboutMe : function(){
            //alert("About Me");
            var me = this;
            requirejs(["viewmodels/aboutUsViewModel"],function(AboutUsViewModel){
                var aboutUsViewModel = new AboutUsViewModel();
                me.loadPage(aboutUsViewModel.render());
            })
        },
        showSignIn : function(){
            //alert("About Me");
            var me = this;
            requirejs(["viewmodels/signInViewModel"],function(SignInViewModel){
                var signInViewModel = new SignInViewModel();
                me.loadPage(signInViewModel.render());
            })
        },
        defaultAction : function (actions) {
            // We have no matching route, lets just log what the URL was
            console.log('No route:', actions);
        }
    });

    var initialize = function () {
        var app_router = new AppRouter;
        Backbone.history.start();
    };
    return {
        initialize: initialize
    };
});