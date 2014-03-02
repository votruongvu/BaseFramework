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
            selfViewModel = this;
            me.expenseCollection = new ExpenseCollection();
            me.expenses = kb.collectionObservable(me.expenseCollection);
            me.expenseName = ko.observable("");
            me.expenseDate = ko.observable(new Date());
            me.expenseValue = ko.observable(0);
            me.expenseDescription = ko.observable("");
            me.expenseType = ko.observable("");
            me.editable = ko.observable(false);
            me.currentExpenseId = null;
        },
        selfViewModel : null,
        expenses: null,
        expenseCollection: null,
        expenseName : null,
        expenseValue : null,
        expenseDate : null,
        expenseDescription : null,
        expenseType : null,
        viewEl: "<div>",
        render: function () {
            var me = this;
            var el = $(this.viewEl).load('templates/expenseList.html', function () {
                me.expenseCollection.fetchCurrent("","");
                ko.applyBindings(me, el.get(0));
            });
            return el;
        },
        addNewExpense: function () {
            var me = this;
            $('#myModal').modal('show');
        },
        updateExpenseList: function () {
            var me = this;
            me.expenseCollection.fetchCurrent("","");
        },
        editExpense : function(expense){
            console.log(expense);
             var me = selfViewModel;
             me.editable(true);
             me.currentExpenseId = expense.id();
             console.log(me.currentExpenseId);
             me.expenseName(expense.expenseName());
             me.expenseDate(new Date(expense.expenseDate()));
             me.expenseValue(expense.expenseValue());
             me.expenseDescription(expense.expenseDescription());
             me.expenseType(expense.expenseType());
            $('#myModal').modal('show');
        },
        deleteExpense : function(expense){
            var me = selfViewModel;
            var delExpense = me.expenseCollection.get(me.currentExpenseId);
            console.log(delExpense);
            Backbone.sync("delete", delExpense, ({success: function(model, response) {
                me.expenseCollection.remove(delExpense);
                me.setDefault();
                $('#myModal').modal('hide');
            }}));
        },
        doAfterCloseNewExpense: function () {
            var me = this;
            if(me.editable()){
                var editExpense = me.expenseCollection.get(me.currentExpenseId);
                editExpense.setValues(me.currentExpenseId, me.expenseName(), me.expenseValue(), me.expenseDate().format("dd/mm/yyyy"), me.expenseDescription(), me.expenseType());
                Backbone.sync("update", editExpense , {success : function(model, response){
                    console.log(model);
                    me.expenseCollection.edit(model);
                    me.setDefault();
                    $('#myModal').modal('hide');
                }, error : function(model, response){}});
                $('#myModal').modal('hide');
            }else{
                var newExpenseModel = new ExpenseModel();
                newExpenseModel.setValues(null, me.expenseName(), me.expenseValue(), me.expenseDate().format("dd/mm/yyyy"), me.expenseDescription(), me.expenseType());
                newExpenseModel.save({}, {success : function(model, response){
                    console.log(newExpenseModel);
                    me.expenseCollection.add(model);
                    me.setDefault();
                    $('#myModal').modal('hide');
                }, error : function(model, response){}});
            }
        },
        setDefault : function(){
            var me = this;
            me.expenseName("");
            me.expenseValue("");
            me.expenseDate(new Date());
            me.expenseDescription("");
            me.expenseType("");
            me.editable(false);
            me.currentExpenseId = null;
        }
    });
    return expenseDetailViewModel;
});



