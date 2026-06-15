import { useState } from 'react';
import { tiposResiduo, zonasHuanchaco } from '../hooks/useReportes.js';

export default function NuevoReporteModal({ open, onClose, onSubmit }) {
  const [form, setForm] = useState({ tipoResiduo: 'Plástico', zona: zonasHuanchaco[0], descripcion: '', fotoUrl: '', kgEstimado: 0 });
  if (!open) return null;

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit({ ...form, latitud: -8.0812 + Math.random() / 100, longitud: -79.1208 + Math.random() / 100 });
    onClose();
  };

  return (
    <div className="modal-backdrop">
      <form className="modal" onSubmit={handleSubmit}>
        <h2>Nuevo reporte ciudadano</h2>
        <label>Tipo de residuo
          <select name="tipoResiduo" value={form.tipoResiduo} onChange={handleChange}>{tiposResiduo.map(t => <option key={t}>{t}</option>)}</select>
        </label>
        <label>Zona
          <select name="zona" value={form.zona} onChange={handleChange}>{zonasHuanchaco.map(z => <option key={z}>{z}</option>)}</select>
        </label>
        <label>Descripción
          <textarea name="descripcion" value={form.descripcion} onChange={handleChange} placeholder="Describe el problema observado" />
        </label>
        <label>URL de foto
          <input name="fotoUrl" value={form.fotoUrl} onChange={handleChange} placeholder="https://..." />
        </label>
        <label>Kg estimado
          <input name="kgEstimado" type="number" value={form.kgEstimado} onChange={handleChange} />
        </label>
        <div className="modal-actions">
          <button type="button" className="btn secondary" onClick={onClose}>Cancelar</button>
          <button className="btn">Enviar reporte</button>
        </div>
      </form>
    </div>
  );
}
