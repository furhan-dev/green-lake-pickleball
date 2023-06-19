const User = require('../models/user');

module.exports = {};

module.exports.createUser = async (userObj) => {
  try {
    return await User.create(userObj);
  } catch (e) {
    if (
      e.message.includes('validation failed') ||
      e.message.includes('dup key')
    ) {
      throw new BadDataError(e.message);
    }
    throw e;
  }
};

module.exports.getUser = async (email) => {
  return await User.findOne({ email: email }).lean();
};

module.exports.updateUserPassword = async (userId, password) => {
  return await User.updateOne({ _id: userId }, { password: password }).lean();
};

class BadDataError extends Error {}
module.exports.BadDataError = BadDataError;
