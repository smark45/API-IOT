const {Schema, model} = require('mongoose');
const mongoose = require("mongoose");

const openSchema = new Schema({
    idSensorOpen: {type: Number, required: true},
    status: {type: Boolean, required: true},
    location: {type: String, required: true},
}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('open', openSchema);

