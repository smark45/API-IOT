const {Schema, model} = require('mongoose');
const mongoose = require("mongoose");

const temperatureSchema = new Schema({
    idSensorTemp: {type: Number, required: true},
    data: {type: Number, required: true},
    location: {type: String, required: true}
}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('temperature', temperatureSchema);

