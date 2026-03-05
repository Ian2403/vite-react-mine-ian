import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

type Animal = {
  id: string;
  Animal: string;
  Raza: string;
  Nombre: string;
  Años: string;
  Sintomas: string;
  Vacunación: boolean;
  Dieta: string;
};

export default function EditarAnimal() {
  const { id } = useParams();
  const navigate = useNavigate();

const [form, setForm] = useState<Animal>({
  id: "",
  Animal: "",
  Raza: "",
  Nombre: "",
  Años: "",
  Sintomas: "",
  Vacunación: false,
  Dieta: "",
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
      console.error("Hubo un error al actualizar:", error);
    }
  };

  return (
    <div className="formulario">
      <h1>Editar Animal</h1>

      <form className="grid" onSubmit={guardar}>
        <input
          className="input"
          name="Animal"
          value={form.Animal}
          onChange={handleChange}
          placeholder="Tipo de animal"
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
          name="Nombre"
          value={form.Nombre}
          onChange={handleChange}
          placeholder="Nombre"
        />

        <input
          className="input"
          name="Años"
          value={form.Años}
          onChange={handleChange}
          placeholder="Edad en años"
        />

        <input
          className="input"
          name="Sintomas"   
          value={form.Sintomas}
          onChange={handleChange}
          placeholder="Síntomas"
        />

        <input
          className="input"
          name="Vacunación" 
          value={form.Vacunación ? "Sí" : "No"}
          onChange={(e) =>
            setForm({
              ...form,  
              Vacunación: e.target.value.toLowerCase() === "sí",
            })
          }
          placeholder="Vacunación (Sí/No)"
        />  

        <input
          className="input"
          name="Dieta"
          value={form.Dieta}
          onChange={handleChange}
          placeholder="Dieta"
        />

        <button className="button" type="submit">
          Guardar cambios
        </button>
      </form>
    </div>
  );
}
