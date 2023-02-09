const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

const URI = process.env.MONGODB_URI
            ? process.env.MONGODB_URI
            : 'mongodb://127.0.0.1/test';

mongoose.connect(URI);

const connection = mongoose.connection;
connection.once('open', ()=>{
    console.log("La base de datos de lanzó en el puerto " + URI);
});