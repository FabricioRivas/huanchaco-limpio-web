import { useMemo, useState } from 'react';
import L from 'leaflet';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import useReportes, { formatearFecha, tiposResiduo } from '../hooks/useReportes.js';
import NuevoReporteModal from '../components/NuevoReporteModal.jsx';

const colores = { Plástico: '#003461', Orgánico: '#2E7D32', Vidrio: '#0097A7', Papel: '#F9A825', Metal: '#757575', Otro: '#7B1FA2' };
const zonasFijas = [
  { nombre: 'Muelle de Huanchaco', latitud: -8.0812, longitud: -79.1208 },
  { nombre: 'Playa El Boquerón', latitud: -8.0794, longitud: -79.1225 },
  { nombre: 'Malecón', latitud: -8.0801, longitud: -79.1216 }
];

function icono(color) {
  return L.divIcon({ className: 'custom-marker', html: `<span style="background:${color}"></span>`, iconSize: [22, 22], iconAnchor: [11, 11] });
}

export default function Mapa() {
  const { reportes, loading, error, crearReporte } = useReportes();
  const [tipo, setTipo] = useState('Todos');
  const [estado, setEstado] = useState('Todos');
  const [modal, setModal] = useState(false);

  const filtrados = useMemo(() => reportes.filter(r => (tipo === 'Todos' || r.tipoResiduo === tipo) && (estado === 'Todos' || r.estado === estado)), [reportes, tipo, estado]);

  if (loading) return <div className="spinner">Cargando mapa...</div>;

  return (
    <section className="page">
      <div className="section-head"><h1>Mapa ciudadano</h1><button className="btn" onClick={()=>setModal(true)}>Nuevo reporte</button></div>
      {error && <p className="notice">{error}</p>}
      <div className="filters">
        <select value={tipo} onChange={(e)=>setTipo(e.target.value)}><option>Todos</option>{tiposResiduo.map(t => <option key={t}>{t}</option>)}</select>
        <select value={estado} onChange={(e)=>setEstado(e.target.value)}><option>Todos</option><option>En proceso</option><option>Limpiado</option></select>
      </div>
      <div className="map-layout">
        <MapContainer center={[-8.0812, -79.1208]} zoom={15} className="map">
          <TileLayer attribution='&copy; OpenStreetMap' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {zonasFijas.map(z => <Marker key={z.nombre} position={[z.latitud, z.longitud]} icon={icono('#003461')}><Popup><strong>{z.nombre}</strong><br />Zona predefinida</Popup></Marker>)}
          {filtrados.map(r => <Marker key={r.id} position={[r.latitud || -8.0812, r.longitud || -79.1208]} icon={icono(colores[r.tipoResiduo] || colores.Otro)}><Popup>{r.fotoUrl && <img src={r.fotoUrl} className="popup-img" alt="reporte" />}<strong>{r.tipoResiduo}</strong><br />Zona: {r.zona}<br />Estado: {r.estado}<br />Fecha: {formatearFecha(r.timestamp)}</Popup></Marker>)}
        </MapContainer>
        <aside className="legend card"><h3>Leyenda</h3>{Object.entries(colores).map(([k,v]) => <p key={k}><span style={{background:v}} /> {k}</p>)}</aside>
      </div>
      <NuevoReporteModal open={modal} onClose={()=>setModal(false)} onSubmit={crearReporte} />
    </section>
  );
}
