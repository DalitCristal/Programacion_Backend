import { promises as fs } from "fs";

export class ProductManager {
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
    return arrayProducts;
  }

  async getProductById(id) {
    const arrayProducts = JSON.parse(await fs.readFile(this.path, "utf-8"));
    const prod = arrayProducts.find((producto) => producto.id === id);

    if (prod) {
      return prod;
    } else {
      console.error("Not found");
    }
  }

  async updateProduct(id, product) {
    const arrayProducts = JSON.parse(await fs.readFile(this.path, "utf-8"));
    const indice = arrayProducts.findIndex((prod) => prod.id === id);

    if (indice !== -1) {
      for (const key in product) {
        if (product.hasOwnProperty(key)) {
          arrayProducts[indice][key] = product[key];
        }
      }

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

export class Product {
  constructor(title, description, price, status, thumbnail, code, stock) {
    this.title = title;
    this.description = description;
    this.price = price;
    this.status = status;
    this.thumbnail = thumbnail;
    this.code = code;
    this.stock = stock;
    this.id = Product.idAutoInc();
  }
  static idAutoInc() {
    if (this.idIncrementer) {
      return this.idIncrementer++;
    } else {
      return (this.idIncrementer = 1);
    }
  }
}

//CUIDADO CUANDO EJECUTES EL METODO updateProduct, no corta solo, sigue ejecutandose.
/* ProductManager.updateProduct(2, {
  title: "Aceite",
  description: "Ahora de 2 litros",
}); */

//ProductManager.addProduct(productC);
//ProductManager.getProducts();
//ProductManager.getProductById();
//ProductManager.getProductById(1);
//ProductManager.deleteProduct();
