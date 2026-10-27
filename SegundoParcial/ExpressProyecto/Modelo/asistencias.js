const pool = require('../db-local');
const { randomUUID } = require('crypto');

const COLUMNAS = 'id, taller_id, nombre_alumno, boleta, fecha_registro';

//consultar todas las asistencias
async function listar() {
    const [filas] = await pool.query(`SELECT ${COLUMNAS} FROM asistencias ORDER BY fecha_registro DESC`);
    return filas;
}

//consultar por ID
async function obtenerPorId(id) {
    const [filas] = await pool.query(`SELECT ${COLUMNAS} FROM asistencias WHERE id = ?`, [id]);
    return filas[0];
}

//lista de asistencia de un taller en específico
async function listarPorTaller(tallerId) {
    const [filas] = await pool.query(
        `SELECT ${COLUMNAS} FROM asistencias WHERE taller_id = ? ORDER BY fecha_registro`,
        [tallerId]
    );
    return filas;
}

//evita que la misma boleta registre asistencia dos veces el mismo día en el mismo taller
async function yaRegistrado(tallerId, boleta) {
    const [filas] = await pool.query(
        `SELECT id FROM asistencias WHERE taller_id = ? AND boleta = ? AND DATE(fecha_registro) = CURDATE()`,
        [tallerId, boleta]
    );
    return filas.length > 0;
}

//registrar asistencia de un alumno en un taller
async function registrar({ taller_id, nombre_alumno, boleta }) {
    const id = randomUUID();
    await pool.query(
        `INSERT INTO asistencias (id, taller_id, nombre_alumno, boleta) VALUES (?, ?, ?, ?)`,
        [id, taller_id, nombre_alumno, boleta]
    );
    return obtenerPorId(id);
}

//eliminar un registro de asistencia
async function eliminar(id) {
    const [info] = await pool.query(`DELETE FROM asistencias WHERE id = ?`, [id]);
    return info.affectedRows > 0;
}

module.exports = { listar, obtenerPorId, listarPorTaller, yaRegistrado, registrar, eliminar };