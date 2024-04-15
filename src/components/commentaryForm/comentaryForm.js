import React, { useState } from 'react';
import axios from 'axios';
import './commentaryForm.css';

const CommentaryForm = ({id}) => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    mensaje: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:5000/comentarios/${id}`, formData);
      console.log('Comentario enviado:', response.data);
      setFormData({
        nombre: '',
        email: '',
        mensaje: '',
      });
    } catch (error) {
      console.error('Error al enviar comentario:', error);
    }
  };  

  return (
    <div className="contact-container">
      <h2>Ingrese su Comentario</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Nombre</label>
          <input
            type="text"
            id="name"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="message">Mensaje</label>
          <textarea
            id="message"
            name="mensaje"
            value={formData.mensaje}
            onChange={handleChange}
            className="message-box"
            required
          ></textarea>
        </div>

        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default CommentaryForm;
