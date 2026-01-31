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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = "Info Personal | Veterinaria";
  }, []);

  const obtenerInfo = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await fetch("https://veterinaria-steel.vercel.app/api/infoPersonal");
      if (!res.ok) throw new Error("Error al consultar la API");

      const json: Personal[] = await res.json();
      setData(json);
    } catch (err) {
      setError("No se pudo obtener la información");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card" style={{ padding: 18 }}>
      <h1 className="h1">Información del Personal</h1>
      <p className="p">Consulta y visualiza los registros desde la API.</p>

      <div style={{ marginTop: 12 }}>
        <button className="btn btnPrimary" onClick={obtenerInfo}>
          Consultar API
        </button>
      </div>

      {loading && <p style={{ marginTop: 12 }}>Cargando...</p>}
      {error && <p style={{ color: "#ff6b6b", marginTop: 12 }}>{error}</p>}

      {data.length > 0 && (
        <div className="tableWrap">
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
