const {Router} = require('express');
const router = Router();

const tempHum = require('../controllers/tempHum.controller');

router.get('/viewTempHum', tempHum.viewTempHum);

router.get('/checkTempHum', tempHum.checkTempHum);

router.get('/checkTempHum1', tempHum.checkTempHum1);

router.get('/checkAllTemp', tempHum.checkAllTemp);

router.post('/addTempHum', tempHum.addTempHum);

module.exports = router;
