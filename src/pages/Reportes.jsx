import { useMemo, useState } from 'react';
import ReporteTable from '../components/ReporteTable.jsx';
import useReportes, { tiposResiduo, zonasHuanchaco } from '../hooks/useReportes.js';

export default function Reportes() {
  const { reportes, loading, error, marcarComoLimpiado } = useReportes();
  const [zona, setZona] = useState('Todas');
  const [tipo, setTipo] = useState('Todos');
  const [estado, setEstado] = useState('Todos');
  const [busqueda, setBusqueda] = useState('');
  const [pagina, setPagina] = useState(1);

  const filtrados = useMemo(() => reportes.filter((r) => {
    const matchZona = zona === 'Todas' || r.zona === zona;
    const matchTipo = tipo === 'Todos' || r.tipoResiduo === tipo;
    const matchEstado = estado === 'Todos' || r.estado === estado;
    const q = busqueda.toLowerCase();
    const matchBusqueda = r.zona.toLowerCase().includes(q) || r.tipoResiduo.toLowerCase().includes(q);
    return matchZona && matchTipo && matchEstado && matchBusqueda;
  }), [reportes, zona, tipo, estado, busqueda]);

  const totalPaginas = Math.max(1, Math.ceil(filtrados.length / 10));
  const visibles = filtrados.slice((pagina - 1) * 10, pagina * 10);

  if (loading) return <div className="spinner">Cargando reportes...</div>;

  return (
    <section className="page">
      <h1>Todos los reportes</h1>
      {error && <p className="notice">{error}</p>}
      <div className="filters">
        <input placeholder="Buscar por zona o tipo" value={busqueda} onChange={(e)=>setBusqueda(e.target.value)} />
        <select value={zona} onChange={(e)=>setZona(e.target.value)}><option>Todas</option>{zonasHuanchaco.map(z => <option key={z}>{z}</option>)}</select>
        <select value={tipo} onChange={(e)=>setTipo(e.target.value)}><option>Todos</option>{tiposResiduo.map(t => <option key={t}>{t}</option>)}</select>
        <select value={estado} onChange={(e)=>setEstado(e.target.value)}><option>Todos</option><option>En proceso</option><option>Limpiado</option></select>
      </div>
      <p className="counter">Total de resultados: {filtrados.length}</p>
      <ReporteTable reportes={visibles} showActions onLimpiar={marcarComoLimpiado} />
      <div className="pagination">
        <button className="btn secondary" disabled={pagina === 1} onClick={()=>setPagina(pagina - 1)}>Anterior</button>
        <span>Página {pagina} de {totalPaginas}</span>
        <button className="btn secondary" disabled={pagina === totalPaginas} onClick={()=>setPagina(pagina + 1)}>Siguiente</button>
      </div>
    </section>
  );
}
