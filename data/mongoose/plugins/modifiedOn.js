/**
 * Created by jamesvo on 22/02/14.
 */
var mongoose = require( 'mongoose' );
module.exports = exports = function modifiedOn (schema, options) {
    schema.add({ modifiedOn: Date });

    schema.pre('save', function (next) {
        this.modifiedOn = Date.now();
        next();
    });
};