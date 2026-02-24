import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function NuevoInfoPersonalPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    Nombre: "",
    Apellido: "",
    Edad: "",
    Altura: "",
    Sexo: "",
    Estudios: "",
  });

  const [mensaje, setMensaje] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
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

    if (
      !formData.Nombre ||
      !formData.Apellido ||
      !formData.Edad ||
      !formData.Altura ||
      !formData.Sexo ||
      !formData.Estudios 

    ) {
      setMensaje("Todos los campos obligatorios son obligatorios");
      return;
    }

    try {
      const response = await fetch("/api/info-personal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          edad: Number(formData.Edad),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMensaje("Persona registrada correctamente 👤");
        setTimeout(() => navigate("/info-personal"), 1500);
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
        <h1>Información Personal</h1>
        <p className="p">Completa los siguientes datos requeridos </p>

      <div className="grid">
        <input
          className="input"
          type="text"
          name="nombre"
          placeholder="Nombre"
          onChange={handleChange}
        />

        <input
          className="input"
          type="number"
          name="edad"
          placeholder="Edad"
          onChange={handleChange}
        />

        <input
          className="input"
          type="number"
          name="altura"
          placeholder="Altura (cm)"
          onChange={handleChange}
        />

        <input
          className="input"
          type="text"
          name="Sexo"
          placeholder="Sexo"
          onChange={handleChange}
        />

        <select
          className="input"
          name="sexo"
          onChange={handleChange}
        >
          <option value="">Seleccionar sexo</option>
          <option value="Masculino">Masculino</option>
          <option value="Femenino">Femenino</option>
          <option value="Otro">Otro</option>
        </select>




        <input
          className="input"
          type="text"
          name="estudios"
          placeholder="Estudios"
          onChange={handleChange}
        />
      </div>  
      
        {mensaje && <p style={{ color: "red" }}>{mensaje}</p>}
  

        <button className="button" type="submit">
          Agreagar
        </button>

        
      </form>
    </div>
  );
}
