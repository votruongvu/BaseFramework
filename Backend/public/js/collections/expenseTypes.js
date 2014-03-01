/**
 * Created with JetBrains WebStorm.
 * User: jamesvo
 * Date: 18/01/14
 * Time: 13:22
 * To change this template use File | Settings | File Templates.
 */
define(["underscore", "backbone", "models/expenseType"], function (_, Backbone, ExpenseTypeModel) {
    var ExpenseTypeCollection = Backbone.Collection.extend({
        model: ExpenseTypeModel
    });
    return ExpenseTypeCollection;
});