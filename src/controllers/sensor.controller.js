const dbNoSQL = require('../dbNoSQL');
const sensores = require('../models/sensor');

const sensorCtrl = {};

sensorCtrl.viewSensor = async (req, res) => {
    dbNoSQL.connectdbNoSQL();
    const view = await sensores.find();
    res.status(200).json(view);
    res.end();
};

module.exports = sensorCtrl;
