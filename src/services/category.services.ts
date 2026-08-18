import { CategoryModel } from "../data/mongooo/models/category.mode";
import { CreateCategoryDto } from "../domain/dtos/categories/create-category.dto";
import { PaginatorDto } from "../domain/dtos/shared/pagintation.dto";
import { UserEntity } from "../domain/entities/user-entity";
import { CustomError } from "../domain/erros/custom-error";

export class CategoryService {
  constructor() {}

  async createCategory(createCategoryDto: CreateCategoryDto, user: UserEntity) {
    const categoryExists = await CategoryModel.findOne({
      name: createCategoryDto.name,
    });
    if (categoryExists)
      throw CustomError.badRequest("Categoria already exists");

    try {
      const category = new CategoryModel({
        ...createCategoryDto,
        user: user.id,
      });
      await category.save();

      return {
        id: category.id,
        name: category.name,
        avialable: category.available,
      };
    } catch (error) {
      throw CustomError.internalServerError(
        "Internal server - create category",
      );
    }
  }
  async getCategories(paginationDto: PaginatorDto) {
    const { page, limit } = paginationDto;
    try {
      const [total, categories] = await Promise.all([
        CategoryModel.countDocuments(),
        CategoryModel.find()
          .skip((page - 1) * limit)
          .limit(limit),
      ]);
      // const total = await CategoryModel.countDocuments();
      // const categories = await CategoryModel.find()
      //   .skip((page - 1) * limit)
      //   .limit(limit);
      return {
        categories: categories.map((category) => ({
          id: category.id,
          name: category.name,
          available: category.available,
        })),
        page,
        limit,
        total,
      };
    } catch (error) {
      console.log(error);

      throw CustomError.internalServerError();
    }
  }
}
