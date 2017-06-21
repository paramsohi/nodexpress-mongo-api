const UserModel = require('../models/users');
const userModelMethod = new UserModel();
const jwtHelper = require('../helpers/jwtHelper');

module.exports = {
  login: async (req, res) => {
    const username = req.body.username;
    if (!username) return res.json({ status: 'error', message: 'username is required' });
    const password = req.body.password;
    if (!password) return res.json({ status: 'error', message: 'password is required' });
    const deviceToken = req.body.deviceToken || '';

    try {
      const userData = await UserModel.findOneAndUpdate({ $or: [{ username }, { email: username }] }, { $set: { deviceToken } }, { new: true });
      if (!userData || userData.status === 'deleted') return res.json({ status: 'error', message: 'user does not exist' });
      if (userData.status === 'suspended') {
        return res.json({ status: 'error', message: 'you have been suspended by the admin' });
      }
      const comparePassword = await userModelMethod.comparePassword(password, userData);
      console.log(comparePassword);
      if (!comparePassword) return res.json({ status: 'error', message: 'Wrong password provided' });
      userData.password = undefined;
      return res.json({ success: 'success', message: 'user logged in successfully', user: userData, token: jwtHelper.issueToken(userData._id, deviceToken) });
    } catch (errors) {
      console.log(errors);
      return res.json({ status: 'error', message: 'could not login', errors });
    }
  },

  register: async (req, res) => {
    const email = req.body.email;
    if (!email) return res.json({ status: 'error', message: 'email is required' });
    const username = req.body.username;
    if (!username) return res.json({ status: 'error', message: 'username is required' });
    const password = req.body.password;
    if (!password) return res.json({ status: 'error', message: 'password is required' });

    const User = new UserModel({
      email,
      password,
      username
    });
    try {
      const user = await User.save();
      return res.json({ status: 'success', message: 'user created successfully', user });
    } catch (errors) {
      if (errors.code === 11000) {
        return res.json({ status: 'error', message: 'User already exists', errors });
      }
      return res.json({ status: 'error', message: 'could not create user', errors });
    }
  },

  forgotPassword: () => {

  },

  changePassword: () => {

  },

  updateProfile: () => {

  },

  getUser: () => {

  },

  deleteUser: () => {

  },

};