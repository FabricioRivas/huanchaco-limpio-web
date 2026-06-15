export default function KPICard({ title, value, helper }) {
  return (
    <section className="kpi-card">
      <p>{title}</p>
      <strong>{value}</strong>
      {helper && <span>{helper}</span>}
    </section>
  );
}
