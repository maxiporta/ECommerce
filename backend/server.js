const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Modelos
const Producto = require('./models/product/productModel');
const Categoria = require('./models/categories/categoryModel');

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
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

// Productos
app.get('/productos', async (req, res) => {
  try {
    const productos = await Producto.find();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/product/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const producto = await Producto.findById(id);
    if (!producto) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }
    res.json(producto);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.post('/productos', upload.single('imagen'), async (req, res) => {
  try {
    const { nombre, descripcion, precio, categoria, destacado } = req.body;
    const imagen = req.file ? req.file.filename : null;

    
    const categoriaExiste = await Categoria.findOne({ nombre: categoria });
    if (!categoriaExiste) {
      return res.status(400).json({ error: 'CATEGORIA NO ENCONTRADA' });
    }

    const nuevoProducto = new Producto({ nombre, imagen, descripcion, precio, categoria: categoriaExiste._id, destacado });
    await nuevoProducto.save();

    res.status(201).json(nuevoProducto);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const eliminarArchivo = (nombreArchivo) => {
  fs.unlink(`./uploads/${nombreArchivo}`, (err) => {
    if (err) {
      console.error('Error al eliminar el archivo:', err);
    } else {
      console.log('Archivo eliminado correctamente');
    }
  });
};

app.put('/productos/:id', upload.single('imagen'), async (req, res) => {
  try {
    const { nombre, descripcion, precio, categoria, destacado } = req.body;
    const imagen = req.file ? req.file.filename : null;

    const updatedFields = {
      nombre: nombre.trim(),
      descripcion: descripcion.trim(),
      precio: precio.trim(),
      destacado: destacado.trim(),
    };

    const filteredFields = Object.entries(updatedFields).reduce((acc, [key, value]) => {
      if (value !== '') {
        acc[key] = value;
      }
      return acc;
    }, {});

    if (imagen) {
      filteredFields.imagen = imagen;
    }

    if (categoria.trim() !== '') {
      const categoriaExistente = await Categoria.findOne({ nombre: categoria });
      if (categoriaExistente) {
        filteredFields.categoria = categoriaExistente._id;
      }
    }

    const productoModificado = await Producto.findOneAndUpdate(
      { _id: req.params.id },
      { $set: filteredFields },
      { new: true }
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
      eliminarArchivo(productoEliminado.imagen);
      res.json({ mensaje: 'Producto eliminado correctamente' });
    } else {
      res.status(404).json({ mensaje: 'Producto no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/productos-destacados', async (req, res) => {
  try {
    const productosDestacados = await Producto.find({ destacado: true });
    res.json(productosDestacados);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Categorias
app.post('/categorias', async (req, res) => {
  try {
    const { nombre } = req.body;
    const nuevaCategoria = new Categoria({ nombre });
    await nuevaCategoria.save();
    res.status(201).json(nuevaCategoria);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/categorias', async (req, res) => {
  try {
    const categorias = await Categoria.find().sort({ nombre: 1 });
    res.json(categorias);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/categorias/:id', async (req, res) => {
  try {
    const { nombre } = req.body;
    const categoriaActualizada = await Categoria.findByIdAndUpdate(req.params.id, { nombre }, { new: true });
    res.json(categoriaActualizada);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/categorias/:id', async (req, res) => {
  try {
    await Categoria.findByIdAndDelete(req.params.id);
    res.json({ mensaje: 'Categoría eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Iniciar el servidor
const puerto = 5000;
app.listen(puerto, () => {
  console.log(`Servidor en ejecución en el puerto ${puerto}`);
});
