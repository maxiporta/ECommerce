import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './creator.css';

const Creator = () => {
  const [categoria, setCategoria] = useState('');
  const [categoriaProducto, setCategoriaProducto] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState([]);
  const [nombreProducto, setNombreProducto] = useState('');
  const [descripcionProducto, setDescripcionProducto] = useState('');
  const [precioProducto, setPrecioProducto] = useState('');
  const [imagenProducto, setImagenProducto] = useState(null);
  const [destacado, setDestacado] = useState(false);

  useEffect(() => {
    const obtenerCategorias = async () => {
      try {
        const response = await fetch('http://localhost:5000/categorias');
        const data = await response.json();
        setCategoriaSeleccionada(data);
      } catch (error) {
        console.error('Error al obtener las categorías:', error);
      }
    };

    obtenerCategorias();
  }, []);

  const handleCategoriaChange = (event) => {
    setCategoria(event.target.value);
  };

  const handleCategoriaProductoChange = (event) => {
    setCategoriaProducto(event.target.value);
  };

  const handleNombreProductoChange = (event) => {
    setNombreProducto(event.target.value);
  };

  const handleDescripcionProductoChange = (event) => {
    setDescripcionProducto(event.target.value);
  };

  const handlePrecioProductoChange = (event) => {
    setPrecioProducto(event.target.value);
  };

  const handleImagenProductoChange = (event) => {
    setImagenProducto(event.target.files[0]);
  };

  const handleDestacadoChange = (event) => {
    setDestacado(event.target.checked);
  };

  const handleSubmitCategoria = async (event) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:5000/categorias', { nombre: categoria });
      alert('Categoría creada correctamente');
      setCategoria('');
    } catch (error) {
      alert('Error al crear la categoría');
      console.error(error);
    }
  };

  const handleSubmitProducto = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('nombre', nombreProducto);
    formData.append('descripcion', descripcionProducto);
    formData.append('precio', precioProducto);
    formData.append('categoria', categoriaProducto);
    formData.append('destacado', destacado);
    formData.append('imagen', imagenProducto);
  
    try {
      await axios.post('http://localhost:5000/productos', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Producto creado correctamente');
      setNombreProducto('');
      setDescripcionProducto('');
      setPrecioProducto('');
      setCategoriaProducto('');
      setDestacado('');
      setImagenProducto(null);
    } catch (error) {
      alert('Error al crear el producto');
      console.error(error);
    }
  };
  

  return (
    <div className="creator-container">
      <div className="card">
      <h2>Crear Categoría</h2>
        <form onSubmit={handleSubmitCategoria}>
          <input type="text" value={categoria} onChange={handleCategoriaChange} placeholder="Nombre de la categoría" />
          <button type="submit">Crear Categoría</button>
        </form>
      </div>

      <div className="card">
        <h2>Crear Producto</h2>
        <form onSubmit={handleSubmitProducto}>
          <input type="text" value={nombreProducto} onChange={handleNombreProductoChange} placeholder="Nombre del producto" />
          <input type="text" value={descripcionProducto} onChange={handleDescripcionProductoChange} placeholder="Descripción del producto" />
          <input type="number" value={precioProducto} onChange={handlePrecioProductoChange} placeholder="Precio del producto" />
          <select value={categoriaProducto} onChange={handleCategoriaProductoChange}>
            <option value="">Selecciona una categoría</option>
            {categoriaSeleccionada.map((cat) => (
                <option key={cat._id} value={cat.nombre}>{cat.nombre}</option>
            ))}
          </select>
          <input type="file" onChange={handleImagenProductoChange} />
          <label>
            Destacado:
            <input type="checkbox" checked={destacado} onChange={handleDestacadoChange} />
          </label>
          <button type="submit">Crear Producto</button>
        </form>
      </div>
    </div>
  );
};

export default Creator;
