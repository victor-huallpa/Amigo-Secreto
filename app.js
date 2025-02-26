// El principal objetivo de este desafío es fortalecer tus habilidades en lógica de programación. Aquí deberás desarrollar la lógica para resolver el problema.

// Fucionalidades:
// Agregar nombres: Los usuarios escribirán el nombre de un amigo en un campo de texto y lo agregarán a una lista visible al hacer clic en "Adicionar".

// Validar entrada: Si el campo de texto está vacío, el programa mostrará una alerta pidiendo un nombre válido.

// Visualizar la lista: Los nombres ingresados aparecerán en una lista debajo del campo de entrada.

// Sorteo aleatorio: Al hacer clic en el botón "Sortear Amigo", se seleccionará aleatoriamente un nombre de la lista y se mostrará en la página.

//funcion para agregar amigos
function agregarAmigo(){
    let newAmigo = document.getElementById('amigo').value;

    //entrada de nombre vacio
    if(newAmigo === ''){
        alert('Por favor ingresa un amigo');
        return;
    }
    //nombre repetido
    if(listaAmigos.includes(newAmigo)){
        alert(`Este amigo ${newAmigo} ya fue agregado`);
        return
    }

    //boton disabled
    document.getElementById('btn-limpiar').removeAttribute('disabled');

    listaAmigos.push(newAmigo);
    document.getElementById('amigo').value = '';
    actualizarLista(); 
}

//funcion para mostrar lista de amigos
function actualizarLista(){
    let lista = document.getElementById('listaAmigos');
    lista.innerHTML = '';
    listaAmigos.forEach((amigo) => {
        let li = document.createElement('li');
        li.textContent = amigo;
        lista.appendChild(li);
    });
}

//funcion para sortear amigo
function sortearAmigo(){
    let btn = document.getElementById('text-btn');    if(listaAmigos.length === 0){
        alert('Por favor agrega amigos antes de sortear');
        return;
    }
    btn.textContent = 'Sortear de nuevo';

    let amigoSorteado = document.getElementById('resultado');
    let numeroAmigo = Math.floor(Math.random()*listaAmigos.length);
    console.log(numeroAmigo);
    amigoSorteado.textContent = listaAmigos[numeroAmigo];
}

//funcion de caracteristricas iniciales
function condicionesIniciales(){
    //setear boton
    document.getElementById('btn-limpiar').setAttribute('disabled', 'true');


    listaAmigos = [];
    actualizarLista();
    let amigoSorteado = document.getElementById('resultado');
    amigoSorteado.innerHTML = '';
}

condicionesIniciales();