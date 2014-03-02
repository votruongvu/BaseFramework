/**
 * Created by jamesvo on 22/02/14.
 */
var qx = require('qooxdoo');

qx.Class.define("ExpenseRoute", {
    extend : qx.core.Object,
    members : {
        expenseModel : mongoose.model("Expense"),
        get : function(req, res){
            //console.log(req.params.id);
            if(!req.params.id){
                res.json(200, { error: "This expense does not exist in our system" })
            }else{
                this.expenseModel.findById(req.params.id, function (err, expense){
                    if (!err){
                        res.json(200, { response: expense });
                    }else{
                        res.json(200, { error: err });
                    }
                });
            }
        },
        getByUserNameWithPeriodTime : function(req,res){
            var user_id = "531169046bd220780f00d8ad";//req.user_id;
            console.log(user_id);
            var start_date = req.params.startDate;
            var end_date = req.params.endDate;
            if(!user_id){
                res.json(401, { error: "This user have not yet logged in" })
            }else{
                var query = this.expenseModel.find({})
                    /*.where('ExpenseDate').gt(start_date).lt(end_date)*/
                    .sort('createdOn');
                query.exec(function (err, expenses){
                    if (!err){
                        res.json(200, { data : expenses });
                    }else{
                        res.json(500, { error: err });
                    }
                });
            }
        },
        create : function(reg, res){
            console.log(reg.body);
            var newExpense = new this.expenseModel({
                ExpenseName: reg.body.expenseName,
                ExpenseValue: reg.body.expenseValue,
                ExpenseDate: reg.body.expenseDate,
                ExpenseDescription: reg.body.expenseDescription
                /*ExpenseType: reg.body.expenseType*/
            });
            newExpense.save( function( err , expense ){
                if(!err){
                    res.json(200, expense);
                }else{
                    res.json(500, { error: err })
                }
            });
        },
        edit : function(reg, res){
            var expense_id = reg.params.id;
            console.log(expense_id);
            this.expenseModel.findById(expense_id, function(err, expense){
                console.log(reg.body);
                console.log(expense);
                expense.ExpenseName = reg.body.expenseName
                expense.ExpenseValue = reg.body.expenseValue
                expense.ExpenseDate = reg.body.expenseDate
                expense.ExpenseDescription = reg.body.expenseDescription
                expense.ExpenseType = reg.body.expenseType
                expense.save(function(err){
                    if (!err){
                        res.json(200, { message : "edit successfully" });
                    }else{
                        res.json(200, { error: err });
                    }
                });
            })
        },
        delete : function(reg, res){
            var expense_id = reg.params.id;
            this.expenseModel.findById(expense_id, function(err, expense){
                expense.remove(function(err){
                    if (!err){
                        res.json(200, { message : "remove successfully" });
                    }else{
                        res.json(200, { error: err });
                    }
                });
            })
        }
    }
});
