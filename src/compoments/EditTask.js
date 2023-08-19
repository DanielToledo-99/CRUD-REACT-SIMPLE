import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams, Link } from 'react-router-dom';

function EditTask() {
  const { id } = useParams(); 
  const [task, setTask] = useState({});
  const [descripcion, setDescripcion] = useState('');
  const [estado, setEstado] = useState('');

  useEffect(() => {
    
    const fetchTask = async () => {
      try {
        const response = await axios.get(`https://flask-api-todo-fpc5.onrender.com/tarea/${id}`);
        setTask(response.data);
        setDescripcion(response.data.descripcion);
        setEstado(response.data.estado);
      } catch (error) {
        console.error('Error al cargar los detalles de la tarea:', error);
      }
    };

    fetchTask();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const updatedTaskData = {
        descripcion: descripcion,
        estado: estado,
      };

      
      await axios.put(`https://flask-api-todo-fpc5.onrender.com/tarea/${id}`, updatedTaskData);

      
    } catch (error) {
      console.error('Error al enviar los datos de actualización a la API:', error);
    }
  };

  return (
    <div className="container">
      <h1>Edit Task</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="descripcion" className="form-label">
            DESCRIPCION
          </label>
          <input
            type="text"
            className="form-control"
            id="descripcion"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="estado" className="form-label">
            ESTADO
          </label>
          <input
            type="text"
            className="form-control"
            id="estado"
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Save
        </button>{' '}
        <Link to="/" className="btn btn-primary">
          Cancel
        </Link>
      </form>
    </div>
  );
}

export default EditTask;
