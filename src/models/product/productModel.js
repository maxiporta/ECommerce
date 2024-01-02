const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
  nombre: String,
  imagen: String,
  descripcion: String,
  precio: {
    type: Number,
    required: true,
    min: 0
  }
});

const Producto = mongoose.model('Producto', productoSchema);

module.exports = Producto;