const parametros = new URLSearchParams(window.location.search);

const idLibro = Number(parametros.get("id"));

// Obtener libros nuevos
const nuevosLibros =
    JSON.parse(localStorage.getItem("todosLibros")) || [];

// Unir libros originales + nuevos
const todosLosLibros = [...libros, ...nuevosLibros];

// Buscar libro
const libro = todosLosLibros.find(
    l => l.id === idLibro
);

const detalle = document.querySelector("#detalle-libro");

if(libro){

    detalle.innerHTML = `

        <h1>${libro.titulo}</h1>

        <div class="contenedor-libro">

            <div class="flip-card">

                <div class="flip-card-inner">

                    <div class="flip-card-front">
                        <img src="./${libro.imagen}">
                    </div>

                    <div class="flip-card-back">
                        <img src="./${libro.autorImg}">
                    </div>

                </div>

            </div>

            <div class="info">

                <p><strong>Autor:</strong> ${libro.autor}</p>

                <p><strong>Categoría:</strong> ${libro.categoria}</p>

                <p><strong>Editorial:</strong> ${libro.editorial}</p>

                <p><strong>Año:</strong> ${libro.anio}</p>

                <h2>Descripción</h2>

                <p>${libro.descripcion}</p>

            </div>

        </div>

    `;

}