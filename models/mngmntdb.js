var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

mongoose.connect("mongodb://Sahil:sahil1998@ds133762.mlab.com:33762/grievance",{ useNewUrlParser: true });
mongoose.Promise=global.Promise;
//var db = mongoose.connection;

var mngmntSchema = mongoose.Schema({
    emailid: {
        type: String,
        index: true
    },
    designation:{
        type:String
          },
   Gtype:{
      type:String
       },
    mobileno:{
        type: String,
        index: true
    },
    password: {
        type: String
    }
   
});

var mngmnt = module.exports = mongoose.model('Mngmnt',mngmntSchema,'Mngmnt');




/*module.exports.getUserById = function(id, callback){
    Faculty.findById(id, callback);
}*/

module.exports.getUserByID = function(id, callback){
    var query = (id.indexOf('@') === -1) ? {mobileno: id} : {emailid: id};

    mngmnt.findOne(query, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
        callback(null, isMatch);
    });
}

module.exports.createUser = function(newUser, callback){
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newUser.password, salt, function(err, hash) {
          newUser.password = hash;
            newUser.save(callback);
    })
})
}