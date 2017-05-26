const mongoose = require(`mongoose`);
const bcrypt = require(`bcryptjs`);
const dbconfig = require(`../config/database`);

// User Schema
const UserSchema = mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const User = module.exports = mongoose.model('User', UserSchema);

module.exports = {

    getUserById: function(id, callback) {
        User.findById(id, callback);
    },

    getUserByUsername: function(username, callback) {
        const query = { username: username };
        User.findOne(query, callback);
    },

    addUser: function(newUser, callback) {
        bcrypt.genSalt(10, (err, salt) => {
            if(err) throw err;
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if(err) throw err;
                newUser.password = hash;
                newUser.save(callback);
            });
        });
    }
}
