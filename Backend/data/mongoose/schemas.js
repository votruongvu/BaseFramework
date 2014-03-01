/**
 * Created by jamesvo on 22/02/14.
 */
//James Vo : adding createdOn and CreatedBy filed automatically
GLOBAL.mongoose = require( 'mongoose' );
var creationInfo = require('./plugins/creationInfo');
var modifiedOn = require('./plugins/modifiedOn');
var trashable = require('mongoose-trashable');
//James Vo : example using Trashable (Soft delete)
/*
TestModel = mongoose.model("Test", TestSchema);

instance = new TestModel()
instance.trash(function(err, doc) {
    console.log("after trashed_at: doc.trashed_at:"+doc.trashed_at);
    doc.untrashed(function(err, doc){
        console.log("after untrashed: doc.trashed_at:"+doc.trashed_at);
    });
});*/

var UserSchema = new mongoose.Schema({
    userName: {type : String, required : true, unique : true},
    password: {type : String, required : true},
    userDisplayName: {type : String, required : true},
    userDescription: String
});

UserSchema.plugin(trashable);
UserSchema.plugin(creationInfo);
UserSchema.plugin(modifiedOn);
mongoose.model("User", UserSchema);


var GroupSchema = new mongoose.Schema({
    groupName: {type : String, required : true,  unique : true},
    groupDisplayName: {type : String, required : true},
    groupDescription: String,
    users : [{type : mongoose.Schema.Types.ObjectId , ref : "User" }]
});

GroupSchema.plugin(trashable);
GroupSchema.plugin(creationInfo);
GroupSchema.plugin(modifiedOn);
mongoose.model("Group", GroupSchema);


var RoleSchema = new mongoose.Schema({
    roleName: {type : String, required : true},
    roleDisplayName: {type : String, required : true},
    roleDescription: String,
    users : [{type : mongoose.Schema.Types.ObjectId , ref : "User" }],
    groups : [{type : mongoose.Schema.Types.ObjectId, ref : "Group"}]
});

RoleSchema.plugin(trashable);
RoleSchema.plugin(creationInfo);
RoleSchema.plugin(modifiedOn);
mongoose.model("Role", RoleSchema);










