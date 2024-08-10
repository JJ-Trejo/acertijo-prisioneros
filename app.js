let numMinimo = 1;
let numMaximo = 100;
let numerosGenerados = []; //este arreglo guarda los numeros que se van generando para que no se repitan
let cajas = []; //se crea un arreglo, inicialmente sin nada

function generarCajas(){

    //Primero se quitan las instrucciones iniciales
    let ocultarInstrucciones = document.querySelector('.instrucciones');
    ocultarInstrucciones.style.display = 'none'
    //

    cajas = [];  //limpia el arreglo cajas
    numerosGenerados = []; //limpia el arreglo numerosGenerados

    let numCajas = document.getElementById('numPrisioneros').value; //recibe el valor ingresado por el usuario y la guarda en "numCajas"

    let contenedorCajas = document.getElementById('contenedorCajas'); //le damos acceso al div creado en html con el id "contenedorCajas"
    
    contenedorCajas.innerHTML = ''; //limpiamos el contenedor

    if (numCajas < numMinimo || numCajas > numMaximo){
        alert(`Por favor ingrese un número entre ${numMinimo} y ${numMaximo}`);
        return;
    }

    //crear y ordenas las cajas

    for ( let i=1; i<=numCajas; i++){ //repetira el ciclo igual a numCajas
        let numeroAleatorio = generaNumeroAleatorio(numCajas); //se llama a la funcion que genera un numero aleatorio y lo guarda en numeroAleatorio
        cajas.push({ numeroCaja: i, numInterior: numeroAleatorio }); //se agrega el numero de la caja y su numero interior al arreglo cajas[]
        numerosGenerados.push(numeroAleatorio);
    }

    console.log(cajas);

    creaCajas(); //llama a la funcion creaCajas
}


//mejorar el algoritmo generaNumeroAleatorio
function generaNumeroAleatorio(numCajas) {
    const numAleatorio = parseInt(Math.random()*numCajas) +1; //Genera un numero entero aleatorio entre numMinimo y numCajas
    //console.log(numAleatorio);
    if(numerosGenerados.includes(numAleatorio)){
        return generaNumeroAleatorio (numCajas);
    }
    else{
        return numAleatorio;
    }
}

//crear y agregar las cajas al contenedor
function creaCajas(){
    //es un bucle en el que se aplicarán los atributos dentro de {} para cada elemento del arreglo cajas []
    cajas.forEach(cajaDatos => {
        //const caja es una referencia el nuevo 'div'
        const caja = document.createElement('div'); //se crea un nuevo elemento 'div'
        //todas las operaciones siguientes se realizan dentro del mismo 'div'
        caja.className = 'caja'; //se le asigna la clase 'caja' al nuevo 'div'
        caja.dataset.numero = cajaDatos.numInterior; // Se asigna un nuevo atributo data-numero al 'div' creado, que contiene el valor de cajaDatos.numInterior
        
        // ejemplo de como se veria en html
        // si cajaDatos.numInterior = 42
        // <div class="caja" data-numero="42">...</div>
        
        caja.innerHTML = cajaDatos.numeroCaja; //El contenido HTML del 'div' se establece con el valor de numeroCaja de cajaDatos. Este valor se mostrará inicialmente dentro de la caja.

        //lo sigueinte se activa cuando se haga click en cualquier 'caja'
        caja.addEventListener('click', function() {
            caja.innerHTML = caja.dataset.numero;
            caja.classList.add('abierta');
          });

        //Finalmente, se añade el div creado y configurado al contenedor de cajas (contenedorCajas). Esto coloca el div en el DOM, haciéndolo visible en la página web.
        contenedorCajas.appendChild(caja);

    });
}
