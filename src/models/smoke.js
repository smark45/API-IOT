const {Schema, model} = require('mongoose');
const mongoose = require("mongoose");

const smokeSchema = new Schema({
    idSensorSmoke: {type: Number, required: true},
    ppm: {type: Number, required: true},
    location: {type: String, required: true},
}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('smoke', smokeSchema);

