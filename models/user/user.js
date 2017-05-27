const mongoose = require(`mongoose`);
const bcrypt = require(`bcryptjs`);
const Q = require('q');
const dbconfig = require(`../../config/database`);
const User = require('./userSchema');

module.exports = {

    getUserById: function(id, callback) {
        User.findById(id, callback);
    },

    getUserByUsername: function(username, callback) {
        const query = { username: username };
        User.findOne(query, callback);
    },

    addUser: function(newUser) {
        let deferred = new Q.defer();
        bcrypt.genSalt(10, (err, salt) => {
            if(err) throw err;
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if(err) throw err;
                newUser.password = hash;
                newUser.save((err)=>{
                  if(err){
                    deferred.resolve({success:false, message:`Error saving the user ${newUser.username}`});
                  }else{
                    deferred.resolve({success:true, message:`User ${newUser.username} saved successfully`});
                  }
                });
            });
        });
        return deferred.promise;
    }
}
