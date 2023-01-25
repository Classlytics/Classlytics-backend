const express = require('express');

const router = express.Router();
const studentController = require('../../controllers/StudentController');

// Student login router
router.get('/login', (req, res) => {
    studentController.login(req, res);
    res.status(200).json({ success: true, message: 'Student login Successful', jwt: '123' });
});

// Student Register router
router.post('/register', (req, res) => {
    studentController.createStudent(req, res);
});

module.exports = router;
