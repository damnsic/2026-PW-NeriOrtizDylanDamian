//vamos a tener funciones que se encargan de validar correo, boleta y contraseña

//correo: formato básico usuario@dominio.algo
function validarCorreo(correo) {
    if (typeof correo !== 'string') return false;
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);
}

//boleta IPN: 10 dígitos
function validarBoleta(boleta) {
    if (typeof boleta !== 'string') return false;
    return /^\d{10}$/.test(boleta);
}

function validarContrasena(contrasena) {
    if (typeof contrasena !== 'string') return false;
    return contrasena.length >= 8;
}

//error de llave única (correo, boleta, etc.) en MySQL
function esDuplicado(error) {
    return error.code === 'ER_DUP_ENTRY';
}

module.exports = { validarCorreo, validarBoleta, validarContrasena, esDuplicado };