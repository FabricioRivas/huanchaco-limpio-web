import { useEffect, useMemo, useState } from 'react';
import { ref, onValue, push, update } from 'firebase/database';
import { db } from '../firebase/config';

const demoReportes = [
  { id: 'demo1', tipoResiduo: 'Plástico', zona: 'Muelle de Huanchaco', fotoUrl: null, latitud: -8.0812, longitud: -79.1208, estado: 'En proceso', timestamp: Date.now() - 86400000, kgEstimado: 14 },
  { id: 'demo2', tipoResiduo: 'Orgánico', zona: 'Playa El Boquerón', fotoUrl: null, latitud: -8.0794, longitud: -79.1225, estado: 'Limpiado', timestamp: Date.now() - 172800000, kgEstimado: 8 },
  { id: 'demo3', tipoResiduo: 'Vidrio', zona: 'Caballitos de Totora', fotoUrl: null, latitud: -8.0835, longitud: -79.1195, estado: 'En proceso', timestamp: Date.now() - 259200000, kgEstimado: 6 },
  { id: 'demo4', tipoResiduo: 'Papel', zona: 'Malecón', fotoUrl: null, latitud: -8.0801, longitud: -79.1216, estado: 'Limpiado', timestamp: Date.now() - 345600000, kgEstimado: 4 },
  { id: 'demo5', tipoResiduo: 'Metal', zona: 'Mercado de Huanchaco', fotoUrl: null, latitud: -8.078, longitud: -79.118, estado: 'En proceso', timestamp: Date.now() - 432000000, kgEstimado: 11 }
];

export const zonasHuanchaco = ['Muelle de Huanchaco', 'Playa El Boquerón', 'Caballitos de Totora', 'Malecón', 'Mercado de Huanchaco', 'Entrada de Huanchaco'];
export const tiposResiduo = ['Plástico', 'Orgánico', 'Vidrio', 'Papel', 'Metal', 'Otro'];

export function formatearFecha(timestamp) {
  if (!timestamp) return 'Sin fecha';
  return new Date(timestamp).toLocaleDateString('es-PE');
}

export default function useReportes() {
  const [reportes, setReportes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const reportesRef = ref(db, 'reportes');
    const unsubscribe = onValue(
      reportesRef,
      (snapshot) => {
        const data = snapshot.val();
        const lista = data ? Object.entries(data).map(([id, val]) => ({ id, ...val })) : [];
        setReportes(lista.length ? lista : demoReportes);
        setLoading(false);
      },
      (err) => {
        console.error(err);
        setError('No se pudo conectar con Firebase. Se muestran datos de ejemplo.');
        setReportes(demoReportes);
        setLoading(false);
      }
    );
    return () => unsubscribe();
  }, []);

  const resumen = useMemo(() => {
    const activos = reportes.filter((r) => r.estado === 'En proceso');
    const porZonaActiva = activos.reduce((acc, r) => {
      acc[r.zona] = (acc[r.zona] || 0) + 1;
      return acc;
    }, {});
    const zonaMasAcumulacion = Object.entries(porZonaActiva).sort((a, b) => b[1] - a[1])[0]?.[0] || 'Sin datos';
    return {
      total: reportes.length,
      enProceso: activos.length,
      limpiados: reportes.filter((r) => r.estado === 'Limpiado').length,
      zonaMasAcumulacion
    };
  }, [reportes]);

  const crearReporte = async (nuevoReporte) => {
    const reportesRef = ref(db, 'reportes');
    await push(reportesRef, {
      ...nuevoReporte,
      estado: 'En proceso',
      timestamp: Date.now(),
      fotoUrl: nuevoReporte.fotoUrl || null,
      kgEstimado: Number(nuevoReporte.kgEstimado || 0)
    });
  };

  const marcarComoLimpiado = async (id) => {
    if (id.startsWith('demo')) return alert('Este es un dato de ejemplo. Conecta Firebase para actualizarlo.');
    await update(ref(db, `reportes/${id}`), { estado: 'Limpiado' });
  };

  return { reportes, loading, error, resumen, crearReporte, marcarComoLimpiado };
}
