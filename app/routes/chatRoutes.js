const express = require('express');
const router = express.Router();

const chat = require('../controllers/chatController');
const auth = require('../../config/middleware/authorization');

router.get('/', auth.requiresLogin, chat.chat);

module.exports = router;