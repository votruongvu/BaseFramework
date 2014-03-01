/**
 * Created by jamesvo on 01/03/14.
 */
var Users = [
    {userName : "bichvu", password : "phuongtrang14", userDisplayName: "Bich Vu", userDescription: "Vo Yeu"},
    {userName : "thuvo", password : "phuongtrang14", userDisplayName: "Thu Vo", userDescription: "Di Muoi"},
    {userName : "vuvo", password : "phuongtrang14", userDisplayName: "Vu Vo", userDescription: "Ku Banh"}
];

var userModel = mongoose.model("User");

for(var i=0;i<Users.length;i++){
    var newUSer = new userModel(Users[i]);
    newUSer.save(function(err, user){
        if(!err){
            console.log('Saved user name: ' + user.userName);
            console.log('_id of saved user: ' + user._id);
        }
    })
}