import { Router } from "express";
import { ProductManager, Product } from "../ProductManager.js";

const productRout = Router();
const productManager = new ProductManager("src/products.json");

productRout.get("/products", async (req, res) => {
  const { limit } = req.query;
  const productos = await productManager.getProducts();

  if (parseInt(limit) === 0) {
    res.status(200).send(productos);
  } else {
    const prods = productos.slice(0, limit);
    res.status(200).send(prods);
  }
});

productRout.get("/products/:pid", async (req, res) => {
  const { pid } = req.params;
  const product = await productManager.getProductById(parseInt(pid));

  if (product) {
    res.status(200).send(product);
  } else {
    res.status(404).send("Not Found");
  }
});

productRout.post("/products", async (req, res) => {
  const { title, description, price, status, thumbnail, code, stock } =
    req.body;
  const newProd = new Product(
    title,
    description,
    price,
    status,
    thumbnail,
    code,
    stock
  );
  const prods = await productManager.getProducts();
  const findingProd = prods.find((prod) => {
    return prod.code === newProd.code;
  });
  if (findingProd) {
    res
      .status(400)
      .send("El código de dicho producto ya existe entre los demás");
  } else {
    await productManager.addProduct(newProd);
    res.status(200).send("Producto creado");
  }
});

export default productRout;
