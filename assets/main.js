// =====================================================
// CRUD DE CITAS MÉDICAS CON JAVASCRIPT Y LOCALSTORAGE
// =====================================================

// LocalStorage nos permite guardar información en el navegador.
// Aunque se recargue la página, los datos seguirán guardados.
const CLAVE_LOCAL_STORAGE = "citasMedicas";

// Obtenemos los elementos del HTML usando su ID.
// Esto nos permite manipular el formulario, la tabla y los botones.
const formCita = document.getElementById("formCita");
const tablaCitas = document.getElementById("tablaCitas");
const mensajeSinCitas = document.getElementById("mensajeSinCitas");
const btnVaciarTabla = document.getElementById("btnVaciarTabla");
const btnLimpiar = document.getElementById("btnLimpiar");

// Inputs del formulario
const inputNumeroSeguro = document.getElementById("numeroSeguro");
const inputNombreCompleto = document.getElementById("nombreCompleto");
const inputCedula = document.getElementById("cedula");
const inputCorreo = document.getElementById("correo");
const inputFechaNacimiento = document.getElementById("fechaNacimiento");
const inputFechaCita = document.getElementById("fechaCita");
const inputMotivoCita = document.getElementById("motivoCita");

// Esta variable sirve para saber si estamos editando una cita.
// Si es null, significa que estamos creando una nueva cita.
let idCitaEditando = null;

// =====================================================
// FUNCIÓN PARA OBTENER CITAS DESDE LOCALSTORAGE
// =====================================================
function obtenerCitas() {
  // Buscamos en LocalStorage si ya existen citas guardadas.
  const citasGuardadas = localStorage.getItem(CLAVE_LOCAL_STORAGE);

  // Si no hay citas guardadas, devolvemos un arreglo vacío.
  if (!citasGuardadas) {
    return [];
  }

  // LocalStorage guarda todo como texto.
  // Por eso usamos JSON.parse para convertir el texto en arreglo de objetos.
  return JSON.parse(citasGuardadas);
}

// =====================================================
// FUNCIÓN PARA GUARDAR CITAS EN LOCALSTORAGE
// =====================================================
function guardarCitas(citas) {
  // Convertimos el arreglo de objetos a texto con JSON.stringify.
  // Esto es necesario porque LocalStorage solo almacena strings.
  localStorage.setItem(CLAVE_LOCAL_STORAGE, JSON.stringify(citas));
}

// =====================================================
// FUNCIÓN PARA LIMPIAR EL FORMULARIO
// =====================================================
function limpiarFormulario() {
  formCita.reset();

  // Reiniciamos la variable de edición.
  // Así el próximo guardado será una cita nueva.
  idCitaEditando = null;

  // Cambiamos el texto del botón principal a su estado original.
  const botonSubmit = formCita.querySelector("button[type='submit']");
  botonSubmit.textContent = "Guardar cita";
  botonSubmit.classList.remove("is-warning");
  botonSubmit.classList.add("is-link");
}

// =====================================================
// FUNCIÓN PARA MOSTRAR LAS CITAS EN LA TABLA
// =====================================================
function renderizarCitas() {
  const citas = obtenerCitas();

  // Limpiamos la tabla antes de volver a dibujar los registros.
  // Esto evita que se dupliquen visualmente.
  tablaCitas.innerHTML = "";

  // Si no hay citas, mostramos el mensaje informativo.
  if (citas.length === 0) {
    mensajeSinCitas.style.display = "block";
    return;
  }

  // Si sí hay citas, ocultamos el mensaje.
  mensajeSinCitas.style.display = "none";

  // Recorremos cada cita y creamos una fila en la tabla.
  citas.forEach((cita, index) => {
    const fila = document.createElement("tr");

    fila.innerHTML = `
      <td>${index + 1}</td>
      <td>${cita.numeroSeguro}</td>
      <td>${cita.nombreCompleto}</td>
      <td>${cita.cedula}</td>
      <td>${cita.correo}</td>
      <td>${cita.fechaNacimiento}</td>
      <td>${formatearFechaCita(cita.fechaCita)}</td>
      <td>${cita.motivoCita}</td>
      <td>
        <div class="buttons are-small">
          <button class="button is-warning" onclick="editarCita('${cita.id}')">
            Editar
          </button>

          <button class="button is-danger" onclick="eliminarCita('${cita.id}')">
            Eliminar
          </button>
        </div>
      </td>
    `;

    tablaCitas.appendChild(fila);
  });
}

// =====================================================
// FUNCIÓN PARA FORMATEAR LA FECHA DE LA CITA
// =====================================================
function formatearFechaCita(fecha) {
  // El input datetime-local guarda algo como:
  // 2026-06-17T09:30
  // Aquí lo hacemos más legible.
  if (!fecha) return "";

  return fecha.replace("T", " ");
}

