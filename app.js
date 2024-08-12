let numeroMinimo = 1;
let numeroMaximo = 100;


function generarCajas(){ //Primera función en ser llamada

    //Primero se quitan las instrucciones iniciales
    let ocultarInstrucciones = document.querySelector('.instrucciones');
    ocultarInstrucciones.style.display = 'none'
    //

    //Recibe el numero ingresado (Número de prisioneros)
    const numCajas = parseInt( document.getElementById('numPrisioneros').value );

    //condicion para verificar que el numero ingresado sea entre el rango permitido
    if( numCajas < numeroMinimo || numCajas > numeroMaximo ){
        alert("Por favor ingresa un numero entre " + numeroMinimo + " y " + numeroMaximo);
    return; //con esto hacemos que la función termine aquí y no siga
    }

    //Si el valor ingresado es correcto sigue el codigo

    //se crea la relación con <div class="contenedorCajas" > 
    const contenedor = document.getElementById('contenedorCajas');
    contenedor.innerHTML = ''; //accedemos al contenido del <div class="contenedorCajas" > contenido </div> y se limpia

    //llamamos a la funcion que genera numeros aleatorios y le pasamos el rango máximo "numCajas"
    let numerosGenerados = generarNumerosAleatorios(numCajas);

    for( let i = 1; i<= numCajas; i++ ){
        const caja = document.createElement('div'); //se crea un elemento <div>
        caja.classList.add('caja'); //agregamos la clase al <div> creado
        caja.textContent = i; //numero externo de la caja que se muestra inicialmente
        caja.dataset.numeroExterno = i; //guarda el numero externo i
        caja.dataset.numeroInterno = numerosGenerados[i-1]; //guarda el numero interno 

        //<div class="caja abierta" data-numero-externo="10" data-numero-interno="26">26</div>
        
        //añadimos un escuchador de eventos a cada caja
        caja.addEventListener('click', function(){       
            //document.querySelector() busca y devuelve el primer elemento del documento HTML que conincide con el selector CSS proporcionado
            //si no encuentra ningún elemento que coincida, devuelve 'null'
            const pistaCaja = document.querySelector(`.caja[data-numero-externo='${this.dataset.numeroInterno}']`);
            
            //si anteriormente se encontró un elemento coincidente
            if(pistaCaja){
                pistaCaja.classList.add('pista');
            }

            this.textContent = this.dataset.numeroInterno; //se accede al contenido del div (el numero mostrado en pantalla) y se cambia el valor al numero interno
            this.classList.add('abierta'); //cuando se hace click en una caja, su clase cambia a class="abierta";
        });

        //después de configurar cada cada, se agrega al contenedor 'contenedorCajas'
        contenedor.appendChild(caja);
    }
}


function numeroParticipante(){
    let numeroDePrisionero = parseInt(document.getElementById('numeroDePrisionero').value);
    let textoIntentos = document.querySelector('.textoContadorIntentos');
    textoIntentos.innerHTML = 'intentos restantes: ';
    textoIntentos.style.display = 'block';
}


function generarNumerosAleatorios(numero){
    const numeros = [];

     //bucle para llenar el arreglo numeros [] con numeros del numMinimo al numMaximo
    for ( let i = 1; i <= numero ;i++ ){
        numeros.push(i); //se agrega el numero al arreglo: numeros [0] = 1, numeros [1] = 2, ...
    } 

    //Algoritmo "Fisher-Yates shuffle" para mezclar los elementos de forma aleatoria
    for( let i=numeros.length - 1; i>0; i-- ){ //bucle
        const j = Math.floor(Math.random() * (i+1));
        [numeros[i], numeros[j]] = [numeros[j], numeros[i]];
    }

    return numeros; //regresamos el arreglo ya barajeado
}