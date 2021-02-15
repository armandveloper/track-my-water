const { Router } = require('express');
const waterTankCtrl = require('../controllers/waterTank.controller');

const router = Router();

router.get('/last', waterTankCtrl.getLastRecord);
router.get('/', waterTankCtrl.getRecords);
router.post('/', waterTankCtrl.recordWaterLevel);

module.exports = router;
