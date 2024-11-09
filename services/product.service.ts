// services/product.service.ts
import Product from "../models/Product";

class ProductService {
  async createProduct(data: {
    name: string;
    price: number;
    description?: string;
  }) {
    const product = await Product.create(data);
    // const fullProduct = await Product.findByPk(product.id); // Fetch full product with ID
    return { ...product.dataValues , id : product.id};
  }

  async getProducts() {
    return await Product.findAll();
  }

  async getProductById(id: number) {
    return await Product.findByPk(id);
  }

  async updateProduct(
    id: number,
    data: Partial<{ name: string; price: number; description?: string }>
  ) {
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

  async importProducts(data: { name: string; price: number; description?: string }[]) {
    
    const products = await Product.bulkCreate(data);
    // Retrieve the products that were just created

    return 
  }
  
}

export default new ProductService();
