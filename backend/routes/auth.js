const express = require('express');
const { register, login, updateProfile } = require('../controllers/authController');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.put('/profile', authMiddleware, updateProfile);

module.exports = router;
