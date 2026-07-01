const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");

if(menuToggle && navMenu){

    menuToggle.addEventListener("click", () => {
        navMenu.classList.toggle("active");
    });
    // Libros originales + nuevos


}console.log("main.js conectado");

function obtenerTodosLosLibros(){

    let guardados =
        JSON.parse(localStorage.getItem("todosLibros"));

    if(!guardados){

        guardados = [...libros];

        localStorage.setItem(
            "todosLibros",
            JSON.stringify(guardados)
        );

    }

    return JSON.parse(
        localStorage.getItem("todosLibros")
    );

}



const contenedorLibros = document.querySelector("#contenedor-libros");

if (contenedorLibros && typeof libros !== "undefined") {

    console.log(libros);

    mostrarLibros(obtenerTodosLosLibros());

    const botones = document.querySelectorAll(".categoria");

    botones.forEach(boton => {

        boton.addEventListener("click", () => {

            botones.forEach(b => b.classList.remove("activa"));

            boton.classList.add("activa");

            const categoria = boton.dataset.categoria;

            document.querySelector("#titulo-categoria").textContent =
            "Catálogo : " + categoria;

            const todos = obtenerTodosLosLibros();

               if(categoria === "Todos"){

             mostrarLibros(todos);

            }else{

            const filtrados = todos.filter(libro =>
             libro.categoria === categoria
            );

               mostrarLibros(filtrados);

            }

        });

    });

}

function obtenerRutaImagen(ruta){

    if(!ruta) return "";

    if(
        ruta.startsWith("data:") ||
        ruta.startsWith("http://") ||
        ruta.startsWith("https://") ||
        ruta.startsWith("blob:")
    ){
        return ruta;
    }

    return `./${ruta}`;

}

function mostrarLibros(lista){

    contenedorLibros.innerHTML = "";

    let html = "";

    lista.forEach(libro => {

        const usuario =
            JSON.parse(localStorage.getItem("usuarioActivo"));

        const esAdmin =
            usuario &&
            (String(usuario.rol || "")).toLowerCase() === "admin";

        const imagenLibro = obtenerRutaImagen(libro.imagen);

        html += `
            <div class="card-libro">

                <a href="Libro.html?id=${libro.id}">

                    <img src="${imagenLibro}" alt="${libro.titulo}">

                    <h3>${libro.titulo}</h3>

                    <p class="autor">${libro.autor}</p>

                </a>

                ${
                    esAdmin
                    ? `<button class="btnEliminar"
                        onclick="eliminarLibro(${libro.id})">
                        🗑 Eliminar
                    </button>`
                    : ""
                }

            </div>
        `;

    });

    contenedorLibros.innerHTML = html;

}

function actualizarContadores(){

    const botones = document.querySelectorAll(".categoria");

    const todos = obtenerTodosLosLibros();

    botones.forEach(boton => {

        const categoria = boton.dataset.categoria;

        let cantidad;

        if(categoria === "Todos"){

            cantidad = todos.length;

        }else{

            cantidad = todos.filter(libro =>
                libro.categoria === categoria
            ).length;

        }

        boton.textContent = `${categoria} (${cantidad})`;

    });

}
actualizarContadores();

// ==============================
// Mostrar usuario que inició sesión
// ==============================

const loginMenu = document.getElementById("loginMenu");

if (loginMenu) {

    const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));

    if (usuarioActivo) {

        loginMenu.innerHTML = `
            <span>👋 ${usuarioActivo.nombre}</span>
            <a href="#" id="cerrarSesion">Cerrar sesión</a>
        `;

        document.getElementById("cerrarSesion").addEventListener("click", function(e){

            e.preventDefault();

            localStorage.removeItem("usuarioActivo");

            location.reload();

        });

    }

}
// ==============================
// Panel Administrador
// ==============================

const panelAdmin = document.getElementById("panelAdmin");
const btnAgregarLibro = document.getElementById("btnAgregarLibro");

