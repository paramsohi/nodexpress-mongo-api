const jwToken = require('../helpers/jwtHelper.js');
const userModel = require('../models/users.js');

module.exports = (req, res, next) => {
  let token;
  if (req.headers && req.headers.authorization) {
    const parts = req.headers.authorization.split(' ');
    if (parts.length === 2) {
      const scheme = parts[0];
      const credentials = parts[1];

      if (/^BearerHono/i.test(scheme)) {
        token = credentials;
      }
    } else {
      return res.status(400).json({ resStatus: 'err', resMessage: '400 bad request' });
    }
  } else if (req.params.token) {
    token = req.params.token;
    // delete req.params.token;
    delete req.query.token; // TODO: check if this actually works
  } else {
    return res.status(403).json({
      resStatus: 'error',
      resMessage: 'ACCESS DENIED !! You are not authorize to access this Resource',
    });
  }

  jwToken.verify(token, (err, token) => {
    if (err) {
      return res.status(401).json({
        resStatus: 'error',
        resMessage: 'The token is not valid',
      });
    }
    userModel.findOne({ _id: token.auth }, { email: 1, _id: 1 })
      .exec((err, user) => {
        if (user) {
          req.email = user.email;
          req.userId = user._id;
          req.name = user.realName;
          req.username = user.username;
          next();
        } else {
          return res.status(403).json({ resStatus: 'error', resMessage: 'Your session has been expired, please login.' });
        }
      });
  });
};