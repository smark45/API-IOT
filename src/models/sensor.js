const {Schema, model} = require('mongoose');
const mongoose = require("mongoose");

const sensoresSchema = new Schema({
    idSensor: {type: Number, required: true},
    tipoSensor: {type: String, required: true},
    ubicacion: {type: String, required: true},
    estado: {type: String, required: true}
}, {
    versionKey: false
});

module.exports = mongoose.model('sensores', sensoresSchema);
