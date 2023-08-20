import { Router } from "express";
import { CartManager, CartProd } from "../CartManger.js";

const cartRout = Router();
const cartManager = new CartManager();

cartRout.post("/carts", async (req, res) => {
  const newCart = new CartProd();
  const carritos = await cartManager.addToCart(newCart);
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

cartRout.post("/:cid/product/:pid", async (req, res) => {
  console.log("función en construcción");
});

export default cartRout;