if(panelAdmin){

    const usuario = JSON.parse(
        localStorage.getItem("usuarioActivo")
    );

    const esAdmin =
        usuario &&
        String(usuario.rol || "").toLowerCase() === "admin";

    if(esAdmin){

        panelAdmin.style.display = "block";

        if(btnAgregarLibro){
            btnAgregarLibro.style.display = "block";
        }

    }else{

        panelAdmin.style.display = "none";

        if(btnAgregarLibro){
            btnAgregarLibro.style.display = "none";
        }

    }
}

function buscarLibroPrompt(){

    const nombre = prompt(
        "Ingrese el nombre del libro:"
    );

    if(!nombre){
        alert("No ingresaste ningún nombre");
        return;
    }

    const todos = obtenerTodosLosLibros();

    const resultados = todos.filter(libro =>
        libro.titulo.toLowerCase()
        .includes(nombre.toLowerCase())
    );

    if(resultados.length > 0){

        mostrarLibros(resultados);

        alert("Libro encontrado");

    }else{

        alert("No se encontró el libro");

    }

}

// ==============================
// ACTIVIDADES
// ==============================

let actividades = JSON.parse(localStorage.getItem("actividades")) || [
    {
        nombre: "Club de Lectura",
        descripcion: "Espacio para compartir lecturas.",
        imagen: "/Imagenes/Logo/ClubDeLectura.png"
    },
    {
        nombre: "Taller de Escritura",
        descripcion: "Aprende técnicas narrativas.",
        imagen: "/Imagenes/Logo/TallerDeEscritura.png"
    },
    {
        nombre: "Presentación de Libros",
        descripcion: "Nuevos autores y obras.",
        imagen: "/Imagenes/Logo/PresentacionDeLibros.png"
    }
];

function mostrarActividades(){

    const contenedor =
    document.getElementById("contenedor-actividades");

    if(!contenedor) return;

    contenedor.innerHTML = "";

    const usuario =
    JSON.parse(localStorage.getItem("usuarioActivo"));

    const esAdmin =
    usuario &&
    String(usuario.rol || "").toLowerCase() === "admin";

    actividades.forEach((actividad, index) => {

        contenedor.innerHTML += `
        <div class="evento-card">
            <h2>${actividad.nombre}</h2>
            <p>${actividad.descripcion}</p>
            <img src="${actividad.imagen}">

            ${
                esAdmin
                ? `<button onclick="eliminarActividad(${index})">
                   🗑 Eliminar
                   </button>`
                : ""
            }
        </div>
        `;
    });

}

function eliminarActividad(index){

    if(confirm("¿Seguro que deseas eliminar esta actividad?")){

        actividades.splice(index,1);

        localStorage.setItem(
            "actividades",
            JSON.stringify(actividades)
        );

        mostrarActividades();
    }
}

let eventos = JSON.parse(localStorage.getItem("eventos")) || [
    {
        dia:"Lunes",
        fecha:"01/07",
        evento:"Club de Lectura",
        hora:"4:00 PM",
        lugar:"Sala Principal"
    },
    {
        dia:"Miércoles",
        fecha:"03/07",
        evento:"Taller de Escritura",
        hora:"5:30 PM",
        lugar:"Aula Virtual"
    }
];

function mostrarEventos(){

    const tabla =
    document.getElementById("tablaEventos");

    if(!tabla) return;

    tabla.innerHTML = "";

    eventos.forEach((ev,index)=>{

        tabla.innerHTML += `
        <tr>
            <td>${ev.dia}</td>
            <td>${ev.fecha}</td>
            <td>${ev.evento}</td>
            <td>${ev.hora}</td>
            <td>${ev.lugar}</td>
        </tr>
        `;
    });

}

document.addEventListener("DOMContentLoaded", function(){

    mostrarActividades();
    mostrarEventos();

});

const btnAgregar = document.getElementById("btnAgregar");
const modalOpciones = document.getElementById("modalOpciones");

if(btnAgregar && modalOpciones){

    btnAgregar.addEventListener("click", function(){

        modalOpciones.style.display = "flex";

    });

}
document.getElementById("cerrarOpciones").onclick = function(){

    modalOpciones.style.display = "none";

};

