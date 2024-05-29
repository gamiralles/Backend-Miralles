import { Router } from 'express'
import CartManager from '../controller/CartManager.js'
import ProductManager from '../controller/ProductManager.js';

const router = Router();
const cartManager = new CartManager();
const productManager = new ProductManager();

router.post('/', async (req, res) => {
    const newCart = await cartManager.createCart();
    res.status(201).json(newCart);
})

router.get('/:cid', async (req, res) => {
    const{ cid } = req.params;
    const cart = await cartManager.getCartById(Number(cid));
    if(!cart) {
        return res.status(404).json({error: 'Cart not found'})
    }
    res.json(cart);
})

router.post('/:cid/product/:id', async (req, res) => {
    const { cid, id } = req.params;
    const product = await productManager.getProductById(Number(id));
    if(!product) {
        return res.status(404).json({error: 'Product not found'});
    }
    const updateCart = await cartManager.addproductToCart(Number(cid), Number(id));
    if(!updateCart) {
        return res.status(404).json({error: 'Cart not found'})
    }
    res.json(updateCart)
})

export default router;