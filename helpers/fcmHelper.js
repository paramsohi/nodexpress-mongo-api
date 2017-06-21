const Fcm = require('fcm-node');
const UserModel = require('../models/users');
const env = require('../config/env')();
const serverKey = env.FCM;
const async = require('async');

module.exports = {
  testFcm: (notifyObj, cb) => {
    const fcm = new Fcm('AAAAVlyXLrw:APA91bFln-9gTdozArs4Hr8iJeZmR-Tu8d07vrw3rZMWbKhAQeHh9sP2qfeJmDT_qZ7UUu5RTX6AWog13SCjjzGhIozZR1fEj9d2PwMV9bl93SjExgJlaEkFcb8eNmFiRr82NO0dpE_n');
    const message = {
      to: notifyObj.deviceToken,
      notification: {
        title: notifyObj.subject,
        body: notifyObj.message,
      },
      data: {
        message: notifyObj.message,
        action: 'PUSH',
        jsonData: '',
        status: notifyObj.status,
      },
    };
    fcm.send(message, (err, response) => {
      if (err) return cb(err, null);
      cb(null, response);
    });
  },
  sendInvite: (notifyObj, cb) => {
    const fcm = new Fcm(serverKey);
    UserModel.findOne({ _id: notifyObj.userId }, { deviceToken: 1 }).exec((err, user) => {
      if (err) cb(err, null);
      if (!user) {
        cb(new Error('User not found'), null);
      }
      if (user.deviceToken) {
        const message = {
          to: user.deviceToken,
          notification: {
            title: notifyObj.subject,
            body: notifyObj.message,
          },
          data: {
            message: notifyObj.message,
            action: 'PUSH',
            jsonData: '',
            status: notifyObj.status,
          },
        };

        fcm.send(message, (err, response) => {
          if (err) cb(err, null);
          cb(null, response);
        });
      }
    });
  },

  friendRequest: (notifyObj, cb) => {

  },

  sendTap: (notifyObj, cb) => {
    const fcm = new Fcm(serverKey);
    UserModel.findOne({ _id: notifyObj.userId }, { deviceToken: 1 }).exec((err, user) => {
      if (err) return cb(err, null);
      if (!user) {
        return cb(new Error('User not found'), null);
      }
      if (user.deviceToken) {
        const message = {
          to: user.deviceToken,
          notification: {
            title: notifyObj.subject,
            body: notifyObj.message,
          },
          data: {
            message: notifyObj.message,
            action: 'PUSH',
            jsonData: '',
            status: notifyObj.status,
          },
        };

        fcm.send(message, (err, response) => {
          if (err) return cb(err, null);
          return cb(null, response);
        });
      }
    });
  },

  friendRequestAccepted: (notifyObj, cb) => {
    const fcm = new Fcm(serverKey);
    UserModel.findOne({ _id: notifyObj.userId }, { deviceToken: 1 }).exec((err, user) => {
      if (err) return cb(err, null);
      if (!user) {
        return cb(new Error('User not found'), null);
      }
      if (user.deviceToken) {
        const message = {
          to: user.deviceToken,
          notification: {
            title: notifyObj.subject,
            body: notifyObj.message,
          },
          data: {
            message: notifyObj.message,
            action: 'PUSH',
            jsonData: '',
            status: notifyObj.status,
          },
        };

        fcm.send(message, (err, response) => {
          if (err) return cb(err, null);
          return cb(null, response);
        });
      }
    });
  },

  subscribeToTopic: (deviceTokens, eventId, cb) => {
    const fcm = new Fcm('AAAAVlyXLrw:APA91bFln-9gTdozArs4Hr8iJeZmR-Tu8d07vrw3rZMWbKhAQeHh9sP2qfeJmDT_qZ7UUu5RTX6AWog13SCjjzGhIozZR1fEj9d2PwMV9bl93SjExgJlaEkFcb8eNmFiRr82NO0dpE_n');
    const deviceToken1 = ['fAirQenr78A:APA91bGqymb_EwkYxjJVps-5ABqtsKnKBegBERQCQ2NuJ0mreNtmZmpoi6JlZrWSh7Q52J1UG6o-0a54uSUbG-khkuIpLpuriu2KzLsn1lpc_wOLywNuH0_yGdvhypZN4Rt2wfh3el3X'];
    fcm.subscribeToTopic(deviceToken1, 'testTopic', (err, result) => {
      if (err) return cb(err);
      cb(null, result);
    });
  },

  unsubscribeToTopic: (deviceToken, eventId, cb) => {
    const fcm = new Fcm(serverKey);
    fcm.unsubscribeToTopic(deviceToken, 'event_' + eventId, (err, res) => {
      if (err) return cb(err);
      cb(null, res);
    });
  },

  sendInvites: (deviceTokens, eventName, cb) => {
    const fcm = new Fcm('AAAAVlyXLrw:APA91bFln-9gTdozArs4Hr8iJeZmR-Tu8d07vrw3rZMWbKhAQeHh9sP2qfeJmDT_qZ7UUu5RTX6AWog13SCjjzGhIozZR1fEj9d2PwMV9bl93SjExgJlaEkFcb8eNmFiRr82NO0dpE_n');
    let message = {
      to: '',
      notification: {
        title: 'Event Invite',
        body: 'You have been invited to ' + eventName + ' event',
      },
      data: {
        message: 'You have been invited to ' + eventName + ' event',
        action: 'PUSH',
        jsonData: '',
        status: 'true',
      },
    };

    async.forEach(deviceTokens, (dt, callback) => {
      message.to = dt;
      fcm.send(message, (err, response) => {
        if (err) callback(err, null);
        callback();
      });
    }, (err) => {
      if (err) return cb(err);
      cb(null, true);
    });
  },

  sendToTopic: (notifyObj, cb) => {
    const fcm = new Fcm(serverKey);
    const message = {
      to: '/topics/event_' + notifyObj.eventId,
      notification: {
        title: notifyObj.subject,
        body: notifyObj.message,
      },
      data: {
        message: notifyObj.message,
        action: 'PUSH',
        jsonData: '',
        status: notifyObj.status,
      },
    };

    fcm.send(message, (err, response) => {
      if (err) return cb(err, null);
      return cb(null, response);
    });
  },

  deleteEvent: (deviceTokens, eventId, cb) => {

  },

  sendPushNotification: (notifyObj, cb) => {
    const fcm = new Fcm(serverKey);
    async.waterfall([
      (callback) => {
        UserModel.findOne({ _id: notifyObj.senderId })
          .select({})
          .exec((err, sender) => {
            if (err) return callback(err);
            if (!sender) return callback(new Error('Sender not found'));
            return callback(null, sender);
          });
      },
      (sender, callback) => {
        UserModel.findOne({ _id: notifyObj.userId }, { deviceToken: 1 })
          .select({ deviceToken: 1, postNotifications: 1 })
          .exec((err, user) => {
            if (err) return cb(err, null);
            if (!user) {
              return cb(new Error('User not found'), null);
            }
            if (user.deviceToken) {
              const message = {
                to: user.deviceToken,
                notification: {
                  title: notifyObj.subject,
                  body: notifyObj.message,
                },
                data: {
                  message: notifyObj.message,
                  action: 'PUSH',
                  jsonData: '',
                  status: notifyObj.status,
                },
              };

              fcm.send(message, (err, response) => {
                if (err) return cb(err, null);
                return cb(null, response);
              });
            } else {
              return cb(null, true);
            }
          });
      },
    ],
      (err) => {
        if (err) {
          if (err.message === 'Sender not found') {
            return cb('Sender not found');
          }
          if (err.message === 'User not found') {
            return cb('User not found');
          }
          return cb(err);
        }
        return cb(null, true);
      });
  },
};
