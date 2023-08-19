import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import NewTask from './NewTask';

function MyTableComponent() {
  const apiUrl = 'https://flask-api-todo-fpc5.onrender.com/tarea';
  const [data, setData] = useState([]);
  const [searchId, setSearchId] = useState(''); 
  const [searchResult, setSearchResult] = useState(null); 

  useEffect(() => {
    getTasks();
  }, []);

  const getTasks = async () => {
    try {
      const response = await axios.get(apiUrl);
      const content = response.data.content;
      setData(content);
    } catch (error) {
      console.error('Error al obtener las tareas:', error);
    }
  }

  const handleCompleteTask = async (taskDescripcion, taskId) => {
    try {
      console.log('Intentando marcar la tarea como completada', taskId);
      await axios.put(`${apiUrl}/${taskId}`, { descripcion: taskDescripcion, estado: 'completado' });
      console.log('Tarea marcada como completada con éxito');
      getTasks();
    } catch (error) {
      console.error('Error al marcar la tarea como completada:', error);
    }
  }

  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(`${apiUrl}/${taskId}`);
      getTasks();
    } catch (error) {
      console.error('Error al eliminar la tarea:', error);
    }
  }

  const handleSearch = async () => {
    try {
      const response = await axios.get(`${apiUrl}/${searchId}`);
      const task = response.data; 
      setSearchResult(task);
    } catch (error) {
      console.error('Error al buscar la tarea por ID:', error,searchId);
      setSearchResult(null); 
    }
  }

  return (
    <div>
      <div className="container mt-3">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Buscar por ID..."
                aria-label="Buscar por ID..."
                aria-describedby="button-addon2"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
              />
              <button className="btn btn-primary" type="button" onClick={handleSearch}>
                Buscar
              </button>{' '}
              <Link to="/newTask" className="btn btn-primary">
                Añadir
              </Link>
            </div>
          </div>
        </div>
      </div>
      {searchResult ? (
        <div className="container mt-3">
          <h2>Resultado de la búsqueda:</h2>
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>DESCRIPCION</th>
                <th>ESTADO</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr key={searchResult.id}>
                <td>{searchResult.id}</td>
                <td>{searchResult.descripcion}</td>
                <td>
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={`flexSwitchCheckDefault_${searchResult.id}`}
                      checked={searchResult.estado === 'completado'}
                      readOnly
                    />
                  </div>
                </td>
                <td>
                  <button className="btn btn-success" onClick={() => handleCompleteTask(searchResult.descripcion, searchResult.id)}>
                    Completado
                  </button>
                  <button className="btn btn-danger" onClick={() => handleDeleteTask(searchResult.id)}>
                    Eliminar
                  </button>
                  <Link to={`/editTask/${searchResult.id}`} className="btn btn-warning">
                    Editar
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <div className="container mt-3">
          <h2>Lista de tareas:</h2>
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>DESCRIPCION</th>
                <th>ESTADO</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.map(item => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.descripcion}</td>
                  <td>
                    <div className="form-check form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id={`flexSwitchCheckDefault_${item.id}`}
                        checked={item.estado === 'completado'}
                        readOnly
                      />
                    </div>
                  </td>
                  <td>
                    <button className="btn btn-success" onClick={() => handleCompleteTask(item.descripcion, item.id)}>
                      Completado
                    </button>
                    <button className="btn btn-danger" onClick={() => handleDeleteTask(item.id)}>
                      Eliminar
                    </button>
                    <Link to={`/editTask/${item.id}`} className="btn btn-warning">
                      Editar
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default MyTableComponent;
