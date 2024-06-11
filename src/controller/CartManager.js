import {promises as fs} from "fs";
import path from "path";
import __dirname from "../dirname.js";

class CartManager {
  constructor() {
    this.path = path.resolve(__dirname, "./data/carts.json");
  }

  async getCarts() {
    try {
      const data = await fs.readFile(this.path, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  async saveCarts(carts) {
    await fs.writeFile(this.path, JSON.stringify(carts, null, 2));
  }

  async createCart() {
    const carts = await this.getCarts();
    const newId = carts.length > 0 ? carts[carts.length - 1].id + 1 : 1;
    const newCart = { id: newId, products: [] };
    carts.push(newCart);
    await this.saveCarts(carts);
    return newCart;
  }

  async getCartById(cid) {
    const carts = await this.getCarts();
    return carts.find((cart) => cart.id === cid);
  }

  async addproductToCart(cid, id) {
    const carts = await this.getCarts();
    const cart = carts.find(c => c.id === cid);
    if(!cart)
        return null
    const productInCart = cart.products.find(p => p.product === id);
    if(productInCart) {
        productInCart.quantity += 1
    }else {
        cart.products.push({product: id, quantity: 1})
    }

    await this.saveCarts(carts)
    return cart
  }
}

export default CartManager;