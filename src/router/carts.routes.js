import { Router } from "express";
import { CartManager, CartProd } from "../CartManger.js";

const cartRout = Router();
const cartManager = new CartManager();

cartRout.get("/carts", async (req, res) => {
  const allCarts = await cartManager.getCarts();
  res.status(200).send(allCarts);
});

cartRout.post("/carts", async (req, res) => {
  const newCart = new CartProd();
  const carritos = await cartManager.createCart(newCart);
  res.status(200).send(`Carrito ${newCart.id} creado`);
});

cartRout.get("/carts/:cid", async (req, res) => {
  const { cid } = req.params;
  const cart = await cartManager.getCartById(parseInt(cid));

  if (cart) {
    res.status(200).send(cart);
  } else {
    res.status(404).send("Not Found");
  }
});

cartRout.post("/carts/:cid/product/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  const cartNewProd = await cartManager.addProductToCart(
    parseInt(cid),
    parseInt(pid)
  );
  if (cartNewProd) {
    res.status(200).send(cartNewProd);
  } else {
    res.status(400).send("Producto o carrito no encontrado");
  }
});

export default cartRout;
