/**
 * Created with JetBrains WebStorm.
 * User: jamesvo
 * Date: 18/01/14
 * Time: 13:03
 * To change this template use File | Settings | File Templates.
 */
define(['undescore', "backbone"], function (_, $) {
    var ExpenseTypeModel = Backbone.Model.extend({
        initialize: function () {
            console.log("Expense Type Model has been init");
        },
        defaults: {
            id: null,
            expenseName: "",
            expenseDescription: ""
        }
    });
    return ExpenseTypeModel;
});