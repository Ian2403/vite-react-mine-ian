import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type Servicio = {
  id_servicios: string;
  tipos_servicios: string;
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
        console.log(json); 
        setData(json);
      } catch (e) {
        setError("No se pudo obtener la información de infoservicios");
      } finally {
        setLoading(false);
      }
    };

    consultar();
  }, []);

  const eliminarRegistro = async (id_servicios: string) => {
    try {
      await fetch(
        `https://veterinaria-mine.vercel.app/api/infoservicios/${id_servicios}`,
        {
          method: "DELETE",
        }
      );

      setData((prev) =>
        prev.filter((p) => p.id_servicios !== id_servicios)
      );
    } catch (error) {
      console.error("Error al eliminar:", error);
    }
  };

  const navigate = useNavigate();

  return (
    <div className="card page">
      <div
        className="container"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          justifyContent: "space-between",
        }}
      >
        <div className="description">
          <h1 className="h1">Servicios</h1>
          <p className="p">Servicios disponibles en la veterinaria.</p>
        </div>

        <div className="add dates">
          <a className="btnadd" href="/agregar-servicios">
            <span style={{ marginRight: "8px" }}>+</span>
            Agregar
          </a>
        </div>
      </div>

      {loading && <p className="p">Cargando información...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && !error && (
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
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ textAlign: "center" }}>
                    No hay registros disponibles
                  </td>
                </tr>
              ) : (
                data.map((s) => (
                  <tr key={s.id_servicios}>
                    <td>{s.id_servicios}</td>
                    <td>{s.tipos_servicios}</td>
                    <td>{s.Disponibilidad}</td>
                    <td>{s.Horario}</td>
                    <td>{s.Encargado}</td>
                    <td>{s.Numero_pacientes}</td>
                    <td style={{ position: "relative" }}>


                        <div className="menu-container">
                          <button className="edit-button"
                             onClick={() => navigate(`/editar-servicio/${s.id_servicios}`)}>
                              Editar
                          </button>
                          <button className="edit-button"
                            onClick={() =>
                              eliminarRegistro(s.id_servicios)
                            }
                          >
                            Eliminar
                          </button>
                        </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
