import { Router } from "express";
import ProductManager from "../controller/ProductManager.js";

const router = Router()
const productManager = new ProductManager();

router.post('/', async (req, res) => {
    try {
        const product = req.body;
        const newProduct = await productManager.addProduct(product);
        res.status(201).json(newProduct)
    }catch (error) {
        res.status(400).json({ error: error.message })
    }
});

router.get('/', async (req, res) => {
    const products = await productManager.getProducts();
    res.json(products)
});

router.get('/:id', async (req, res) => {
    const {id} = req.params;
    const product = await productManager.getProductById(Number(id));
    if(!product){
        return res.status(404).json({error: 'product not found'})
    }
    res.json(product)
});

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedProduct = req.body;
        const product = await productManager.updateProduct(Number(id), updatedProduct)
        if(!product){
            return res.status(404).json({ error: 'Product not found'})
        }
        res.json(product)
    }catch (error){
        res.status(400).json({ error: error.message })
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const product = await productManager.deleteProduct(Number(id));
    if(!product) {
        return res.status(404).json({ error: 'Product nor found'})
    }
    res.json(product)
})

export default router;