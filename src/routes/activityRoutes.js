
const express = require('express');
const activityController = require('../controllers/activityController');
const authMiddleware = require('../middleware/authMiddleware');
const validationMiddleware = require('../middleware/validationMiddleware');

const router = express.Router();

router.post('/add', activityController.addActivity);
router.put('/update/:id', activityController.updateActivity);
router.delete('/delete/:id', activityController.deleteActivity);
router.get('/', activityController.getAllActivities);
router.post('/filter', activityController.filterActivities);
router.get('/:id', activityController.getActivityById);
router.get('/imc/:imc', activityController.findByImc);
router.get('/category/:category', activityController.findByCategory);
router.get('/title/:title', activityController.findByTitle);
router.get('/ageGroup/:ageGroup', activityController.findByAgeGroup);
router.get('/age/:age', activityController.findByAge);
router.get('/goal/:goal', activityController.findByGoal);

module.exports = router;