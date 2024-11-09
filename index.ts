import { Elysia, t } from "elysia";
import sequelize from "./sequelizeClient";
import Product from "./models/Product";
import ProductService from "./services/product.service";
import { swagger } from "@elysiajs/swagger";
import { ProductSchema } from "./types/product";

const app = new Elysia();

app.use(swagger());
app.post(
  "/api/products",
  async ({ body }) => {
    // Specify the body type
    try {
      const product = await ProductService.createProduct(body);
      return { status: 201, product }; // Respond with a 201 status and the created product
    } catch (error) {
      return { status: 500, error: "fail to add User" }; // Handle errors
    }
  },
  { body: ProductSchema }
);

// Define the route for getting all products
app.get("/api/products", async () => {
  try {
    const products = await ProductService.getProducts();
    return { status: 200, products };
  } catch (error) {
    return { status: 500, error: "fail to get User" };
  }
});

app.get(
  "/api/products/:id",
  async ({ params }) => {
    try {
      const product = await ProductService.getProductById(params.id);
      return { status: 200, product };
    } catch (error) {
      return { status: 500, error: "fail to get User" };
    }
  },
  {
    params: t.Object({
      id: t.Number(),
    }),
  }
);

app.put(
  "/api/products/:id",
  async ({ params, body }) => {
    try {
      const product = await ProductService.updateProduct(params.id, body);
      return { status: 200, product };
    } catch (error) {
      return { status: 500, error: "fail to update User" };
    }
  },
  {
    params: t.Object({
      id: t.Number(),
    }),
    body: ProductSchema,
  }
);

app.delete(
  "/api/products/:id",
  async ({ params }) => {
    try {
      const product = await ProductService.deleteProduct(params.id);
      return { status: 200, product };
    } catch (error) {
      return { status: 500, error: "fail to delete User" };
    }
  },
  {
    params: t.Object({
      id: t.Number(),
    }),
  }
);

app.post(
  "/api/products/import",
  async ({ body }) => {
    try {
      const products = await ProductService.importProducts(body);
      return { status: 200, products };
    } catch (error) {
      return { status: 500, error: "fail to import User" };
    }
  },
  {
    body: t.Array(ProductSchema),
  }
);

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully.");

    await sequelize.sync(); // Sync all models
    console.log("Database synchronized.");

    app.listen(3000);
    console.log("Server is running on http://localhost:3000");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();
