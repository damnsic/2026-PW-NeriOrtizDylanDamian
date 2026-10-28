const talleresModel = require('../Modelo/talleres');
const asistenciasModel = require('../Modelo/asistencias');

async function listarTalleres(req, res) {
    try {
        const talleres = await talleresModel.listar();
        res.json(talleres);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function obtenerTaller(req, res) {
    try {
        const taller = await talleresModel.obtenerPorId(req.params.id);
        if (!taller) return res.status(404).json({ error: 'Taller no encontrado' });
        //se agrega el conteo de asistentes (Semana 9 - Postman, paso 3.2)
        const asistentes = await talleresModel.contarCupoOcupado(req.params.id);
        res.json({ ...taller, asistentes });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function crearTaller(req, res) {
    const { nombre, instructor, fecha, cupo } = req.body;
    if (!nombre || !fecha) {
        return res.status(400).json({ error: 'nombre y fecha son obligatorios' });
    }
    if (cupo !== undefined && (isNaN(cupo) || Number(cupo) <= 0)) {
        return res.status(400).json({ error: 'El cupo debe ser un número mayor a 0' });
    }
    try {
        const taller = await talleresModel.crear({ nombre, instructor, fecha, cupo });
        res.status(201).json(taller);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function actualizarTaller(req, res) {
    const { nombre, instructor, fecha, cupo } = req.body;
    if (nombre === undefined && instructor === undefined && fecha === undefined && cupo === undefined) {
        return res.status(400).json({ error: 'Debe enviar al menos un dato para actualizar: nombre, instructor, fecha o cupo' });
    }
    if (cupo !== undefined && (isNaN(cupo) || Number(cupo) <= 0)) {
        return res.status(400).json({ error: 'El cupo debe ser un número mayor a 0' });
    }
    try {
        const taller = await talleresModel.actualizar(req.params.id, { nombre, instructor, fecha, cupo });
        if (!taller) return res.status(404).json({ error: 'Taller no encontrado' });
        res.status(200).json(taller);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function eliminarTaller(req, res) {
    try {
        const eliminado = await talleresModel.eliminar(req.params.id);
        if (!eliminado) return res.status(404).json({ error: 'Taller no encontrado' });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

//GET /talleres/:id/asistencias -> lista de alumnos que han asistido a ese taller
async function listarAsistentesDeTaller(req, res) {
    try {
        const taller = await talleresModel.obtenerPorId(req.params.id);
        if (!taller) return res.status(404).json({ error: 'Taller no encontrado' });
        const asistentes = await asistenciasModel.listarPorTaller(req.params.id);
        res.json(asistentes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    listarTalleres,
    obtenerTaller,
    crearTaller,
    actualizarTaller,
    eliminarTaller,
    listarAsistentesDeTaller,
};
