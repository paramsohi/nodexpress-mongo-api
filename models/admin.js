const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const crypto = require('crypto');

const algorithm = 'aes-256-ctr';
const secretKey = '91da9f8a-8ff0-453e-b9da-d693cb3983dc';

const emailValidator = (email) => {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
};

function encrypt(text, cb) {
  const cipher = crypto.createCipher(algorithm, secretKey);
  let crypted = cipher.update(text, 'utf8', 'hex');
  crypted += cipher.final('hex');

  return cb(crypted);
}

function decrypt(text, cb) {
  const decipher = crypto.createDecipher(algorithm, secretKey);
  let dec = decipher.update(text, 'hex', 'utf8');
  dec += decipher.final('utf8');
  return cb(dec);
}

const adminSchema = new Schema({
  name: { type: String, required: [true, 'name is required'] },
  email: { type: String, required: [true, 'email is required'], validate: { validator: emailValidator, message: `{VALUE} is not a valid email!` }, unique: true },
  password: { type: String, minlength: [8, 'password should have at least 8 characters'], maxlength: [20, 'password cannot have more than 20 characters'], required: [true, 'password is required!'] },
  profilePic: { type: String },
  otp: { type: String, default: '' },
  otpExpiresAt: { type: Date },
}, {
    timestamps: true,
  });

userSchema.pre('save', function (next) {
  const user = this;
  if (!user.isModified('password')) {
    return next();
  }
  encrypt(user.password, (hash) => {
    user.password = hash;
    next();
  });
});

userSchema.methods.comparePassword = (password, user, cb) => {
  decrypt(user.password, (decryptedPassword) => {
    if (password === decryptedPassword) {
      cb(null, true);
    } else {
      cb(new Error('Wrong password provided'));
    }
  });
};

userSchema.set('toObject');
userSchema.set('toJSON');
const User = mongoose.model('Admin', userSchema);
module.exports = User;