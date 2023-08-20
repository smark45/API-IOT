const openCtrl = {};
const open = require('../models/open');

const dbNoSQL = require('../dbNoSQL');
const http = require("http");
const axios = require("axios");

//Obtener las aperturas de la base de datos
openCtrl.viewOpen = async (req, res) => {
    dbNoSQL.connectdbNoSQL();
    const view = await open.find();
    res.status(200).json(view);
    res.end();
};
//Agregar apertura a la base de datos
openCtrl.addOpen = async (req, res) => {
    dbNoSQL.connectdbNoSQL();
    const {idSensor, estado, ubicacion} = req.body;
    const add = new open({idSensorOpen: idSensor, status: estado, location: ubicacion});
    add.save();
    try {
        const message = '¡Alerta de apertura!';
        const response = await axios.post(`${process.env.API_alerta}`, {message});
        console.log(response.data);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Error al enviar la petición');
    }
    res.status(201).json({"Message": "Alert Temp"});
    res.end();
};
//Ver en tiempo real el estado de apertura
openCtrl.checkOpen = (req, res) => {
    // Envía una solicitud GET al ESP32 atraves de ngrok
    http.get(`${process.env.IOT_URL}/open`, (response) => {
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


module.exports = openCtrl;