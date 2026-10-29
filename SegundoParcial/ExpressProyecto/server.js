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

//prueba de vida de la API del proyecto
app.get('/', (req, res) => {
    res.json({ mensaje: 'API de Registro de Asistencia - CECyT 9 funcionando correctamente' });
});

// Usuarios

app.get('/api/usuarios', usuariosController.listarUsuarios);
app.get('/api/usuarios/:id', usuariosController.obtenerUsuario);
app.post('/api/usuarios', usuariosController.crearUsuario);
app.put('/api/usuarios/:id', usuariosController.actualizarUsuario);
app.delete('/api/usuarios/:id', usuariosController.eliminarUsuario);

// Talleres

app.get('/api/talleres', talleresController.listarTalleres);
app.get('/api/talleres/:id', talleresController.obtenerTaller);
app.get('/api/talleres/:id/asistencias', talleresController.listarAsistentesDeTaller);
app.post('/api/talleres', talleresController.crearTaller);
app.put('/api/talleres/:id', talleresController.actualizarTaller);
app.delete('/api/talleres/:id', talleresController.eliminarTaller);

// Asistencias

app.get('/api/asistencias', asistenciasController.listarAsistencias);
app.get('/api/asistencias/:id', asistenciasController.obtenerAsistencia);
app.post('/api/asistencias', asistenciasController.registrarAsistencia);
app.delete('/api/asistencias/:id', asistenciasController.eliminarAsistencia);


app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto: ${PORT}`);
})