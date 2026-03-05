import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

type Animal = {
  id_animales: string;
  Nombre: string;
  Especie: string;
  Raza: string;
  Edad: string;
  Sexo: string;
  Peso: string;
};

export default function EditarAnimal() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState<Animal>({
    id_animales: "",
    Nombre: "",
    Especie: "",
    Raza: "",
    Edad: "",
    Sexo: "",
    Peso: "",
  });

  useEffect(() => {
    const obtenerAnimal = async () => {
      try {
        const res = await fetch(
          `https://veterinaria-mine.vercel.app/api/animales/${id}`
        );

        const data = await res.json();
        setForm(data);
      } catch (error) {
        console.error("Error al obtener animal:", error);
      }
    };

    obtenerAnimal();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const guardar = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await fetch(
        `https://veterinaria-mine.vercel.app/api/animales/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      navigate("/animales");
    } catch (error) {
      console.error("Error al actualizar:", error);
    }
  };

  return (
    <div className="formulario">
      <h1>Editar Animal</h1>

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
          name="Especie"
          value={form.Especie}
          onChange={handleChange}
          placeholder="Especie"
        />

        <input
          className="input"
          name="Raza"
          value={form.Raza}
          onChange={handleChange}
          placeholder="Raza"
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
          name="Sexo"
          value={form.Sexo}
          onChange={handleChange}
          placeholder="Sexo"
        />

        <input
          className="input"
          name="Peso"
          value={form.Peso}
          onChange={handleChange}
          placeholder="Peso"
        />

        <button className="button" type="submit">
          Guardar cambios
        </button>
      </form>
    </div>
  );
}
