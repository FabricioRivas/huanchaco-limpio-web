import ReporteBadge from './ReporteBadge.jsx';
import { formatearFecha } from '../hooks/useReportes.js';

export default function ReporteTable({ reportes, limit, showActions = false, onLimpiar }) {
  const lista = limit ? reportes.slice(0, limit) : reportes;

  if (!lista.length) return <div className="empty">No hay reportes registrados.</div>;

  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            {showActions && <th>#</th>}
            {showActions && <th>Foto</th>}
            <th>Tipo</th>
            <th>Zona</th>
            <th>Estado</th>
            <th>Fecha</th>
            {showActions && <th>Acciones</th>}
          </tr>
        </thead>
        <tbody>
          {lista.map((r, i) => (
            <tr key={r.id}>
              {showActions && <td>{i + 1}</td>}
              {showActions && <td>{r.fotoUrl ? <img src={r.fotoUrl} className="thumb" alt="reporte" /> : <span>Sin foto</span>}</td>}
              <td>{r.tipoResiduo}</td>
              <td>{r.zona}</td>
              <td><ReporteBadge estado={r.estado} /></td>
              <td>{formatearFecha(r.timestamp)}</td>
              {showActions && (
                <td>
                  <button className="btn small" disabled={r.estado === 'Limpiado'} onClick={() => onLimpiar(r.id)}>
                    Marcar como Limpiado
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
