/**
 * Created with JetBrains WebStorm.
 * User: jamesvo
 * Date: 18/01/14
 * Time: 14:10
 * To change this template use File | Settings | File Templates.
 */
define(["jquery", "underscore", "backbone","knockout", "knockback", "models/expense", "collections/expenses", "jquery.bootstrap.datepicker"], function ($, _, Backbone, ko, kb, ExpenseModel, ExpenseCollection) {
    var expenseDetailViewModel = kb.ViewModel.extend({
        constructor: function() {
            var me = this;
            me.expenseCollection = new ExpenseCollection();
            me.expenses = kb.collectionObservable(me.expenseCollection);
            me.expenseName = ko.observable("");
            me.expenseDate = ko.observable(new Date());
            me.expenseValue = ko.observable("");
            me.expenseDescription = ko.observable("");
            me.expenseTags = ko.observable("");
        },
        expenses: null,
        expenseCollection: null,
        expenseName : null,
        expenseValue : null,
        expenseDate : null,
        expenseDescription : null,
        expenseTags : null,
        viewEl: "<div>",
        render: function () {
            var me = this;
            var el = $(this.viewEl).load('templates/expenseList.html', function () {
                ko.applyBindings(me, el.get(0));
            });
            return el;
        },
        addNewExpense: function () {
            var me = this;
            $('#myModal').modal('show');
        },
        doAfterCloseNewExpense: function () {
            var me = this;
            var newExpenseModel = new ExpenseModel();
            newExpenseModel.setValues(me.createUUID(), me.expenseName(), me.expenseValue(), me.expenseDate().format("dd/mm/yyyy"), me.expenseDescription(), me.expenseTags());
            this.expenseCollection.add(newExpenseModel);
            me.setDefault();
            $('#myModal').modal('hide');
        },
        setDefault : function(){
            var me = this;
            me.expenseName("");
            me.expenseValue("");
            me.expenseDate(new Date());
            me.expenseDescription("");
            me.expenseTags("")
        },
        createUUID: function () {
            var s = [];
            var hexDigits = "0123456789abcdef";
            for (var i = 0; i < 36; i++) {
                s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
            }
            s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
            s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
            s[8] = s[13] = s[18] = s[23] = "-";

            var uuid = s.join("");
            return uuid;
        }
    });
    return expenseDetailViewModel;
});



