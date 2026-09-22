const talleres = [
    { nombre: 'Introducción a Python', instructor: 'Ing. María López', cupo: 25, inscritos: 25 }, 
    { nombre: 'Fundamentos de Redes', instructor: 'Ing. Carlos Ramírez', cupo: 30, inscritos: 18 },
    { nombre: 'Diseño de Bases de Datos', instructor: 'Ing. Ana Torres', cupo: 20, inscritos: 20 },
    { nombre: 'Desarrollo Web con JavaScript', instructor: 'Ing. María López', cupo: 25, inscritos: 10 }      
];

// 1. DIBUJAR LA TABLA EN EL HTML
function pintarTabla() {
    const tabla = document.getElementById('tabla-talleres');
    let tbody = tabla.querySelector('tbody');
    
    // Si no existe el tbody en tu HTML, lo creamos
    if (!tbody) {
        tbody = document.createElement('tbody');
        tabla.appendChild(tbody);
    }
    
    // Rellenamos la tabla iterando el arreglo
    tbody.innerHTML = talleres.map(taller => `
        <tr>
            <td>${taller.nombre}</td>
            <td>${taller.instructor}</td>
            <td>${taller.cupo}</td>
            <td>${taller.inscritos}</td>
        </tr>
    `).join('');
}

// Llamamos a la función para que la tabla no esté vacía al abrir Live Server
pintarTabla();


// 2. CONECTAR EL FORMULARIO A LOS MÉTODOS DE ARREGLOS
const formArreglos = document.getElementById('form-arreglos');
const resultadoArreglos = document.getElementById('resultado-arreglo');
const selectOperacionArreglo = document.getElementById('operacion-arreglo');

// Este evento "escucha" cuando das clic en el botón "Ejecutar"
formArreglos.addEventListener('submit', (evento) => {
    // Evita que la página se recargue sola
    evento.preventDefault(); 
    
    // Obtenemos qué opción eligió el usuario en el <select>
    const operacion = selectOperacionArreglo.value; 
    let resultadoTexto = "";

    // Evaluamos la opción con un switch
    switch (operacion) {
        case 'forEach':
            resultadoTexto = talleres.map((t) => `- ${t.nombre} (${t.inscritos}/${t.cupo})`).join('\n');
            break;
            
        case 'map':
            const nombres = talleres.map((t) => t.nombre);
            resultadoTexto = `[ ${nombres.join(', ')} ]`;
            break;
            
        case 'filter':
            const llenos = talleres.filter((t) => t.inscritos >= t.cupo);
            resultadoTexto = llenos.map((t) => t.nombre).join('\n');
            break;
            
        case 'find':
            const pTaller = talleres.find((t) => t.instructor === 'Ing. María López');
            resultadoTexto = pTaller ? pTaller.nombre : "No se encontró ningún taller";
            break;
            
        case 'reduce':
            const totalInscritos = talleres.reduce((total, t) => total + t.inscritos, 0);
            resultadoTexto = `El total de inscritos hasta el momento es: ${totalInscritos}`;
            break;
            
        case 'filter-map':
            const disponibles = talleres.filter((t) => t.inscritos < t.cupo).map((t) => t.nombre);
            resultadoTexto = disponibles.join(' - ');
            break;
    }

    // Mostramos el resultado en el <output> una sola vez al final
    resultadoArreglos.textContent = resultadoTexto;
});