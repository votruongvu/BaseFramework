/**
 * Created with JetBrains WebStorm.
 * User: jamesvo
 * Date: 18/01/14
 * Time: 13:02
 * To change this template use File | Settings | File Templates.
 */
define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    var ExpenseModel = Backbone.Model.extend({
        urlRoot : "/expenses",
        url : function() {
            console.log("url");
            var base = this.urlRoot || this.collection.url;
            if (this.isNew()) return base;
            return base + (base.charAt(base.length - 1) == '/' ? '' : '/') + encodeURIComponent(this.id);
        },
        initialize: function () {
            //console.log("Expense Model has been initialized");
        },
        defaults: {
            id: null,
            expenseName: "",
            expenseValue: "0",
            expenseDate: null,
            expenseDescription: "",
            expenseType: null
        },
        setValues: function (id, expenseName, expenseValue, expenseDate, expenseDescription, expenseType) {
            this.set("id", id);
            this.set("expenseName", expenseName);
            this.set("expenseValue", expenseValue);
            this.set("expenseDate", expenseDate);
            this.set("expenseDescription", expenseDescription);
            this.set("expenseType", expenseType);
        },
        parse: function (response) {
            var setHash = {};
            setHash.id = response._id;
            setHash.expenseName = response.ExpenseName;
            setHash.expenseValue = response.ExpenseValue;
            setHash.expenseDate = response.ExpenseDate;
            setHash.expenseDescription = response.ExpenseDescription;
            setHash.expenseType = response.ExpenseType;
            return setHash;
        }
    });
    return ExpenseModel;
});