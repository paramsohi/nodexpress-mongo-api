const jwt = require('jsonwebtoken');
const tokenSecret = 'vishesh_tanwar0123456789efghjmk';
const UserModel = require('../models/admin.js');

module.exports = {

  // genrateToken
  issueToken: function (payload, platform, deviceToken) {
    let token = jwt.sign({
      auth: payload,
      exp: Math.floor(new Date().getTime() / 1000) + 7 * 24 * 60 * 60
    }, tokenSecret)
    return token;
  },

  verify: function (token, callback) {
    return jwt.verify(
      token, // The token to be verified
      tokenSecret, // Same token we used to sign
      {},
      callback //Pass errors or decoded token to callback
    );
  }
}
