// Lista de amigos
let listaAmigos = [];

// Referencias a elementos del DOM
const inputAmigo = document.getElementById('amigo');
const btnLimpiar = document.getElementById('btn-limpiar');
const btnSortear = document.getElementById('text-btn');
const lista = document.getElementById('listaAmigos');
const resultado = document.getElementById('resultado');

// Agregar un amigo a la lista
function agregarAmigo() {
    const newAmigo = inputAmigo.value.trim();

    // Validaciones
    if (newAmigo === '') {
        mostrarAlerta('Por favor ingresa un amigo');
        return;
    }
    if (listaAmigos.includes(newAmigo)) {
        mostrarAlerta(`Este amigo ${newAmigo} ya fue agregado`);
        return;
    }

    // Agregar y actualizar UI
    listaAmigos.push(newAmigo);
    inputAmigo.value = '';
    actualizarLista();
    actualizarBotones();
}

// Actualizar la lista en el DOM
function actualizarLista() {
    lista.innerHTML = '';
    listaAmigos.forEach(amigo => {
        let li = document.createElement('li');
        li.textContent = amigo;
        lista.appendChild(li);
    });
}

// Sortear un amigo de la lista
function sortearAmigo() {
    if (listaAmigos.length === 0) {
        mostrarAlerta('Por favor agrega amigos antes de sortear');
        return;
    }

    // Seleccionar aleatoriamente
    const numeroAmigo = Math.floor(Math.random() * listaAmigos.length);
    resultado.textContent = listaAmigos[numeroAmigo];

    //muestra resultado en una alerta
    mostrarAlerta(`Tu amigo secreto es: ${resultado.textContent}`,'azul');


    // Cambiar el texto del botón solo si es la primera vez
    if (btnSortear.textContent !== 'Sortear de nuevo') {
        btnSortear.textContent = 'Sortear de nuevo';
    }
}

// Restablecer a condiciones iniciales
function condicionesIniciales() {
    listaAmigos = [];
    actualizarLista();
    resultado.textContent = '';

    actualizarBotones();
}

// Actualizar el estado de los botones
function actualizarBotones() {
    btnLimpiar.disabled = listaAmigos.length === 0;
    btnSortear.disabled = listaAmigos.length === 0;
    // Cambiar el texto del botón solo si es la primera vez
    if (btnSortear.textContent !== 'Sortear amigo') {
        btnSortear.textContent = 'Sortear amigo';
    }
}

// Inicializar
condicionesIniciales();


// Función para mostrar la alerta personalizada
function mostrarAlerta(mensaje, tipo = "rojo", tiempo = 3000) {
    let alerta = document.querySelector('.custom-alert');
    let mensajeElemento = document.querySelector('.alert-message');

    // Limpiar clases previas de color
    alerta.classList.remove('alert-red', 'alert-blue');

    // Asignar el color según el tipo
    if (tipo === "rojo") {
        alerta.classList.add('alert-red');
    } else if (tipo === "azul") {
        alerta.classList.add('alert-blue');
    }

    mensajeElemento.textContent = mensaje;
    alerta.classList.add('show-alert');

    // Cerrar automáticamente después del tiempo definido
    setTimeout(() => {
        cerrarAlerta();
    }, tiempo);
}

function cerrarAlerta() {
    let alerta = document.querySelector('.custom-alert');
    alerta.classList.remove('show-alert');
}

