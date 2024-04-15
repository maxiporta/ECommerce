const mongoose = require('mongoose');

const commentarySchema = new mongoose.Schema({
  producto: { type: mongoose.Schema.Types.ObjectId, ref: 'Producto', required: true },
  nombre: { type: String, required: true },
  email: {type: String, required: true},
  mensaje: {type: String, required: true}
});

const Comentario = mongoose.model('Comentario', commentarySchema);

module.exports = Comentario;