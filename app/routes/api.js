const express = require('express');

const router = express.Router();
const studentRoutes = require('./custom/student');
const teacherRoutes = require('./custom/teacher');
const classRoutes = require('./custom/class');

const healthController = require('../controllers/HealthController');

// const HomeController = require('../app/controllers/HomeController');
// const AuthController = require('../app/controllers/AuthController');

// router.get('/', HomeController.homePage);
// router.get('/login', AuthController.loginPage);
// router.post('/login', AuthController.login);
// router.post('/logout', AuthController.logout);
// router.get('/sign-up', AuthController.signUpPage);
// router.post('/sign-up', AuthController.signUp);
// router.get('/forgot-password', AuthController.forgotPasswordPage);
// router.post('/forgot-password', AuthController.forgotPassword);

router.use('/students', studentRoutes);
router.use('/teacher', teacherRoutes);
router.use('/class', classRoutes);

router.get('/health', (req, res) => {
    healthController.healthCheck(req, res);
});

module.exports = router;
