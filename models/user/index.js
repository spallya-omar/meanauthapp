const User = require('./user');
const userSchema = require('./userSchema');

module.exports = {
  UserSchema: userSchema,
  helpers: User
}
