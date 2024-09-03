import { Router } from "express";
import CartManager from "../controller/CartManager.js";
import ProductManager from "../controller/ProductManager.js";
import passport from "passport";

const router = Router();
const cartManager = new CartManager();
const productManager = new ProductManager();

router.post(
  "/",
  passport.authenticate("current", { session: false }),
  async (req, res) => {
    const userId = req.user.id;
    try {
      const newCart = await cartManager.createCart(userId);
      res.status(201).json(newCart);
    } catch (error) {
      res.status(400).json({ error: `Error creating cart: ${error.message}` });
    }
  }
);

router.get("/", async (req, res) => {
  const carts = await cartManager.getAllCarts();
  res.json(carts);
});

router.get("/:cid", async (req, res) => {
  const { cid } = req.params;
  const cart = await cartManager.getCartById(cid);
  if (!cart) {
    return res.status(404).json({ error: "Cart not found" });
  }
  res.json(cart);
});

router.post(
  "/:cid/product/:id",
  passport.authenticate("current", { session: false }),
  async (req, res) => {
    const { cid, id } = req.params;
    const product = await productManager.getProductById(id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    const updateCart = await cartManager.addToCart(cid, id);
    if (!updateCart) {
      return res.status(404).json({ error: "Cart not found" });
    }
    res.json(updateCart);
  }
);

router.delete("/:cid/product/:_id", async (req, res) => {
  const { cid, _id } = req.params;
  const updateCart = await cartManager.removeFromCart(cid, _id);
  if (!updateCart) {
    return res.status(404).json({ error: "Cart not found" });
  }
  res.json(updateCart);
});

router.delete("/:cid", async (req, res) => {
  const { cid } = req.params;
  const deleteCart = await cartManager.deleteCart(cid);
  if (!deleteCart) {
    return res.status(404).json({ error: "Cart not found" });
  }
  res.json(deleteCart);
});

router.put("/:cid/products/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  const { quantity } = req.body;

  if (!quantity || typeof quantity !== "number" || quantity <= 0) {
    return res.status(400).json({ error: "Invalid quantity" });
  }

  try {
    const updatedCart = await cartManager.updateProductQuantity(
      cid,
      pid,
      quantity
    );
    if (!updatedCart) {
      return res.status(404).json({ error: "Cart or product not found" });
    }
    res.json(updatedCart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/:cid", async (req, res) => {
  const { cid } = req.params;
  const { products } = req.body;

  if (!Array.isArray(products) || products.length === 0) {
    return res.status(400).json({ error: "Invalid products" });
  }

  try {
    const updatedCart = await cartManager.updateCartProducts(cid, products);
    if (!updatedCart) {
      return res.status(404).json({ error: "Cart not found" });
    }
    res.json(updatedCart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/:cid/purchase", passport.authenticate("current", { session: false }), async (req, res) => {
  const { cid } = req.params;
  const userId = req.user.id;

  try {
    const ticket = await cartManager.purchaseCart(cid, userId);
    res.status(201).json(ticket);
  } catch (error) {
    res.status(500).json({ error: error.message });
  } 
});

export default router;
