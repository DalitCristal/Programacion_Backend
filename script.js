class ProdutManager {
  constructor() {
    this.products = [];
  }
  addProduct(product) {
    const prod = this.products.find((prod) => prod.code === product.code);

    prod
      ? console.error(`"${prod.title}" producto ya existente`)
      : this.products.push(product);
  }

  getProducts() {
    console.table(this.products);
  }

  getProductById(id) {
    const prod = this.products.find((prod) => prod.id === id);

    prod ? console.log(prod) : console.error("Not found");
  }
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

const arroz = new Product(
  "arroz",
  "Marolio le da sabor a tu vida",
  120,
  "Sin imagen",
  "AA34",
  122
);
const aceite = new Product(
  "Aceite",
  "De un litro y medio",
  200,
  "Sin imagen",
  "AB20",
  100
);
const leche = new Product(
  "Leche",
  "Descremada",
  300,
  "Sin imagen",
  "ABC299",
  50
);

const produtManager = new ProdutManager();

console.log(aceite);
console.log(arroz);
console.log(leche);
produtManager.getProducts();
produtManager.addProduct(arroz);
produtManager.addProduct(aceite);
produtManager.addProduct(leche);
produtManager.getProducts();
produtManager.getProductById();
