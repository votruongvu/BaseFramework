/**
 * Created by jamesvo on 22/02/14.
 */
var qx = require('qooxdoo');

qx.Class.define("GroupRoute", {
    extend : qx.core.Object,
    members : {
        groupModel : mongoose.model("Group"),
        get : function(req, res){
            //console.log(req.params.id);
            if(!req.params.id){
                res.json(500, { error: "This user does not exist in our system" })
            }else{
                this.groupModel.findById(req.params.id, function (err, group){
                    if (!err){
                        res.json(200, { response: group });
                    }else{
                        res.json(500, { error: err });
                    }
                });
            }
        },
        create : function(reg, res){
           var newGroup = new this.groupModel({
                /*fieldName : "EmployeeId",
                fieldDisplayName : "Employee ID",
                fieldDescription : "ID of Employee"*/
            });
            newGroup.save( function( err ){
                if(!err){
                    res.json(200, { success : 'Group has been added successfully' })
                }else{
                    res.json(500, { error: err })
                }
            });
        },
        edit : function(reg, res){

        },
        delete : function(reg, res){

        },
        addUserToGroup : function(req, res){

        },
        addSubGroupToGroup : function(req, res){

        }
    }
});
