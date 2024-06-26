const express = require('express');

const { auth } = require('../middlewares/auth.middleware');
const validate = require('../middlewares/validate.middleware');
const upload = require('../middlewares/multer.middleware');
const authValidation = require('../validations/auth.validation');
const authController = require('../controllers/auth.controller');

const authRoute = express.Router();

authRoute.post('/register', validate(authValidation.register), authController.register);

authRoute.post('/login', validate(authValidation.login), authController.login);

authRoute.get('/me', auth, authController.getMe);

authRoute.put(
  '/me',
  auth,
  upload.single('avatar'),
  validate(authValidation.updateProfile),
  authController.updateProfile,
);

authRoute.post('/change-password', auth, validate(authValidation.changePassword), authController.changePassword);

module.exports = authRoute;
