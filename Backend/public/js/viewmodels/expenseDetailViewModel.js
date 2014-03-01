/**
 * Created with JetBrains WebStorm.
 * User: jamesvo
 * Date: 18/01/14
 * Time: 14:10
 * To change this template use File | Settings | File Templates.
 */
define(["jquery", "underscore", "backbone", "knockback", "models/expense"], function ($, _, Backbone, kb, ExpenseModel) {
    var expenseDetailViewModel = kb.ViewModel.extend({
            model : new ExpenseModel(),
            viewEl : "<div>",
            render: function () {
                var self = this;
                var el = $(this.viewEl).load('templates/expenseDetail.html', function () {
                    kb.applyBindings(self, el.get(0));
                });
                return el;
            }
    });
    return expenseDetailViewModel;
});



