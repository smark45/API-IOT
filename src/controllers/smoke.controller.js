const http = require("http");
const dbNoSQL = require("../dbNoSQL");
const smoke = require("../models/smoke");
const axios = require("axios");


const smokeCtrl = {};
//Ver las alertas de humo
smokeCtrl.viewSmoke = async (req, res) => {
    dbNoSQL.connectdbNoSQL();
    const view = await smoke.find();
    res.status(200).json(view);
    res.end();
};
//Agergar alerta de humo
smokeCtrl.addSmoke = async (req, res) => {
    dbNoSQL.connectdbNoSQL();
    const {idSensor, particules, ubicacion} = req.body;
    const fecha = new Date();
    const add = new smoke({idSensorSmoke: idSensor, ppm: particules, location: ubicacion});
    add.save();
    try {
        const message = '¡Alerta de humo!';
        const response = await axios.post(`${process.env.API_alerta}`, {message});
        console.log(response.data);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Error al enviar la petición');
    }
    res.status(201).json({"Message": "Alert Temp"});
    res.end();
};
//Checar el estado del sensor en tiempo real
smokeCtrl.checkSmoke = (req, res) => {
    // Envía una solicitud GET al ESP32 atraves de ngrok
    http.get(`${process.env.IOT_URL}/smoke`, (response) => {
        let data = '';
        response.on('data', (chunk) => {
            data += chunk;
        });
        response.on('end', () => {
            // Parsea la respuesta JSON
            const json = JSON.parse(data);
            // Envía el JSON como respuesta
            res.json(json);
        });
    }).on('error', (error) => {
        console.error(error.message);
        res.status(500).send('Error al obtener la lectura del sensor');
    });
};

module.exports = smokeCtrl;