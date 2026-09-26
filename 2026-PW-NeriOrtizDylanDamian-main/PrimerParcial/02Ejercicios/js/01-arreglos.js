const talleres = [
    { nombre: 'Introducción a Python', instructor: 'Ing. María López', cupo: 25, inscritos: 25 }, 
    { nombre: 'Fundamentos de Redes', instructor: 'Ing. Carlos Ramírez', cupo: 30, inscritos: 18 },
    { nombre: 'Diseño de Bases de Datos', instructor: 'Ing. Ana Torres', cupo: 20, inscritos: 20 },
    { nombre: 'Desarrollo Web con JavaScript', instructor: 'Ing. María López', cupo: 25, inscritos: 10 }      
];

// TODO: forEach - imprime "- <nombre> (<inscritos>/<cupo>)" de cada taller
console.log("Aplicando un forEach para imprimir los talleres:");
talleres.forEach((t) => console.log(`- ${t.nombre}(${t.inscritos}/${t.cupo})`));

// TODO: map - crea un arreglo `nombres` solo con los nombres de los talleres
console.log("Aplicando funcion Map con solo Nombres:"); 
const nombres = talleres.map((t) => t.nombre);
console.log(nombres);

// TODO: filter - crea un arreglo `llenos` con los talleres donde inscritos >= cupo
console.log("Aplicando la funcion Filter en los talleres:");
const llenos = talleres.filter((t) => t.inscritos >= t.cupo);
console.log(llenos.map((t) => t.nombre));

// TODO: find - encuentra el primer taller impartido por 'Ing. María López'
console.log("Aplicando la función 'find' para hallar el primer taller impartido por 'Ing. María López'.");
const pTaller = talleres.find((t) => t.instructor === 'Ing. María López');
console.log(pTaller);

// TODO: reduce - calcula `totalInscritos`, la suma de inscritos de todos los talleres
console.log("Aplicando 'reduce' para calcular el total de inscritos.");
const totalInscritos = talleres.reduce((total, t) => total + t.inscritos, 0);
console.log("El total de inscritos hasta el momento es: " + totalInscritos);

// TODO: filter + map encadenados - nombres de los talleres que SI tienen cupo disponible
console.log("Aplicando la función 'map' + 'filter' para crear un arreglo con solo cupo disponible.");
const disponibles = talleres.filter((t) => t.inscritos < t.cupo).map((t) => t.nombre);
const disp = disponibles.join(' - ');
console.log(disp);
