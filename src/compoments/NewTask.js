import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
function NewTask() {
  const [descripcion, setDescripcion] = useState('');
  const [estado, setEstado] = useState('pendiente');
  const [successMessage, setSuccessMessage] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newTaskData = {
        descripcion: descripcion,
        estado: estado,
      };

      await axios.post('https://flask-api-todo-fpc5.onrender.com/tarea', newTaskData)
      setSuccessMessage('La tarea se creo correctamente.');

      setDescripcion('');
      setEstado('');
    } catch (error) {
      console.error('Error al enviar los datos a la API:', error);
    }
  };

  return (
    <div className="container">
      <h1>New Task</h1>
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
      
        <button type="submit" className="btn btn-primary">
          Save
        </button>{' '} {/* Espacio en blanco */}
        <Link to="/" className="btn btn-primary">
        Home
      </Link>
      </form>
    </div>
  );
}

export default NewTask;
