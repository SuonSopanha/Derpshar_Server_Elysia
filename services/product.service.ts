// services/product.service.ts
import Product from "../models/Product";

class ProductService {
  async createProduct(data: { name: string; price: number; description?: string }) {
    return await Product.create(data);
  }

  async getProducts() {
    return await Product.findAll();
  }

  async getProductById(id: number) {
    return await Product.findByPk(id);
  }

  async updateProduct(id: number, data: Partial<{ name: string; price: number; description?: string }>) {
    const product = await Product.findByPk(id);
    if (product) {
      return await product.update(data);
    }
    return null;
  }

  async deleteProduct(id: number) {
    const product = await Product.findByPk(id);
    if (product) {
      await product.destroy();
      return product;
    }
    return null;
  }
}

export default new ProductService();
