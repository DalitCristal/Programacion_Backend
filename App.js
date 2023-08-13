import express from "express";
import ProductManager from "./src/ProductManager.js";

const PORT = 4000;

const app = express();
const ProductosManager = new ProductManager("./products.json");
//const productos = await ProductosManager.getProducts();

app.get("/", (req, res) => {
  res.send("Hola");
});

app.get("/products", async (req, res) => {
  const { limit } = req.query;
  const products = await ProductosManager.getProducts();
  const prods = products.slice(0, limit);
});

/* 
app.get("/products", (req, res) => {
  console.log(req.query);
  const { title } = req.query;

  if (title) {
    const prods = productos.filter((prod) => prod.title === title);
    res.send(prods);
  } else {
    res.send(productos);
  }
});

app.get("/products/:id", (req, res) => {
  const product = productos.find((prod) => prod.id === parseInt(req.params.id));

  if (product) {
    res.send(product);
  } else {
    res.send("Producto no encontrado");
  }
}); */

app.listen(PORT, () => {
  console.log(`Servidor en el puerto ${PORT} `);
});
