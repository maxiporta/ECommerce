import React, { useEffect, useState } from 'react';
import axios from 'axios';
import socketIOClient from 'socket.io-client';

const ENDPOINT = 'http://localhost:5000';
const socket = socketIOClient(ENDPOINT);

const Commentaries = ({ id }) => {
  const [commentaries, setCommentaries] = useState([]);

  useEffect(() => {
    const fetchCommentaries = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/comentarios/${id}`);
        setCommentaries(response.data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchCommentaries();
    
    socket.on('nuevoComentario', (nuevoComentario) => {
      if (nuevoComentario.producto === id) {
        setCommentaries([...commentaries, nuevoComentario]);
      }
    });

    socket.on('eliminarComentario', (idComentario) => {
      setCommentaries(commentaries.filter((commentary) => commentary._id !== idComentario));
    });

    return () => {
      socket.off('nuevoComentario');
      socket.off('eliminarComentario');
    };
  }, [id, commentaries]);

  return (
    <div className="commentaries-container">
      <h2>Comentarios</h2>
      <div>
        {commentaries.map((commentary) => (
          <div key={commentary._id}>
            <strong>{commentary.nombre}</strong>: {commentary.mensaje}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Commentaries;
