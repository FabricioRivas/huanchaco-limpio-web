import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Mapa from './pages/Mapa.jsx';
import Reportes from './pages/Reportes.jsx';
import Estadisticas from './pages/Estadisticas.jsx';

export default function App() {
  return (
    <>
      <Header />
      <main className="main-container">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/mapa" element={<Mapa />} />
          <Route path="/reportes" element={<Reportes />} />
          <Route path="/estadisticas" element={<Estadisticas />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </>
  );
}
