import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";

interface FormData {
  tabla: string;
}

export default function FormularioUsuario() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    tabla: "",
  });

  const [mensaje, setMensaje] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.tabla) {
      setMensaje("Selecciona una tabla para continuar");
      return;
    }

      switch (formData.tabla) {
        case "info-personal":
          navigate("/agregar-info-personal");
          break;  


        case "animales":
          navigate("/agregar-animales");
          break;
          
          
        case "empleados":
          navigate("/agregar-empleados");
          break;


        case "servicios":
          navigate("/agregar-servicios");
          break;

        default:
          navigate("/");
    }
  };

  return (
    <div style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
      <form className="formulario" onSubmit={handleSubmit}>
        <h2 style={styles.title}>
          ¿Dónde deseas agregar la información?
        </h2>

        <p className="p">Selecciona una tabla</p>

        <select
          name="tabla"
          value={formData.tabla}
          onChange={handleChange}
        >
          <option value="">Elegir una tabla</option>
          <option value="info-personal">Info Personal</option>
          <option value="animales">Animales</option>
          <option value="empleados">Empleados</option>
          <option value="servicios">Servicios</option>
        </select>

        <div className="grid">
          <button type="submit" className="button">
            Siguiente
          </button>

          <button
            type="button"
            className="button-cancel"
            onClick={() => navigate("/")}
          >
            Cancelar
          </button>

          {mensaje && <p style={styles.message}>{mensaje}</p>}
        </div>
      </form>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  title: {
    textAlign: "center",
    marginBottom: "10px",
  },
  message: {
    textAlign: "center",
    fontSize: "14px",
    color: "red",
  },
};
