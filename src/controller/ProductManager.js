import __dirname from '../dirname.js';
import Product from '../models/product.model.js';


class ProductManager {

  async addProduct(product) {
    try {
      const newProduct = new Product(product);
      await newProduct.save();
      return newProduct;
    }catch(error) {
      console.log(`Error adding product: ${error}`);
    }
  } 

  async getProducts() {
    try {
      const data = await Product.find().lean();
      return data;
    }catch(error) {
      console.log(`Error getting products: ${error}`);
    }
  }

  async getPaginatedProducts(page = 1, limit = 10) {
    try {
      const options = {
        page,
        limit,
        lean: true
    };
    const products = await Product.paginate({}, options);
    return products;
    }catch(error) {
      console.log(`Error getting products: ${error}`);
    }
  }

  async getProductById(id) {
    try {
      const product = await Product.findById(id);
      return product;
    }catch(error) {
      console.log(`Error getting product by id: ${error}`);
    }
  }

  async updateProduct(id, updatedProduct) {
    try {
        const options = { new: true };
        const product = await Product.findByIdAndUpdate(id, updatedProduct, options);
        return product;
    } catch (error) {
        console.log(`Error updating product: ${error}`);
        throw error; // Asegúrate de lanzar el error para manejarlo adecuadamente
    }
}

  async deleteProduct(id) {
    try {
      const product = await Product.findByIdAndDelete(id);
      return product;
    }catch(error) {
      console.log(`Error deleting product: ${error}`);
    }
  }
}

export default ProductManager;