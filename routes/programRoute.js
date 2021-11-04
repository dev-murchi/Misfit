const express = require('express');
const programController = require('../controllers/programController');
const roleMiddleware = require('../middlewares/roleMiddleware');

const router = express.Router();

router.route('/').post(roleMiddleware(['trainer', 'admin']), programController.createProgram);

router.route('/').get(programController.getAllPrograms);
router.route('/:slug').get(programController.getSingleProgramPage);

module.exports = router;