import { Router } from "express";
import { AuthService } from "../../services/auth.service";
import { CategoryController } from "./controller";
import { AuthMiddleware } from "../middlewares/auht.middleware";
import { CategoryService } from "../../services/category.services";

export class CategoryRoutes {
  static get routes(): Router {
    const router = Router();

    const categorServices = new CategoryService();

    const controller = new CategoryController(categorServices);

    // Definir las rutas
    router.get("/", controller.getCategory);
    router.post("/", [AuthMiddleware.validateJWR], controller.createCategory);

    return router;
  }
}
