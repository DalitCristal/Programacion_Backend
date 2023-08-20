//--- Importaciones ---
import { promises as fs } from "fs";
import { readFileSync } from "fs";

//--- Variables ---
const readCartJson = JSON.parse(
  readFileSync("src/cartProductsArr.json", "utf-8")
);

//--- Clases ---
export class CartManager {
  constructor() {
    this.path = "src/cartProductsArr.json";
  }

  async getProd(pid) {
    let prodCart;
    const prodsList = JSON.parse(
      await fs.readFile("src/products.json", "utf-8")
    );
    const searchProd = prodsList.find((prod) => prod.id === pid);
    if (searchProd) {
      prodCart = {
        id: searchProd.id,
        quantity: 1,
      };
      return prodCart;
    } else {
      return false;
    }
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

  async getCartById(cid) {
    const arrayCarts = JSON.parse(await fs.readFile(this.path, "utf-8"));

    const existeCart = arrayCarts.find((c) => c.id === cid);

    if (existeCart) {
      return existeCart;
    } else {
      console.error("Not found");
    }
  }

  async addProductToCart(cid, pid) {
    let newProd = await cartManager.getProd(pid);
    let consult = JSON.parse(await fs.readFile(this.path, "utf-8"));
    const index = consult.findIndex((cart) => {
      return cart.id === cid;
    });

    if (index !== -1) {
      const cart = consult[index];
      const exist = cart.products.find((prod) => prod.id === newProd.id);
      if (exist) {
        exist.quantity++;
        await fs.writeFile(this.path, JSON.stringify(consult));
        let succes = "Se sumo quantity";
        return succes;
      } else {
        consult[index].products.push(newProd);
        await fs.writeFile(this.path, JSON.stringify(consult));
        return true;
      }
    } else {
      return false;
    }
  }
}

export class CartProd {
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

const cartManager = new CartManager();
