import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type Cita = {
  id: string;
  mascota: string;
  fecha: string;
  hora: string;
};

export default function HomePage() {
  const [citas, setCitas] = useState<Cita[]>([]);

  useEffect(() => {
    document.title = "Inicio | Veterinaria";

    // Aquí iría tu fetch a la API https://veterinaria-mine.vercel.app/api/citas/
    // fetch("http://localhost:3000/citas")
    //   .then(res => res.json())
    //   .then(data => setCitas(data));
  }, []);

  return (
    <div className="card page">
      <div
        className="container"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <div className="description">
          <h1 className="h1">Citas</h1>
          <p className="p">Selecciona un módulo para consultar su API.</p>
        </div>

        <div className="add dates">
          <Link className="btnadd" to="/agregar-citas">
            <span style={{ marginRight: "8px" }}>+</span>Agregar
          </Link>
        </div>
      </div>

      <div className="grid">
        {citas.length === 0 ? (
          <p style={{ textAlign: "center", marginTop: "20px", opacity: 0.7 }}>
             No hay ninguna cita programada
          </p>
        ) : (
          citas.map((cita) => (
            <div key={cita.id} className="card">
              <h3>{cita.mascota}</h3>
              <p>📅 {cita.fecha}</p>
              <p>⏰ {cita.hora}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