// =====================================================
// FUNCIÓN PARA VALIDAR DATOS BÁSICOS
// =====================================================
function validarFormulario(cita) {
  // trim() elimina espacios al inicio y al final.
  // Esto evita guardar campos vacíos con espacios.
  if (
    !cita.numeroSeguro.trim() ||
    !cita.nombreCompleto.trim() ||
    !cita.cedula.trim() ||
    !cita.correo.trim() ||
    !cita.fechaNacimiento ||
    !cita.fechaCita ||
    !cita.motivoCita.trim()
  ) {
    alert("Por favor, completa todos los campos.");
    return false;
  }

  // Validación sencilla para evitar fechas de cita en el pasado.
  const fechaActual = new Date();
  const fechaCita = new Date(cita.fechaCita);

  if (fechaCita < fechaActual) {
    alert("La fecha de la cita no puede ser anterior a la fecha actual.");
    return false;
  }

  return true;
}

// =====================================================
// EVENTO SUBMIT DEL FORMULARIO
// =====================================================
formCita.addEventListener("submit", function (event) {
  // Evitamos que el formulario recargue la página.
  event.preventDefault();

  // Creamos un objeto con los datos del formulario.
  const cita = {
    id: idCitaEditando || Date.now().toString(),
    numeroSeguro: inputNumeroSeguro.value.trim(),
    nombreCompleto: inputNombreCompleto.value.trim(),
    cedula: inputCedula.value.trim(),
    correo: inputCorreo.value.trim(),
    fechaNacimiento: inputFechaNacimiento.value,
    fechaCita: inputFechaCita.value,
    motivoCita: inputMotivoCita.value.trim(),
  };

  // Validamos antes de guardar.
  if (!validarFormulario(cita)) {
    return;
  }

  // Obtenemos las citas actuales desde LocalStorage.
  const citas = obtenerCitas();

  // Si idCitaEditando tiene valor, significa que vamos a actualizar.
  if (idCitaEditando) {
    const citasActualizadas = citas.map((citaActual) => {
      if (citaActual.id === idCitaEditando) {
        return cita;
      }

      return citaActual;
    });

    guardarCitas(citasActualizadas);
    alert("Cita actualizada correctamente.");
  } else {
    // Si no estamos editando, agregamos una nueva cita.
    citas.push(cita);

    guardarCitas(citas);
    alert("Cita registrada correctamente.");
  }

  // Limpiamos el formulario y actualizamos la tabla.
  limpiarFormulario();
  renderizarCitas();
});

// =====================================================
// FUNCIÓN PARA EDITAR UNA CITA
// =====================================================
function editarCita(id) {
  const citas = obtenerCitas();

  // Buscamos la cita que coincida con el ID recibido.
  const citaEncontrada = citas.find((cita) => cita.id === id);

  if (!citaEncontrada) {
    alert("No se encontró la cita seleccionada.");
    return;
  }

  // Guardamos el ID para saber que estamos editando.
  idCitaEditando = id;

  // Cargamos los datos de la cita en el formulario.
  inputNumeroSeguro.value = citaEncontrada.numeroSeguro;
  inputNombreCompleto.value = citaEncontrada.nombreCompleto;
  inputCedula.value = citaEncontrada.cedula;
  inputCorreo.value = citaEncontrada.correo;
  inputFechaNacimiento.value = citaEncontrada.fechaNacimiento;
  inputFechaCita.value = citaEncontrada.fechaCita;
  inputMotivoCita.value = citaEncontrada.motivoCita;

  // Cambiamos visualmente el botón para indicar que ahora actualizará.
  const botonSubmit = formCita.querySelector("button[type='submit']");
  botonSubmit.textContent = "Actualizar cita";
  botonSubmit.classList.remove("is-link");
  botonSubmit.classList.add("is-warning");

  // Mandamos al usuario hacia el formulario.
  formCita.scrollIntoView({ behavior: "smooth" });
}

// =====================================================
// FUNCIÓN PARA ELIMINAR UNA CITA
// =====================================================
function eliminarCita(id) {
  const confirmar = confirm("¿Seguro que deseas eliminar esta cita?");

  if (!confirmar) {
    return;
  }

  const citas = obtenerCitas();

  // Creamos un nuevo arreglo excluyendo la cita eliminada.
  const citasFiltradas = citas.filter((cita) => cita.id !== id);

  guardarCitas(citasFiltradas);
  renderizarCitas();

  alert("Cita eliminada correctamente.");
}

// =====================================================
// EVENTO PARA VACIAR TODOS LOS REGISTROS
// =====================================================
btnVaciarTabla.addEventListener("click", function () {
  const citas = obtenerCitas();

  if (citas.length === 0) {
    alert("No hay citas para eliminar.");
    return;
  }

  const confirmar = confirm(
    "¿Seguro que deseas eliminar todas las citas registradas?",
  );

  if (!confirmar) {
    return;
  }

  // Eliminamos del LocalStorage únicamente las citas médicas.
  localStorage.removeItem(CLAVE_LOCAL_STORAGE);

  limpiarFormulario();
  renderizarCitas();

  alert("Todos los registros fueron eliminados.");
});

// =====================================================
// EVENTO DEL BOTÓN LIMPIAR
// =====================================================
btnLimpiar.addEventListener("click", function () {
  // Además de limpiar visualmente el formulario,
  // también cancelamos una posible edición.
  limpiarFormulario();
});

// =====================================================
// CARGA INICIAL DE LA APLICACIÓN
// =====================================================

// Cuando el navegador carga el archivo JavaScript,
// mostramos automáticamente las citas guardadas.
renderizarCitas();
