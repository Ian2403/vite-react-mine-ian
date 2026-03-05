import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type Animal = {
  id: string;
  Animal: string;
  Raza: string;
  Nombre: string;
  Años: string;
  Sintomas: string;
  Vacunación: boolean;
  Dieta: string;
};

export default function AnimalesPage() {
  const [data, setData] = useState<Animal[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Animales | Veterinaria";

    const consultar = async () => {
      try {
        setError("");
        setLoading(true);

        const res = await fetch("https://veterinaria-mine.vercel.app/api/animales");
        if (!res.ok) throw new Error("Error al consultar la API de animales");

        const json: Animal[] = await res.json();
        setData(json);
      } catch (e) {
        setError("No se pudo obtener la información de animales");
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    consultar();
  }, []);

  // cerrar menú al hacer click fuera
  useEffect(() => {
    const handleClickOutside = () => {
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // función toggle
  

  const eliminarRegistro = async (id: string) => {
    try {
      await fetch(`https://veterinaria-mine.vercel.app/api/animales/${id}`, {
        method: "DELETE",
      });

      setData(data.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Error al eliminar:", error);
    }
  };

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
          <h1 className="h1">Animales</h1>
          <p className="p">Consulta y visualiza los registros desde la API.</p>
        </div>

        <a className="btnadd" href="/agregar-animales">
          <span style={{ marginRight: "8px" }}>+</span>Agregar
        </a>
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
                <th>Animal</th>
                <th>Raza</th>
                <th>Nombre</th>
                <th>Años</th>
                <th>Síntomas</th>
                <th>Vacunación</th>
                <th>Dieta</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {data.map((a) => (
                <tr key={a.id}>
                  <td>{a.id}</td>
                  <td>{a.Animal}</td>
                  <td>{a.Raza}</td>
                  <td>{a.Nombre}</td>
                  <td>{a.Años}</td>
                  <td>{a.Sintomas}</td>

                  <td>
                    <span
                      className={`chip ${
                        a["Vacunación"] ? "chipGood" : "chipBad"
                      }`}
                    >
                      <span className="dot" />
                      {a["Vacunación"] ? "Sí" : "No"}
                    </span>
                  </td>

                  <td>{a.Dieta}</td>

                  <td style={{ position: "relative" }}>


                        <button className="edit-button"
                          onClick={() =>
                            navigate(`/editar-animales/${a.id}`)
                          }
                        >
                          Editar
                        </button>

                        <button
                          className="edit-button"
                          onClick={() => eliminarRegistro(a.id)}
                        >
                          Eliminar
                        </button>
   
                    
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
