// controllers/product.controller.ts
import { Elysia } from 'elysia';
import productService from '../services/product.service';

class ProductController {
  async create(req: any, res: any) {
    try {
      const product = await productService.createProduct(req.body);
      return res.status(201).json(product);
    } catch (error) {
      return res.status(500).json({ error: "error" });
    }
  }

  async getAll(req: any, res: any) {
    try {
      const products = await productService.getProducts();
      return {
        data: products
      }
    } catch (error) {
      return res.status(500).json({ error: "error" });
    }
  }

  async getById(req: any, res: any) {
    try {
      const product = await productService.getProductById(Number(req.params.id));
      if (product) {
        return res.status(200).json(product);
      }
      return res.status(404).json({ message: 'Product not found' });
    } catch (error) {
      return res.status(500).json({ error: "error" });
    }
  }

  async update(req: any, res: any) {
    try {
      const product = await productService.updateProduct(Number(req.params.id), req.body);
      if (product) {
        return res.status(200).json(product);
      }
      return res.status(404).json({ message: 'Product not found' });
    } catch (error) {
      return res.status(500).json({ error: "error" });
    }
  }

  async delete(req: any, res: any) {
    try {
      const product = await productService.deleteProduct(Number(req.params.id));
      if (product) {
        return res.status(204).send();
      }
      return res.status(404).json({ message: 'Product not found' });
    } catch (error) {
      return res.status(500).json({ error: "error" });
    }
  }
}

export default new ProductController();
