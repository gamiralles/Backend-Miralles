import { Router } from "express";
import ProductManager from "../controller/ProductManager.js";   

const router = Router()
const productManager = new ProductManager();

router.get('/products', async (req, res) => {
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const products = await productManager.getPaginatedProducts(page, limit);
    res.render('index', { products: products.docs, page: products.page, totalPages: products.totalPages, hasPrevPage: products.hasPrevPage, hasNextPage: products.hasNextPage, prevPage: products.prevPage, nextPage: products.nextPage, limit: limit })
});

router.get('/realtimeproducts', async (req, res) => {
    const products = await productManager.getProducts();
    res.render('realTimeProducts', { products })
});



export default router;