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
        initialize: function () {
            console.log("Expense Model has been initialized");
        },
        defaults: {
            id: null,
            name: "",
            value: "0",
            description: "",
            tags: "",
            expenseTypeId: null,
            date: null
        },
        setValues : function(id, name, value, date, description, tags) {
            this.set("id" , id);
            this.set("name" ,  name);
            this.set("value" , value);
            this.set("date" , date);
            this.set("description" , description);
            this.set("tags" , tags);
        }
    });
    return ExpenseModel;
});