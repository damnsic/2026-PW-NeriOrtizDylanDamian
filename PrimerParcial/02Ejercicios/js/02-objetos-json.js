// 02-objetos-json.js
// Object.keys/values/entries y JSON.stringify/parse. Completa cada TODO.

const taller = {
  nombre: 'Introducción a Python',
  instructor: 'Ing. María López',
  cupo: 25,
  inscritos: 25,
};

// TODO: Object.keys — imprime solo los nombres de las propiedades de taller
console.log('Manejo de Object.keys');
console.log(Object.keys(taller));


// TODO: Object.values — imprime solo los valores
console.log('Manejo de valores del objeto');
console.log(Object.values(taller));


// TODO: Object.entries — recorre con for..of e imprime "campo: valor" de cada propiedad
console.log("Manejo de Objetos por For of para entries");
for (const [campo, valor] of Object.entries(taller)) {
    console.log(`${campo}: ${valor}`);
}


// TODO: JSON.stringify — convierte taller a texto (guárdalo en textoJson) e imprímelo
console.log("Manejo de conversio de objeto a String");
const textoJson = JSON.stringify(taller, null, 2);
console.log(textoJson);

// Lo quiuero visualizar como cadena no como objeto
console.log("tipo: ", typeof textoJson);


// TODO: JSON.parse — convierte textoJson de vuelta a objeto (guárdalo en objetoDeVuelta)
//       e imprime objetoDeVuelta.nombre
console.log("Inverso de cadena a JSON");
const objetoDeVuelta = JSON.parse(textoJson);
console.log("tipo: ", typeof objetoDeVuelta);
console.log(objetoDeVuelta.nombre);