const { Schema, model } = require('mongoose');

const schema = new Schema({
    nombre: {type: String, required: true},
    correo: {type: String, required: true},
    telefono: {type: String, required: false},
    pagina: {type: String, required: true},
    direccion: {type: String, required: true},
    folio_coti: {type: Number, required: true},    
    folio_ticket: {type: Number, required: true},
    condiciones:  {type: String, required: false},
    footer: {type: String, required: false},
    color: {type: String, required: false},

    img: {type: String, required: true},
    activo: {type: Boolean, default: true}
},{
    timestamps: true
});

module.exports = model('empresas', schema);