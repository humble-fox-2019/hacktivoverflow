const express = require('express');
const router = express.Router();
const { user_controller } = require('../controller');
const { Authenthication } = require('../middleware/index');

router.post('/register' , user_controller.Register );
router.post('/login' , user_controller.login);
router.get('/tag' , Authenthication , user_controller.getWatchTag)
router.patch('/tag' , Authenthication , user_controller.addWathcTag);

module.exports = router
