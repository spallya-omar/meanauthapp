const router = require(`express`).Router();
const passport = require(`passport`);
const jwt = require(`jsonwebtoken`);
const dbconfig = require(`../config/database`);
const User = require(`../models/user`);


// Register
router.post(`/register`, (req, res, next) => {
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });
    User.addUser(newUser, (err, user) => {
        if(err) {
            res.json({success: false, msg: `Failed to register User`});
        } else {
            res.json({success: true, msg: `User registered successfully`});
        }
    });
});

// Authenticate
router.post(`/authenticate`, (req, res, next) => {
    let username = req.body.username;
    let password = req.body.password;
    User.getUserByUsername(username, (err, user) => {
        if(err) {
            return res.json({success: false, msg: `User not found`});
        }
        if(user) {
            User.comparePassword(password, user.password, (err, isMatch) => {
                if(err) throw err;
                if(isMatch) {
                    const token = jwt.sign(user, dbConfig.secret, {
                        expiresIn: 604880 // 1 week secs
                    });
                    res.json({
                        user: {
                            id: user._id,
                            name: user.name,
                            username: user.username,
                            email: user.email
                        }
                    });
                } else {
                    res.json({success: false, msg: `Password incorrect`});
                }
            });
        }
    });
});

// Profile
router.get(`/profile`, (req, res, next) => {
    res.send(`Profile Page`);
});

module.exports = router;