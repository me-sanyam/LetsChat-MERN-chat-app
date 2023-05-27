const express = require('express');
const router = express.Router();

const { authenticated } = require('../middleware/authentication');

const {
    sendmessage,
    getallmessages
} = require('../controllers/messageController');


router.route('/', authenticated, sendmessage)