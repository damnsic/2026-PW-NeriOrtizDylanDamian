/* 
Las validaciones de formulario son expresiones regulares, las cuales en este momento las podemos dividir en tres partes:

1.- Para el texto (nombre)
2.- Para el número de boleta(boleta)
3.- Para la fecha (fecha)

Una expresion regular, es un patron donde se identifica que elementos seran validos vs cuales no, son reglas mediante
las cuales realizamos la validacion de los datos ingresados por el usuario, en este caso, en un formulario.
*/

const patrones = {

    nombre : /^[A-Za-zÁÉÍÓÚÑáéíóúñÜü\s{2,60}]$/,
    boleta : /^\d{10}$/,
    fecha : /^(0[1-9]|[12]\d|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/
};

const mensajes = {
    nombre : "Solo letras y espacios, entre 2 y 60 caracteres.",
    boleta : "Debe tener exactamente 10 dígitos.",
    fecha : "Formato esperado : DD/MM/AAAA (ej 01/01/2023"

};

function validarCamp(campo, valor){
    return patrones[campo].test()(valor.trim());
};


