const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  nombre: { type: String, required: true },
});

const Categoria = mongoose.model('Categoria', categorySchema);

module.exports = Categoria;