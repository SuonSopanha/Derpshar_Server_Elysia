import { t } from "elysia";
const ProductSchema = t.Object({
    name: t.String(),
    price: t.Number(),
    description: t.String()
  });

export { ProductSchema};