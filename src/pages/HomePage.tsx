import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  useEffect(() => {
    document.title = "Inicio | Veterinaria";
  }, []);

  return (
    <div className="card page">
      <div className="container" style={{ display: "flex", alignItems: "center", gap: "12px", flexDirection: "row", alignContent: "center", flexWrap: "nowrap", justifyContent: "space-between" }}>
      <div className="description ">

        <h1 className="h1">Inicio</h1>
        <p className="p">Selecciona un módulo para consultar su API.</p>
      </div>
      <div className="add dates" >
        <a className="btnadd" href="/informacion-nueva" data-discover="true">
          <span style={{ marginRight: "8px" }}>+</span>Agregar
        </a>
      </div>
      </div>

      


      <div className="grid">
        <div className="card inner">
          <h3 className="h3">Información del Personal</h3>
          <p className="p">Consulta la API de infoPersonal (la que ya tenías).</p>
          <Link className="link" to="/info-personal">Ir →</Link>
        </div>

        <div className="card inner">
          <h3 className="h3">Animales</h3>
          <p className="p">Lista de animales con síntomas, dieta y vacunación.</p>
          <Link className="link" to="/animales">Ir →</Link>
        </div>

        <div className="card inner">
          <h3 className="h3">Empleados</h3>
          <p className="p">Información de empleados (puesto, salario, activo, etc.).</p>
          <Link className="link" to="/empleados">Ir →</Link>
        </div>

        <div className="card inner">
          <h3 className="h3">Servicios</h3>
          <p className="p">Servicios disponibles, horarios, encargado y número de pacientes.</p>
          <Link className="link" to="/servicios">Ir →</Link>
        </div>

      </div>
    </div>
  );
}
