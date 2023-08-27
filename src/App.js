import express from "express";
import { ProductManager } from "./ProductManager.js";
import multer from "multer";
import productRout from "./router/products.routes.js";
import cartRout from "./router/carts.routes.js";
import { __dirname } from "./path.js";
import { engine } from "express-handlebars";
import { Server } from "socket.io";
import path from "path";

const PORT = 8080;
const app = express();
const productosManager = new ProductManager("src/products.json");

//Configuración
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/public/img");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${file.originalname}`);
  },
});

const server = app.listen(PORT, () => {
  console.log(`Servidor en el puerto ${PORT} `);
});

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const upload = multer({ storage: storage });

// configuracion para trabajar con handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.resolve(__dirname, "./views"));

//server de socket.io
const io = new Server(server);
const mensajes = [];
const prods = await productosManager.getProducts();

io.on("connection", (socket) => {
  socket.on("mensaje", (infoMensaje) => {
    mensajes.push(infoMensaje);
    socket.emit("mensaje", mensajes);
  });

  socket.on("newProduct", (newProd) => {
    prods.push(newProd);

    socket.emit("prods", prods);
  });
});

//Routes
app.use("/api", productRout);
app.use("/api", cartRout);
app.use("/static", express.static(path.join(__dirname, "/public")));

app.post("/upload", upload.single("product"), (req, res) => {
  res.status(200).send("Imagen cargada");
});

app.get("/static/", (req, res) => {
  res.render("home", {
    css: "styles.css",
    title: "Home",
    js: "script.js",
    prods: prods,
  });
});

app.get("/static/products", (req, res) => {
  const cursos = [
    { numCurso: 123, dia: "Lunes y Miercoles", turno: "Noche" },
    { numCurso: 456, dia: "Martes y Jueves", turno: "Tarde" },
    { numCurso: 789, dia: "Sabado", turno: "Mañana" },
  ];
  res.render("products", {
    cursos: cursos,
  });
});

//chat
app.get("/static/chat", (req, res) => {
  res.render("chat", {
    css: "styles.css",
    title: "chat",
  });
});

app.get("/static/real-time-products", (req, res) => {
  res.render("realTimeProducts", {
    css: "styles.css",
    title: "realTimeProducts",
    js: "realTimeProducts.js",
  });
});
