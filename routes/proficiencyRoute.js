const express = require('express');
const proficiencyController = require('../controllers/proficiencyController');

const router = express.Router();

router.route('/').post(proficiencyController.createProficiency);
router.route('/:id').delete(proficiencyController.deleteProficiency);

module.exports = router;