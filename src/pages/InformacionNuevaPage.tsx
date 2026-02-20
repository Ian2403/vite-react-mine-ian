import React, { useState } from 'react';

type FormState = {
  Nombre: string;
  Edad: number | '';
  Altura: number | '';
  Sexo: string;
  Estudios: string;
};

export default function AddInfoButton({ endpoint = '/infoPersonal' }: { endpoint?: string }) {
  const [show, setShow] = useState(false);
  const [form, setForm] = useState<FormState>({ Nombre: '', Edad: '', Altura: '', Sexo: '', Estudios: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: name === 'Edad' || name === 'Altura' ? (value === '' ? '' : Number(value)) : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      if (!res.ok) throw new Error(await res.text());
      await res.json();
      setShow(false);
      setForm({ Nombre: '', Edad: '', Altura: '', Sexo: '', Estudios: '' });
    } catch (err: any) {
      setError(err.message || 'Error al crear registro');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={() => setShow(s => !s)}>{show ? 'Cerrar' : 'Agregar registro'}</button>

      {show && (
        <form onSubmit={handleSubmit} style={{ marginTop: 8 }}>
          <input name="Nombre" value={form.Nombre} onChange={handleChange} placeholder="Nombre" required />
          <input name="Edad" type="number" value={form.Edad as any} onChange={handleChange} placeholder="Edad" />
          <input name="Altura" type="number" step="0.01" value={form.Altura as any} onChange={handleChange} placeholder="Altura" />
          <select name="Sexo" value={form.Sexo} onChange={handleChange} required>
            <option value="">Sexo</option>
            <option value="M">M</option>
            <option value="F">F</option>
          </select>
          <input name="Estudios" value={form.Estudios} onChange={handleChange} placeholder="Estudios" />
          <button type="submit" disabled={loading}>{loading ? 'Guardando...' : 'Guardar'}</button>
          {error && <div style={{ color: 'red' }}>{error}</div>}
        </form>
      )}
    </div>
  );
}