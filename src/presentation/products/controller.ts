import { Request, Response } from "express";
import { CustomError } from "../../domain/erros/custom-error";
import { CreateCategoryDto } from "../../domain/dtos/categories/create-category.dto";
import { CategoryService } from "../../services/category.services";
import { error } from "console";
import { PaginatorDto } from "../../domain/dtos/shared/pagintation.dto";
import { CreateProductDto } from "../../domain/dtos/products/create-product.dto";
import { ProductService } from "../../services/product.services";

export class ProductController {
  constructor(private readonly productServices: ProductService) {
    // private readonly productServices: ProductServices
  }

  private handleError(res: Response, error: unknown) {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({
        error: error.message,
      });
    }

    return res.status(500).json({
      error: error instanceof Error ? error.message : "Error desconocido",
    });
  }

  createProduct = async (req: Request, res: Response) => {
    console.log(req.body.user.id);

    const [error, createProductDto] = CreateProductDto.create({
      ...req.body,
      user: req.body.user.id,
    });
    if (error) {
      return res.status(400).json({ error });
    }
    try {
      const newProduct = await this.productServices.createProduct(
        createProductDto!,
      );
      return res.status(201).json(newProduct);
    } catch (error) {
      return this.handleError(res, error);
    }
  };

  getProducts = async (req: Request, res: Response) => {
    const { page = 1, limit = 10 } = req.query;

    const [error, paginationDto] = PaginatorDto.create(+page, +limit);

    if (error) return res.status(400).json({ error });
    this.productServices
      .getProducts(paginationDto!)
      .then((categories) => res.json(categories))
      .catch((error) => this.handleError(res, error));
  };
}
