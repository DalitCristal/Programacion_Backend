const socket = io();

const d = document;
const $btnChat = d.querySelector("#btnChat");
const $parrafoMensajes = d.querySelector("#parrafoMensaje");
const $chatBox = d.querySelector("#chatBox");
let user;

/* Swal.fire({
  title: "Identificador de Usuario",
  text: "Ingrese su nombre",
  input: "text",
  inputValidator: (valor) => {
    return !valor && "Ingrese su nombre de usuario";
  },
  allowOutsideClick: false,
}).then((resultado) => {
  user = resultado.value;
  console.log(user);
}); */

/* $btnChat.addEventListener("click", () => {
  let fechaActual = new Date().toLocaleString();

  if ($chatBox.value.trim().length > 0) {
    socket.emit("mensaje", {
      fecha: fechaActual,
      user: user,
      mensaje: $chatBox.value,
    });
    $chatBox.value = "";
  }
});

socket.on("mensaje", (mensajes) => {
  $parrafoMensajes.innerHTML = "";
  mensajes.forEach((mensaje) => {
    $parrafoMensajes.innerHTML += `<p>${mensaje.fecha} ${mensaje.user} ${mensaje.mensaje} </p>`;
  });
}); */

/* ***************************** FIN DEL CHAT ********************************* */

const $containerProducts = d.querySelector("#containerProducts");
