import Cart from "../models/cart.model.js";

class CartManager {
  async createCart(products) {
    try {
      const newCart = new Cart({ products });
      const savedCart = await newCart.save();
      return savedCart;
    } catch (error) {
      console.error("Error creating cart:", error);
      throw error;
    }
  }

  async getAllCarts() {
    try {
      const carts = await Cart.find().populate("products.product");
      return carts;
    } catch (error) {
      console.error("Error getting all carts:", error);
      throw error;
    }
  }

  async getCartById(cid) {
    try {
      const cart = await Cart.findById(cid).populate("products.product");
      return cart;
    } catch (error) {
      console.error("Error getting cart:", error);
      throw error;
    }
  }

  async addToCart(cid, id, quantity = 1) {
    try {
      const cart = await Cart.findById(cid);

      if (!cart) {
        throw new Error("Cart not found");
      }

      const productIndex = cart.products.findIndex(
        (item) => item.product.toString() === id
      );

      if (productIndex !== -1) {
        cart.products[productIndex].quantity += quantity;
      } else {
        cart.products.push({ product: id, quantity });
      }

      const updatedCart = await cart.save();
      return updatedCart;
    } catch (error) {
      console.error("Error adding to cart:", error);
      throw error;
    }
  }

  async removeFromCart(cid, _id) {
    try {
      const cart = await Cart.findById(cid);

      if (!cart) {
        console.error("Cart not found");
      }

      cart.products = cart.products.filter(
        (item) => item.product.toString() !== _id
      );
      const updatedCart = await cart.save();
      return updatedCart;
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  }

  async deleteCart(cid) {
    try {
      const cart = await Cart.findByIdAndDelete(cid);
      return cart;
    } catch (error) {
      console.error("Error deleting cart:", error);
    }
  }

  async updateProductQuantity(cid, pid, quantity) {
    try {
      const cart = await Cart.findById(cid);

      if (!cart) {
        console.error("Cart not found");
      }

      const productIndex = cart.products.findIndex(
        (item) => item.product.toString() === pid
      );

      if (productIndex === -1) {
        console.error("Product not found in cart");
      }

      cart.products[productIndex].quantity = quantity;
      const updatedCart = await cart.save();
      return updatedCart;
    } catch (error) {
      console.error("Error updating product quantity:", error);
      console.error(error);
    }
  }

  async updateCartProducts(cid, products) {
    try {
        const cart = await Cart.findById(cid);

        if (!cart) {
            console.error("Cart not found");
        }

        cart.products = products;
        const updatedCart = await cart.save();
        return updatedCart;
    } catch (error) {
        console.error("Error updating cart products:", error);
    }
  }
}

export default CartManager;
