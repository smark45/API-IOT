const {Router} = require('express');
const router = Router();

const weightCtrl = require('../controllers/weight.controller');

router.get('/viewWeight', weightCtrl.viewWeight);

router.get('/checkWeight', weightCtrl.checkWeight);

module.exports = router;