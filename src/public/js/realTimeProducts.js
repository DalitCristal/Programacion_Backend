const socket = io();
const formulario = document.querySelector("#idForm");
const botonProductos = document.querySelector("#botonProductos");
const $conteinerProducts = document.querySelector("#conteinerProducts");

formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  const datosFormulario = new FormData(e.target);
  const prod = Object.fromEntries(datosFormulario);
  socket.emit("newProduct", prod);
  e.target.reset();
});

botonProductos.addEventListener("click", () => {
  socket.on("prods", (prods) => {
    const arrToShow = prods;
    console.log(arrToShow);
    //$prodContainer.classList.add("productsContainer");
    arrToShow.forEach((prod) => {
      $conteinerProducts.innerHTML += `<div class="boxProd">
        <p> <i>Nombre:</i> ${prod.title} </p>
        <p> <i>Descripcion:</i> ${prod.description} </p>
        <p> <i>Precio:</i> ${prod.price}</p>
        <p> <i>Estado:</i> True </p>
        <p> <i>Imagen:</i> ${prod.code} </p>
        <p> <i>Stock:</i> ${prod.stock} </p>
        <p> <i>Categoría:</i> ${prod.category} </p>
      </div>`;
    });
  });
});
