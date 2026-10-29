// Reglas de validación de los datos de un usuario. Son las mismas que valida el backend y las que
// Pruebas de Software prueba con Jest: el front valida para avisar rápido a quien llena el
// formulario; el backend valida para que nadie se las salte mandando la petición con Postman.

export function validarCorreo(correo) {
  if (typeof correo !== 'string') return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo.trim());
}

export function validarBoleta(boleta) {
  if (typeof boleta !== 'string') return false;
  return /^\d{10}$/.test(boleta.trim());
}

export function validarContrasena(contrasena) {
  if (typeof contrasena !== 'string') return false;
  return contrasena.length >= 8;
}

// --- Validaciones adicionales del nombre y del dominio del correo (pedidas por el profesor) ---

// Dominios de correo reales/conocidos. Así "pepito@pepito.com" se rechaza aunque el formato sea válido.
const DOMINIOS_CORREO_VALIDOS = [
  'gmail.com', 'hotmail.com', 'outlook.com', 'yahoo.com', 'live.com',
  'icloud.com', 'protonmail.com', 'ipn.mx', 'alumno.ipn.mx', 'cecyt9.ipn.mx',
];

export function dominioCorreoValido(correo) {
  if (!validarCorreo(correo)) return false;
  const dominio = correo.trim().toLowerCase().split('@')[1];
  return DOMINIOS_CORREO_VALIDOS.includes(dominio);
}

// true si el nombre trae algún dígito (ej. "juantio 987654").
export function nombreTieneNumeros(nombre) {
  return /\d/.test(String(nombre));
}

// true si alguna palabra del nombre se repite (ej. "juantio juantio juantio").
export function nombreTienePalabraRepetida(nombre) {
  const palabras = String(nombre).trim().toLowerCase().split(/\s+/).filter(Boolean);
  return new Set(palabras).size < palabras.length;
}

// Un nombre válido: solo letras y espacios, nombre y apellido (2+ palabras), sin números y sin
// palabras repetidas.
export function validarNombre(nombre) {
  if (typeof nombre !== 'string') return false;
  const limpio = nombre.trim();
  if (!limpio) return false;
  if (nombreTieneNumeros(limpio)) return false;
  if (nombreTienePalabraRepetida(limpio)) return false;
  const palabras = limpio.split(/\s+/).filter(Boolean);
  if (palabras.length < 2) return false;
  return palabras.every((p) => /^[A-Za-zÁÉÍÓÚÑÜáéíóúñü'-]+$/.test(p));
}

// Mensaje específico de por qué un nombre no pasó validarNombre, para mostrarlo en el formulario.
export function errorNombre(nombre) {
  const limpio = String(nombre || '').trim();
  if (!limpio) return 'Escribe el nombre completo.';
  if (nombreTieneNumeros(limpio)) return 'El nombre no debe contener números.';
  if (nombreTienePalabraRepetida(limpio)) return 'El nombre no debe repetir la misma palabra.';
  if (limpio.split(/\s+/).filter(Boolean).length < 2) return 'Escribe nombre y apellido.';
  if (!validarNombre(limpio)) return 'El nombre solo debe contener letras.';
  return '';
}