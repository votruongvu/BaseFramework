/**
 * Created by jamesvo on 22/02/14.
 */
var qx = require('qooxdoo');

qx.Class.define("RoleRoute", {
    extend : qx.core.Object,
    members : {
        roleModel : mongoose.model("Role"),
        get : function(req, res){
            //console.log(req.params.id);
            if(!req.params.id){
                res.json(500, { error: "This user does not exist in our system" })
            }else{
                this.roleModel.findById(req.params.id, function (err, role){
                    if (!err){
                        res.json(200, { response: role });
                    }else{
                        res.json(500, { error: err });
                    }
                });
            }
        },
        create : function(reg, res){
           var newRole = new this.roleModel({
                /*fieldName : "EmployeeId",
                fieldDisplayName : "Employee ID",
                fieldDescription : "ID of Employee"*/
            });
            newRole.save( function( err ){
                if(!err){
                    res.json(200, { success : 'Role has been added successfully' })
                }else{
                    res.json(500, { error: err })
                }
            });
        },
        edit : function(reg, res){

        },
        delete : function(reg, res){

        },
        addUserToRole : function(req, res){
            
        },
        addGroupToRole : function(req, res){

        },
        addSubRoleToRole : function (req, res){

        }
    }
});
