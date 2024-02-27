import './App.css';
import { useState } from "react"
import Axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState(0);
  const [pais, setPais] = useState("");
  const [cargo, setCargo] = useState("");
  const [anios, setAnios] = useState(0);
  const [id, setId] = useState(0);

  const [editar, setEditar] = useState(false);

  const [empleadosList, setEmpleados] = useState([]);

  const add = () => {
    Axios.post("http://localhost:3001/create", {
      nombre: nombre,
      edad: edad,
      pais: pais,
      cargo: cargo,
      anios: anios
    }).then(() => {
      getEmpleados();
      limpiarCampos();

      alert("Empleado registrado");
    });
  }

  const update = () => {
    Axios.put("http://localhost:3001/update", {
      id:id,
      nombre: nombre,
      edad: edad,
      pais: pais,
      cargo: cargo,
      anios: anios
    }).then(() => {
      getEmpleados();
      limpiarCampos();
      alert("Empleado actualizado");
    });
  }

  const limpiarCampos =()=>{
    setAnios("");
    setCargo("");
    setEdad("");
    setNombre("");
    setId("");
    setPais("");
    setEditar(false);

    
  }
  const editarEmpleado = (val) => {
    setEditar(true);

    setNombre(val.nombre);
    setEdad(val.edad);
    setCargo(val.cargo);
    setPais(val.pais);
    setAnios(val.anios);
    setId(val.id);
  }

  const getEmpleados = () => {
    Axios.get("http://localhost:3001/empleados").then((response) => {
      setEmpleados(response.data);
    });
  }


  
  getEmpleados();

  return (
    <div className='container'>

      <div className="card text-center">
        <div className="card-header">
          GESTION DE EMPELADOS
        </div>
        <div className="card-body">
          <div className="input-group mb-3">
            <span className="input-group-text" id="inputGroup-sizing-default">Nombre: </span>
            <input type="text" className="form-control" value={nombre} aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"
              onChange={(event) => {
                setNombre(event.target.value)
              }} />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="inputGroup-sizing-default">Edad: </span>
            <input type="text" className="form-control" value={edad} aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"
              onChange={(event) => {
                setEdad(event.target.value)
              }} />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="inputGroup-sizing-default">Pais: </span>
            <input type="text" className="form-control" value={pais} aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"
              onChange={(event) => {
                setPais(event.target.value)
              }} />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="inputGroup-sizing-default">Cargo: </span>
            <input type="text" className="form-control" value={cargo} aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"
              onChange={(event) => {
                setCargo(event.target.value)
              }} />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="inputGroup-sizing-default">Años de experiencia: </span>
            <input type="text" className="form-control" value={anios} aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"
              onChange={(event) => {
                setAnios(event.target.value)
              }} />
          </div>



        </div>
        <div className="card-footer text-body-secondary">
          {
            editar ?
              <div>
                <button className='btn btn-warning m-2' onClick={update}> Actualizar</button>
                <button className='btn btn-info' onClick={limpiarCampos}> Cancelar</button>
              </div>

              : <button className='btn btn-success' onClick={add}> Registrar</button>

          }

        </div>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Nombre</th>
            <th scope="col">Edad</th>
            <th scope="col">Pais</th>
            <th scope="col">Cargo</th>
            <th scope="col">Experiencia</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>

          {
            empleadosList.map((val, key) => {
              return <tr key={val.id}>
                <th scope="row"> {val.id}</th>
                <td> {val.nombre}</td>
                <td> {val.edad}</td>
                <td>{val.pais}</td>
                <td>{val.cargo}</td>
                <td>{val.anios}</td>
                <td>
                  <div className="btn-group" role="group" aria-label="Basic example">
                    <button type="button"
                      onClick={() => {
                        editarEmpleado(val);
                      }}
                      className="btn btn-info">Editar</button>
                    <button type="button" className="btn btn-danger">Elimnar</button>
                  </div>
                </td>
              </tr>
            })
          }


        </tbody>
      </table>

    </div>
  );
}

export default App;
