const { Schema, model } = require('mongoose');

const schema = new Schema({
    id_usuario: {type: String, required: true},
    nombre: {type: String, required: true},
    empresa: {type: String, required: true},
    correo: {type: String, required: true},
    telefono: {type: String, required: true}
},{
    timestamps: true
});

module.exports = model('clientes', schema);