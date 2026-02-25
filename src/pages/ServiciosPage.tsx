import { useEffect, useState } from "react";

type Servicio = {
  id_servicios: string;
  Tipos_servicios: string;
  Disponibilidad: string;
  Horario: string;
  Encargado: string;
  Numero_pacientes: string;
};

export default function ServiciosPage() {
  const [data, setData] = useState<Servicio[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Servicios | Veterinaria";

    const consultar = async () => {
      try {
        const res = await fetch(
          "https://veterinaria-mine.vercel.app/api/infoservicios"
        );
        if (!res.ok) throw new Error("Error al consultar la API");

        const json: Servicio[] = await res.json();
        setData(json);
      } catch (e) {
        setError("No se pudo obtener la información de infoservicios");
      } finally {
        setLoading(false);
      }
    };

    consultar();
  }, []);

  return (
    <div className="card page">
      <h1 className="h1">Servicios</h1>
      <p className="p">Servicios disponibles en la veterinaria.</p>
      <div className="add dates" >
        <a className="btnadd" href="/agregar-servicios" data-discover="true">
          <span style={{ marginRight: "8px" }}>+</span>Agregar
        </a>
      </div>

      {loading && <p className="p">Cargando información...</p>}
      {error && <p className="error">{error}</p>}

      {data.length > 0 && (
        <div className="tableWrap">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Tipo de servicio</th>
                <th>Disponibilidad</th>
                <th>Horario</th>
                <th>Encargado</th>
                <th>Número de pacientes</th>
              </tr>
            </thead>
            <tbody>
              {data.map((s) => (
                <tr key={s.id_servicios}>
                  <td>{s.id_servicios}</td>
                  <td>{s.Tipos_servicios}</td>
                  <td>{s.Disponibilidad}</td>
                  <td>{s.Horario}</td>
                  <td>{s.Encargado}</td>
                  <td>{s.Numero_pacientes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
