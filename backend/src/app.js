const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const cloudinary = require('cloudinary').v2;
const app = express();

//Middlewares
dotenv.config();
app.use(cors());
app.use(express.json());

//Configuracion de cloudinary
cloudinary.config({
    cloud_name: "dnrfswnwp",
    api_key: "921266923712888",
    api_secret: "aIqied7-eqpoNOEt_8TNv8TVbj0"
  });
  

//Asignacion de servidor
app.set('port', process.env.PORT || 4000);

//Rutas
app.use('/api/empresa', require('./routes/empresa.route'));
app.use('/api/usuario', require('./routes/usuario.route'));
app.use('/api/cotizacion', require('./routes/cotizacion.route'));
app.use('/api/ticket', require('./routes/ticket.route'));
app.use('/api/item', require('./routes/item.route'));

module.exports = app;