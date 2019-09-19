const express = require('express');
const AskController = require('../controllers/askController');
const router = express.Router();

router.get('/', AskController.findAll);
router.post('/', AskController.store);

router.get('/:id', AskController.findOne);
router.patch('/:id', AskController.update);
router.delete('/:id', AskController.delete);

module.exports = router;
