const express = require('express');
const AnswareController = require('../controllers/answareController');
const router = express.Router();

router.get('/', AnswareController.findAll);
router.post('/', AnswareController.store);

router.get('/:id', AnswareController.findOne);
router.patch('/:id', AnswareController.update);
router.delete('/:id', AnswareController.delete);

module.exports = router;
