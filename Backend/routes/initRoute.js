/**
 * Created by jamesvo on 23/02/14.
 */

//Index
app.get('/', function (req, res) {

});

//James Vo : Register Field Route
require('./userRoute');
var userRoute = new UserRoute();

app.get('/user/:id',function(req,res){
    userRoute.get(req,res);
});
app.post('/user/new',function(req,res){
    userRoute.create(req,res);
});
app.post('/user/edit/:id',function(req,res){
    userRoute.edit(req,res);
});
app.post('/user/delete/:id',function(req,res){
    userRoute.delete(req,res);
});
app.get('/login', function(req, res) {
    userRoute.login(req,res);
});
//End Register Field Route



