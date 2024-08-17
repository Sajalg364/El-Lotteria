const express = require('express');
const { createUser, markGrid, checkWin, clearUserData } = require('../controllers/userController');

const router = express.Router();

router.post('/create', createUser);
router.post('/clear', clearUserData);
router.post('/mark', markGrid);
router.post('/checkWin', checkWin);

module.exports = router;
