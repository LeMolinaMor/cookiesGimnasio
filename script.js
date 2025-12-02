function validarNombre(){
    const regexNombre = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/; 
    let campoNombre = document.getElementById("campo-nombre");
    let valorNombre = campoNombre.value;
    if(regexNombre.test(valorNombre)){
        return valorNombre;
    }else{
        console.log("El nombre solo puede contener letras y espacios");
        return false;
    }
}

function validarTipoClase(){
    const regexTipo = /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/;
    const clasesDisp = ["spinning", "musculacion", "pilates", "aerobics", "zumba", "yoga", "aeróbics", "musculación"];
    let campoTipo = document.getElementById("campo-tipo");
    let tipoClase = campoTipo.value;
    if(regexTipo.test(tipoClase)){
        tipoClase = tipoClase.toLowerCase();
        for(let i=0; i < clasesDisp.length; i++){
            if (clasesDisp[i] === tipoClase){
                return tipoClase;
            }
        }
            alert("Las clases disponibles son Spinning, musculación, yoga, zumba, pilates y aeróbics");
            return false;
    }else{
        alert("La clase sólo puede contener letras");
        return false;
    }

}

function validarFecha(){
    const regexFecha = /^\d{2}\/\d{2}\/\d{4}$/;
    let campoFecha = document.getElementById("campo-fecha");
    let valorFecha = campoFecha.value;
    if (!(regexFecha.test(valorFecha))){
        alert("Formato incorrecto, use DD/MM/AAAA");
        return false; 
    }

    const [dia, mes, ano] = valorFecha.split('/').map(Number);
    const fechaReserva = new Date(ano, mes - 1, dia);
    const hoy = new Date();

    
    if (fechaReserva < hoy){
        alert("La fecha debe ser posterior al día de hoy");
        return false;
    }
    return valorFecha;
}

    function validarFormulario(){

        const nombreValido = validarNombre();
        const tipoValido = validarTipoClase();
        const fechaValida = validarFecha();

        if (nombreValido && tipoValido && fechaValida){
            return true;

        }else{
            if(!(nombreValido)){
                document.getElementById("campo-nombre").value = "";
                document.getElementById("campo-nombre").focus();
                alert("El nombre puede contener solo letras y espacios"); 
            }else if(!(tipoValido)){
                document.getElementById("campo-tipo").value = "";
                document.getElementById("campo-tipo").focus();
                alert("Las clases disponibles son Spinning, musculación, yoga, zumba, pilates y aeróbics");
            }else if(!(fechaValida)){
                document.getElementById("campo-fecha").value = "";
                document.getElementById("campo-fecha").focus();
                alert("La fecha debe estar en el formato DD/MM/AAAA");
            }
        }   

        return false;
    }

function guardarReservaEnCookie(){
   
    
    if (validarFormulario()){
        const nombre = document.getElementById("campo-nombre").value;
        const clase = document.getElementById("campo-tipo").value;
        const fecha = document.getElementById("campo-fecha").value;
        
        const datosReserva = `nombreUsuario:${nombre}|tipoClase:${clase}|fechaReserva:${fecha}`;
        const diasExpiracion = 7;
        const fechaExpiracion = new Date();
        fechaExpiracion.setDate(fechaExpiracion.getDate() + diasExpiracion);
        document.cookie = `reserva=${datosReserva}; expires=${fechaExpiracion.toUTCString()}; path=/`;

        
                document.getElementById("campo-nombre").value = "";
                document.getElementById("campo-tipo").value = "";
                document.getElementById("campo-fecha").value = "";
                alert("La reserva se ha guardado exitosamente");
                return true;

    }else{
        alert("Debe llenar todos los campos del formulario")
        return false;
    }
}

function obtenercookie(tipoCookie){
    const cookieCompleta = document.cookie.split(';');
    
    const cookieSelec = cookieCompleta.find(elemento => elemento.includes(tipoCookie));
        if (!(cookieSelec)){
        return false;
    }else{
        const valorCookie= cookieSelec.split('=')[1];
        return valorCookie;
    }
}
    



function leerReservaDeCookie(){
    const valoresReserva = obtenercookie("reserva=");
    if(!(valoresReserva)){
        alert("No hay reservas guardadas")
        return false;
    }
    const datos = valoresReserva.split('|')

    const cookieNombre = datos[0].split(':')[1];
    const cookieTipoClase = datos[1].split(':')[1];
    const cookieFecha = datos[2].split(':')[1];

    document.getElementById("campo-nombre").value = cookieNombre;
    document.getElementById("campo-tipo").value = cookieTipoClase;
    document.getElementById("campo-fecha").value = cookieFecha;

    return true;
}


function borrarReserva(){
    if(!(obtenercookie("reserva="))){
        alert("No existen reservas para borrar");
        return false;
    }else{
        const fechaExpirada = new Date(0).toUTCString();
        document.cookie = `reserva="";expires=${fechaExpirada};path=/`; 
        alert("Los datos de reserva han sido borrados");
        document.getElementById("campo-nombre").value = "";
        document.getElementById("campo-tipo").value = "";
        document.getElementById("campo-fecha").value = "";
        return true;
    }

}

document.getElementById("form-reserva").addEventListener('submit', function(evento) {
    evento.preventDefault();
    guardarReservaEnCookie();
  
})

   
document.getElementById('cargar-reserva').addEventListener('click', function() {
    leerReservaDeCookie();
});

document.getElementById("borrar-reserva").addEventListener('click', function(){
    borrarReserva();
});


