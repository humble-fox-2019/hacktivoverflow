const router = require('express').Router();
const user = require('../controllers/user');
const { Authentication } = require('../middlewares/authentication');
router.post('/register', user.create);
router.post('/login', user.login);
router.use(Authentication);
router.get('/', user.info);
router.patch('/add', user.addWatcher);
router.patch('/remove', user.removeWatcher);

module.exports = router;