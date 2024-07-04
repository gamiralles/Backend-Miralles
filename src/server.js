import productsRoute from "./routes/products.routes.js"
import cartsRoute from "./routes/carts.routes.js"
import path from "path"
import __dirname from "./dirname.js"
import express from "express"
import handlebars from "express-handlebars"
import { Server } from "socket.io"
import viewsRoute from "./routes/views.routes.js"
import ProductManager from "./controller/ProductManager.js"
import mongoose from "mongoose"

const app = express()

const PORT = 5000;

mongoose.connect() 
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB:', err));

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static(path.resolve(__dirname, '../public')));

app.engine('hbs', handlebars.engine({
    extname: 'hbs',
    defaultLayout: 'main',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
    }
}))

app.set('view engine', 'hbs')
app.set('views', 'src/views')

app.use("/api/products", productsRoute)
app.use("/api/carts", cartsRoute)
app.use("/", viewsRoute)


const httpServer = app.listen(PORT, () => {
    console.log(`server up http://localhost:${PORT}`)
})

const io = new Server(httpServer)

const productManager = new ProductManager();

io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });

    socket.on('newProduct', async (product) => {
        try {
            await productManager.addProduct(product);
            const products = await productManager.getProducts();
            io.emit('updateProducts', products);
        } catch (error) {
            console.error('Error adding product:', error);
        }        
    });

    socket.on('deleteProduct', async (id) => {
        try {
            await productManager.deleteProduct(id);
            const products = await productManager.getProducts();
            io.emit('updateProducts', products);
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    });
});