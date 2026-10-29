import Link from 'next/link';
import { useEffect, useState } from 'react';
import { pedirJSON } from '../lib/api';
import { ocultarBoleta } from '../lib/formato';
import estilos from '../styles/Talleres.module.css';

// El backend no tiene una ruta "todas las asistencias": se piden los talleres y, al mismo tiempo
// (Promise.all), las asistencias de cada uno; luego se juntan en una sola lista con el nombre del taller.
function formatearFechaHora(fecha) {
  const [parteFecha, parteHora] = String(fecha).split(' ');
  const [anio, mes, dia] = parteFecha.split('-');
  return `${dia}/${mes}/${anio} ${(parteHora || '').slice(0, 5)}`;
}

// /asistencias — todos los alumnos inscritos en cada taller.
export default function Asistencias() {
  const [filas, setFilas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');
  const [busqueda, setBusqueda] = useState('');

  useEffect(() => {
    cargar();
  }, []);

  async function cargar() {
    try {
      const talleres = await pedirJSON('/talleres');
      const listas = await Promise.all(talleres.map((t) => pedirJSON(`/talleres/${t.id}/asistencias`)));
      const todas = talleres.flatMap((t, i) =>
        listas[i].map((a) => ({ ...a, taller_nombre: t.nombre }))
      );
      setFilas(todas);
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  }

  const texto = busqueda.trim().toLowerCase();
  const visibles = filas.filter((a) =>
    `${a.nombre_alumno} ${a.taller_nombre}`.toLowerCase().includes(texto)
  );

  return (
    <main>
      <h1>Asistencias</h1>
      <input
        placeholder="Buscar por alumno o taller"
        className={estilos.buscador}
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />

      {cargando && <p>Cargando asistencias…</p>}
      {error && <p className="error">{error}</p>}
      {!cargando && !error && filas.length === 0 && <p>Todavía no hay asistencias registradas.</p>}
      {!cargando && !error && filas.length > 0 && visibles.length === 0 && (
        <p>No hay asistencias que coincidan con la búsqueda.</p>
      )}

      {visibles.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Taller</th>
              <th>Alumno</th>
              <th>Boleta</th>
              <th>Registro</th>
            </tr>
          </thead>
          <tbody>
            {visibles.map((a, i) => (
              <tr key={a.id}>
                <td>{i + 1}</td>
                <td><Link href={`/talleres/${a.taller_id}`}>{a.taller_nombre}</Link></td>
                <td>{a.nombre_alumno}</td>
                <td>{ocultarBoleta(a.boleta)}</td>
                <td>{formatearFechaHora(a.fecha_registro)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
}