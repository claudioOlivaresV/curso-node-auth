import { Request, Response } from "express";
import { CustomError } from "../../domain/erros/custom-error";
import { CreateCategoryDto } from "../../domain/dtos/categories/create-category.dto";
import { CategoryService } from "../../services/category.services";
import { error } from "console";
import { PaginatorDto } from "../../domain/dtos/shared/pagintation.dto";

export class CategoryController {
  constructor(private readonly categoryServices: CategoryService) {}

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

  createCategory = async (req: Request, res: Response) => {
    const [error, createCategoryDto] = CreateCategoryDto.create(req.body);

    if (error) {
      return res.status(400).json({ error });
    }

    try {
      const newCategory = await this.categoryServices.createCategory(
        createCategoryDto!,
        req.body.user,
      );

      return res.status(201).json(newCategory);
    } catch (error) {
      return this.handleError(res, error);
    }
  };

  getCategory = async (req: Request, res: Response) => {
    const { page = 1, limit = 10 } = req.query;

    const [error, paginationDto] = PaginatorDto.create(+page, +limit);

    if (error) return res.status(400).json({ error });
    this.categoryServices
      .getCategories(paginationDto!)
      .then((categories) => res.json(categories))
      .catch((error) => this.handleError(res, error));
  };
}
