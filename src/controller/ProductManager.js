import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class ProductManager {
  constructor() {
    this.path = path.resolve(__dirname, "../data/products.json");
  }

  async getProducts() {
    try {
      const data = await fs.readFile(this.path, 'utf-8');
      return JSON.parse(data);  
    }catch(error) {
      return [];
    }
  }

  async saveProducts(products) {
    await fs.writeFile(this.path, JSON.stringify(products, null, 2));
  }

  async addProduct(product) {
    const { title, price, description, thumbnail, code, stock } = product;

    if(!title || !price || !description || !code || !stock) {
      console.log("son campos obligatorios");
      return;
    }

    const products = await this.getProducts();
    const newId = products.length > 0 ? products[products.length - 1].id + 1 : 1 ;
    const newProduct = { id: newId, title, price, description, thumbnail, code, stock}

      products.push(newProduct);
      await this.saveProducts(products)
      return;
  }

  async getProductById(id) {
    const product = await this.getProducts()
    return product.find(product => product.id === id);
  }

  async updateProduct(id, updatedProduct) {
    const products = await this.getProducts();
    const index = products.findIndex(product => product.id === id);
    if(index === -1)return null;

    products[index] = {...products[index], ...updatedProduct};
    await this.saveProducts(products);
    return products[index]
  }

  async deleteProduct(id) {
    const products = await this.getProducts();
    const index = products.findIndex(product => product.id === id);
    if (index === -1)return null;
    const deletedProduct = products.splice(index, 1)
    await this.saveProducts(products)
    return deletedProduct[0];
  }
}

export default ProductManager;