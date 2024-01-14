const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  imagen: { type: String, required: true },
  descripcion: { type: String, required: true },
  precio: {
    type: Number,
    min: 0
  }
});

const Producto = mongoose.model('Producto', productoSchema);

module.exports = Producto;