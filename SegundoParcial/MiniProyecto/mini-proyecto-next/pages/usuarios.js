import { useEffect, useState } from 'react';
import { pedirJSON } from '../lib/api';
import { ocultarBoleta } from '../lib/formato';
import { validarBoleta, validarContrasena, dominioCorreoValido, errorNombre } from '../lib/validaciones';
import estilos from '../styles/Talleres.module.css';

// /usuarios — lista de usuarios registrados (GET /api/usuarios) y alta de usuarios (POST /api/usuarios).
export default function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');
  const [busqueda, setBusqueda] = useState('');

  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [boleta, setBoleta] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [confirmar, setConfirmar] = useState('');
  const [errorForm, setErrorForm] = useState('');
  const [exito, setExito] = useState('');
  const [enviando, setEnviando] = useState(false);

  useEffect(() => {
    cargarUsuarios();
  }, []);

  async function cargarUsuarios() {
    try {
      setUsuarios(await pedirJSON('/usuarios'));
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  }

  async function registrar(e) {
    e.preventDefault();
    setErrorForm('');
    setExito('');

    const nombreLimpio = nombre.trim();
    const correoLimpio = correo.trim();
    const boletaLimpia = boleta.trim();

    const errorDeNombre = errorNombre(nombreLimpio);
    if (errorDeNombre) return setErrorForm(errorDeNombre);
    if (!dominioCorreoValido(correoLimpio)) {
      return setErrorForm('Usa un correo de un dominio real (gmail.com, hotmail.com, outlook.com, ipn.mx, etc.).');
    }
    if (!validarBoleta(boletaLimpia)) return setErrorForm('La boleta debe tener 10 dígitos.');
    if (!validarContrasena(contrasena)) return setErrorForm('La contraseña debe tener al menos 8 caracteres.');
    if (contrasena !== confirmar) return setErrorForm('Las contraseñas no coinciden.');
    // No repetir usuarios: mismo correo o misma boleta que uno que ya está en la lista cargada.
    const yaExiste = usuarios.some(
      (u) => u.correo.toLowerCase() === correoLimpio.toLowerCase() || u.boleta === boletaLimpia
    );
    if (yaExiste) return setErrorForm('Ya existe un usuario registrado con ese correo o esa boleta.');

    setEnviando(true);
    try {
      await pedirJSON('/usuarios', {
        method: 'POST',
        body: JSON.stringify({ nombre: nombreLimpio, correo: correoLimpio, boleta: boletaLimpia, contrasena }),
      });
      setExito(`¡Listo! ${nombreLimpio} fue registrado.`);
      setNombre('');
      setCorreo('');
      setBoleta('');
      setContrasena('');
      setConfirmar('');
      await cargarUsuarios();
    } catch (err) {
      setErrorForm(err.message);
    } finally {
      setEnviando(false);
    }
  }

  const texto = busqueda.trim().toLowerCase();
  const visibles = usuarios.filter((u) =>
    `${u.nombre} ${u.correo} ${u.rol}`.toLowerCase().includes(texto)
  );

  return (
    <main>
      <h1>Usuarios</h1>

      <section className={estilos.panel}>
        <h2>Registrar usuario</h2>
        <form onSubmit={registrar} className="formulario">
          <input placeholder="Nombre completo" value={nombre} onChange={(e) => setNombre(e.target.value)} />
          <input placeholder="Correo" value={correo} onChange={(e) => setCorreo(e.target.value)} />
          <input placeholder="Boleta (10 dígitos)" value={boleta} onChange={(e) => setBoleta(e.target.value)} />
          <input
            type="password"
            placeholder="Contraseña (mínimo 8 caracteres)"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirmar contraseña"
            value={confirmar}
            onChange={(e) => setConfirmar(e.target.value)}
          />
          <button type="submit" disabled={enviando}>{enviando ? 'Registrando…' : 'Registrar'}</button>
        </form>
        {errorForm && <p className="error">{errorForm}</p>}
        {exito && <p className={estilos.exito}>{exito}</p>}
      </section>

      <h2>Usuarios registrados ({usuarios.length})</h2>
      <input
        placeholder="Buscar por nombre, correo o rol"
        className={estilos.buscador}
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />

      {cargando && <p>Cargando usuarios…</p>}
      {error && <p className="error">{error}</p>}
      {!cargando && !error && usuarios.length === 0 && <p>No hay usuarios registrados.</p>}
      {!cargando && !error && usuarios.length > 0 && visibles.length === 0 && (
        <p>No hay usuarios que coincidan con la búsqueda.</p>
      )}

      {visibles.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Boleta</th>
              <th>Rol</th>
            </tr>
          </thead>
          <tbody>
            {visibles.map((u) => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.nombre}</td>
                <td>{u.correo}</td>
                <td>{ocultarBoleta(u.boleta)}</td>
                <td>{u.rol}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
}