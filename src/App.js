import express from "express";
import { ProductManager } from "./ProductManager.js";
import productRout from "./router/products.routes.js";
import cartRout from "./router/carts.routes.js";

const PORT = 8080;
const app = express();
app.use(express.json());

const ProductosManager = new ProductManager("src/products.json");

app.get("/", (req, res) => {
  res.send("Hola");
});

app.use("/api", productRout);
app.use("/api", cartRout);

app.listen(PORT, () => {
  console.log(`Servidor en el puerto ${PORT} `);
});
