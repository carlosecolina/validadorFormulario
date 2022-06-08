 //variables 
const btnEnviar = document.querySelector('#enviar');
const btnReset = document.querySelector('#resetBtn');
const formulario = document.querySelector('#enviar-mail');

// Variables para campos 
const email = document.querySelector('#email');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');

const er =  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ ;// const y let dependen del escope , 



//Event listener
eventListeners();
function eventListeners() {
    document.addEventListener('DOMContentLoaded',iniciarApp);
    
    //Campos del formulario
    email.addEventListener('blur', validarFormulario);
    asunto.addEventListener('blur', validarFormulario);
    mensaje.addEventListener('blur', validarFormulario);

    //reinicia el formulario
    btnReset.addEventListener('click', resetarFormulario);

    //enviar email del formulario
    formulario.addEventListener('submit',enviarEmail);
    }


 //  Funciones 

 function iniciarApp() {
     btnEnviar.disabled = true ;
     btnEnviar.classList.add('cursor-not-allowed', 'opacity-50');
    }

 // valida el formulario 
 function validarFormulario (e) {
    //elimina los errores
    const error =  document.querySelector('p.error');
    if (error !== null) {
        error.remove();
      }

    
     if (e.target.value.length > 0 ){
         e.target.classList.remove('border', 'border-red-500');
        e.target.classList.add('border', 'border-green-500') ;
     }else {
        e.target.classList.remove('border', 'border-green-500')
        e.target.classList.add('border', 'border-red-500') ;

        mostrarError('Todos los campos son obligatorios ');

     }

     if(e.target.type === 'email'){
       
        
        //const resulatado = e.target.value.indexOf('@');// que tenga por lo menos un @ y nos devuelve el indice de la posicion en donde se encuentra . 
         if(er.test(e.target.value) ){
            if (error !== null) {
                error.remove();
              }
              e.target.classList.remove('border', 'border-red-500');
            e.target.classList.add('border', 'border-green-500') ;


         }else {
            e.target.classList.remove('border', 'border-green-500');
             e.target.classList.add( 'border', 'border-red-500');
             mostrarError ('email no valido ');
         }
     }
     
     if((er.test(email.value) ) && asunto.value !== '' && mensaje.value !== ''){
        btnEnviar.disabled = false ;
        btnEnviar.classList.remove('cursor-not-allowed', 'opacity-50');
     }
 }

 function mostrarError(mensaje) {
    btnEnviar.disabled = true ;
    btnEnviar.classList.add('cursor-not-allowed', 'opacity-50');
    
     const mensajeError = document.createElement('p');
     mensajeError.textContent = mensaje ; 
     mensajeError.classList.add( 'border', 'border-red-500' , 'backgroud-red-100', 'text=red-500', 'p3', 'mt-5', 'text-center', 'error');

     const errores = document.querySelectorAll('.error');
     if(errores.length === 0  ) {
         formulario.appendChild(mensajeError);
     }
}

function enviarEmail(e) {       
    e.preventDefault();
    
    // mostrar el spinner 
    const spinner = document.querySelector('#spinner');
    spinner.style.display = 'flex';

    //depues de 3 segundos ocultar el spiner y mostrar el mensjae 
    //setTimeout( () => {}) // se ejecuta una vez despues del tiempo que se le asigna 
    //setInterval// se ejecuta cada vez que llega al tiempo que se le asigna, como un bucle 

    setTimeout(() => {
        spinner.style.display = 'none';

        //mensaje que se envio correctamente
        const parrafo = document.createElement('p');
        parrafo.textContent = 'El mensaje se envio correctamente'; 
        parrafo.classList.add('text-center','my-10','p-2','bg-green-500','text-white','font-bold','uppercase');

        //innserta el parrafo a ntesd del spinner
        formulario.insertBefore(parrafo, spinner)

        setTimeout(() => {
            parrafo.remove(); // eliminar mensaje de exito
            resetarFormulario();
        }, 5000); 
    }, 3000);
}

/// limpiar el formulario 
function resetarFormulario(){
    formulario.reset();
    iniciarApp();
}