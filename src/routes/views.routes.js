import { Router } from "express";
import ProductManager from "../controller/ProductManager.js";   

const router = Router()
const productManager = new ProductManager();

router.get('/products', async (req, res) => {
    const products = await productManager.getProducts();
    res.render('index', { products })
});

router.get('/realtimeproducts', async (req, res) => {
    const products = await productManager.getProducts();
    res.render('realTimeProducts', { products })
});



export default router;