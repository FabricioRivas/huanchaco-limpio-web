import { NavLink } from 'react-router-dom';

export default function Header() {
  return (
    <header className="header">
      <div className="brand">Huanchaco Limpio</div>
      <nav className="nav">
        <NavLink to="/">Dashboard</NavLink>
        <NavLink to="/mapa">Mapa</NavLink>
        <NavLink to="/reportes">Reportes</NavLink>
        <NavLink to="/estadisticas">Estadísticas</NavLink>
      </nav>
    </header>
  );
}
