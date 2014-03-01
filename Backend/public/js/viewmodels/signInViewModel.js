/**
 * Created with JetBrains WebStorm.
 * User: jamesvo
 * Date: 18/01/14
 * Time: 19:17
 * To change this template use File | Settings | File Templates.
 */
define(["backbone", "knockback"],function(Backbone,kb){
    var signInViewModel = kb.ViewModel.extend({
        constructor: function(model) {},
        viewEl : "<div>",
        render: function () {
            var self = this;
            var el = $(this.viewEl).load('templates/signIn.html', function () {
                kb.applyBindings(self, el.get(0));
            });
            return el;
        }
    });
    return signInViewModel;
});