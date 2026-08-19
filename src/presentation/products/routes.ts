import { Router } from "express";
import { AuthService } from "../../services/auth.service";
import { ProductController } from "./controller";
import { AuthMiddleware } from "../middlewares/auht.middleware";
import { CategoryService } from "../../services/category.services";
import { ProductService } from "../../services/product.services";

export class ProductRoutes {
  static get routes(): Router {
    const router = Router();

    const productServices = new ProductService();

    const controller = new ProductController(productServices);

    // Definir las rutas
    router.get("/", controller.getProducts);
    router.post("/", [AuthMiddleware.validateJWR], controller.createProduct);

    return router;
  }
}
