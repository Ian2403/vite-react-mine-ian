import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function NuevoAnimalPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    Animal: "",
    Raza: "",
    Nombre: "",
    Años: "",
    Sintomas: "",
    Dieta: "",
    Vacunacion: "", 
  });

  const [mensaje, setMensaje] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
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
      !formData.Animal ||
      !formData.Raza ||
      !formData.Nombre ||
      !formData.Años ||
      !formData.Sintomas ||
      !formData.Dieta ||
      !formData.Vacunacion
    ) {
      setMensaje("Todos los campos son obligatorios");
      return;
    }

    try {
      const response = await fetch("/api/animales", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          Años: Number(formData.Años),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMensaje("Animal registrado correctamente 🐾");
        setTimeout(() => navigate("/animales"), 1500);
      } else {
        setMensaje(data.error);
      }
    } catch (error) {
      setMensaje("Error al conectar con el servidor");
    }
  };

  return (
    <div className="container">
        <h1 className="h1">Animal</h1>
        <p className="p">Completa los siguientes datos requeridos </p>

        
        <input
          className="input"
          type="text"
          name="Nombre"
          placeholder="Nombre del animal"
          onChange={handleChange}
        />

        <input
          className="input"
          type="text"
          name="Animal"
          placeholder="Especie"
          onChange={handleChange}
        />

        <input
          className="input"
          type="text"
          name="Raza"
          placeholder="Raza"
          onChange={handleChange}
        />

        <input
          className="input"
          type="number"
          name="Años"
          placeholder="Edad"
          onChange={handleChange}
        />

        <input
          className="input"
          type="text"
          name="Sintomas"
          placeholder="Síntomas"
          onChange={handleChange}
        />

        <input
          className="input"
          type="text"
          name="Dieta"
          placeholder="Dieta"
          onChange={handleChange}
        />

        <div style={{ marginTop: "10px" }}>
          <p className="p">¿Tiene vacunación?</p>

          <div>
            <label>
              <input
                type="radio"
                name="Vacunacion"
                value="Si"
                onChange={handleChange}
              />
              Sí
            </label>

            <label style={{ marginLeft: "15px" }}>
              <input
                type="radio"
                name="Vacunacion"
                value="No"
                onChange={handleChange}
              />
              No
            </label>
          </div>
        </div>

        {mensaje && <p style={{ color: "red" }}>{mensaje}</p>}
        <button className="button" type="submit">
          Agregar 
        </button>



    </div>
  );
}
