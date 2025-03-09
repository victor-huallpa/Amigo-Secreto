// Lista de amigos
let listaAmigos = [];
let listaSeleccionados = [];


// Referencias a elementos del DOM
const inputAmigo = document.getElementById('amigo');
const btnLimpiar = document.getElementById('btn-limpiar');
const btnSortear = document.getElementById('text-btn');
const lista = document.getElementById('listaAmigos');
const amigoSecreto = document.getElementById('resultado');

//formatear texto
function formatear(texto) {
    // Dividir el texto en palabras y capitalizar cada una
    let palabras = texto.split(" ").map(palabra => {
        return palabra.charAt(0).toUpperCase() + palabra.slice(1).toLowerCase();
    });

    // Unir las palabras en un solo string
    let textoFormateado = palabras.join(" ");

    //retornamos textoforamteado
    return textoFormateado;
    // Guardar en la lista
}

// Agregar un amigo a la lista
function agregarAmigo() {
    const newAmigo = inputAmigo.value.trim();

    //foramteamos texto
    const formatearTexto = formatear(newAmigo);

    // Validaciones
    if (formatearTexto === '') {
        mostrarAlerta('Por favor ingresa un amigo');
        return;
    }
    if (listaAmigos.includes(formatearTexto)) {
        mostrarAlerta(`Este amigo ${formatearTexto} ya fue agregado`);
        return;
    }

    // Agregar y actualizar UI
    listaAmigos.push(formatearTexto);
    inputAmigo.value = '';
    actualizarLista();
    actualizarBotones();
}

// Actualizar la lista en el DOM
function actualizarLista() {
    lista.innerHTML = ''; // Limpia la lista existente
    listaAmigos.forEach((amigo) => {
        let li = document.createElement('li');
        li.textContent = amigo;
        li.classList.add(`${amigo}`);

        // Comprueba si el amigo está en la lista de seleccionados
        if (listaSeleccionados.includes(amigo)) {
            li.classList.add("texto-marcado");
        }

        lista.appendChild(li);
    });

}

// Sortear un amigo de la lista
function sortearAmigo() {
    if (listaAmigos.length === 0) {
        mostrarAlerta('Por favor agrega amigos antes de sortear');
        return;
    }

    if (listaSeleccionados.length === listaAmigos.length) {
        mostrarAlerta('Todos los amigos ya han sido seleccionados');
        return;
    }

    let resultado;
    let numeroAmigo;

    do {
        numeroAmigo = Math.floor(Math.random() * listaAmigos.length);
        resultado = listaAmigos[numeroAmigo];
    } while (listaSeleccionados.includes(resultado));

    //alerta tipo confirm
    showConfirm(`Tu amigo secreto es: ${resultado}`, (response) => {
        if (response) {
            listaSeleccionados.push(resultado);
            amigoSecreto.textContent = listaAmigos[numeroAmigo];
            actualizarLista();
        } else {
            if (btnSortear.textContent !== 'Sortear de nuevo') {
                btnSortear.textContent = 'Sortear de nuevo';
            }
        }
    });

    if (btnSortear.textContent !== 'Sortear de nuevo') {
        btnSortear.textContent = 'Sortear de nuevo';
    }
}

// Restablecer a condiciones iniciales
function condicionesIniciales() {
    inputAmigo.value = '';
    listaAmigos = [];
    listaSeleccionados = [];
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


// Función para mostrar la alerta personalizada tipo alert
function mostrarAlerta(mensaje, tiempo = 3000) {
    let alerta = document.querySelector('.custom-alert');
    let mensajeElemento = document.querySelector('.alert-message');

    alerta.classList.add('alert-red');

    mensajeElemento.textContent = mensaje;
    alerta.classList.add('show-alert');

    // Cerrar automáticamente después del tiempo definido
    setTimeout(() => {
        cerrarAlerta();
    }, tiempo);
}
//boton cerrar alerta
function cerrarAlerta() {
    let alerta = document.querySelector('.custom-alert');
    alerta.classList.remove('show-alert');
}

//funcion de boton de tipo confirm
function showConfirm(message, callback) {
    const confirmAlert = document.getElementById("customConfirm");
    const confirmMessage = document.getElementById("confirmMessage");
    const confirmYes = document.getElementById("confirmYes");
    const confirmNo = document.getElementById("confirmNo");

    confirmMessage.textContent = message;
    confirmAlert.classList.add("show-alert");

    const handleResponse = (response) => {
        confirmAlert.classList.remove("show-alert");
        callback(response);
    };

    confirmYes.onclick = () => handleResponse(true);
    confirmNo.onclick = () => handleResponse(false);
}

