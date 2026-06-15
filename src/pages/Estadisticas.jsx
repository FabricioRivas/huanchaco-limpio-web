import { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Legend } from 'recharts';
import useReportes from '../hooks/useReportes.js';

const colors = ['#003461', '#004B87', '#6B5C41', '#D3E4FF', '#F2DDBA'];

export default function Estadisticas() {
  const { reportes, loading, error, resumen } = useReportes();

  const topZonas = useMemo(() => Object.entries(reportes.filter(r => r.estado === 'En proceso').reduce((acc, r) => { acc[r.zona] = (acc[r.zona] || 0) + 1; return acc; }, {})).map(([zona, cantidad]) => ({ zona, cantidad })).sort((a,b)=>b.cantidad-a.cantidad).slice(0,3), [reportes]);

  const porSemana = useMemo(() => Object.entries(reportes.reduce((acc, r) => {
    const fecha = new Date(r.timestamp || Date.now());
    const semana = `${fecha.getFullYear()}-S${Math.ceil(fecha.getDate() / 7)}`;
    acc[semana] = (acc[semana] || 0) + 1;
    return acc;
  }, {})).map(([semana, reportes]) => ({ semana, reportes })), [reportes]);

  const resolucion = useMemo(() => Object.entries(reportes.reduce((acc, r) => {
    acc[r.zona] = acc[r.zona] || { zona: r.zona, limpiados: 0, enProceso: 0 };
    r.estado === 'Limpiado' ? acc[r.zona].limpiados++ : acc[r.zona].enProceso++;
    return acc;
  }, {})).map(([_, v]) => ({ name: v.zona, value: v.limpiados })), [reportes]);

  if (loading) return <div className="spinner">Cargando estadísticas...</div>;

  return (
    <section className="page">
      <h1>Análisis de Impacto Ambiental - Huanchaco</h1>
      {error && <p className="notice">{error}</p>}
      <article className="priority-card"><span>Zona Prioritaria para Eco-Reto</span><strong>{resumen.zonaMasAcumulacion}</strong><p>Se recomienda enviar brigadas de limpieza y reforzar la sensibilización ciudadana en esta zona.</p></article>
      <div className="chart-grid">
        <article className="card"><h2>Top 3 zonas con más residuos activos</h2><ResponsiveContainer width="100%" height={280}><BarChart data={topZonas}><XAxis dataKey="zona" hide /><YAxis allowDecimals={false} /><Tooltip /><Bar dataKey="cantidad" fill="#003461" /></BarChart></ResponsiveContainer></article>
        <article className="card"><h2>Evolución de reportes por semana</h2><ResponsiveContainer width="100%" height={280}><LineChart data={porSemana}><XAxis dataKey="semana" /><YAxis allowDecimals={false} /><Tooltip /><Line dataKey="reportes" stroke="#004B87" strokeWidth={3} /></LineChart></ResponsiveContainer></article>
        <article className="card"><h2>% de resolución por zona</h2><ResponsiveContainer width="100%" height={280}><PieChart><Pie data={resolucion} dataKey="value" nameKey="name" outerRadius={90} label>{resolucion.map((_, i)=><Cell key={i} fill={colors[i % colors.length]} />)}</Pie><Legend /><Tooltip /></PieChart></ResponsiveContainer></article>
      </div>
    </section>
  );
}
