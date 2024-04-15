import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Commentaries = ({id}) => {
  const [commentaries, setCommentaries] = useState([]);

  useEffect(() => {
    const fetchCommentaries = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/comentarios/${id}`);
        console.log(response.data);
        setCommentaries(response.data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchCommentaries();
  }, [id]);

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
