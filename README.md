# 🩺 CRUD de Citas Médicas

Proyecto web sencillo para registrar, visualizar, editar y eliminar citas médicas usando **HTML**, **Bulma CSS**, **JavaScript**, manipulación del **DOM** y almacenamiento local con **LocalStorage**.

Este proyecto está pensado como práctica para comprender cómo funciona un CRUD básico en el navegador sin necesidad de una base de datos externa.

---

## 📌 Descripción

La aplicación permite administrar citas médicas desde una interfaz web. Los datos ingresados por el usuario se guardan directamente en el navegador mediante `localStorage`, por lo que la información se conserva aunque se recargue la página.

El formulario permite capturar información básica del paciente y de la cita médica, mientras que la tabla muestra todos los registros guardados.

---

## 🚀 Funcionalidades

- Registrar nuevas citas médicas.
- Mostrar las citas guardadas en una tabla.
- Editar una cita existente.
- Eliminar una cita individual.
- Vaciar todos los registros.
- Guardar la información en `LocalStorage`.
- Mantener los datos aunque se recargue el navegador.
- Validar que los campos requeridos estén completos.
- Evitar registrar citas con fecha anterior a la actual.

---

## 🧰 Tecnologías utilizadas

- **HTML5**: estructura principal del proyecto.
- **Bulma CSS**: framework CSS para el diseño visual.
- **JavaScript**: lógica del CRUD y manipulación del DOM.
- **LocalStorage**: almacenamiento local de los registros.

---

## 📁 Estructura del proyecto

```text
crud-citas-medicas/
│
├── index.html
├── app.js
└── README.md
```

---

## 📝 Campos del formulario

La aplicación solicita los siguientes datos:

- Número de seguro.
- Nombre completo del paciente.
- Cédula.
- Correo electrónico.
- Fecha de nacimiento.
- Fecha y hora de la cita.
- Motivo de la cita.

---

## ⚙️ Cómo usar el proyecto

1. Clona este repositorio o descarga los archivos.

```bash
git clone https://github.com/tu-usuario/tu-repositorio.git
```

2. Abre la carpeta del proyecto.

```bash
cd tu-repositorio
```

3. Abre el archivo `index.html` en tu navegador.

También puedes usar la extensión **Live Server** en Visual Studio Code para visualizar el proyecto de forma más cómoda.

---

## 💾 Uso de LocalStorage

Este proyecto utiliza `localStorage` para guardar las citas médicas en el navegador.

La información se almacena bajo la clave:

```javascript
citasMedicas
```

Esto permite que los registros permanezcan disponibles incluso si el usuario recarga la página o cierra y vuelve a abrir el navegador.

> Nota: Los datos se guardan solo en el navegador donde se registraron. Si se abre el proyecto en otro navegador o dispositivo, los datos no estarán disponibles.

---

## 🧠 Conceptos practicados

Este proyecto ayuda a practicar los siguientes temas:

- Captura de datos desde formularios.
- Eventos en JavaScript.
- Uso de `addEventListener`.
- Manipulación del DOM.
- Creación dinámica de filas en una tabla.
- Uso de arreglos y objetos.
- Conversión de datos con `JSON.stringify()` y `JSON.parse()`.
- Almacenamiento con `localStorage`.
- Operaciones básicas CRUD.

---

## 🔄 Operaciones CRUD aplicadas

| Operación | Descripción |
|---|---|
| Create | Registrar una nueva cita médica. |
| Read | Mostrar las citas guardadas en la tabla. |
| Update | Editar la información de una cita existente. |
| Delete | Eliminar una cita o vaciar todos los registros. |

---

## 📸 Vista general

La interfaz está dividida en dos secciones principales:

1. **Formulario de registro**: permite capturar los datos de la cita médica.
2. **Tabla de citas**: muestra todos los registros guardados y permite editarlos o eliminarlos.

---

## ✅ Estado del proyecto

Proyecto funcional para práctica académica o demostración de un CRUD básico con JavaScript puro.

Posibles mejoras futuras:

- Agregar búsqueda de citas.
- Agregar filtros por fecha.
- Exportar registros a PDF o Excel.
- Mejorar la validación del número de seguro y cédula.
- Agregar confirmaciones visuales con notificaciones en lugar de `alert()`.
- Conectar el proyecto a una base de datos real.

---

## 👨‍💻 Autor

Proyecto desarrollado como práctica de programación web usando HTML, Bulma, JavaScript y LocalStorage.

---

## 📄 Licencia

Este proyecto puede utilizarse con fines educativos y de práctica.
