import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddCitasPage() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    Nombre_mascota: "",
    Dueño: "",
    Fecha: "",
    Hora: "",
    Servicio: "",
    Veterinario: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {

      const response = await fetch("http://localhost:3000/citas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error("Error al crear cita");
      }

      alert("Cita agregada correctamente");

      navigate("/citas");

    } catch (error) {
      console.error(error);
      alert("Error al agregar cita");
    }
  };

  return (

    <div className="formulario ">

      <h2>Agregar Cita</h2>

      <form onSubmit={handleSubmit} >

        <label>Nombre de la Mascota</label>
        <input
          className="input"
          type="text"
          name="Nombre_mascota"
          value={formData.Nombre_mascota}
          onChange={handleChange}
          required
        />

        <label>Dueño</label>
        <input
          className="input"
          type="text"
          name="Dueño"
          value={formData.Dueño}
          onChange={handleChange}
          required
        />

        <label>Fecha</label>
        <input
          className="input"
          type="date"
          name="Fecha"
          value={formData.Fecha}
          onChange={handleChange}
          required
        />

        <label>Hora</label>
        <input
          className="input"
          type="time"
          name="Hora"
          value={formData.Hora}
          onChange={handleChange}
          required
        />

        <label>Servicio</label>
        <input
          className="input"
          type="text"
          name="Servicio"
          value={formData.Servicio}
          onChange={handleChange}
          required
        />

        <label>Veterinario</label>
        <input
          className="input"
          type="text"
          name="Veterinario"
          value={formData.Veterinario}
          onChange={handleChange}
          required
        />

        <button type="submit">
          Guardar Cita
        </button>

      </form>

    </div>
  );
}
