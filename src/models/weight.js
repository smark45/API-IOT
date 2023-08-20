const {Schema, model} = require('mongoose');
const mongoose = require("mongoose");

const weightSchema = new Schema({
    idMachine: {type: Number, required: true},
    weight: {type: Number, required: true},
}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('weight', weightSchema);

