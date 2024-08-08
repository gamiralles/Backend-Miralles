import productsRoute from "./routes/products.routes.js";
import cartsRoute from "./routes/carts.routes.js";
import path from "path";
import __dirname from "./dirname.js";
import express from "express";
import handlebars from "express-handlebars";
import viewsRoute from "./routes/views.routes.js";
import mongoose from "mongoose";
import morgan from "morgan";
import passport from "passport";
import authRoute from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import { passportFunction } from "./config/passport.config.js";

const app = express();

const PORT = 5000;

mongoose
  .connect("mongodb://localhost:27017/")
  .then(() => console.log("DB Connected"))
  .catch((err) => console.error("Error connecting to DB:", err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, "../public")));
app.use(morgan("dev"));
app.use(cookieParser());

app.use(passport.initialize());
passportFunction();

app.engine(
  "hbs",
  handlebars.engine({
    extname: "hbs",
    defaultLayout: "main",
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
      allowProtoMethodsByDefault: true,
    },
  })
);

app.set("view engine", "hbs");
app.set("views", "src/views");

app.use("/api/products", productsRoute);
app.use("/api/carts", cartsRoute);
app.use("/", viewsRoute);
app.use("/api/auth", authRoute);

app.listen(PORT, () => {
  console.log(`server up http://localhost:${PORT}`);
});