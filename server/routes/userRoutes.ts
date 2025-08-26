import express from 'express';

const { registerUser, loginUser, logoutUser } = require('../controllers/userController');

const router = express.Router()

router.post('/registerUser',registerUser)
router.post('/loginUser',loginUser)
router.get('/logout',logoutUser)

module.exports = router