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
  async addToCart(objt) {
    let consult = JSON.parse(await fs.readFile(this.path, "utf-8"));
    let existProduct = consult.find((product) => product.name === objt.name);

    if (existProduct !== undefined) {
      console.log(`se encontro ${existProduct.name}`);
      existProduct.quant = existProduct.quant + 1;
      console.log(existProduct);
      consult.push(objt);

      //   fs.writeFile(this.path, JSON.stringify(consult));
    } else {
      console.log(`primera vez de ${objt.name} en carrito`);
      consult.push(objt);

      //   fs.writeFile(this.path, JSON.stringify(consult));
    }
    await fs.writeFile(this.path, JSON.stringify(consult));
  }
}

class CartProd {
  constructor(name) {
    this.name = name;
    this.quant = 1;
    this.id = CartProd.IdAutInc();
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

// --- Funciones ---

// --- TESTEOS ---
const cartMng = new CartManager();

const queso = new CartProd("queso");
const manteca = new CartProd("manteca");
// const leche = new CartProd("leche");

// cartMng.addToCart(queso);
// cartMng.addToCart(manteca);
// cartMng.addToCart(leche);

//console.log(leche);
// console.log(manteca);
// console.log(queso);

//console.log(readCartJson);

/* const consult = JSON.parse(await fs.readFile(this.path, "utf-8"));
    console.log(consult);
    let findProd = consult.findIndex((prod) => {
      return prod.id === objt.id;
    });
    console.log(findProd);

    switch (findProd) {
      case -1:
        console.log("no encontro nada el findIndex");

        let flag = true;
        while (flag) {
          consult.push(objt);
          await fs.writeFile(this.path, JSON.stringify(consult));
          return (flag = false);
        }
        break;

      default:
        console.log(`find encontro ${consult[findProd].name}`);

        console.log("Aumentamos quant");
        let redFlag = true;
        while (redFlag) {
          consult[findProd].quant++;
          await fs.writeFile(this.path, JSON.stringify(consult));
          return (flag = false);
        }
        break;
    } */

// await fs.writeFile(this.path, JSON.stringify(consult));

/* if (findProd !== -1) {
      console.log(`find encontro ${consult[findProd].name}`);
      consult[findProd].quant++;
      return console.log("Aumentamos quant");
    } else {
      console.log("no encontro nada el findIndex");
      consult.push(objt);
    }

    await fs.writeFile(this.path, JSON.stringify(consult)); */
