import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    // Hacer la solicitud GET al servidor
    axios.get('http://localhost:5000/usuarios')
      .then(response => {
        setUsuarios(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []); // El segundo argumento del useEffect ([]) asegura que la solicitud se haga solo una vez

  return (
    <div>
      <h1>Usuarios</h1>
      <ul>
        {usuarios.map(usuario => (
          <li key={usuario._id}>{usuario.nombre} - {usuario.email}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
