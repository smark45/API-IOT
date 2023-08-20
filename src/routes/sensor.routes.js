const {Router} = require('express');

const router = Router();

const sensorCtrl = require('../controllers/sensor.controller');

router.get('/viewSensor', sensorCtrl.viewSensor);

module.exports = router;