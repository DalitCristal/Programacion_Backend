import { promises as fs } from "fs";

class ProdutManager {
  constructor(path) {
    this.path = path;
  }

  async addProduct(product) {
    const arrayProducts = JSON.parse(await fs.readFile(this.path, "utf-8"));
    const producto = arrayProducts.find((prod) => prod.code === product.code);

    if (producto === undefined) {
      //validar que los campos esten completos antes de pushear
      let values = [];
      for (const key in product) {
        if (product.hasOwnProperty(key)) {
          values.push(product[key]);
        }
      }

      if (validation(values)) {
        arrayProducts.push(product);
        await fs.writeFile(this.path, JSON.stringify(arrayProducts));
      } else {
        console.error("Debe llenar todos los campos");
      }
    } else {
      return "producto ya existente";
    }
  }

  async getProducts() {
    const arrayProducts = JSON.parse(await fs.readFile(this.path, "utf-8"));
    console.table(arrayProducts);
  }

  async getProductById(id) {
    const arrayProducts = JSON.parse(await fs.readFile(this.path, "utf-8"));
    const prod = arrayProducts.find((producto) => producto.id === id);

    prod ? console.table(prod) : console.error("Not found");
  }

  async updateProduct(id, product) {
    const arrayProducts = JSON.parse(await fs.readFile(this.path, "utf-8"));
    const indice = arrayProducts.findIndex((prod) => prod.id === id);

    if (indice !== -1) {
      arrayProducts[indice].title = product.title;
      arrayProducts[indice].description = product.description;
      arrayProducts[indice].price = product.price;
      arrayProducts[indice].thumbnail = product.thumbnail;
      arrayProducts[indice].code = product.code;
      arrayProducts[indice].stock = product.stock;

      await fs.writeFile(this.path, JSON.stringify(arrayProducts));
    } else {
      console.error("Not found");
    }
  }

  async deleteProduct(id) {
    const arrayProducts = JSON.parse(await fs.readFile(this.path, "utf-8"));
    const producto = arrayProducts.find((prod) => prod.id === id);

    if (producto) {
      await fs.writeFile(
        this.path,
        JSON.stringify(arrayProducts.filter((prod) => prod.id !== id))
      );
    } else {
      return "Producto no encontrado";
    }
  }
}
//validación
function validation(arr) {
  for (const elem of arr) {
    if (elem === undefined || elem === "") {
      return false;
    }
  }
  return true;
}

class Product {
  constructor(title, description, price, thumbnail, code, stock) {
    this.title = title;
    this.description = description;
    this.price = price;
    this.thumbnail = thumbnail;
    this.code = code;
    this.stock = stock;
    this.id = Product.incrementarId();
  }
  static incrementarId() {
    this.idIncrement ? this.idIncrement++ : (this.idIncrement = 1);

    return this.idIncrement;
  }
}

const productA = new Product(
  "arroz",
  "Marolio le da sabor a tu vida",
  120,
  "Sin imagen",
  "AA34",
  122
);
const productB = new Product(
  "ACEITE",
  "De un litro y medio",
  200,
  "Sin imagen",
  "AB20",
  100
);
const productC = new Product(
  "Leche",
  "Descremada",
  300,
  "Sin imagen",
  "ABC299",
  50
);
const productD = new Product(
  "Queso",
  "descremado",
  1200,
  "Sin imagen",
  "DSGRFDGF",
  150
);
const productE = new Product(
  "carne",
  "molida",
  1000,
  "Sin imagen",
  "DSGRgfdhfdhfgdhfghFDGF",
  80
);

const produtManager = new ProdutManager("./products.json");

/* produtManager.updateProduct(2, {
  title: "Aceite",
  description: "Ahora de 2 litros",
  price: 150,
  thumbnail: "Sin imagen",
  code: "AA3trhghfdhghh4",
  stock: 100,
});  */

//produtManager.addProduct(productC);
//produtManager.getProducts();
//produtManager.getProductById();
//produtManager.getProductById(1);
//produtManager.deleteProduct();
