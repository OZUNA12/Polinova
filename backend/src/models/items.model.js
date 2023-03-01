const { Schema, model } = require('mongoose');

const schema = new Schema({
    id_doc: {type: String, required: true},
    cantidad: {type: Number, required: true},
    unidad: {type: String, required: true},
    articulo: {type: String, required: true},
    descripcion: {type: String, required: false},
    precioUnitario: {type: Number, required: true},
    importe: {type: Number, required: true},
    tipo: {type: String, required: true}
}, {
    timestamps: true
});

module.exports = model('items', schema);