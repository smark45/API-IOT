const {Router} = require('express');

const router = Router();

const openCtrl = require('../controllers/open.controller');

router.get('/viewOpen', openCtrl.viewOpen);

router.post('/addOpen', openCtrl.addOpen);

router.get('/checkOpen', openCtrl.checkOpen);

module.exports = router;