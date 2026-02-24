import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function NuevoEmpleadoPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    puesto: "",
    especialidad: "",
    telefono: "",
    email: "",
    fecha_contratacion: "",
    salario: "",
    activo: "",
  });

  const [mensaje, setMensaje] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
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
      !formData.nombre ||
      !formData.apellido ||
      !formData.puesto ||
      !formData.especialidad ||
      !formData.telefono ||
      !formData.email ||
      !formData.fecha_contratacion ||
      !formData.salario

    ) {
      setMensaje("Todos los campos obligatorios deben completarse");
      return;
    }

    try {
      const response = await fetch("/api/empleados", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          salario: Number(formData.salario),
          activo: formData.activo === "true",
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMensaje("Empleado registrado correctamente 👨‍⚕️");
        setTimeout(() => navigate("/empleados"), 1500);
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
        <h1>Empleado</h1>
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
          type="text"
          name="apellido"
          placeholder="Apellido"
          onChange={handleChange}
        />

        <input
          className="input"
          type="text"
          name="puesto"
          placeholder="Puesto"
          onChange={handleChange}
        />

        <input  
            className="input"
            type="text"
            name="especialidad"
            placeholder="Especialidad"
            onChange={handleChange}
        />

        <input
          className="input"
          type="text"
          name="telefono"
          placeholder="Teléfono"
          onChange={handleChange}
        />

        <input
          className="input"
          type="email"
          name="correo"
          placeholder="Correo"
          onChange={handleChange}
        />


         <p className="p">Fecha de contratación</p>

        <input
          className="input"
          type="date"
          name="fecha_contratacion"
          onChange={handleChange}
        />

        <input
          className="input"
          type="number"
          name="salario"
          placeholder="Salario"
          onChange={handleChange}
        />

        {/* Activo */}

        <p className="p">¿Empleado activo?</p>

        <select
          className="input"
          name="activo"
          onChange={handleChange}
        >
          <option value="">Opcion vacio</option>
          <option value="true">Sí</option>
          <option value="false">No</option>
        </select>

        {mensaje && <p style={{ color: "red" }}>{mensaje}</p>}

    </div>
        <button className="button" type="submit">
          Agregar
        </button>

        
      </form>
    </div>
  );
}
