import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

type Personal = {
  id: string;
  Nombre: string;
  Edad: string;
  Altura: string;
  Sexo: string;
  Estudios: string;
};

export default function EditInfoPersonalPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState<Personal>({
    id: "",
    Nombre: "",
    Edad: "",
    Altura: "",
    Sexo: "",
    Estudios: "",
  });

  useEffect(() => {
    const obtenerPersonal = async () => {
      try {
        const res = await fetch(
          `https://veterinaria-mine.vercel.app/api/infoPersonal/${id}`
        );

        const data = await res.json();
        setForm(data);
      } catch (error) {
        console.error("Hubo un error al obtener información:", error);
      }
    };

    obtenerPersonal();
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
      `https://veterinaria-mine.vercel.app/api/infoPersonal/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      }
    );

    navigate("/InfoPersonal");
  };

  return (
    <div className="formulario">
      <h1>Editar Información Personal</h1>

      <form className="grid" onSubmit={guardar}>
        <input
          className="input"
          name="Nombre"
          value={form.Nombre}
          onChange={handleChange}
          placeholder="Nombre"
        />

        <input
          className="input"
          name="Edad"
          value={form.Edad}
          onChange={handleChange}
          placeholder="Edad"
        />

        <input
          className="input"
          name="Altura"
          value={form.Altura}
          onChange={handleChange}
          placeholder="Altura"
        />

        <input
          className="input"
          name="Sexo"
          value={form.Sexo}
          onChange={handleChange}
          placeholder="Sexo"
        />

        <input
          className="input"
          name="Estudios"
          value={form.Estudios}
          onChange={handleChange}
          placeholder="Estudios"
        />

        <button className="button" type="submit">
          Guardar cambios
        </button>
      </form>
    </div>
  );
}
