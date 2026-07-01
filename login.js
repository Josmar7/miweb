// Administrador fijo
const administrador = {
    nombre: "Administrador",
    correo: "admin@biblioteca.com",
    password: "admin123",
    rol: "admin"
};

// Obtener usuarios registrados
let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

// Registrar usuario
document.getElementById("formRegistro").addEventListener("submit", function(e){

    e.preventDefault();

    const nombre = document.getElementById("nombreRegistro").value;
    const correo = document.getElementById("correoRegistro").value;
    const password = document.getElementById("passwordRegistro").value;

    const existe = usuarios.find(u => u.correo === correo);

    if(existe){
        alert("Ese correo ya está registrado.");
        return;
    }

    usuarios.push({
        nombre,
        correo,
        password,
        rol:"usuario"
    });

    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    alert("Usuario registrado correctamente.");

    this.reset();

});

document.getElementById("formLogin").addEventListener("submit", function(e){

    e.preventDefault();

    const correo = document.getElementById("correoLogin").value;
    const password = document.getElementById("passwordLogin").value;

    // Administrador
    if(correo === administrador.correo && password === administrador.password){

        localStorage.setItem("usuarioActivo", JSON.stringify(administrador));

        alert("Bienvenido Administrador");

        window.location.href="index.html";

        return;
    }

    // Usuarios
    const usuario = usuarios.find(u=>u.correo===correo && u.password===password);

    if(usuario){

        localStorage.setItem("usuarioActivo", JSON.stringify(usuario));

        alert("Bienvenido "+usuario.nombre);

        window.location.href="index.html";

    }else{

        alert("Correo o contraseña incorrectos.");

    }

});