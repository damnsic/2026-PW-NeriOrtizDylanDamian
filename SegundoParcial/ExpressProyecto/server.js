const express = require('express')

const app = express();

app.use(express.json());


const PORT = 4000;

//controladores
const usuariosController = require('./Controlador/usuarios_controlador');
const talleresController = require('./Controlador/talleres_controlador');
const asistenciasController = require('./Controlador/asistencias_controlador');


//tenemos la ruta principal por medio del metodo get
app.get('/saludo', (req, res) => {
    res.json({mensaje:'Hola esto es una prueba en GET'});
});

//rutas por medio del metodo post, como un endpoint propio
app.post('/eco', (req, res) => {
    const {texto} = req.body;
    if(!texto){
        return res.status(400).json({error:'EL texto es obligatorio'});
    }
    res.status(201).json({eco:texto})
});

//============================================================
// Usuarios
//============================================================
app.get('/usuarios', usuariosController.listarUsuarios);
app.get('/usuarios/:id', usuariosController.obtenerUsuario);
app.post('/usuarios', usuariosController.crearUsuario);
app.put('/usuarios/:id', usuariosController.actualizarUsuario);
app.delete('/usuarios/:id', usuariosController.eliminarUsuario);

//============================================================
// Talleres
//============================================================
app.get('/talleres', talleresController.listarTalleres);
app.get('/talleres/:id', talleresController.obtenerTaller);
app.get('/talleres/:id/asistencias', talleresController.listarAsistentesDeTaller);
app.post('/talleres', talleresController.crearTaller);
app.put('/talleres/:id', talleresController.actualizarTaller);
app.delete('/talleres/:id', talleresController.eliminarTaller);

//============================================================
// Asistencias
//============================================================
app.get('/asistencias', asistenciasController.listarAsistencias);
app.get('/asistencias/:id', asistenciasController.obtenerAsistencia);
app.post('/asistencias', asistenciasController.registrarAsistencia);
app.delete('/asistencias/:id', asistenciasController.eliminarAsistencia);


app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto: ${PORT}`);
})