import { Router } from "express";
import ProductManager from "../controller/ProductManager.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import passport from "passport";

const router = Router();
const productManager = new ProductManager();

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Gestión de productos
 */

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Añadir un nuevo producto
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               category:
 *                 type: string
 *               code:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               stock:
 *                 type: number
 *     responses:
 *       201:
 *         description: Producto creado
 *       400:
 *         description: Error en la solicitud
 */
router.post(
  "/add",
  passport.authenticate("current", { session: false }),
  authMiddleware("admin"),
  async (req, res) => {
    try {
      const product = req.body;
      const newProduct = await productManager.addProduct(product);
      res.status(201).json(newProduct);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

/**
 * @swagger
 * /api/products/allproducts:
 *   get:
 *     summary: Obtiene una lista de todos los productos
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Lista de productos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get("/allproducts", async (req, res) => {
  const products = await productManager.getProducts();
  res.json(products);
});

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Obtiene una lista paginada de productos
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Número de página
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Número de productos por página
 *     responses:
 *       200:
 *         description: Lista paginada de productos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 payload:
 *                   type: array
 *                   items:
 *                     type: object
 *                 totalPages:
 *                   type: integer
 *                 prevPage:
 *                   type: integer
 *                 nextPage:
 *                   type: integer
 *                 page:
 *                   type: integer
 *                 hasPrevPage:
 *                   type: boolean
 *                 hasNextPage:
 *                   type: boolean
 *                 prevLink:
 *                   type: string
 *                 nextLink:
 *                   type: string
 *       400:
 *         description: Error en la solicitud
 */
router.get("/", async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const products = await productManager.getPaginatedProducts(
      parseInt(page),
      parseInt(limit)
    );
    res.json({
      status: `success`,
      payload: products.docs,
      totalPages: products.totalPages,
      prevPage: products.prevPage,
      nextPage: products.nextPage,
      page: products.page,
      hasPrevPage: products.hasPrevPage,
      hasNextPage: products.hasNextPage,
      prevLink: products.hasPrevPage
        ? `/api/products?page=${products.prevPage}&limit=${limit}`
        : null,
      nextLink: products.hasNextPage
        ? `/api/products?page=${products.nextPage}&limit=${limit}`
        : null,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Obtiene un producto por ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del producto
 *     responses:
 *       200:
 *         description: Detalles del producto
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       404:
 *         description: Producto no encontrado
 */
router.get(`/:id`, async (req, res) => {
  const { id } = req.params;
  const product = await productManager.getProductById(id);
  if (!product) {
    return res.status(404).json({ error: "product not found" });
  }
  res.json(product);
});

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Actualiza un producto por ID
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del producto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               category:
 *                 type: string
 *               code:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               stock:
 *                 type: number
 *     responses:
 *       200:
 *         description: Producto actualizado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       404:
 *         description: Producto no encontrado
 *       500:
 *         description: Error en el servidor
 */
router.put(
  "/:id",
  passport.authenticate("current", { session: false }),
  authMiddleware("admin"),
  async (req, res) => {
    try {
      const { id } = req.params;
      const { title, category, code, description, price, stock } = req.body;

      const updatedProduct = {
        title,
        category,
        code,
        description,
        price,
        stock,
      };
      const product = await productManager.updateProduct(id, updatedProduct);

      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      res.json({ message: "Product updated successfully", product });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Elimina un producto por ID
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del producto
 *     responses:
 *       200:
 *         description: Producto eliminado
 *       404:
 *         description: Producto no encontrado
 */
router.delete(
  "/:id",
  passport.authenticate("current", { session: false }),
  authMiddleware("admin"),
  async (req, res) => {
    const { id } = req.params;
    const product = await productManager.deleteProduct(id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(`Product ${id} deleted`);
  }
);

export default router;

