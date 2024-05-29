import productsRoute from "./routes/products.routes.js"
import cartsRoute from "./routes/carts.routes.js"
import express from "express"

const app = express()

const PORT = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use("/api/products", productsRoute)
app.use("/api/carts", cartsRoute)


app.listen(PORT, () => {
    console.log(`servidor up http://localhost:${PORT}`)
})
