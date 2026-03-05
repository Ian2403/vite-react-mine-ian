import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

type Empleado = {
  id_empleado: number;
  nombre: string;
  apellido: string;
  puesto: string;
  especialidad: string | null;
  telefono: string;
  email: string;
  fecha_contratacion: string; // ISO
  salario: string;
  activo: boolean;
};

export default function EditEmpleadosPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState<Empleado>({
    id_empleado: 0,
    nombre: "",
    apellido: "",
    puesto: "",
    especialidad: null,
    telefono: "",
    email: "",
    fecha_contratacion: "",
    salario: "",
    activo: false
  });

  useEffect(() => {
    const obtenerEmpleado = async () => {
      try {
        const res = await fetch(
          `https://veterinaria-mine.vercel.app/api/empleadosinfo/${id}`
        );

        const data = await res.json();
        setForm(data);
      } catch (error) {
        console.error("Hubo un error al obtener empleado:", error);
      }
    };

    obtenerEmpleado();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const guardar = async (e: React.FormEvent) => {
    e.preventDefault();

    await fetch(
      `https://veterinaria-mine.vercel.app/api/empleadosinfo/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      }
    );

    navigate("/Empleados");
  };

  return (
    <div className="formulario">
      <h1>Editar Empleado</h1>

      <form className="grid" onSubmit={guardar}>
        <input
          className="input"
          name="Nombre"
          value={form.nombre}
          onChange={handleChange}
          placeholder="Nombre"
        />

        <input
          className="input"
          name="Apellido"   
            value={form.apellido}
            onChange={handleChange}
            placeholder="Apellido"
        />

        <input
          className="input"
          name="Puesto"                 
          value={form.puesto}
          onChange={handleChange}
          placeholder="Puesto"
        />

        <input  
            className="input"   
            name="Especialidad"
            value={form.especialidad || ""}
            onChange={handleChange}
            placeholder="Especialidad"  
        />

        <input
            className="input"
            name="Telefono" 
            value={form.telefono}
            onChange={handleChange}
            placeholder="Teléfono"
        />  

        <input
            className="input"
            name="Email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
        />

        <input  
            className="input"
            name="Fecha_contratacion"
            value={form.fecha_contratacion}
            onChange={handleChange}
            placeholder="Fecha de contratación"
        />
        <input
            className="input"
            name="Salario"
            value={form.salario}
            onChange={handleChange}
            placeholder="Salario"
        />

        <input
            className="input"
            name="Activo"   
            value={form.activo ? "Sí" : "No"}
            onChange={handleChange}
            placeholder="Activo"
        />

        <button className="button" type="submit">
          Guardar cambios
        </button>
      </form>
    </div>
  );
}