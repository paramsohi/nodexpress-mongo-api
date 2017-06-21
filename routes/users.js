var express = require('express');
var router = express.Router();

const userController = require('../controllers/UserController');
const authentication = require('../middlewares/userToken');

/* GET users listing. */
router.post('/login', userController.login);
router.post('/register', userController.register);
router.post('/forgot-password', userController.forgotPassword);
router.post('/change-password', authentication, userController.changePassword);
router.put('/users/:userId', authentication, userController.updateProfile);
router.get('/users/:userId', authentication, userController.getUser);
router.delete('/users/:userId', authentication, userController.deleteUser);

module.exports = router;
