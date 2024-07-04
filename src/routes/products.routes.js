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

router.get('/allproducts', async (req, res) => {
    const products = await productManager.getProducts();
    res.json(products)
});

router.get('/', async (req, res) => {
    try {
        const {page = 1, limit = 10 } = req.query;
        const products = await productManager.getPaginatedProducts(parseInt(page), parseInt(limit));
        res.json({
            status: `success`,
            payload: products.docs,
            totalPages: products.totalPages,
            prevPage: products.prevPage,
            nextPage: products.nextPage,
            page: products.page,
            hasPrevPage: products.hasPrevPage,
            hasNextPage: products.hasNextPage,
            prevLink: products.hasPrevPage ? `/api/products?page=${products.prevPage}&limit=${limit}` : null,
            nextLink: products.hasNextPage ? `/api/products?page=${products.nextPage}&limit=${limit}` : null,
        });
    }catch (error) {
        res.status(400).json({ error: error.message })
    }
});

router.get(`/:id`, async (req, res) => {
    const {id} = req.params;
    const product = await productManager.getProductById(id);
    console.log(id)
    console.log(product)
    if(!product){
        return res.status(404).json({error: 'product not found esto no funca'})
    }
    res.json(product)
}); 

router.put('/:id', async (req, res) => {
try {
    const { id } = req.params;
    const { title, category, code, description, price, stock } = req.body;

    const updatedProduct = { title, category, code, description, price, stock };
    const product = await productManager.updateProduct(id, updatedProduct);

    if (!product) {
        return res.status(404).json({ error: 'Product not found' });
    }

    res.json({ message: 'Product updated successfully', product });
} catch (error) {
    res.status(500).json({ error: error.message });
}
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const product = await productManager.deleteProduct(id);
    if(!product) {
        return res.status(404).json({ error: 'Product nor found'})
    }
    res.json(`Product ${id} deleted`)
})

export default router;