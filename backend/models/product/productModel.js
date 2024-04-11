const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  imagen: { type: String, required: true },
  descripcion: { type: String, required: true },
  categoria : { type: mongoose.Schema.Types.ObjectId, ref: 'Categoria', required: true },
  precio: {type: Number, min: 0},
  destacado: {type: Boolean, default: false}
});

const Producto = mongoose.model('Producto', productoSchema);

module.exports = Producto;