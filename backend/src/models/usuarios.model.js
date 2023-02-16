const { Schema, model } = require('mongoose');

const schema = new Schema({
    nombre: {type: String, required: true},
    apellido: {type: String, required: true},
    id_empresa: {type: String, required: true},
    correo: {type: String, required: true},
    telefono: {type: String, required: true},
    password: {type: String, required: true},
    dios: {type: Boolean, required: false},
    admin: {type: Boolean, required: true},
    moderador: {type: Boolean, required: true},
    cotizaciones: {type: Boolean, required: true},
    tickets: {type: Boolean, required: true},
    activo: {type: Boolean, default: true}
},{
    timestamps: true
});

module.exports = model('usuarios', schema);