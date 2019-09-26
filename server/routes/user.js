const express = require('express');
const Usercontoller = require('../controllers/user')
const authentication = require('../middleware/authentication')
const router = express.Router();

router.post('/login' , Usercontoller.login )
router.post('/register' , Usercontoller.register )

router.get('/tags',authentication , Usercontoller.getUserTag )
router.patch('/tags',authentication , Usercontoller.updateTag )
module.exports = router