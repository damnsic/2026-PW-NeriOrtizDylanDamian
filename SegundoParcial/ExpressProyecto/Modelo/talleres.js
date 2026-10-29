const pool = require('../db-local');
const { randomUUID } = require('crypto');

//id es CHAR(36) generado en JS,
//así podemos devolver el registro recién creado sin depender de insertId
const COLUMNAS = 'id, nombre, instructor, fecha, cupo, created_at';

//consultar todos los talleres
async function listar() {
    const [filas] = await pool.query(`SELECT ${COLUMNAS} FROM talleres ORDER BY fecha`);
    return filas;
}

//consultar por ID
async function obtenerPorId(id) {
    const [filas] = await pool.query(`SELECT ${COLUMNAS} FROM talleres WHERE id = ?`, [id]);
    return filas[0];
}

//registrar un nuevo taller
async function crear({ nombre, instructor, fecha, cupo }) {
    const id = randomUUID();
    await pool.query(
        `INSERT INTO talleres (id, nombre, instructor, fecha, cupo) VALUES (?, ?, ?, ?, ?)`,
        [id, nombre, instructor || null, fecha, cupo || 30]
    );
    return obtenerPorId(id);
}

//actualizar un taller
async function actualizar(id, { nombre, instructor, fecha, cupo }) {
    const cambios = Object.entries({ nombre, instructor, fecha, cupo }).filter(([, valor]) => valor !== undefined);
    if (cambios.length === 0) return obtenerPorId(id);

    const columnas = cambios.map(([columna]) => `${columna} = ?`).join(', ');
    const [info] = await pool.query(
        `UPDATE talleres SET ${columnas} WHERE id = ?`,
        [...cambios.map(([, valor]) => valor), id]
    );
    if (info.affectedRows === 0) return undefined;
    return obtenerPorId(id);
}

//eliminar (por el ON DELETE CASCADE, también borra sus asistencias)
async function eliminar(id) {
    const [info] = await pool.query(`DELETE FROM talleres WHERE id = ?`, [id]);
    return info.affectedRows > 0;
}

//cuántas asistencias (lugares ocupados) tiene ya el taller
async function contarCupoOcupado(tallerId) {
    const [filas] = await pool.query(
        `SELECT COUNT(*) AS total FROM asistencias WHERE taller_id = ?`,
        [tallerId]
    );
    return filas[0].total;
}

module.exports = { listar, obtenerPorId, crear, actualizar, eliminar, contarCupoOcupado };