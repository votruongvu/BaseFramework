/**
 * Created by jamesvo on 22/02/14.
 */
var qx = require('qooxdoo');

qx.Class.define("UserRoute", {
    extend : qx.core.Object,
    members : {
        userModel : mongoose.model("User"),
        get : function(req, res){
            //console.log(req.params.id);
            if(!req.params.id){
                res.json(500, { error: "This user does not exist in our system" })
            }else{
                this.userModel.findById(req.params.id, function (err, user){
                    if (!err){
                        res.json(200, { response: user });
                    }else{
                        res.json(500, { error: err });
                    }
                });
            }
        },
        create : function(reg, res){

           var newUser = new this.userModel({
               /* fieldName : "EmployeeId",
                fieldDisplayName : "Employee ID",
                fieldDescription : "ID of Employee"*/
            });
            newUser.save( function( err ){
                if(!err){
                    res.json(200, { success : 'User has been added successfully' })
                }else{
                    res.json(500, { error: err })
                }
            });
        },
        edit : function(reg, res){
            console.log("Test EDIT");
        },
        delete : function(reg, res){
            console.log("Test DELETE");
        },
        login : function(req, res){
            var client_id = "";
            var user_id = "";
            var extra_data = "{}";
            res.json(200, {"access_token": authenticate.serializeToken(client_id, user_id, extra_data)}); // extra data is optional
        }
    }
});
