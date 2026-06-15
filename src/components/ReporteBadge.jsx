export default function ReporteBadge({ estado }) {
  const clase = estado === 'Limpiado' ? 'badge cleaned' : 'badge process';
  return <span className={clase}>{estado}</span>;
}
