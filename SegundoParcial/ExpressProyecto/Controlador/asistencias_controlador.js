const asistenciasModel = require('../Modelo/asistencias');
const talleresModel = require('../Modelo/talleres');
const { validarBoleta } = require('../validaciones');

async function listarAsistencias(req, res) {
    try {
        const asistencias = await asistenciasModel.listar();
        res.json(asistencias);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function obtenerAsistencia(req, res) {
    try {
        const asistencia = await asistenciasModel.obtenerPorId(req.params.id);
        if (!asistencia) return res.status(404).json({ error: 'Asistencia no encontrada' });
        res.json(asistencia);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

//POST /asistencias -> registrar asistencia de un alumno en un taller
async function registrarAsistencia(req, res) {
    const { taller_id, nombre_alumno, boleta } = req.body;
    if (!taller_id || !nombre_alumno || !boleta) {
        return res.status(400).json({ error: 'taller_id, nombre_alumno y boleta son obligatorios' });
    }
    if (!validarBoleta(boleta)) {
        return res.status(400).json({ error: 'La boleta debe tener 10 dígitos' });
    }

    try {
        const taller = await talleresModel.obtenerPorId(taller_id);
        if (!taller) return res.status(404).json({ error: 'El taller indicado no existe' });

        const yaAsistio = await asistenciasModel.yaRegistrado(taller_id, boleta);
        if (yaAsistio) {
            return res.status(409).json({ error: 'Esta boleta ya registró asistencia en este taller hoy' });
        }

        const ocupados = await talleresModel.contarCupoOcupado(taller_id);
        if (ocupados >= taller.cupo) {
            return res.status(409).json({ error: 'El taller ya alcanzó su cupo máximo' });
        }

        const asistencia = await asistenciasModel.registrar({ taller_id, nombre_alumno, boleta });
        res.status(201).json(asistencia);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function eliminarAsistencia(req, res) {
    try {
        const eliminado = await asistenciasModel.eliminar(req.params.id);
        if (!eliminado) return res.status(404).json({ error: 'Asistencia no encontrada' });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { listarAsistencias, obtenerAsistencia, registrarAsistencia, eliminarAsistencia };