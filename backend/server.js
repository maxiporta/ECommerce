const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

// Modelos
const Producto = require('./models/product/productModel');
//const Usuario = require('./models/user/userModel');

const app = express();

app.use(express.json())
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Conectar a MongoDB
mongoose.connect('mongodb://localhost:27017/nombre-de-tu-base-de-datos', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Multer Configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads'); // Specify the destination folder
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Define the filename
  }
});

const upload = multer({ storage: storage }); // Use upload middleware after defining it

// // Usuarios
// app.get('/usuarios', async (req, res) => {
//   try {
//     const usuarios = await Usuario.find();
//     res.json(usuarios);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// app.post('/usuarios', async (req, res) => {
//   try {
//     const { nombre, email } = req.body;
//     const nuevoUsuario = new Usuario({ nombre, email });
//     await nuevoUsuario.save();
//     res.status(201).json(nuevoUsuario); // 201 significa "Creado"
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// app.delete('/usuarios/:id', async (req, res) => {
//   try {
//     const usuarioEliminado = await Usuario.findByIdAndDelete(req.params.id);
//     if (usuarioEliminado) {
//       res.json({ mensaje: 'Usuario eliminado correctamente' });
//     } else {
//       res.status(404).json({ mensaje: 'Usuario no encontrado' });
//     }
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// Productos
app.get('/productos', async (req, res) => {
  try {
    const productos = await Producto.find();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/productos', upload.single('imagen'), async (req, res) => {
  try {
    const { nombre, descripcion, precio } = req.body;
    const imagen = req.file ? req.file.filename : null;

    const nuevoProducto = new Producto({ nombre, imagen, descripcion, precio });
    await nuevoProducto.save();

    res.status(201).json(nuevoProducto);
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

// Carrito

// ver la información
app.get('/carrito', (req, res) => {
  res.sendFile(path.join(__dirname, 'path_to_your_cart_page.html'));
});

// agregar producto
app.post('/carrito/agregar', async (req, res) => {
  try {
    const { productId} = req.body;

    // verificar si el producto existe
    const producto = await Producto.findById(productId);
    if (!producto) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }
    res.status(200).json({ mensaje: 'Producto agregado al carrito correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Iniciar el servidor
const puerto = 5000;
app.listen(puerto, () => {
  console.log(`Servidor en ejecución en el puerto ${puerto}`);
});