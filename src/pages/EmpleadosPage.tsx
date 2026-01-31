import { useEffect, useState } from "react";

type Empleado = {
  id_empleado: number;
  nombre: string;
  apellido: string;
  puesto: string;
  especialidad: string | null;
  telefono: string;
  email: string;
  fecha_contratacion: string;
  salario: string;
  activo: boolean;
};

export default function EmpleadosPage() {
  const [data, setData] = useState<Empleado[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = "Empleados | Veterinaria";
  }, []);

  const consultar = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await fetch("https://veterinaria-steel.vercel.app/api/empleadosinfo");
      if (!res.ok) throw new Error("Error al consultar la API de empleados");

      const json: Empleado[] = await res.json();
      setData(json);
    } catch (e) {
      setError("No se pudo obtener la información de empleados");
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const formatearFecha = (iso: string) => {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return iso;
    return d.toLocaleDateString();
  };

  return (
    <div className="card page">
      <h1 className="h1">Empleados</h1>
      <p className="p">Consulta y visualiza los registros desde la API.</p>

      <div className="actions">
        <button className="btn btnPrimary" onClick={consultar}>
          Consultar API
        </button>
      </div>

      {loading && <p className="p" style={{ marginTop: 12 }}>Cargando...</p>}
      {error && <p className="error">{error}</p>}

      {data.length > 0 && (
        <div className="tableWrap" style={{ marginTop: 14 }}>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Puesto</th>
                <th>Especialidad</th>
                <th>Teléfono</th>
                <th>Email</th>
                <th>Fecha</th>
                <th>Salario</th>
                <th>Activo</th>
              </tr>
            </thead>

            <tbody>
              {data.map((e) => (
                <tr key={e.id_empleado}>
                  <td>{e.id_empleado}</td>
                  <td>{e.nombre} {e.apellido}</td>
                  <td>{e.puesto}</td>
                  <td>{e.especialidad ?? "—"}</td>
                  <td>{e.telefono}</td>
                  <td>{e.email}</td>
                  <td>{formatearFecha(e.fecha_contratacion)}</td>
                  <td>{e.salario}</td>
                  <td>
                    <span className={`chip ${e.activo ? "chipGood" : "chipBad"}`}>
                      <span className="dot" />
                      {e.activo ? "Sí" : "No"}
                    </span>
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
