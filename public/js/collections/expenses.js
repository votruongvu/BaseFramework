/**
 * Created with JetBrains WebStorm.
* User: jamesvo
* Date: 18/01/14
* Time: 13:47
* To change this template use File | Settings | File Templates.
    */
define(['underscore', "backbone", "models/expense"], function (_, $, ExpenseModel) {
    var ExpensesCollection = Backbone.Collection.extend({
        url: '/expenses',
        model: ExpenseModel,
        fetchCurrent: function (startDate, endDate, options) {
            options = options || {};
            if (options.url === undefined) {
                options.url = this.url + "/startDate/" + "2014-03-02T00:24:05.888Z" + "/endDate/" + "2014-03-02T00:24:05.888Z";
            }

            return Backbone.Model.prototype.fetch.call(this, options);
        },
        parse: function(response) {
            return response.data ? response.data : response;
        }
    });
    return ExpensesCollection;
})