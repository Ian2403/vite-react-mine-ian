import { useEffect, useState } from "react";

type Personal = {
  id: string;
  Nombre: string;
  Edad: number;
  Altura: string;
  Sexo: string;
  Estudios: string;
};

export default function InfoPersonalPage() {
  const [data, setData] = useState<Personal[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  useEffect(() => {
    document.title = "Info Personal | Veterinaria";

    const consultar = async () => {
      try {
        setError("");
        setLoading(true);

        const res = await fetch("https://veterinaria-mine.vercel.app/api/infoPersonal");
        if (!res.ok) throw new Error("Error al consultar la API de infoPersonal");

        const json: Personal[] = await res.json();
        setData(json);
      } catch (e) {
        setError("No se pudo obtener la información del personal");
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    consultar();
  }, []);

  return (
    <div className="card page">
      <div className="container" style={{ display: "flex", alignItems: "center", gap: "12px", flexDirection: "row", alignContent: "center", flexWrap: "nowrap", justifyContent: "space-between" }}>
        <div className="description ">
        <h1 className="h1">Información del Personal</h1>
        <p className="p">Consulta y visualiza los registros desde la API.</p>
        </div>
        <div className="add dates" >
          <a className="btnadd" href="/agregar-info-personal" data-discover="true">
            <span style={{ marginRight: "8px" }}>+</span>Agregar
          </a>

        </div>
      </div>

      {loading && (
        <p className="p" style={{ marginTop: 12 }}>
          Cargando información...
        </p>
      )}

      {error && <p className="error">{error}</p>}

      {!loading && !error && data.length === 0 && (
        <p className="p" style={{ marginTop: 12 }}>
          No hay registros para mostrar.
        </p>
      )}

      {data.length > 0 && (
        <div className="tableWrap" style={{ marginTop: 14 }}>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Edad</th>
                <th>Altura</th>
                <th>Sexo</th>
                <th>Estudios</th>
              </tr>
            </thead>

            <tbody>
              {data.map((p) => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{p.Nombre}</td>
                  <td>{p.Edad}</td>
                  <td>{p.Altura}</td>
                  <td>{p.Sexo}</td>
                  <td>{p.Estudios}</td>
                  <td style={{ position: "relative" }}>
                    <button
                      className="menu-btn"
                      onClick={() =>
                        setOpenMenuId(openMenuId === p.id ? null : p.id)
                      }
                    >
                      <span className="dots">⋮</span>
                    </button>
                    {openMenuId === p.id && (
                      <div className="menu">
                        <button /* … */>Editar</button>
                        <button /* … */>Eliminar</button>
                      </div>
                    )}
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
