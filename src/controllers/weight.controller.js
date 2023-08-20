//En los controladores se crean los metodos para poder utilizarlos en otra parte de node
//Rutas para pesos de la bascula con sus respectivos metodos

const weightCtrl = {};

const http = require('https');
const weight = require('../models/weight');
const dbNoSQL = require('../dbNoSQL');

//Mostrar todos los pesos en la BD
weightCtrl.viewWeight = async (req, res) => {
    dbNoSQL.connectdbNoSQL();
    const view = await weight.find();
    res.status(200).json(view);
    res.end();
};

//Visualiza en tiempo real el sensor
weightCtrl.checkWeight = (req,res) =>{
    // Envía una solicitud GET al ESP32 atraves de ngrok
    http.get(`${process.env.IOT_URL}/peso`, (response) => {
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
}

module.exports = weightCtrl;
