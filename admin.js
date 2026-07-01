// =====================================
// ADMINISTRADOR
// =====================================

// Obtener usuario activo
function obtenerUsuarioActivo() {

    return JSON.parse(localStorage.getItem("usuarioActivo"));

}

// Verificar si es administrador
function esAdministrador() {

    const usuario = obtenerUsuarioActivo();

    return usuario && usuario.rol === "admin";

}

// Mostrar u ocultar el panel
document.addEventListener("DOMContentLoaded", () => {

    const panel = document.getElementById("panelAdmin");

    if(panel){

        panel.style.display = esAdministrador()
            ? "block"
            : "none";

    }

});
// ===============================
// MODAL AGREGAR LIBRO
// ===============================

document.addEventListener("DOMContentLoaded", () => {

    const btnAgregar = document.getElementById("btnAgregarLibro");

    const modal = document.getElementById("modalLibro");

    const cerrar = document.querySelector(".cerrarModal");

    if(btnAgregar){

        btnAgregar.addEventListener("click",()=>{

            modal.style.display="flex";

        });

    }

    if(cerrar){

        cerrar.addEventListener("click",()=>{

            modal.style.display="none";

        });

    }

    window.addEventListener("click",(e)=>{

        if(e.target===modal){

            modal.style.display="none";

        }

    });

});

// ===============================
// VISTA PREVIA DE IMÁGENES
// ===============================

const inputLibro = document.getElementById("imagenLibro");
const previewLibro = document.getElementById("previewLibro");

if(inputLibro){

    inputLibro.addEventListener("change", function(){

        const archivo = this.files[0];

        if(archivo){

            const lector = new FileReader();

            lector.onload = function(e){

                previewLibro.src = e.target.result;

                previewLibro.style.display = "block";

            };

            lector.readAsDataURL(archivo);

        }

    });

}

const inputAutor = document.getElementById("autorImagen");
const previewAutor = document.getElementById("previewAutor");

if(inputAutor){

    inputAutor.addEventListener("change", function(){

        const archivo = this.files[0];

        if(archivo){

            const lector = new FileReader();

            lector.onload = function(e){

                previewAutor.src = e.target.result;

                previewAutor.style.display = "block";

            };

            lector.readAsDataURL(archivo);

        }

    });

}
// ===============================

// GUARDAR LIBRO
// ===============================

const formLibro = document.getElementById("formLibro");

if(formLibro){

    formLibro.addEventListener("submit", function(e){

        e.preventDefault();

        const confirmar = confirm(
            "¿Quieres agregar este libro?"
        );

        if(!confirmar){
            return;
        }

        const nuevoLibro = {

            id: Date.now(),

            titulo: document.getElementById("tituloLibro").value,

            autor: document.getElementById("autorLibro").value,

            categoria: document.getElementById("categoriaLibro").value,

            editorial: document.getElementById("editorialLibro").value,

            anio: document.getElementById("anioLibro").value,

            imagen: previewLibro.src,

            autorImg: previewAutor.src,

            descripcion: document.getElementById("descripcionLibro").value

        };

        let todos = JSON.parse(
            localStorage.getItem("todosLibros")
        ) || [];

        // agregar libro
        todos.push(nuevoLibro);

        // guardar primero
        localStorage.setItem(
            "todosLibros",
            JSON.stringify(todos)
        );

        // verificar guardado
        const verificacion = JSON.parse(
            localStorage.getItem("todosLibros")
        );

        if(verificacion){

            alert("Libro agregado correctamente");

            modal.style.display = "none";

            formLibro.reset();

            previewLibro.style.display = "none";
            previewAutor.style.display = "none";

            // recargar
            window.location.href = "Catalago.html";

        }

    });

}


// ===============================
// MOSTRAR TODOS LOS LIBROS
// ===============================

function mostrarTodosLosLibros(){

    const todos =
        JSON.parse(localStorage.getItem("todosLibros")) || [];

    mostrarLibros(todos);

    actualizarContadores();

}

// ===============================
// ELIMINAR LIBRO
// ===============================

function eliminarLibro(id){

    const confirmar = confirm(
        "¿Seguro que quieres eliminar este libro?"
    );

    if(!confirmar){
        return;
    }

    let todos =
        JSON.parse(localStorage.getItem("todosLibros")) || [];

    todos = todos.filter(
        libro => Number(libro.id) !== Number(id)
    );

    localStorage.setItem(
        "todosLibros",
        JSON.stringify(todos)
    );

    alert("Libro eliminado correctamente");

    location.reload();

}