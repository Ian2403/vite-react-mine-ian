import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

type Servicio = {
  id_servicios: string;
  Tipos_servicios: string;
  Disponibilidad: string;
  Horario: string;
  Encargado: string;
  Numero_pacientes: string;
};

export default function EditarServicio() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState<Servicio>({
    id_servicios: "",
    Tipos_servicios: "",
    Disponibilidad: "",
    Horario: "",
    Encargado: "",
    Numero_pacientes: "",
  });

  useEffect(() => {
    const obtenerServicio = async () => {
      const res = await fetch(
        `https://veterinaria-mine.vercel.app/api/infoservicios/${id}`
      );

      const data = await res.json();
      setForm(data);
    };

    obtenerServicio();
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
      `https://veterinaria-mine.vercel.app/api/infoservicios/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      }
    );

    navigate("/Servicios");
  };

  return (
    <div className=" formulario">
      <h1>Editar Servicio</h1>

      <form className="grid" onSubmit={guardar}>
        

        <input
          className="input"
          name="Tipos_servicios"
          value={form.Tipos_servicios}
          onChange={handleChange}
          placeholder="Tipo de servicio"
        />

        <input
          className="input"
          name="Disponibilidad"
          value={form.Disponibilidad}
          onChange={handleChange}
          placeholder="Disponibilidad"
        />

        <input
          className="input"
          name="Horario"
          value={form.Horario}
          onChange={handleChange}
          placeholder="Horario"
        />

        <input
         className="input"
          name="Encargado"
          value={form.Encargado}
          onChange={handleChange}
          placeholder="Encargado"
        />

        <input  
          className="input"
          name="Numero_pacientes"
          value={form.Numero_pacientes}
          onChange={handleChange}
          placeholder="Número de pacientes"
        />

        

      </form>

      <button className="button" type="button">Guardar cambios</button>
    </div>
  );
}
