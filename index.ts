import { Elysia } from 'elysia';
import sequelize from './sequelizeClient';
import Product from './models/Product';
import ProductController from './controllers/product.controller';

const app = new Elysia();

// Define routes for the ProductController
app.post('/api/products', ProductController.create);
app.get('/api/products', ProductController.getAll);
app.get('/api/products/:id', ProductController.getById);
app.put('/api/products/:id', ProductController.update);
app.delete('/api/products/:id', ProductController.delete);

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully.');

    await sequelize.sync(); // Sync all models
    console.log('Database synchronized.');

    app.get('/products', async () => {
      const products = await Product.findAll();
      return { data: products };
    });

    app.listen(3000);
    console.log('Server is running on http://localhost:3000');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();
