const constants = require("../config/constants.js");
module.exports = () => {
  switch (process.env.NODE_ENV) {
    case 'dev':
      return {
        SITEURL: constants.LOCALURL,
        FACEBOOK: constants.FACEBOOK.LOCALHOST,
        MONGODB: constants.MONGODB.LOCALHOST.URL,
        FCM: constants.FCM.LOCALHOST.SERVERKEY,
        EMAIL: constants.EMAIL.LOCALHOST,
        JWTOKEN: constants.JWTOKENLOCAL,
      };
    case 'production':
      return {
        SITEURL: constants.LIVEURL,
        FACEBOOK: constants.FACEBOOK.LIVE,
        MONGODB: constants.MONGODB.LIVE.URL,
        FCM: constants.FCM.LIVE.SERVERKEY,
        EMAIL: constants.EMAIL.LIVE,
        JWTOKEN: constants.JWTOKENLIVE,
      };
    case 'test':
      return {
        SITEURL: constants.LIVEURL,
        FACEBOOK: constants.FACEBOOK.LIVE,
        MONGODB: constants.MONGODB.TEST.URL,
        FCM: constants.FCM.LIVE.SERVERKEY,
        EMAIL: constants.EMAIL.LIVE,
        JWTOKEN: constants.JWTOKENLIVE,
      };
    default:
      return {
        SITEURL: constants.LOCALURL,
        FACEBOOK: constants.FACEBOOK.LOCALHOST,
        MONGODB: constants.MONGODB.LOCALHOST.URL,
        FCM: constants.FCM.LOCALHOST.SERVERKEY,
        EMAIL: constants.EMAIL.LOCALHOST,
        JWTOKEN: constants.JWTOKENLOCAL,
      };
  }
};
