//--- Importaciones ---
import { promises as fs } from "fs";
import { readFileSync } from "fs";

//--- Variables ---
const readCartJson = JSON.parse(
  readFileSync("src/cartProductsArr.json", "utf-8")
);

//--- Clases ---
class CartManager {
  constructor() {
    this.path = "src/cartProductsArr.json";
  }
  async addToCart(cart) {
    const arrayCarts = JSON.parse(await fs.readFile(this.path, "utf-8"));
    const existeCart = arrayCarts.find((c) => c.id === cart.id);

    if (existeCart === undefined) {
      if (arrayCarts) {
        arrayCarts.push(cart);
        await fs.writeFile(this.path, JSON.stringify(arrayCarts));
        return true;
      } else {
        console.error("Ya existe");
      }
    } else {
      return false;
    }
  }
}

class CartProd {
  constructor() {
    this.id = CartProd.IdAutInc();
    this.products = [];
  }
  static IdAutInc() {
    let num;
    const arr = [].concat(readCartJson);
    if (arr.length > 0) {
      num = arr[arr.length - 1].id;
      return num + 1;
    } else {
      num = 1;
    }
    return num;
  }
}

const cartA = new CartProd();
const prueba = new CartManager();
//prueba.addToCart(cartA);
