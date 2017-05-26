const JwtStrategy = require(`passport-jwt`).Strategy;
const ExtractJwt = require(`passport-jwt`).ExtractJwt;
const User = require(`../models/user`);
const dbConfig = require(`./database`);

module.exports = function(passport) {
    let opts = {}
    opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
    opts.secretOrKey = dbConfig.secret;
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        User.getUserById(jwt_payload._id, (err, user) => {
            if(err) {
                return done(err, false);
            }
            if(user) {
                return done(null, true);
            } else {
                return done(null, false);
            }
        });
}));
};