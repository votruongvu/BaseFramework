/**
 * Created with JetBrains WebStorm.
 * User: jamesvo
 * Date: 18/01/14
 * Time: 13:47
 * To change this template use File | Settings | File Templates.
 */
define(['underscore', "backbone", "models/expense"], function (_, $, ExpenseModel) {
    var ExpensesCollection = Backbone.Collection.extend({
        url: '/expense',
        model: ExpenseModel
    });
    return ExpensesCollection;
})