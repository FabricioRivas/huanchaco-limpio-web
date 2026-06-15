import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import KPICard from '../components/KPICard.jsx';
import ReporteTable from '../components/ReporteTable.jsx';
import useReportes from '../hooks/useReportes.js';

const chartColors = ['#003461', '#2E7D32', '#0097A7', '#F9A825', '#757575', '#7B1FA2'];

function agrupar(lista, campo) {
  return Object.entries(lista.reduce((acc, item) => {
    acc[item[campo]] = (acc[item[campo]] || 0) + 1;
    return acc;
  }, {})).map(([name, value]) => ({ name, value }));
}

export default function Dashboard() {
  const { reportes, loading, error, resumen } = useReportes();
  const porZona = agrupar(reportes, 'zona');
  const porTipo = agrupar(reportes, 'tipoResiduo');

  if (loading) return <div className="spinner">Cargando reportes...</div>;

  return (
    <section className="page">
      <h1>Dashboard ambiental</h1>
      {error && <p className="notice">{error}</p>}
      <div className="kpi-grid">
        <KPICard title="Total de reportes" value={resumen.total} helper="Reportes ciudadanos registrados" />
        <KPICard title="En proceso" value={resumen.enProceso} helper="Pendientes de limpieza" />
        <KPICard title="Limpiados" value={resumen.limpiados} helper="Casos atendidos" />
        <KPICard title="Zona con más acumulación" value={resumen.zonaMasAcumulacion} helper="Prioridad Eco-Reto" />
      </div>

      <div className="chart-grid">
        <article className="card">
          <h2>Reportes por zona</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={porZona}><XAxis dataKey="name" hide /><YAxis allowDecimals={false} /><Tooltip /><Bar dataKey="value" fill="#004B87" /></BarChart>
          </ResponsiveContainer>
        </article>
        <article className="card">
          <h2>Distribución por tipo de residuo</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart><Pie data={porTipo} dataKey="value" nameKey="name" outerRadius={95} label>{porTipo.map((_, i) => <Cell key={i} fill={chartColors[i % chartColors.length]} />)}</Pie><Legend /><Tooltip /></PieChart>
          </ResponsiveContainer>
        </article>
      </div>

      <article className="card">
        <div className="section-head"><h2>Últimos 5 reportes</h2><Link className="btn" to="/reportes">Ver todos</Link></div>
        <ReporteTable reportes={[...reportes].sort((a,b)=>b.timestamp-a.timestamp)} limit={5} />
      </article>
    </section>
  );
}
