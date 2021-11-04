const express = require('express');
const programController = require('../controllers/programController');

const router = express.Router();

router.route('/').get(programController.getProgramsPage);
router.route('/:id').get(programController.getSingleProgramPage);

module.exports = router;