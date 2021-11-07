const express = require('express');
const programController = require('../controllers/programController');
const roleMiddleware = require('../middlewares/roleMiddleware');

const router = express.Router();

router.route('/').post(roleMiddleware(['trainer', 'admin']), programController.createProgram);

router.route('/').get(programController.getAllPrograms);
router.route('/:slug').get(programController.getSingleProgramPage);
router.route('/:slug').delete(programController.deleteProgram);
router.route('/:slug').put(programController.updateProgram);
router.route('/enroll').post(programController.enrollProgram);
router.route('/release').post(programController.releaseProgram);

module.exports = router;