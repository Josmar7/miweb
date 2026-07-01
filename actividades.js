const actividades = [
    {
        id:1,
        nombre:"Club de Lectura",
        descripcion:"Espacio para compartir lecturas.",
        imagen:"/Imagenes/Logo/ClubDeLectura.png"
    },
    {
        id:2,
        nombre:"Taller de Escritura",
        descripcion:"Aprende técnicas narrativas.",
        imagen:"/Imagenes/Logo/TallerDeEscritura.png"
    },
    {
        id:3,
        nombre:"Presentación de Libros",
        descripcion:"Nuevos autores y obras.",
        imagen:"/Imagenes/Logo/PresentacionDeLibros.png"
    }
];

function mostrarActividades(){

    const contenedor =
    document.getElementById("contenedor-actividades");

    contenedor.innerHTML = "";

    actividades.forEach(act => {

        contenedor.innerHTML += `
            <div class="evento-card">

                <h2>${act.nombre}</h2>

                <p>${act.descripcion}</p>

                <img src="${act.imagen}">

                ${
                    esAdmin
                    ? `
                    <button class="btnEliminarActividad"
                    onclick="eliminarActividad(${act.id})">
                    🗑 Eliminar
                    </button>
                    `
                    : ""
                }

            </div>
        `;
    });
}

function eliminarActividad(id){

    const confirmar =
    confirm("¿Seguro que quieres eliminar esta actividad?");

    if(!confirmar) return;

    const index =
    actividades.findIndex(a => a.id === id);

    actividades.splice(index,1);

    mostrarActividades();
}


const inputImagen =
document.getElementById("imagenActividad");

const previewActividad =
document.getElementById("previewActividad");

if(inputImagen){

    inputImagen.addEventListener("change", function(){

        const archivo = this.files[0];

        if(archivo){

            const lector = new FileReader();

            lector.onload = function(e){

                previewActividad.src = e.target.result;
                previewActividad.style.display = "block";

            };

            lector.readAsDataURL(archivo);
        }

    });

}


document.getElementById("formActividad")
.addEventListener("submit", function(e){

    e.preventDefault();

    const nuevaActividad = {

        id: Date.now(),

        nombre:
        document.getElementById("nombreActividad").value,

        descripcion:
        document.getElementById("descripcionActividad").value,

        imagen: previewActividad.src

    };

    actividades.push(nuevaActividad);

    mostrarActividades();

    alert("Actividad agregada correctamente");

    modalActividad.style.display = "none";

    this.reset();

    previewActividad.style.display = "none";

});

const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));

const loginMenu = document.getElementById("loginMenu");

if(usuario){

    loginMenu.innerHTML = `
        <span>👋 ${usuario.nombre}</span>
        <a href="#" id="cerrarSesion">Cerrar sesión</a>
    `;

    document.getElementById("cerrarSesion").addEventListener("click", function(){

        localStorage.removeItem("usuarioActivo");
        window.location.href = "index.html";

    });

}

const esAdmin =
usuario &&
String(usuario.rol || "").toLowerCase() === "admin";

const modalOpciones = document.getElementById("modalOpciones");
const modalActividad = document.getElementById("modalActividad");
const modalEvento = document.getElementById("modalEvento");

document.getElementById("btnAgregar").addEventListener("click", function(){
    modalOpciones.style.display = "flex";
});

document.getElementById("btnNuevaActividad").addEventListener("click", function(){

    alert("Actividad seleccionada");

    modalOpciones.style.display = "none";
    modalActividad.style.display = "flex";

});

document.getElementById("btnNuevoEvento").addEventListener("click", function(){

    alert("Evento seleccionado");

    modalOpciones.style.display = "none";

    cargarOpcionesEventos();

    modalEvento.style.display = "flex";

});

document.getElementById("cerrarOpciones").addEventListener("click", function(){
    modalOpciones.style.display = "none";
});

document.getElementById("cerrarEvento").addEventListener("click", function(){
    modalEvento.style.display = "none";
});

document.getElementById("cerrarActividad").addEventListener("click", function(){
    modalActividad.style.display = "none";
});

function cargarHorario(){

    const tabla =
    document.getElementById("tablaEventos");

    tabla.innerHTML = `
        <tr>
            <th>Día</th>
            <th>Fecha</th>
            <th>Evento</th>
            <th>Hora</th>
            <th>Lugar</th>
            ${esAdmin ? "<th>Acción</th>" : ""}
        </tr>

        <tr>
            <td>Lunes</td>
            <td>01/07</td>
            <td>Club de Lectura</td>
            <td>4:00 PM</td>
            <td>Sala Principal</td>
            ${esAdmin ? `<td><button onclick="this.parentElement.parentElement.remove()">🗑️</button></td>` : ""}
        </tr>

        <tr>
            <td>Miércoles</td>
            <td>03/07</td>
            <td>Taller de Escritura</td>
            <td>5:30 PM</td>
            <td>Aula Virtual</td>
            ${esAdmin ? `<td><button onclick="this.parentElement.parentElement.remove()">🗑️</button></td>` : ""}
        </tr>

        <tr>
            <td>Viernes</td>
            <td>05/07</td>
            <td>Presentación de Libros</td>
            <td>6:00 PM</td>
            <td>Auditorio</td>
            ${esAdmin ? `<td><button onclick="this.parentElement.parentElement.remove()">🗑️</button></td>` : ""}
        </tr>
    `;

    if(esAdmin){
        document.getElementById("panelAdmin").style.display = "block";
        document.getElementById("colAccion").style.display = "table-cell";
    }
}
function cargarOpcionesEventos(){

    const selectActividad =
    document.getElementById("actividadEvento");

    const selectLugar =
    document.getElementById("lugarEvento");

    selectActividad.innerHTML = "";
    selectLugar.innerHTML = "";

    actividades.forEach(act => {
        selectActividad.innerHTML += `
            <option>${act.nombre}</option>
        `;
    });

    const lugares = [
        "Sala Principal",
        "Aula Virtual",
        "Auditorio",
        "Zona Infantil",
        "Biblioteca Central"
    ];

    lugares.forEach(lugar => {
        selectLugar.innerHTML += `
            <option>${lugar}</option>
        `;
    });
}

document.getElementById("formEvento").addEventListener("submit", function(e){

    e.preventDefault();

    const dia =
    document.getElementById("diaEvento").value;

    const fecha =
    document.getElementById("fechaEvento").value;

    const actividad =
    document.getElementById("actividadEvento").value;

    const hora =
    document.getElementById("horaEvento").value;

    const lugar =
    document.getElementById("lugarEvento").value;

    const tabla =
    document.getElementById("tablaEventos");

    const nuevaFila = document.createElement("tr");

    nuevaFila.innerHTML = `
    <td>${dia}</td>
    <td>${fecha}</td>
    <td>${actividad}</td>
    <td>${hora}</td>
    <td>${lugar}</td>
    ${
        esAdmin
        ? `<td><button onclick="this.parentElement.parentElement.remove()">🗑️</button></td>`
        : ""
    }
`;

    tabla.appendChild(nuevaFila);

    alert("Evento agregado correctamente");

    modalEvento.style.display = "none";

    this.reset();

});


document.getElementById("btnNuevoEvento").addEventListener("click", function(){
    alert("Evento seleccionado");
    modalOpciones.style.display = "none";
    modalEvento.style.display = "flex";
});

mostrarActividades();
cargarHorario();