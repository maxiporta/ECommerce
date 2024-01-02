const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Modelos
const Producto = require('./src/models/product/productModel');
const Usuario = require('./src/models/user/userModel');

const app = express();

app.use(express.json())
app.use(cors());

// Conectar a MongoDB
mongoose.connect('mongodb://localhost:27017/nombre-de-tu-base-de-datos', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Usuarios
app.get('/usuarios', async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/usuarios', async (req, res) => {
  try {
    const { nombre, email } = req.body;
    const nuevoUsuario = new Usuario({ nombre, email });
    await nuevoUsuario.save();
    res.status(201).json(nuevoUsuario); // 201 significa "Creado"
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/usuarios/:id', async (req, res) => {
  try {
    const usuarioEliminado = await Usuario.findByIdAndDelete(req.params.id);
    if (usuarioEliminado) {
      res.json({ mensaje: 'Usuario eliminado correctamente' });
    } else {
      res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Productos
app.get('/productos', async (req, res) => {
  try {
    const productos = await Producto.find();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/productos', async (req, res) => {
  try {
    const { nombre, imagen, descripcion } = req.body;
    const nuevoProducto = new Producto({ nombre, imagen, descripcion });
    await nuevoProducto.save();
    res.status(201).json(nuevoProducto); // 201 significa "Creado"
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/productos/:id', async (req, res) => {
  try {
    const { nombre, imagen, descripcion, precio } = req.body;
    const productoModificado = await Producto.findOneAndUpdate(
      { _id: req.params.id },
      { nombre, imagen, descripcion, precio },
      { new: true } // Para devolver el documento modificado
    );
    res.json(productoModificado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/productos/:id', async (req, res) => {
  try {
    const productoEliminado = await Producto.findByIdAndDelete(req.params.id);
    if (productoEliminado) {
      res.json({ mensaje: 'Producto eliminado correctamente' });
    } else {
      res.status(404).json({ mensaje: 'Producto no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



// Ruta para agregar producto al carrito
app.post('/carrito/agregar', async (req, res) => {
  try {
    const { productId, userId } = req.body;
    
    // Verificar si el usuario existe (esto puede variar según tu lógica de autenticación)
    const usuario = await Usuario.findById(userId);
    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    // Verificar si el producto existe
    const producto = await Producto.findById(productId);
    if (!producto) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }

    // Agregar producto al carrito del usuario (esto también puede variar según tu lógica de negocio)
    usuario.carrito.push(producto);
    await usuario.save();

    res.status(200).json({ mensaje: 'Producto agregado al carrito correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ruta para eliminar producto del carrito
app.post('/carrito/eliminar', async (req, res) => {
  try {
    const { productId, userId } = req.body;

    // Verificar si el usuario existe
    const usuario = await Usuario.findById(userId);
    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    // Eliminar producto del carrito del usuario (esto también puede variar según tu lógica de negocio)
    usuario.carrito = usuario.carrito.filter(producto => producto.toString() !== productId);
    await usuario.save();

    res.status(200).json({ mensaje: 'Producto eliminado del carrito correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Iniciar el servidor
const puerto = 5000;
app.listen(puerto, () => {
  console.log(`Servidor en ejecución en el puerto ${puerto}`);
});