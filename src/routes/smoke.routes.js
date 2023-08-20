const {Router} = require('express');

const router = Router();

const smokeCtrl = require('../controllers/smoke.controller');

router.post('/addSmoke', smokeCtrl.addSmoke);

router.get('/viewSmoke', smokeCtrl.viewSmoke);

router.get('/checkSmoke', smokeCtrl.checkSmoke);

module.exports = router;