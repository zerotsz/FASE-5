let menu = [
    { nombre: "Arroz con pollo", precio: 12, stock: 5 },
    { nombre: "Lomo saltado", precio: 18, stock: 3 },
    { nombre: "Sopa", precio: 8, stock: 10 },
    { nombre: "Ceviche", precio: 10, stock: 4 },
    { nombre: "Chaufa", precio: 15, stock: 2 }
];

function renderMenu() {

    const output = document.getElementById("output");

    let html = "<table border='1'>";
    html += "<tr><th>Nombre</th><th>Precio</th><th>Stock</th><th>Estado</th><th>Acción</th></tr>";

    for (let i = 0; i < menu.length; i++) {

        const plato = menu[i];

        let estado = "";
        let clase = "";

        if (plato.stock === 0) {
            estado = "AGOTADO";
            clase = "agotado";
        }
        else if (plato.stock <= 3) {
            estado = "Stock bajo";
            clase = "bajo";
        }
        else {
            estado = "Normal";
            clase = "normal";
        }

        html += `<tr class="${clase}">
                    <td>${plato.nombre}</td>
                    <td>${plato.precio}</td>
                    <td>${plato.stock}</td>
                    <td>${estado}</td>
                    <td>
                        <button onclick="venderPlato('${plato.nombre}',1)">
                        Vender
                        </button>
                    </td>
                </tr>`;
    }

    html += "</table>";

    output.innerHTML = html;

    contarPlatos();
}

function agregarPlatoDemo() {

    const nuevoPlato = { nombre: "Pollo a la brasa", precio: 20, stock: 4 };
    menu.push(nuevoPlato);

    const nuevoPlato1 = { nombre: "Anticuchos", precio: 30, stock: 5 };
    menu.push(nuevoPlato1);
}

function contarPlatos() {

    const output2 = document.getElementById("output2");

    let html2 = "-----------";
    html2 += " total de platos: " + menu.length;
    html2 += " ---------";

    output2.innerHTML = html2;
}

// BUSCAR PLATO
function buscarPlatoPorNombre(nombre) {
    return menu.find(plato =>
        plato.nombre.toLowerCase() === nombre.toLowerCase()
    );
}

// FILTRAR STOCK BAJO
function filtrarStockBajo() {
    return menu.filter(plato => plato.stock <= 3);
}

// RESUMEN DEL MENU
function obtenerResumenMenu() {
    return menu.map(plato =>
        plato.nombre + " - S/ " + plato.precio
    );
}

// RENDER LISTA
function renderLista(titulo, lista) {

    const output = document.getElementById("output");

    let html = "<h3>" + titulo + "</h3>";
    html += "<ul>";

    lista.forEach(item => {
        html += "<li>" + item + "</li>";
    });

    html += "</ul>";

    output.innerHTML = html;
}

function venderPlato(nombre, cantidad) {

    const plato = menu.find(p => p.nombre.toLowerCase() === nombre.toLowerCase());

    if (!plato) {
        alert("Plato no existe");
    }
    else if (plato.stock === 0) {
        alert("No disponible");
    }
    else if (plato.stock >= cantidad) {

        plato.stock = plato.stock - cantidad;

        alert("Venta realizada");

    }
    else {
        alert("Stock insuficiente");
    }

    renderMenu();
}

// 🔹 FUNCION ESTADO GENERAL (CORREGIDA)
function verificarEstadoGeneral() {

    let agotados = 0;
    let stockBajo = 0;

    for (let i = 0; i < menu.length; i++) {

        if (menu[i].stock === 0) {
            agotados++;
        }
        else if (menu[i].stock <= 3) {
            stockBajo++;
        }

    }

    if (agotados > 0) {
        alert("Hay platos agotados:" + agotados);
    }
    else if (stockBajo > 0) {
        alert("Hay platos con stock bajo:" + stockBajo);
    }
    else {
        alert("Todo disponible");
    }

}

// BOTON MOSTRAR
document.getElementById("btnMostrar").addEventListener("click", () => {
    renderMenu();
});

// BOTON AGREGAR
document.getElementById("btnAgregar").addEventListener("click", () => {
    agregarPlatoDemo();
    renderMenu();
});

// BOTON BUSCAR
document.getElementById("btnBuscar").addEventListener("click", () => {

    const inputBuscar = document.getElementById("inputBuscar");
    const nombre = inputBuscar.value;

    const plato = buscarPlatoPorNombre(nombre);

    if (plato) {

        renderLista("Resultado", [
            plato.nombre + " - S/ " + plato.precio + " - Stock: " + plato.stock
        ]);

    } else {

        document.getElementById("output").innerHTML = "No encontrado";
    }
});

// BOTON STOCK BAJO
document.getElementById("btnStockBajo").addEventListener("click", () => {

    const resultado = filtrarStockBajo();

    const lista = resultado.map(plato =>
        plato.nombre + " - Stock: " + plato.stock
    );

    renderLista("Stock bajo", lista);
});

// BOTON RESUMEN
document.getElementById("btnResumen").addEventListener("click", () => {

    const resumen = obtenerResumenMenu();

    renderLista("Resumen del menú", resumen);

});
