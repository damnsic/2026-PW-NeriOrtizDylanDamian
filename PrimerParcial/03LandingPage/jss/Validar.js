function validarformulario(event) {
    event.preventDefault(); // Evita que la página se recargue

    let nombre = document.getElementById("nombre").value;
    let correo = document.getElementById("correo").value;
    let edad = document.getElementById("edad").value;
    let seleccion = document.getElementById("seleccion").value;
    
    // Unimos los textos principales para evaluarlos
    let textoEvaluar = nombre + " " + correo;

    // 1. Validación de campos vacíos
    if (nombre === "" || correo === "" || edad === "" || seleccion === "") {
        alert("Registro incompleto: Todos los campos son obligatorios");
        return false;
    }

    // 2. Validación de Emojis
    const regexEmojis = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F1E6}-\u{1F1FF}\u{1F900}-\u{1F9FF}\u{1FA70}-\u{1FAFF}]/gu;
    if (regexEmojis.test(textoEvaluar)) {
        alert("Registro inválido: No se permite el uso de emojis.");
        return false;
    }

    // 3. Validación de Comandos de borrado (Prevención SQL Injection / terminal)
    const regexComandos = /\b(delete|drop|truncate|remove|rm\s+-rf|format)\b/i;
    if (regexComandos.test(textoEvaluar)) {
        alert("Registro inválido: No se permiten comandos ni palabras reservadas de borrado.");
        return false;
    }

    // 4. Validación de Acrónimos (palabras de 2 o más letras todas en mayúsculas)
    const regexAcronimos = /\b[A-Z]{2,}\b/;
    if (regexAcronimos.test(nombre)) { 
        alert("Registro inválido: No se permiten acrónimos en el nombre (palabras completas en mayúsculas).");
        return false;
    }

    // 5. Validación de edad para el registro de vehículos (MAYORES DE 18)
    if (edad < 18) {
        alert("Registro denegado: La edad mínima es de 18 años.");
        return false;
    }

    // 6. Validación básica de correo electrónico
    if (!correo.includes("@")) {
        alert("Correo electrónico no válido, asegúrate de incluir el '@'.");
        return false;
    }

    // Si pasa todas las validaciones:
    alert("¡Registro exitoso para tu " + seleccion + "!");
    
    // Limpia el formulario
    document.getElementById("form-registro").reset();
    return true;
}