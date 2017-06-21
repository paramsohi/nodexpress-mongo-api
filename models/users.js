const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const crypto = require('crypto');

const algorithm = 'aes-256-ctr';
const secretKey = '91da9f8a-8ff0-453e-b9da-d693cb3983dc';

const emailValidator = (email) => {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
};

async function encrypt(text) {
  const cipher = crypto.createCipher(algorithm, secretKey);
  let crypted = cipher.update(text, 'utf8', 'hex');
  crypted += cipher.final('hex');

  return crypted;
}

function decrypt(text) {
  const decipher = crypto.createDecipher(algorithm, secretKey);
  let dec = decipher.update(text, 'hex', 'utf8');
  dec += decipher.final('utf8');
  return dec;
}

const userSchema = new Schema({
  email: { type: String, required: [true, 'email is required'], validate: { validator: emailValidator, message: `{VALUE} is not a valid email!` }, unique: [true, 'Email already exists'] },
  password: { type: String, minlength: [8, 'password should have at least 8 characters'], maxlength: [20, 'password cannot have more than 20 characters'], required: [true, 'password is required!'] },
  username: { type: String, required: [true, 'username is required'], unique: [true, 'username should be unique'] },
  profilePic: { type: String, default: '' },
  facebookId: { type: String, default: '' },
  phoneNumber: { type: String, default: '' },
  otp: { type: String, default: '' },
  otpExpiresAt: { type: Date, default: Date.now() },
  status: { type: String, enum: ['active', 'suspended', 'deleted'], default: 'active' },
  deviceToken: { type: String, default: '' },
}, {
    timestamps: true,
  });

userSchema.pre('save', async function (next) {
  const user = this;
  if (!user.isModified('password')) {
    return next();
  }
  const hash = await encrypt(user.password);
  user.password = hash;
  next();
});

userSchema.methods.comparePassword = async (password, user) => {
  const decryptedPassword = await decrypt(user.password);
  return password === decryptedPassword;
};

userSchema.set('toObject');
userSchema.set('toJSON');
const User = mongoose.model('User', userSchema);
module.exports = User;