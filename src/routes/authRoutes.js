const express = require('express');
const authController = require('../controllers/authController');
const verifyToken = require('../middlewares/verifyToken');
const authRoutes = express.Router()


authRoutes.post('/register',authController.createUser)
.post('/login',authController.loginUser)
.get('/user',verifyToken,authController.getAuthUser)


module.exports = authRoutes;