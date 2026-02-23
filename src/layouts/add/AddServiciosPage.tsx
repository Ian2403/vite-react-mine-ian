import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function NuevoServicioPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    Tipos_servicios: "",
    Disponibilidad: "",
    Horario: "",
    Encargado: "",
    Numero_pacientes: "",
  });

  const [mensaje, setMensaje] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };


  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();



 

    try {
      const response = await fetch("/api/servicios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
  
      });

      const data = await response.json();

      if (response.ok) {
        setMensaje("Servicio registrado correctamente ");
        setTimeout(() => navigate("/servicios"), 1500);
      } else {
        setMensaje(data.error);
      }
    } catch (error) {
      setMensaje("Error al conectar con el servidor");
    }
  };

  return (
    <div className="container">
      <form className="formulario" onSubmit={handleSubmit}>
        <h1>Servicio</h1>
        <p className="p">Completa los siguientes datos requeridos </p>


        <input
          className="input"
          type="text"
          name="Tipos_servicios"
          placeholder="Tipo de Servicio"
          onChange={handleChange}
        />

        <input
          className="input"
          type="text"
          name="Disponibilidad"
          placeholder="Disponibilidad"
          onChange={handleChange}
        />

        <input
          className="input"
          type="text"
          name="Horario"
          placeholder="Horario"
          onChange={handleChange}
        />

        <input
          className="input"
          type="text"
          name="Encargado"
          placeholder="Encargado"
          onChange={handleChange}
        />

        <input
          className="input"
          type="number"
          name="Numero_pacientes"
          placeholder="Número de pacientes"
          onChange={handleChange}
        />



        <button className="button" type="submit">
          Guardar
        </button>

        {mensaje && <p style={{ color: "red" }}>{mensaje}</p>}
      </form>
    </div>
  );
}
