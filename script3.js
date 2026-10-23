let estudiantes = [];

    let nombre = document.getElementById("nombre");
    let correo = document.getElementById("correo");
    let edad = document.getElementById("edad");
    let carrera = document.getElementById("carrera");
    let nota = document.getElementById("nota");
    // FUNCION PARA MOSTRAR VALIDACIONES
    function mostrarValidaciones(campo,idMensaje,correcto,texto){
        let mensaje = document.getElementById(idMensaje);
        campo.classList.remove("campo-correcto","campo-error");
        if (correcto){
            campo.classList.add("campo-correcto");
            mensaje.className="texto-correcto";
        } else {
            campo.classList.add("campo-error");
            mensaje.className="texto-error";
        }
        mensaje.textContent=texto;
        return correcto;
    }
    //VALIDAR NOMBRE
    function validarNombre(){
        let valor = nombre.trim();
        if (valor.length < 3){
            return mostrarValidaciones(
                nombre,"errorNombre",false,"El nombre tener almenos 3 caracteres"
            );
        }
        return mostrarValidaciones(
                nombre,"errorNombre",true,"Nombre correcto"
            );

    }

   //VALIDAR CORREO
    function validarCorreo(){
        if(!correo.checkValidity()){
            return mostrarValidaciones(
                correo,"errorCorreo",false,"Ingrese un correo electronico valido"
            );
            }
            return mostrarValidaciones(
                correo,"errorCorreo",true,"Correo correcto"
            );
        }
    //VALIDAR EDAD
    function validarEdad(){
        let valor = edad.value;
        //Eliminar caracteres que no sean numeros
        valor = valor.replace(/\D/g,"");
        //Eliminar ceros al principio
        valor = valor.replace(/^0+/,"");
        //Maximo dos digitos
        valor = valor.slice(0,2);
        edad.value = valor;
        let numero = Number(valor);
        if (valor ==="" || numero < 18 || numero > 80){
            return mostrarValidaciones(
                edad,"errorEdad",false,"La edad debe estar entre 18 y 80"
            );
        }
        return mostrarValidaciones(
            edad,"errorEdad",true,"Edad Correcta"
        );
    }
    // VALIDAR CARRERA
    function validarCarrera(){
        if (carrera.value===""){
            return mostrarValidaciones(
                carrera,"errorCarrera",false,"Selecciona una Carrera"
            );
        }
        return mostrarValidaciones(
            carrera,"errorCarrea",true,"Carrera seleccionada"
        );
    }
    //VALIDAR NOTA
    function validarNota(){
        let valor = nota.value;
        let numero = Number(valor);
        if (valor ==="" || !nota.checkValidity()){
            return mostrarValidaciones(
                nota,"errorNota",false,"Ingrese una nota entre 0 y 100"
            );
        }
        return mostrarValidaciones(
            nota,"errorNota",true,"Nota correcta"
        );
    }
    //EVENTO DE VALIDACION EN TIEMPO REAL
    nombre.oninput = validarNombre;
    correo.onblur= validarCorreo;
    edad.oninput = validarEdad;
    carrera.onchange = validarCarrera;
    nota.oninput = validarNota;

    //EVENTO DE ENVIO DEL FORMULARIO
    formulario.onsubmit = function(evento){
        evento.preventDefault();
            let nombreCorrecto = validarNombre();
            let correoCorrecto = validarCorreo();
            let edadCorrecta = validarEdad();
            let carreraCorrecta = validarCarrera();
            let notaCorrecta = validarNota();

            if (!nombreCorrecto || !correoCorrecto || !edadCorrecta || !carreraCorrecta || !notaCorrecta){
                documento.getElementById("mensaje").textContent = "Corrija los campos Incorrectos";
                document.getElementById("mensaje").style.color="red";
                return;
            }
            registrarEstudiante();
    };
    
    
    //FUNCION REGISTRAR ESTUDIANTE
    function registrarEstudiante(){
        let estudiante = {
            nombre: nombre.value.trim(),
            correo: correo.value.trim(),
            edad: Number(edad.value),
            carrera: carrera.value,
            nota: Number(nota.value)
        }
        estudiantes.push(estudiante);
        let mensaje = document.getElementById("mensaje");
        mensaje.textContent="Estudiante registrado exitosamente";
        mensaje.style.color="greeen"
        mostrarEstudiantes();
        formulario.reset();
        //LIMPIAR LOS MENSAJES Y ESTILOS
        let campos = [nombre,correo,edad,carrera,nota];
        for (campo of campos){
            campo.classList.remove("campo-correcto", "campo-error");
        }
        let mensajes = [
            "errorNombre",
            "errorCorreo",
            "errorEdad",
            "errorCarrera",
            "errorNota"
        ];
        for (let id of mensajes){
            document.getElementById(id).textContent="";
        }
    }
function mostrarEstudiantes() {
let lista = document.getElementById("listaEstudiantes");
lista.innerHTML="";
for(let estudiante of estudiantes){
    let fila = document.createElement("tr");
    let datos = [
        estudiante.nombre,
        estudiante.correo,
        estudiante.edad,
        estudiante.carrera,
        estudiante.nota
    ];
    for (let dato of datos) {
        let celda = document.createElement("td");
        celda.textContent=dato;
        fila.appendChild(celda);
    }
   lista.appendChild(fila);
}
}