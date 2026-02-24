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
console.log("Formulario enviado con datos:", formData);
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
          name="Nombre"
          placeholder="Nombre"
          onChange={handleChange}
        />

        <select
          className="input"
          name="Edad"
          onChange={handleChange}
        >
          <option value="">Seleccionar edad</option>
          <option value="18">18</option>
          <option value="19">19</option>
          <option value="20">20</option>
          <option value="21">21</option>
          <option value="22">22</option>
          <option value="23">23</option>
          <option value="24">24</option>
          <option value="25">25</option>  
          <option value="26">26</option>
          <option value="27">27</option>
          <option value="28">28</option>
          <option value="29">29</option>
          <option value="30">30</option>
          <option value="31">31</option>
          <option value="32">32</option>
          <option value="33">33</option>
          <option value="34">34</option>
          <option value="35">35</option>
          <option value="36">36</option>
          <option value="37">37</option>
          <option value="38">38</option>
          <option value="39">39</option>
          <option value="40">40</option>
          <option value="41">41</option>
          <option value="42">42</option>
          <option value="43">43</option>
          <option value="44">44</option>
          <option value="45">45</option>
          <option value="46">46</option>
          <option value="47">47</option>
          <option value="48">48</option>
          <option value="49">49</option>
          <option value="50">50</option>  
        </select>

        <input
          className="input"
          type="number"
          name="Altura"
          placeholder="Altura (cm)"
          onChange={handleChange}
        />

        <select
          className="input"
          name="Sexo"
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
          name="Estudios"
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
