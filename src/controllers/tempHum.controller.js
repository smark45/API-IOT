const tempHum = {};
const dbNoSQL = require('../dbNoSQL');
const temperature = require('../models/temperature');
const http = require('https');
const axios = require('axios');

//Busqueda de temperatura
//Agregar temperatura a la base de datos
tempHum.addTempHum = async (req, res) => {
    dbNoSQL.connectdbNoSQL();
    const {idSensor, temp, ubicacion} = req.body;
    const fecha = new Date();
    const add = new temperature({idSensorTemp: idSensor, data: temp, location: ubicacion});
    add.save();
    try {
        const message = '¡Alerta de temperatura!';
        const response = await axios.post(`${process.env.API_alerta}`, {message});
        console.log(response.data);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Error al enviar la petición');
    }
    res.status(201).json({"Message": "Alert Temp"});
    res.end();
};
//Obtener todas las temperaturas de la BD
tempHum.viewTempHum = async (req, res) => {
    dbNoSQL.connectdbNoSQL();
    const view = await temperature.find();
    res.status(200).json(view);
    res.end();
};

//Obtener en tiempo real las temperaturas
tempHum.checkTempHum = (req, res) => {
    // Envía una solicitud GET al ESP32 atraves de ngrok
    http.get(`${process.env.IOT_URL_Temp}/temp1`, (response) => {
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

tempHum.checkTempHum1 = (req, res) => {
    // Envía una solicitud GET al ESP32 atraves de ngrok
    http.get(`${process.env.IOT_URL_Temp}/temp2`, (response) => {
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

tempHum.checkAllTemp = (req, res) => {
    http.get(`${process.env.IOT_URL_Temp}/temp1`, (response) => {
        let data = '';
        response.on('data', (chunk) => {
            data += chunk;
        });
        response.on('end', () => {
            try {
                const temp1 = JSON.parse(data);
                // Obtiene la segunda lectura del sensor después de obtener la primera
                http.get(`${process.env.IOT_URL_Temp}/temp2`, (response2) => {
                    let data2 = '';
                    response2.on('data', (chunk2) => {
                        data2 += chunk2;
                    });
                    response2.on('end', () => {
                        try {
                            const temp2 = JSON.parse(data2);
                            // Combina las dos lecturas en un solo objeto JSON
                            const combinedData = {
                                temperature1: temp1.temp1,
                                temperature2: temp2.temp2
                            };
                            // Envía el JSON combinado como respuesta
                            res.json(combinedData);
                        } catch (error) {
                            console.error(error.message);
                            res.status(500).send('Error al obtener la segunda lectura del sensor');
                        }
                    });
                }).on('error', (error2) => {
                    console.error(error2.message);
                    res.status(500).send('Error al obtener la segunda lectura del sensor');
                });
            } catch (error) {
                console.error(error.message);
                res.status(500).send('Error al obtener la primera lectura del sensor');
            }
        });
    }).on('error', (error) => {
        console.error(error.message);
        res.status(500).send('Error al obtener la primera lectura del sensor');
    });
};

module.exports = tempHum;
