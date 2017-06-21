const jwt = require('jsonwebtoken');
const env = require('../config/env.js')();
const tokenSecret = env.JWTOKEN;
let userModel = require('../models/users.js');

module.exports = {
  issueToken: function (payload, deviceToken) {
    let token = jwt.sign({
      auth: payload,
      exp: Math.floor(new Date().getTime() / 1000) + (7 * 24 * 60 * 60),
    }, tokenSecret);

    // userModel.update({ _id: payload }, { 'deviceToken': deviceToken }, { upsert: false }).exec(function(err){});
    return token;
  },

  verify: function(token, callback) {
    return jwt.verify(token, tokenSecret, {}, callback);
  },
};