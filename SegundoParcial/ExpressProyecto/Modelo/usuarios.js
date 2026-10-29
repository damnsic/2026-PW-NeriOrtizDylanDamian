const pool = require('../db-local');

const COLUMNAS_PUBLICAS = 'id, nombre, correo, boleta, rol';

//consultar todos los usuarios
async function listar() {
    const [filas] = await pool.query(`SELECT ${COLUMNAS_PUBLICAS} FROM usuarios ORDER BY id`);
    return filas;
}

//consultar por ID
async function obtenerPorId(id) {
    const [filas] = await pool.query(`SELECT ${COLUMNAS_PUBLICAS} FROM usuarios WHERE id = ?`, [id]);
    return filas[0];
}

//registrar un nuevo usuario
async function crear({ nombre, correo, contrasenaHash, boleta, rol }) {
    const [info] = await pool.query(
        `INSERT INTO usuarios (nombre, correo, contrasena_hash, boleta, rol) VALUES (?, ?, ?, ?, ?)`,
        [nombre, correo, contrasenaHash, boleta, rol || 'alumno']
    );
    return obtenerPorId(info.insertId);
}

//actualizar un usuario
async function actualizar(id, { nombre, correo, rol }) {
    const cambios = Object.entries({ nombre, correo, rol }).filter(([, valor]) => valor !== undefined);
    if (cambios.length === 0) return obtenerPorId(id);

    const columnas = cambios.map(([columna]) => `${columna} = ?`).join(', ');
    const [info] = await pool.query(
        `UPDATE usuarios SET ${columnas} WHERE id = ?`,
        [...cambios.map(([, valor]) => valor), id]
    );
    if (info.affectedRows === 0) return undefined;
    return obtenerPorId(id);
}

//eliminar
async function eliminar(id) {
    const [info] = await pool.query(`DELETE FROM usuarios WHERE id = ?`, [id]);
    return info.affectedRows > 0;
}

//buscar por correo (incluye el hash, para login)
async function buscarPorCorreoConHash(correo) {
    const [filas] = await pool.query('SELECT * FROM usuarios WHERE correo = ?', [correo]);
    return filas[0];
}

module.exports = { listar, obtenerPorId, crear, actualizar, eliminar, buscarPorCorreoConHash };