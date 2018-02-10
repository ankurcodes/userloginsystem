var mongoose= require('mongoose');
var bcrypt = require('bcryptjs');
mongoose.connect('mongodb://localhost/nodeauth');
var db = mongoose.connection;

var UserSchema = mongoose.Schema({
    username:{
        type: String,
        index: true
    },
    password:{
        type: String
    },
    email:{
        type: String
    },
    name:{
        type: String
    },
    profileImage:{
        type:String
    }
});

var user = module.exports= mongoose.model('User', UserSchema);

module.export.getUserById = function(id, callback){


    user.findById(id,callback);
}

module.export.getUserByUsername = function(username,callback){
    var query = {username:username};
    user.findOne(query,callback);
}

module.export.comparePassword = function(password,hash, callback){
    bcrypt.compare(password,hash,function(err,isMatch){
        if(err)
            throw err
        isMatch = true;
        callback(err, isMatch);
    });
}
module.exports.createUser = function(newUser, callback){

    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newUser.password, salt, function(err, hash) {
            newUser.password = hash
            newUser.save(callback)
        });
    });


}